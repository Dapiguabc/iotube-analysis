import Koa from "koa";
import KoaLogger from "koa-logger";
import koaStatic from "koa-static";
import RpcMethod from "iotex-antenna/lib/rpc-method/node-rpc-method";
import { setGateway } from "./gateway/gateway"
import { Iotube } from "./gateway/erc20/contract"
import { fetchCoinPrice } from "./gateway/coingeco"
import Schedule from "./schedule";
import DB from "./db"
import path from "path";


export class MyServer{
  app: Koa;
  gateways: {
    antenna: RpcMethod,
    iotube: Iotube,
    coingecko: any,
    sql: DB,
  };
  constructor(){
    this.app = new Koa();
    const provider = new RpcMethod("https://api.mainnet.iotex.one:443");
    const iotube = new Iotube();
    iotube.addContract("io1hezp6d7y3246c5gklnnkh0z95qfld4zdsphhsw", provider, "wl");
    this.gateways = {
      antenna: provider,
      iotube: iotube,
      coingecko: {fetchCoinPrice},
      sql: new DB(),
    }
  }
};

export async function startServer(): Promise<MyServer> {
    const server = new MyServer();
    //const logger = KoaLogger();  
    //server.app.use(logger);
    server.app.use(koaStatic(path.join(__dirname+'/app'),	{
  		index: "index.html", 
  		hidden:false, 
  		defer:true,	
    }))

    setGateway(server);

    const defaultPort = process.env.PORT || "5557";
    const port = Number(defaultPort);
    server.app.listen(port);

    // start the backend to collect data.
    const schedule = new Schedule(server);
    schedule.run();
    return server;
}