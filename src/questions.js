import inquirer from 'inquirer';

inquirer.registerPrompt('file', require('inquirer-file-path'));
inquirer.registerPrompt('number', require('inquirer-number-plus'));

let answerToProcess = {};

export function questions() {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'number',
        message: 'what are the minimums import you wanna target ?',
        name: 'minImports',
      },
    ]).then((answersStep) => {
      answerToProcess = { ...answersStep };
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
        message: `you confirm you wanna target ${answersStep.minImports}
      in that path : ‘${answersStep.to}‘ ? `,
      }]);
    }).then((answersStep) => {
      if (answersStep.confirm) {
        resolve(answerToProcess);
      } else {
        reject();
      }
    }).catch(() => reject());
  });
}

