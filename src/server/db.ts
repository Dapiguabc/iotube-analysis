import { IBlockMeta } from "iotex-antenna/lib/rpc-method/types";
import sqlite from "sqlite3";
import { Platform } from "../constant";

export type SortBytime =  "year" | "month" | "day"

export interface Transaction {
    acthash: string,
    type: "inflow" | "outflow", // inflow: tokens flow into iotex; outflow: tokens flow out from iotex; 
    from: string,
    to: string,
    tokenAddress: string,
    contractAddress: string,
    amount: number,
    blkHeight: number,
    blkHash: string,
    platform: Platform,
    timestamp: number,
}

export interface TransactionsOfBlock {
    blocks: IBlockMeta[];
    transactions: Transaction[];
}

export default class DB {

    private db: sqlite.Database;

    constructor(env: "development" | "test" | "production" = "development") {
        // connect to database
        let mySqlie = sqlite;
        if (env === "development") {
            mySqlie = sqlite.verbose();
        }

        this.db = new mySqlie.Database("datebase.db", (err) => {
            if (err) {
                console.error("new database error,", err.message);
            } else {
                console.log("new database success");
            }
        });

        // init database.
        try {
            this.initDatabase();
        } catch (error) {
            console.error(error.message);
        }
    }

    private initDatabase() {
        let ok = false;
        const errCallback = (err: Error) => {
            if (err) {
                throw new Error(`database init error, ${err.message}`);
            }
            ok = ok && !err;
        }

        this.db.run(`CREATE TABLE IF NOT EXISTS Witnessers (
            numofWitness NUMERIC,
            timestamp NUMERIC
        )`, errCallback);

        this.db.run(`CREATE TABLE IF NOT EXISTS block (
            hash varchar(256) PRIMARY KEY,
            height NUMERIC,
            timestamp NUMERIC,
            num_actions NUMERIC,
            producer_address varchar(256),
            transfer_amount varchar(256),
            tx_root varchar(256),
            receipt_root varchar(256),
            delta_state_digest varchar(256)
        )`, errCallback);

        this.db.run(`CREATE TABLE IF NOT EXISTS transction (
            acthash varchar(128) PRIMARY KEY,
            type varchar(32),
            from_address varchar(128),
            to_address varchar(128),
            token_address varchar(256),
            contract_address varchar(256),
            amount NUMERIC,
            block_height NUMBERIC,
            block_hash varchar(256),
            timestamp NUMBERIC,
            platform varchar(256)
        )`, errCallback);

        if (ok) {
            console.log("database init success");
        }
    }

    public sqlGet(sql: string): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.db.get(sql, (err, row)=>{
                return  (err) ? reject(err) : resolve(row);
            });
        })
    }

    public queryAll(sql: string): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.db.all(sql, (err, rows)=>{
                return  (err) ? reject(err) : resolve(rows);
            });
        })
    }

    public async getLastBlockHeight(): Promise<number>{ 
        try{
            const row = await this.sqlGet("SELECT height FROM block ORDER BY height DESC");
            return row? row.height: 0;
        }catch(err){
            console.error(err);
        }
    } 
    
    public insertTransaction(data: TransactionsOfBlock) {
        this.db.serialize(() => {
            // begin transction
            this.db.run('BEGIN TRANSACTION;');
            
            data.blocks.forEach((x: IBlockMeta)=>{
                this.db.run(`INSERT INTO block (hash, height, timestamp, num_actions, producer_address, transfer_amount, tx_root, receipt_root, delta_state_digest) 
                SELECT '${x.hash}', ${x.height}, ${x.timestamp.seconds}, ${x.numActions}, '${x.producerAddress}',${x.transferAmount},'${x.txRoot}','${x.receiptRoot}',
                '${x.deltaStateDigest}' WHERE NOT EXISTS (SELECT * FROM block WHERE hash = '${x.hash}')`);
            })
            data.transactions.forEach( (x: Transaction) =>{
                this.db.run(`INSERT INTO transction (acthash, type, from_address, to_address, token_address, contract_address, amount, block_height, block_hash, timestamp, platform) 
                SELECT '${x.acthash}', '${x.type}', '${x.from}', '${x.to}', '${x.tokenAddress}', '${x.contractAddress}', ${x.amount} 
                , ${x.blkHeight}, '${x.blkHash}', ${x.timestamp} ,'${x.platform}' WHERE NOT EXISTS (SELECT * FROM transction WHERE acthash = '${x.acthash}')`)
            });

            // commit transction
            this.db.run('COMMIT TRANSACTION;');
        });
    }

    public async getTranstions(): Promise<Transaction[]>{
        try{
            const rows = await this.queryAll("SELECT * FROM transction order by timestamp desc");
            return rows.map((x: any)=>{
                return {
                    acthash: x.acthash,
                    type: x.type, 
                    from: x.from_address,
                    to: x.to_address,
                    tokenAddress: x.token_address,
                    contractAddress: x.contract_address,
                    amount: x.amount,
                    platform: x.platform,
                    blkHeight: x.block_height,
                    blkHash: x.block_hash,
                    timestamp: x.timestamp,
                }
            })
        }catch(err){
            console.error(err);
        }
    }

    
    public async getTranstionsStatis(type: string): Promise<any>{
        try{
            const rows = await this.queryAll(`SELECT ${type} as type ,count(*) as txs FROM transction group by ${type}`);
            const data:any = [];
            let total = 0;
            for(let i=0;i<rows.length;i++){
                total += rows[i].txs;
                data.push({
                    x: rows[i].type,
                    y: rows[i].txs
                })
            }
            return {
                total: total,
                data: data
            }
        }catch(err){
            console.error(err);
        }
    }

    public async getTranstionsStatisByPlatform24H(): Promise<any>{
        const rows = await this.queryAll("select platform, count(*) as txs, (select count(*) from transction where timestamp > strftime('%s', 'now') - 86400) as total from transction where timestamp > strftime('%s', 'now') - 86400 group by platform");
        return rows;
    }
    public async getTranstionsStatisByPlatformWeek(): Promise<any>{
        const rows = await this.queryAll(`
        select platform, strftime('%Y%m%d', datetime(timestamp, 'unixepoch')) as x, count(*) as y from transction where timestamp> strftime('%s', 'now') - 604800 group by platform, x
        union
        select 'all' as platform, strftime('%Y%m%d', datetime(timestamp, 'unixepoch')) as x, count(*) as y from transction where timestamp> strftime('%s', 'now') - 604800 group by x
        `);
        return rows;
    }
    public async getTranstionsStatisByPlatform(): Promise<any>{
        try{
            const rows = await this.queryAll(`SELECT platform,count(*) as txs FROM transction group by platform`);
            const data:any = [];
            let total = 0;
            for(let i=0;i<rows.length;i++){
                total += rows[i].txs;
                data.push({
                    platform: rows[i].platform,
                    txs: rows[i].txs
                })
            }
            return {
                total: total,
                data: data
            }
        }catch(err){
            console.error(err);
        }
    }

    public async getTxNumByType(): Promise<any>{
        const rows = await this.queryAll(`select 'yeaterday' as time,type,count(*) as num from transction where (timestamp < strftime('%s', 'now') - 86400) and (timestamp > strftime('%s', 'now') - 2*86400) group by type
        union
        select 'month' as time,type,count(*) as num from transction where timestamp > strftime('%s', 'now') - 30*86400 group by type`);
        return rows;
    }
    /*
    * Witnesse about.
    */
    public async getWitnesseStatis(type: SortBytime = "day"): Promise<any>{
        let arg;
        switch(type){
            case "year":
                arg = "%Y";
                break;
            case "month":
                arg = "%Y%m";
                break;
            case "day":
                arg = "%Y%m%d";
                break;
        }
        let resp = await this.queryAll(`select strftime('${arg}',datetime(timestamp, 'unixepoch')) as time, sum(numofWitness) as num from witnessers group by time`);
        const data: any[] = [];
        for(let i=0;i<resp.length;i++){
            data.push({
                x: resp[i].time,
                y: resp[i].num,
            });
        }
        return data
    }
    public async getWitnesseNum(): Promise<number>{
        let resp = await this.sqlGet(`select numofWitness as num from witnessers order by timestamp desc limit 1`);
        return resp.num
    }
    public async getWitnesseNum24hAgo(): Promise<number>{
        let resp = await this.sqlGet(`select numofWitness as num, timestamp from witnessers where timestamp < (strftime('%s','now') - 86400) order by timestamp desc limit 1`);
        return resp?.num
    }

    public insertWitness(num: number, timestamp: number){
        this.db.run(`INSERT INTO Witnessers VALUES (${num},${timestamp})`)
    }

    /*
    * User about.
    */
    
    public async getUsersNum(): Promise<any>{
        let resp = await this.queryAll("select  platform, count(distinct case when type='inflow' then from_address else to_address end) num  from transction group by platform");
        let total = 0;
        for(let i=0;i<resp.length;i++){
            total += resp[i].num;
        }
        return {
            total: total,
            data: resp
        }
    }
}