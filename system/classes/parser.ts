import Parser from 'rss-parser';
import { DivaClient } from './client';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const HTMLParser = new NodeHtmlMarkdown();
const ParseClient = new Parser();

export class DivaParser {
    private client: DivaClient | undefined;

    constructor(client?: DivaClient) {
        this.client = client;
    }

    async parseSubredditCommunity(communityName?: string) {
        if (!communityName) communityName = "hatsunemiku";
        try {
            console.debug(`getting feed for https://reddit.com/r/${communityName}.rss`);
            const parsedFeed = await ParseClient.parseURL(`https://reddit.com/r/${communityName}.rss`);
            
            const sanitizedFeed = parsedFeed.items.map((value) => {
                return {
                    ...value,
                    content: this.parseAsMarkdown(value.content)
                }
            });
            return {
                ...sanitizedFeed,
                error: false
            }
        } catch(error: unknown) {
            const e = error as Error;
            return {
                error: true,
                message: e.message,
                stack: e.stack
            }
        }
    }

    private parseAsMarkdown(input?: string) {
        if (!input) input = "";
        return HTMLParser.translate(input);
    }
}