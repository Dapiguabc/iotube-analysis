import { 
    IStreamLogsRequest, 
    ILogsFilter, 
    ITopics, 
    IGetLogsRequest, 
    IGetLogsByBlock,
    IGetLogsByRange
} from "iotex-antenna/lib/rpc-method/types";

export class Topics implements ITopics{
    public topic: Array<Buffer>
    constructor(topic: string){
        this.topic = [];
        this.topic.push(Buffer.from(topic, "hex"));
    }
}

export class LogsFilter implements ILogsFilter{
    public address: Array<string>;
    public topics: Array<Topics>;
    constructor(){
        this.address = [];
        this.topics = [];
    }
}

export class GetLogsByBlock implements IGetLogsByBlock{
    blockHash: Buffer
    constructor(blockHash: string){
        this.blockHash = Buffer.from(blockHash, "hex");
    }
}

export class GetLogsRequest implements IGetLogsRequest{
    public filter: LogsFilter;
    public byBlock: GetLogsByBlock;
    public byRange: IGetLogsByRange;
}

export class StreamLogsRequest implements IStreamLogsRequest{
    public filter: LogsFilter
}

