'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processJson = processJson;

var _checkProcess = require('./process/checkProcess');

var processContents = function processContents(source, minImports) {
  return (0, _checkProcess.processStats)({ filePath: source, minImports: minImports });
};

function processJson(_ref) {
  var to = _ref.to,
      minImports = _ref.minImports;

  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, minImports).then(function () {
    return console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****');
  }) // eslint-disable-line
  .catch(function (err) {
    return console.warn(err);
  }); // eslint-disable-line
}