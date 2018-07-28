'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processStats = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var arv = require('minimist')(process.argv.slice(2));
console.log(arv);
var resultsTemplate = __dirname + '/../../templates/results.mtpl';

var formatReasons = function formatReasons(reasons) {
  var reformatedReason = [];
  reasons.forEach(function (reason) {
    var indexOfFindedModule = reformatedReason.findIndex(function (module) {
      return module.moduleId === reason.moduleId;
    });
    if (indexOfFindedModule < 0) {
      reformatedReason.push({ moduleName: reason.moduleName, moduleId: reason.moduleId, used: 1 });
    } else {
      reformatedReason[indexOfFindedModule].used += 1;
    }
  });
  return reformatedReason;
};

var reformatModules = function reformatModules(modules) {
  return modules.map(function (module) {
    return _extends({}, module, { reasons: formatReasons(module.reasons) });
  });
};

var processStats = exports.processStats = function processStats(_ref) {
  var filePath = _ref.filePath,
      minImports = _ref.minImports;
  return new Promise(function (resolve) {
    (0, _loadJsonFile2.default)(filePath).then(function (json) {
      var formatedModule = reformatModules(json.modules);
      var ignore = arv.ignore;

      var formatedRegExp = ignore && '^(?!.*(' + ignore.replace(',', '|') + ')).*$' || '^.*$';
      var modulesTargeted = formatedModule.filter(function (module) {
        return ('' + module.name).match(new RegExp(formatedRegExp, 'gi')) && module.reasons && module.reasons.length >= minImports;
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
        console.log('the result are now server on http://localhost:3000'); // eslint-disable-line
        _openurl2.default.open('http://localhost:3000');
      });

      resolve();
    });
  });
};