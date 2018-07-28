'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.questions = questions;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_inquirer2.default.registerPrompt('file', require('inquirer-file-path'));
_inquirer2.default.registerPrompt('number', require('inquirer-number-plus'));

var answerToProcess = {};

var testIsANumber = function testIsANumber(str) {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

function questions() {
  return new Promise(function (resolve, reject) {
    _inquirer2.default.prompt([{
      type: 'input',
      message: 'what are the minimums import you wanna target ? [number]',
      name: 'minImports',
      default: 1
    }]).then(function (answersStep) {
      answerToProcess = _extends({}, answersStep);
      if (!testIsANumber(answersStep.minImports)) {
        console.log('\x1b[31m%s\x1b[0m', 'you have to put an integer '); // eslint-disable-line
        return Promise.reject();
      }
      return _inquirer2.default.prompt([{
        type: 'file',
        name: 'to',
        message: 'what‘s the stats json you wanna target ?',
        basePath: './',
        ext: '.json'
      }]);
    }).then(function (answersStep) {
      answerToProcess = _extends({}, answerToProcess, answersStep);
      return _inquirer2.default.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'you confirm you wanna target ' + answerToProcess.minImports + ' times minimums import \n      in that path : \u2018' + answerToProcess.to + '\u2018 ? '
      }]);
    }).then(function (answersStep) {
      if (answersStep.confirm) {
        resolve(answerToProcess);
      } else {
        reject();
      }
    }).catch(function () {
      return reject();
    });
  });
}