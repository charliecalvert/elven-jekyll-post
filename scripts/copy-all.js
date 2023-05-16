import {
    getFrontMatterAndTocReport,
} from '../getFrontMatterAndTocReport.js';
import { walkSimple } from 'walk-directories';

const directory = process.env.GIT_HOME + '/CloudNotes/elvenware/development';
const ext = '.md';

const fileInfos = await walkSimple(directory, ext)
    .catch((error) => {
        debug('ERROR', error);
        throw new elfUtils.UserException('no infos');
    });

if (fileInfos.length === 0) {
    throw new elfUtils.UserException('We received nothing');
}

// console.log('fileInfos', fileInfos);

async function processFile(fileInfo) {
    const fm = await getFrontMatterAndTocReport(fileInfo.fullPath);
    console.log('fm', fm);
}

/* for (const fileInfo of fileInfos) {
    console.log('fileInfo', fileInfo);

} */

console.log('fileInfo', fileInfos[0]);
processFile(fileInfos[0]);