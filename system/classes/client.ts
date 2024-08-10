import { Client } from 'discord.js';
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { DivaParser } from './parser';

export class DivaClient extends Client {
    public cluster: ClusterClient<Client>;
    public parser: DivaParser;

    constructor() {
        super({
            shardCount: getInfo().TOTAL_SHARDS,
            shards: getInfo().SHARD_LIST,
            intents: 0
        });

        this.cluster = new ClusterClient(this);
        this.parser = new DivaParser(this);
    }
}

