import { CommandInteraction, Message } from "discord.js";
import { DivaClient } from "./client";
import { readdir } from "fs/promises";
import { join } from 'path';

export interface CommandClass {
    new (client: DivaClient): CommandItem;
}
export interface CommandItem {
    name: string;
    description: string;
    id?: string;
    disabled?: boolean;
    execute?(interaction?: CommandInteraction | undefined, message?: Message | undefined): Promise<any>; 
}

export class CommandHandler {
    private client: DivaClient;
    private commandMap: Map<string, CommandItem>;

    constructor(client: DivaClient) {
        this.client = client;
        this.commandMap = new Map<string, CommandItem>();
    }

    async load(directory: string) {
        try {
            const files = await readdir(directory);
            for (let file of files) {
                if (!file.includes(".")) {
                    const subfiles = await readdir(join(directory, file));
                    for (let file2 of subfiles) {
                        try {
                            const c = await import(join(directory, file, file2));
                            const command = new c.default(this.client);
        
                            this.commandMap.set(command.name, command);
                        } catch(e) {
                            console.error(`[COMMAND MANAGER -- LIKELY TO SHARD DUPE] Unable to load command from ${join(file, file2)}. ${e.message}`);
                        }
                    }
                } else {
                    try {
                        const c: CommandClass = await import(join(directory, file));
                        const command = new c(this.client);
    
                        this.commandMap.set(command.name, command);
                    } catch(e) {
                        console.error(`[COMMAND MANAGER -- LIKELY TO SHARD DUPE] Unable to load command from ${file}. ${e.message}`);
                    }
                }
            }
        } catch(e) {
            console.error(`[COMMAND MANAGER -- LIKELY TO SHARD DUPE] Unable to properly load commands. ${e.message}`);

            return;
        }

    }

    async update() {
        try {
            await this.client.application.commands.set(Array.from(this.commandMap.values()));
        } catch(e) {
            console.error(`[COMMAND MANAGER -- LIKELY TO SHARD DUPE] Unable to sync commands to discord. ${e.message}`);
        }
    }

    find(commandName: string) {
        const c = this.commandMap.get(commandName);

        return c;
    }
}