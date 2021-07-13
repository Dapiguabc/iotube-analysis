import ethereumjs from "ethereumjs-abi";
import { MyServer } from "./server";
import DB, { Transaction } from "./db";
import { GetLogsRequest, LogsFilter } from "./streamLogs";
import { IBlockMeta, IGetActionsResponse, IGetLogsResponse, ILog } from "iotex-antenna/lib/rpc-method/types";
import { Topics } from "./streamLogs";
import { fromBytes } from "iotex-antenna/lib/crypto/address";
import { getPlatform,chainMeta} from "../constant";

import corn from 'cron';

export default class Schedule {

    private server: MyServer;
    private db: DB;

    constructor(server: MyServer){
        this.db = server.gateways.sql;
        this.server = server;
    }

    public run(){
        var that = this;
        var job1 = new corn.CronJob('0 */1 * * * *', function(){
            that.getTransactions().then(()=>console.log(new Date(), "Finish get txs")).catch((err)=>console.log(err));
          }, null, true, 'America/Los_Angeles');
        var job2 = new corn.CronJob('0 */10 * * * *', function(){
            that.getWitness().then(()=>console.log(new Date(), "Finish get witness")).catch((err)=>console.log(err));
          }, null, true, 'America/Los_Angeles');
        job1.start();
        job2.start();
    }

    public async getWitness(){
        const num = await this.server.gateways.iotube.totlalNumOfWinness();
        this.db.insertWitness(num, Date.parse(new Date().toDateString())/1000)
    }
    public async getTransactions(){
        let latestHeight = await this.getLatestBlockHeight();
        let lastHeight = await this.db.getLastBlockHeight();
        console.log(lastHeight);
        //let lastHeight = 12036698;
        let result = await this.server.gateways.antenna.getBlockMetas({
            byIndex: {
                start: lastHeight+1,
                count: 300,
            }
        });
        let outflow = await this.getIotubeLogs(lastHeight, latestHeight, result.blkMetas);
        let inflow = await this.getIotubeAction(result.blkMetas);

        this.db.insertTransaction({
            blocks: result.blkMetas,
            transactions: [...outflow, ...inflow]
        });
    }

    public async getLatestBlockHeight(): Promise<number> {
        let resp = await this.server.gateways.antenna.getChainMeta({});
        let height = Number.parseInt(resp.chainMeta.height);

        return height
    }

    public async getIotubeAction(blkMetas: IBlockMeta[]): Promise<Transaction[]>{
        const txs: Transaction[] = [];
        for(let i=0;i<blkMetas.length;i++){
            let resp = await this.server.gateways.antenna.getActions({
                byBlk:{
                    blkHash: blkMetas[i].hash,
                    start: 0,
                    count: blkMetas[i].numActions,
                } 
            });
            txs.push(...this.parseAction(resp));
        }
        return txs;
    }

    private parseAction(res: IGetActionsResponse):Transaction[]{
        // a9013dce -> submit(address,address,unit256,address,address,uint256,bytes)
        // fc77a164 -> submitMulti(address[],address[],unit256[],address[],address[],uint256[],bytes)
        // f213159c -> depositTo(address,address,uint256)
        const txs: Transaction[] = [];
        res.actionInfo.forEach(item => {
            if(item.action.core.execution && item.action.core.execution.contract === chainMeta.validator){
                if(item.action.core.execution.data.toString("hex").startsWith("a9013dce")){
                    let [cashier, token, _index, from, to ,amount] = ethereumjs.rawDecode(["address","address","uint256","address","address","uint256"], Buffer.from(item.action.core.execution.data.toString("hex").substr(8), "hex"));
                    txs.push({
                        acthash: item.actHash,
                        type: "inflow",
                        from: "0x" + from,
                        to: fromBytes(Buffer.from(to, "hex")).string(),
                        tokenAddress: fromBytes(Buffer.from(token, "hex")).string(),
                        contractAddress: item.action.core.execution.contract,
                        amount: amount,
                        platform: getPlatform("0x" + cashier),
                        // @ts-ignore
                        blkHeight: Number.parseInt(item.blkHeight),
                        blkHash: item.blkHash,
                        timestamp: item.timestamp.seconds
                    })
                }
            }
        })
        return txs;
    }

    public async getIotubeLogs(lastHeight: number, latestHeight: number, blkMetas: IBlockMeta[]): Promise<Transaction[]>{

        let  logsRequest = new GetLogsRequest();
        logsRequest.byRange = {
            fromBlock: lastHeight+1,
            toBlock: lastHeight+301, //latestHeight
            paginationSize: 300,
            count: 300,
        }
        logsRequest.filter = new LogsFilter();
        // filter by cashier address on iotex.
        logsRequest.filter.address.push(chainMeta.bsc.cashierIotex, chainMeta.eth.cashierIotex, chainMeta.matic.cashierIotex);
        //85425e130ee5cbf9eea6de0d309f1fdd5f7a343aeb20ad4263f3e1305fd5b919 => Receipt(address,uint256,address,address,uint256,uint256)
        let topics = new Topics("85425e130ee5cbf9eea6de0d309f1fdd5f7a343aeb20ad4263f3e1305fd5b919");
        logsRequest.filter.topics.push(topics);
        let resp = await this.server.gateways.antenna.getLogs(logsRequest);
        return this.parseLogs(resp, blkMetas);
    }

    private parseLogs(logs: IGetLogsResponse, blkMetas: IBlockMeta[]): Transaction[]{
        const txs: Transaction[] = [];
        logs.logs.forEach((item: ILog)=>{
            if(item.topics[0].toString("hex") === "85425e130ee5cbf9eea6de0d309f1fdd5f7a343aeb20ad4263f3e1305fd5b919"){
                let token = ethereumjs.rawDecode(["address"], item.topics[1] as Buffer)[0];
                let [sender, recipient, amount] = ethereumjs.rawDecode(["address","address","uint256"], item.data as Buffer);
                let blockMeta = GetBlockMetaByHeight(blkMetas, item.blkHeight)
                if(!blockMeta){
                    return;
                }
                txs.push({
                    acthash: item.actHash.toString("hex"),
                    type: "outflow",
                    from: fromBytes(Buffer.from(sender, "hex")).string(),
                    to: "0x" + recipient,
                    tokenAddress: fromBytes(Buffer.from(token, "hex")).string(),
                    contractAddress: item.contractAddress,
                    amount: amount,
                    platform: getPlatform(item.contractAddress),
                    blkHeight: item.blkHeight,
                    blkHash: blockMeta.hash,
                    timestamp: blockMeta.timestamp.seconds,
                })
            }
        })
        return txs;
    }
}

export function GetBlockMetaByHeight(blockMetas: IBlockMeta[], blkHeight: number){
    for(let i=0; i<blockMetas.length; i++){
        // eslint-disable-next-line eqeqeq
        if(blockMetas[i].height == blkHeight){
            return blockMetas[i];
        }
    }
}