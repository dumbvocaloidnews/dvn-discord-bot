import { config } from 'dotenv';
import { ClusterManager } from 'discord-hybrid-sharding';

// init .env
config();

// create sharding manager
const Manager = new ClusterManager(`${__dirname}/system/main.ts`, {
    totalShards: 'auto',
    token: process.env.DISCORD_TOKEN
});


// spawn as many shards as needed with no timeout
Manager.spawn({ timeout: -1 });