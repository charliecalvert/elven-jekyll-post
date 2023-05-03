import { ensureFile } from 'fs-extra';
import { DateTime } from 'luxon';
import { format } from 'node:util';

async function ensureFileElf(fileName) {
    try {
        await ensureFile(fileName)
        console.log('Await Success!')
    } catch (err) {
        console.error(err)
    }
}

function formatDate(date, formatStr) {
    console.log('get day', date.getDate());
    const map = {
        mm: ('' + (date.getMonth() + 1)).padStart(2, "0"),
        dd: ('' + date.getDate()).padStart(2, "0"),
        y2: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }
    console.log('map', map);
    return formatStr.replace(/mm|dd|y2|yyyy/gi, matched => map[matched])
}

/**
 * create a file name with a date prepended to it
 * and also return Jekyll front matter
 * @param {string} fileNameBase - The core filename on which to 
 * base the dated name
 * @param {*} ensure - Create the file and be sure that it exists
 * @returns { object } return the filename and front matter 
 */
async function createPostDateFileName(fileNameBase, ensure) {
    // const fileNameBase = 'message01';
    console.log('fileNameBase', fileNameBase);

    const today = new Date();
    const fileDate = formatDate(today, 'yyyy-mm-dd');
    console.log('fileDate', fileDate);
    const fileName = format(`%s-${fileNameBase}.markdown`, fileDate);

    if (ensure) {
        await ensureFileElf(fileName)
    }

    console.log('filename  in createPostDateFileName:', fileName);

    const dt = DateTime.now();
    const placeHolder = format(`%s`,
        //dt.toLocaleString(DateTime.DATE_SHORT),
        //dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
        dt.toFormat('yyyy-MM-dd hh:mm:ss ZZZ')
    );


    console.log(placeHolder);

    const frontMatter = format(`---
layout: post
date: %s
title: %s
---
`, placeHolder, fileNameBase);

    return { fileName, frontMatter }
}

export { createPostDateFileName };