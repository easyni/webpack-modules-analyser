import { processStats } from './process/checkProcess';

const processContents = (source, minImports) => processStats({ filePath: source, minImports });


export function processJson({ to, minImports }) {
  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, minImports)
    .then(() => console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****')) // eslint-disable-line
    .catch(err => console.warn(err)); // eslint-disable-line
}
