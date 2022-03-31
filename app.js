import { getFileName, readFile, writeToDatabase } from './scripts/readFile.js';

const fileName = getFileName();

const data = await readFile(fileName);
writeToDatabase(data);