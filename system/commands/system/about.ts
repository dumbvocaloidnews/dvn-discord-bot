import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { DivaClient } from "../../classes/client";
import { CommandClass, CommandItem } from "../../classes/commands";

export default class AboutCommand {
    public name: string;
    public description: string;
    private client: DivaClient;

    constructor(client: DivaClient) {
        this.name = "about";
        this.description = "Provides some basic information about the bot and what it does.";  
        this.client = client;      
    }

    async execute(interaction?: CommandInteraction | undefined, message?: Message | undefined): Promise<any> {
        const base = interaction || message;

        const RSSCHECK = (await this.client.parser.parseSubredditCommunity()).error;

        const InformationEmbed = new EmbedBuilder()
            .setTitle("Oh, woah!")
            .setDescription(`A new project appears before your eyes!\nI'm \`name\`, the discord bot behind \`Dumb Vocaloid News\`!\nI usually provide updates to what may be happening in the vast world of VOCALOID, however, I'm not quite there yet to provide ALL of the updates. I will be soon though!\n\nIf you'd like to contribute to my future -- which would be greatly appreaciated -- and even be credited for it, why not take a look at [my source code](https://github.com/dumbvocaloidnews/dvn-discord-bot)?\n\n-# Made by [@dumbspacepupper on Discord | @dumbspacedog on GitHub] with 💘`)
            .addFields([{ name: "Technical Information", value: `CLUSTERING STATUS: ${this.client.cluster.ids.length} -- OK\nMEMORY USAGE: N/A -- OK\nRSS STATUS: ${RSSCHECK ? "NOT OK" : "OK"}`}])
            .setColor("White")
            .setTimestamp();

        return await base.reply({ embeds: [InformationEmbed] });
    }
}