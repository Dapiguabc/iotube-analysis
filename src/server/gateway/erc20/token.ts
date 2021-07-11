import BigNumber from "bignumber.js";
import RpcMethod from "iotex-antenna/lib/rpc-method/node-rpc-method";
import { DecodeData, ERC20 } from "./erc20";
import {  getTokenInfo } from "../../../constant";
import { getTokenAmountBN } from "../../../utils/math";

export interface ITokenBasicInfo {
  tokenAddress: string;
  symbol: string;
  name: string;
  decimals: BigNumber;
  totalSupply: string;
  contractAddress: string;
}

export interface IERC20TokenDict {
  [index: string]: Token;
}

export class Token {
  protected readonly api: ERC20;
  protected static readonly tokenRefs: { [index: string]: Token } = {};
  protected isBidToken: boolean;

  constructor(api: ERC20) {
    this.api = api;
  }

  public static getToken(tokenAddress: string): Token {
    if (Token.tokenRefs[tokenAddress]) {
      return Token.tokenRefs[tokenAddress];
    }
    const rpcMethod:RpcMethod = new RpcMethod("https://api.mainnet.iotex.one:443");
    const api = ERC20.create(tokenAddress, rpcMethod);
    const token = new Token(api);
    Token.tokenRefs[tokenAddress] = token;
    return token;
  }

  public getApi(): ERC20{
    return this.api;
  }

  public decode(data: string): DecodeData {
    return this.api.decode(data);
  }

  public async checkValid(): Promise<boolean> {
    try {
      const { symbol } = await this.getBasicTokenInfo();
      return `${symbol}`.length > 0;
    } catch (error) {
      return false;
    }
  }

  public async totalSupply(): Promise<number>{
    const totalSupply =  await this.api.totalSupply(this.api.address);
    const info = getTokenInfo(this.api.address);
    const totalSupplyBn = getTokenAmountBN(totalSupply, info.decimals);
    return totalSupplyBn.toNumber();
  }

  public async getBasicTokenInfo(): Promise<ITokenBasicInfo> {
    const api = this.api;
    const [name, symbol, decimals, totalSupply] = await Promise.all<
        string,
        string,
        BigNumber,
        BigNumber
    >([
        api.name(api.address),
        api.symbol(api.address),
        api.decimals(api.address),
        api.totalSupply(api.address)
    ]);

    const totalSupplyBn = getTokenAmountBN(totalSupply, decimals.toString());
    const totalSupplyString = totalSupplyBn.toString(10);
    
    return  {
        tokenAddress: this.api.address,
        decimals,
        symbol,
        name,
        totalSupply: totalSupplyString,
        contractAddress: api.contract.getAddress() || ""
    };
  }
}
