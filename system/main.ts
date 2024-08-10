// import and create client needed to run discord bot
// bonus points for diva, yea?
import { DivaClient } from "./classes/client";

const client = new DivaClient();

// login to discord via shard
client.login(process.env.DISCORD_TOKEN)