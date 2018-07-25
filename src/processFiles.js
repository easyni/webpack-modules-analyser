import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { process } from './process/checkProcess'

const isDirectory = source => lstatSync(source).isDirectory();

const processContents = (source, minImports) => {
  return process({ filePath: source,  minImports });
};


export function processJson({ to, minImports }) {
  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, minImports)
    .then(() => console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****')); // eslint-disable-line
}
