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

function questions() {
  return new Promise(function (resolve, reject) {
    _inquirer2.default.prompt([{
      type: 'number',
      message: 'what are the minimums import you wanna target ?',
      name: 'minImports'
    }]).then(function (answersStep) {
      answerToProcess = _extends({}, answersStep);
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
        message: 'you confirm you wanna target ' + answersStep.minImports + '\n      in that path : \u2018' + answersStep.to + '\u2018 ? '
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