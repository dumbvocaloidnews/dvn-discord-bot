import { Client } from 'discord.js';
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { DivaParser } from './parser';
import { CommandHandler } from './commands';
import axios from 'axios';

export class DivaClient extends Client {
    public cluster: ClusterClient<DivaClient>;
    public parser: DivaParser;
    private octokit: any;
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

    async getTopContributors() {

        const res = await axios.get(`https://api.github.com/repos/dumbvocaloidnews/dvn-discord-bot/contributors`, {
            headers: {
                authorization: `TOKEN ${process.env.GITHUB_ACCESS_TOKEN}`,
                accept: `application/vnd.github+json`
            }
        });

        return await res.data;
    }
}

