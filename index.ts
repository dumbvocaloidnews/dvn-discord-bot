import { config } from 'dotenv';
import { ClusterManager } from 'discord-hybrid-sharding';

// init .env
config();

// create sharding manager
const Manager = new ClusterManager(`${__dirname}/system/main.js`, {
    totalShards: 'auto',
    token: process.env.DISCORD_TOKEN
});

Manager.on("clusterCreate", (cluster) => {
    console.log(`[CLUSTER MANAGER] Spawning cluster ${cluster.id}...`);
});

Manager.on("clusterReady", async (cluster) => {
    
    console.log(`[CLUSTER MANAGER] Cluster ${cluster.id} is now ready. Managing ${cluster.totalShards} shards.`);
});

// spawn as many shards as needed with no timeout
( async function () {
    try {
        await Manager.spawn({ timeout: -1 });
    } catch(e) {
        console.error(`[CLUSTER MANAGER] Failed to spawn cluster/shards.`);
        console.error(e.message);
    }
} )();