// import the parser client that i made
import { DivaParser } from "../system/classes/parser";

( async function() {
    // create a new instance of the parser client
    const _ = new DivaParser();

    // send a request to [reddit] and wait for the response back from [reddit] for the rss feed from [hatsunemiku]
    const p = await _.parseSubredditCommunity();

    // log output to terminal
    console.log(p);
} )(); 