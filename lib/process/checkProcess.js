'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = undefined;

var _fs = require('fs');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _openurl = require('openurl');

var _openurl2 = _interopRequireDefault(_openurl);

var _loadJsonFile = require('load-json-file');

var _loadJsonFile2 = _interopRequireDefault(_loadJsonFile);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resultsTemplate = __dirname + '/../../templates/results.mtpl';

var process = exports.process = function process(_ref) {
  var filePath = _ref.filePath,
      minImports = _ref.minImports;

  return new Promise(function (resolve) {
    (0, _loadJsonFile2.default)(filePath).then(function (json) {
      var modulesTargeted = json.modules.filter(function (module) {
        return module.reasons && module.reasons.length >= minImports;
      });
      var template = (0, _fs.readFileSync)(resultsTemplate, 'utf8');
      var _tabIndex = 0;
      var currentId = '';
      var myContentBase = _mustache2.default.render(template, {
        modulesTargeted: modulesTargeted,
        minImports: minImports,
        getUsedTime: function getUsedTime() {
          return this.reasons.length;
        },
        usedIn: function usedIn() {
          return this.reasons;
        },
        tabIndex: function tabIndex() {
          if (this.id !== currentId) {
            currentId = this.id;
            _tabIndex += 1;
          }
          return _tabIndex;
        }
      });
      var app = (0, _express2.default)();

      app.get('/', function (req, res) {
        res.send(myContentBase);
      });

      app.listen(3000, function () {
        console.log('the result are now server on http://localhost:3000');
        _openurl2.default.open('http://localhost:3000');
      });

      resolve();
    });
  });
};