'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processJson = processJson;

var _fs = require('fs');

var _path = require('path');

var _checkProcess = require('./process/checkProcess');

var isDirectory = function isDirectory(source) {
  return (0, _fs.lstatSync)(source).isDirectory();
};

var processContents = function processContents(source, minImports) {
  return (0, _checkProcess.process)({ filePath: source, minImports: minImports });
};

function processJson(_ref) {
  var to = _ref.to,
      minImports = _ref.minImports;

  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, minImports).then(function () {
    return console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****');
  }); // eslint-disable-line
}