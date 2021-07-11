import { Contract } from "iotex-antenna/lib/contract/contract";
import { ITokenBasicInfo, Token } from "./token"
import ethereumjs from "ethereumjs-abi";
import { IRpcMethod } from "iotex-antenna/lib/rpc-method/types";
import { ABIDefinition } from "iotex-antenna/lib/contract/abi";
import { IOTUBEABI } from "./abi";


export class BasicContract{

  public address: string;
  public contract: Contract;
  public provider: IRpcMethod;

  constructor(address: string, provider: IRpcMethod, abi: Array<ABIDefinition> = IOTUBEABI){
    this.address = address;
    this.provider = provider;
    this.contract = new Contract(abi, address, {
      provider: provider,
    });
  }

  public async readMethod(
    method: string,
    callerAddress: string,
    // @ts-ignore
    // tslint:disable-next-line: typedef
    ...args
  ): Promise<string> {
    const result = await this.provider.readContract({
      execution: this.contract.pureEncodeMethod("0", method, ...args),
      callerAddress: callerAddress
    });

    return result.data;
  }
}

export class WitnessListContract extends BasicContract{

  // winnessList: get num of witness.
  public async numOfActive(): Promise<number>{
    const result = await this.readMethod("numOfActive", this.address);
    let params = ethereumjs.rawDecode(["uint256"], Buffer.from(result, "hex"));
    return params[0];
  }

}

export class TokenCashierContract extends BasicContract{
  // to do
}


export class ValidatorContract extends BasicContract{

}

export type ContractType = "wl" | "tc" | "vc";

export class Iotube{

  protected readonly winessListContractRefs: { [index: string]: WitnessListContract } = {};
  protected readonly tokenCashierContractRefs: { [index: string]: TokenCashierContract } = {};
  protected readonly validatorContractRefs: { [index: string]: ValidatorContract } = {};

  public addContract(contractAddress: string, provider: IRpcMethod, type: ContractType){
    if(this.winessListContractRefs[contractAddress] && this.tokenCashierContractRefs[contractAddress] && this.validatorContractRefs[contractAddress]){
      console.log(`the contract for address ${contractAddress} already exists, fail to added`);
      return;
    }
    if(type === "wl"){
      this.winessListContractRefs[contractAddress] =  new WitnessListContract(contractAddress, provider);
    }else if(type === "tc"){
      this.tokenCashierContractRefs[contractAddress] = new TokenCashierContract(contractAddress, provider);
    }else if(type === "vc"){
      this.validatorContractRefs[contractAddress] = new ValidatorContract (contractAddress, provider);
    }else{
      console.warn("fail to add a contract");
    }
  }

  public async totlalNumOfWinness(): Promise<any>{
    let num = 0;
    for(let key in this.winessListContractRefs){
      num +=  await this.winessListContractRefs[key].numOfActive();
    }
    return num;
  }

  public async totalSupply(tokenAddress: string): Promise<number>{
    const token = Token.getToken(tokenAddress); 
    const supply = await token.totalSupply();
    return supply;
  }

  public async getBasicTokenInfo(tokenAddress: string): Promise<ITokenBasicInfo>{
    const token = await Token.getToken(tokenAddress);
    const basicinfo = token.getBasicTokenInfo();
    return basicinfo;
  }
}