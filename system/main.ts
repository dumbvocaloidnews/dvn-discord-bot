// import and create client needed to run discord bot
// bonus points for diva, yea?
import { ActivityType } from "discord.js";
import { DivaClient } from "./classes/client";
import { CommandItem } from "./classes/commands";

const client = new DivaClient();

client.on("ready", async (_) => {
    console.log(`[CLIENT ON SHARD UNKNOWN] Ready and serving ${_.guilds.cache.size} guilds.`);
    client.user.setActivity({
        name: "ラグトレイン",
        type: ActivityType.Listening
    });
    
    await client.commands.load(`${__dirname}/commands`);
    await client.commands.update();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command: CommandItem = client.commands.find(interaction.commandName);

    if (command.disabled) return await interaction.reply({ ephemeral: true, content: `\`/${interaction.commandName}\` has been disabled for the time being. For more information as to why, please join the community server and open a support ticket.`});

    return await command.execute(interaction);
});

// login to discord via shard
client.login(process.env.DISCORD_TOKEN)