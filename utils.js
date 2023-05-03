import { readFileSync, openSync, writeSync, close, writeFileSync, unlink } from 'node:fs';
import { getFirstLineFromFile } from './getFirstLine.js';
import { createPostDateFileName } from './create-post-date.js';

/**
 * 
 * @param {string} baseFileName
 * @returns {Promise<{fileName: string, firstLine: string, frontMatter: string}>}    
 */
async function createBasePost(baseFileName) {
    const { fileName, frontMatter } = await createPostDateFileName(baseFileName, true);

    console.log('fileName', baseFileName);

    writeFileSync(baseFileName, '', 'utf8', 'a');
    const firstLine = await getFirstLineFromFile(baseFileName);
    return { fileName, firstLine, frontMatter }
}

/**
 * 
 * @param {string} fileName 
 * @param {string} frontMatter 
 */
function insertFrontMatter(fileName, frontMatter) {
    console.log('front matter:\n', frontMatter);

    const data = readFileSync(fileName);
    const fd = openSync(fileName, 'w+');
    const insert = Buffer.from(frontMatter);
    // console.log('buffer insert front matter\n', insert.length, insert);

    writeSync(fd, insert);
    // writeSync(fd, data, 0, data.length, insert.length);
    close(fd, (err) => {
        if (err)
            throw err;
    });
}

function deleteFile(fileName) {
    unlink(fileName, (err) => {
        if (err) {
            throw err;
        }
        console.log(`${fileName} was deleted`);
    });
}

async function createJekyllPost(fileNamePart) {
    const { fileName, firstLine, frontMatter } = await createBasePost(fileNamePart);
    insertFrontMatter(fileName, frontMatter);
    deleteFile(fileNamePart);
}

export { createBasePost, createJekyllPost, deleteFile, insertFrontMatter };