import { elfUtils } from 'elven-code';
import createDebugMessages from 'debug';
const debugCge = createDebugMessages('get-elf-code:cge');
const debug = createDebugMessages('get-elf-code');
import matter from 'gray-matter';

/**
 * Read a file and check if it has TOC code
 * Use regex to do the actual check
 * @param {string} markdown - markdown file contents as a string
 * @returns {Promise<boolean>}
 * @see hasTocCode
 * @see __tests__/CheckMarkdown-toc.test.js
 * @see __tests__/CheckMarkdown-elf.test.js
 */
function checkForToc(markdown, result) {
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    if (regexToc.test(markdown)) {
        debugCge('Has TOC code');
        result.hasTocCode = true;
    } else {
        debugCge('No TOC code');
        result.hasTocCode = false;
    }
    return result;
}

/**
 * Read a file and check if it has front matter
 * Use regex to do the actual check
 * @param {string} fileName
 * @returns {Promise<boolean>}
 * @see hasFrontMatter
 */
function checkForFrontMatter(markdown, result) {
    const regexElf = /^---/;
    // const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    if (regexElf.test(markdown)) {
        debugCge('Has ELF code');
        result.hasFrontMatter = true;
        result.frontMatter = matter(markdown).data;
    } else {
        debugCge('No ELF code');
        result.hasFrontMatter = false;
    }
    return result;
}

/**
 * Read a file and check if it has TOC code
 * Use checkForToc to do the actual check
 * @param {string} fileName
 * @returns {Promise<boolean>}
 * @see checkForToc
 * @see __tests__/CheckMarkdown-toc.test.js
 * @see __tests__/CheckMarkdown-elf.test.js
 */
async function hasTocCode(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    return result.hasTocCode;
}

/**
 * Read a file and check if it has front matter
 * Use checkForFrontMatter to do the actual check
 * @param {string} fileName
 * @returns {Promise<boolean>}
 * @see checkForFrontMatter
 * @see __tests__/CheckMarkdown-elf.test.js
 */
async function hasFrontMatter(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForFrontMatter(markdown, result);
    return result.hasFrontMatter;
}

/**
 * Read a file and check if it has front matter
 * Use checkForFrontMatter to do the actual check
 * @param {string} fileName
 * @returns {Promise<boolean>}
 * @see checkForFrontMatter
 * @see __tests__/CheckMarkdown-elf.test.js
 * @see __tests__/CheckMarkdown-toc.test.js
 */
async function getFrontMatterAndTocReport(fileName) {
    const result = {};

    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    checkForFrontMatter(markdown, result);
    result.markdown = markdown;
    return result;
}

export { getFrontMatterAndTocReport, hasFrontMatter, hasTocCode };



