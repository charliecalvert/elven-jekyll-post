
import { createJekyllPost } from "./utils.js";
import { input } from '@inquirer/prompts';


async function run() {
    console.log("index run called");
    const answer = await input({ message: 'Enter base post name:' });

    createJekyllPost(answer);
}

// await run();

export default run;
