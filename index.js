
import { createJekyllPost } from "./utils.js";
import { input } from '@inquirer/prompts';


async function run() {
    const answer = await input({ message: 'Enter base post name:' });

    createJekyllPost(answer);
}

await run();

export default run;
