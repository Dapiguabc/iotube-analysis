import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  Int,
  Query,
  Resolver,
  ResolverInterface
} from "type-graphql";
import { Field, ObjectType } from "type-graphql";
import { ICtx } from "./antenna";
import { getTokenInfo } from "../../../constant";
import { SortBytime } from "../../db";
import { platform } from "os";

@ObjectType()
export class LiquidityInfo {
  @Field(_ => String)
  public name: string
  @Field(_ => String)
  public symbol: string
  @Field(_ => String)
  public liquidity: string
  @Field(_ => String)
  public liquidityChange: string
  @Field(_ => String)
  public logo: string
  @Field(_ => String)
  public price: string
  @Field(_ => String)
  public priceChange: string
}

@ObjectType()
export class Transaction {
  @Field(_ => String)
  public acthash: string
  @Field(_ => String)
  public type: "inflow" | "outflow"
  @Field(_ => String)
  public from: string
  @Field(_ => String)
  public to: string
  @Field(_ => String)
  public tokenAddress: string
  @Field(_ => String)
  public contractAddress: string
  @Field(_ => Float)
  public amount: number
  @Field(_ => String)
  public platform: string
  @Field(_ => Int)
  public blkHeight: number
  @Field(_ => String)
  public blkHash: string
  @Field(_ => Int)
  public timestamp: number
}
@ObjectType()
export class TxPlatform  {
  @Field(_ => String)
  public platform: string
  @Field(_ => Int)
  public txs: number
}

@ObjectType()
export class TransactionStatisByPlatform {
  @Field(_ => String)
  public total: number
  @Field(_ => [TxPlatform])
  public data:TxPlatform[]
}


@ObjectType()
export class Line {
  @Field(_ => String)
  public x: string
  @Field(_ => Number)
  public y: number
}

@ObjectType()
export class Witnness {
  @Field(_ => Int)
  public total: number
  @Field(_ => String)
  public total24changed: string
  @Field(_ => [Line])
  public data: Line[]
}

@ObjectType()
export class UsersNumData {
  @Field(_ => String)
  public platform: string
  @Field(_ => Number)
  public num: number
}

@ObjectType()
export class UsersNum {
  @Field(_ => Int)
  public total: number
  @Field(_ => [UsersNumData])
  public data: UsersNumData
}

@ObjectType()
export class Tx24HData {
  @Field(_ => Int)
  public key: number
  @Field(_ => String)
  public platform: string
  @Field(_ => Int)
  public txs: number
  @Field(_ => Float)
  public proportion: number
}

@ObjectType()
export class Txs24HPortion {
  @Field(_ => [Tx24HData])
  public data: Tx24HData[]
}

@ObjectType()
export class TxWeekData {
  @Field(_ => String)
  public x: string
  @Field(_ => String)
  public platform: string
  @Field(_ => Int)
  public y: number
}

@ObjectType()
export class Txs24HWeek {
  @Field(_ => [TxWeekData])
  public data: TxWeekData[]
}

@ObjectType()
export class txNumByTypeData {
  @Field(_ => Int)
  public num: number
  @Field(_ => String)
  public time: string
  @Field(_ => String)
  public type: string
}

@ObjectType()
export class txNumByType {
  @Field(_ => [txNumByTypeData])
  public data: txNumByTypeData[]
}

@Resolver(_ => String)
export class AnalysisResolver implements ResolverInterface<() => String> {

  @Query(_ => [LiquidityInfo], { description: "Fetch liquidty info by tokenAddress list." })
  public async liquidity(
    @Arg("tokenAddressList", _ => [String], { description: "action Hash" })
    tokenAddressList: string[],
    @Ctx() { gateways }: ICtx
  ): Promise<LiquidityInfo[]> {
    const fetchList: Promise<LiquidityInfo>[] = tokenAddressList.map(async (tokenAddress: string) =>{
        let totalSupply = await gateways.iotube.totalSupply(tokenAddress);
        let tokenInfo = getTokenInfo(tokenAddress);
        let id = tokenInfo.id;
        let res;
        if(id !== ""){
          res = await gateways.coingecko.fetchCoinPrice(
            id,
            "usd",
          );
        }
        return {
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            logo: tokenInfo.logoURI,
            liquidity: res?(totalSupply * res.data[id]["usd"]).toFixed(4):"---",
            liquidityChange: res?(totalSupply * res.data[id]["usd"]).toFixed(4):"---",
            price: res?res.data[id]["usd"].toFixed(4):"---",
            priceChange: res?res.data[id]["usd_24h_change"].toFixed(4):"---",
        }
    });
    const data = await Promise.all(fetchList);
    return data;
  }

  @Query(_ => [Transaction], { description: "Transtions list" })
  public async transtions(@Ctx() { gateways }: ICtx) {
    let transtions =  await gateways.sql.getTranstions();
    return transtions;
  }

  @Query(_ => TransactionStatisByPlatform, { description: "Transtions Statis By Platform" })
  public async transationsStatisByPlatform(@Ctx() { gateways }: ICtx): Promise<TransactionStatisByPlatform>{
    let statis =  await gateways.sql.getTranstionsStatisByPlatform();
    return statis;
  }

  @Query(_ => Witnness, { description: "Fetch total num of witness" })
  public async witnness(
    @Ctx() { gateways }: ICtx,
    @Arg("type", _ => String, { description: "It is used to sort data by time" })
    type?: SortBytime
  ): Promise<Witnness> {
    //const num = await gateways.iotube.totlalNumOfWinness();
    const newNum = await gateways.sql.getWitnesseNum();
    const oldNum = await gateways.sql.getWitnesseNum24hAgo();
    const data = await gateways.sql.getWitnesseStatis(type);
    return {
      total: newNum,
      total24changed: oldNum?((newNum/oldNum - 1) * 100).toFixed(2)+"%": "---",
      data: data
    };
  }

  
  @Query(_ => UsersNum, { description: "Fetch num of users" })
  public async  usersNum(@Ctx() { gateways }: ICtx): Promise<UsersNum> {
    //const num = await gateways.iotube.totlalNumOfWinness();
    const res = await gateways.sql.getUsersNum();
    return res;
  }

    
  @Query(_ => Txs24HPortion, { description: "Fetch num of users" })
  public async transtionsStatisByPlatform24H(@Ctx() { gateways }: ICtx): Promise<Txs24HPortion> {
    const rows = await gateways.sql.getTranstionsStatisByPlatform24H();
    return {
      data: rows.map((x:any, index:number)=>{
        return {
          key: index,
          txs: x.txs,
          platform: x.platform,
          proportion: x.txs/x.total
        }
      })
    };
  }

  @Query(_ => Txs24HWeek, { description: "Fetch txs statis data in 7 days" })
  public async transtionsStatisByPlatformWeek(@Ctx() { gateways }: ICtx): Promise<Txs24HWeek> {
    const rows = await gateways.sql.getTranstionsStatisByPlatformWeek();
    return {
      data: rows
    }
  }

  @Query(_ => txNumByType, { description: "Fetch txs num data by type in this month and in lastday" })
  public async txNumByType(@Ctx() { gateways }: ICtx): Promise<txNumByType> {
    const rows = await gateways.sql.getTxNumByType();
    return {
      data: rows
    }
  }
}