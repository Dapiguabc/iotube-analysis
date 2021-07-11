import BigNumber from "bignumber.js";
import {
  Arg,
  Ctx,
  Query,
  Resolver,
  ResolverInterface
} from "type-graphql";
import { Field, ObjectType } from "type-graphql";
import { ICtx } from "./antenna"
import { ITokenBasicInfo } from "../erc20/token"
import { BigNumberScalar } from "../scalars/bignumber-scalar";

@ObjectType({ description: "IOTX price information from coinmarketcap" })
export class CoinPrice {
  @Field(_ => String)
  public usd: string;

  @Field(_ => String)
  public usd24hChange: string;
}

@ObjectType()
export class TokenBasicInfo {
  @Field(_ => String)
  public tokenAddress: string
  @Field(_ => String)
  public symbol: string
  @Field(_ => String)
  public name: string
  @Field(_ => BigNumberScalar)
  public decimals: number
  @Field(_ => String)
  public totalSupply: string
  @Field(_ => String)
  public contractAddress: string
}

@Resolver(_ => String)
export class MetaResolver implements ResolverInterface<() => String> {
  @Query(_ => String)
  public async health(): Promise<string> {
    return "OK";
  }

  @Query(_ => TokenBasicInfo, { description: "Fetch basic token info by token address" })
  public async getBasicTokenInfo(
    @Arg("tokenAddress", _ => String, { description: "action Hash" })
    tokenAddress: string,
    @Ctx() { gateways }: ICtx
  ): Promise<ITokenBasicInfo> {
    const info = await gateways.iotube.getBasicTokenInfo(tokenAddress);
    return info;
  }
}