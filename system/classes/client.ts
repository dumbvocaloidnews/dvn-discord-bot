import { Client } from 'discord.js';
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { DivaParser } from './parser';
import { CommandHandler } from './commands';

export class DivaClient extends Client {
    public cluster: ClusterClient<DivaClient>;
    public parser: DivaParser;
    public commands: CommandHandler;

    constructor() {
        super({
            shardCount: getInfo().TOTAL_SHARDS,
            shards: getInfo().SHARD_LIST,
            intents: 0
        });

        this.cluster = new ClusterClient(this);
        this.parser = new DivaParser(this);
        this.commands = new CommandHandler(this);
    }
}

