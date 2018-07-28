import inquirer from 'inquirer';

inquirer.registerPrompt('file', require('inquirer-file-path'));
inquirer.registerPrompt('number', require('inquirer-number-plus'));

let answerToProcess = {};

const testIsANumber = (str) => {
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export function questions() {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        message: 'what are the minimums import you wanna target ? [number]',
        name: 'minImports',
        default: 1,
      },
    ]).then((answersStep) => {
      answerToProcess = { ...answersStep };
      if (!testIsANumber(answersStep.minImports)) {
        console.log('\x1b[31m%s\x1b[0m', 'you have to put an integer '); // eslint-disable-line
        return Promise.reject();
      }
      return inquirer.prompt([{
        type: 'file',
        name: 'to',
        message: 'what‘s the stats json you wanna target ?',
        basePath: './',
        ext: '.json',
      }]);
    }).then((answersStep) => {
      answerToProcess = { ...answerToProcess, ...answersStep };
      return inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `you confirm you wanna target ${answerToProcess.minImports} times minimums import 
      in that path : ‘${answerToProcess.to}‘ ? `,
      }]);
    }).then((answersStep) => {
      if (answersStep.confirm) {
        resolve(answerToProcess);
      } else {
        reject();
      }
    })
      .catch(() => reject());
  });
}

