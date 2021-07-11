import ETH_TOKEN_LIST from "./eth-token-list.json";
import BSC_TOKEN_LIST from "./bsc-token-list.json";
import MATIC_TOKEN_LIST from "./matic-token-list.json";
import CHINA_META from "./chain.json";

export const chainMeta = CHINA_META;

export declare type Platform = "eth"|"bsc"|"matic";

export function getPlatform(cashierAddress: string): Platform{
    switch(true){
        case cashierAddress === chainMeta.eth.cashierEth:
            return "eth";
        case cashierAddress === chainMeta.bsc.cashierBsc:
            return "bsc";
        case cashierAddress === chainMeta.matic.cashierMatic:
            return "matic";
        case cashierAddress === chainMeta.eth.cashierIotex:
            return "eth";
        case cashierAddress === chainMeta.bsc.cashierIotex:
            return "bsc";
        case cashierAddress === chainMeta.matic.cashierIotex:
            return "matic";
    }
} 

export interface ITokenConstant{
    id: string,
    address: string,
    name: string,
    decimals: number,
    symbol: string,
    logoURI: string
}

export interface ITokenList{
    [propname:string]: ITokenConstant,
}

export interface IConstant {
    [propname:string]: ITokenList

}

const Constant: IConstant = {
    eth: ETH_TOKEN_LIST,
    bsc: BSC_TOKEN_LIST, 
    matic :MATIC_TOKEN_LIST
}

export function getTokenInfo(tokenAddress: string): ITokenConstant{
    for(let i in Constant){
        for(let j in Constant[i]){
            if(Constant[i][j].address === tokenAddress){
               return Constant[i][j]
            }
        }
    }
}

export function getTokenAddressList(): string[]{
    let addressList = [];
    for(let i in Constant){
        for(let j in Constant[i]){
            addressList.push(Constant[i][j].address)
        }
    }
    return addressList;
}

export default Constant;