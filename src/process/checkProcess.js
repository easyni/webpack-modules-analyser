import { existsSync, readFileSync, writeFile } from 'fs';
import express from 'express';
import openurl from 'openurl';
import loadJsonFile from 'load-json-file';
import Mustache from 'mustache';

const arv = require('minimist')(process.argv.slice(2));
const resultsTemplate = `${__dirname}/../../templates/results.mtpl`;

const formatReasons = (reasons) => {
  const reformatedReason = [];
  reasons.forEach((reason) => {
    const indexOfFindedModule  = reformatedReason.findIndex((module) => module.moduleId === reason.moduleId);
    if(indexOfFindedModule < 0) {
      reformatedReason.push({moduleId: reason.moduleId, used: 1})
    } else {
      reformatedReason[indexOfFindedModule].used += 1
    }
  });
  return reformatedReason
};

const reformatModules = (modules) => {
  return modules.map((module) => {
    return {...module, reasons: formatReasons(module.reasons)};
  })
};

export const processStats = ({ filePath, minImports }) => {
  return new Promise((resolve) => {
    loadJsonFile(filePath).then((json) => {
      const formatedModule = reformatModules(json.modules);
      const { ignore } = arv;
      const formatedRegExp = (ignore && `^(?!.*(${ignore.replace(',', '|')})).*$`) || '^.*$`';
      const modulesTargeted = formatedModule.filter((module) => `${module.id}`.match(new RegExp(formatedRegExp, 'gi')) && module.reasons && module.reasons.length >= minImports);
      const template = readFileSync(resultsTemplate, 'utf8');
      let tabIndex = 0;
      let currentId = '';
      const myContentBase = Mustache.render(template, {
        modulesTargeted,
        minImports,
        getUsedTime: function () {
          return this.reasons.length;
        },
        usedIn: function () {
          return this.reasons;
        },
        tabIndex: function() {
          if(this.id !== currentId) {
            currentId = this.id;
            tabIndex += 1;
          }
          return tabIndex
        }
      });
      const app = express();

      app.get('/', function (req, res) {
        res.send(myContentBase)
      });

      app.listen(3000, function () {
        console.log('the result are now server on http://localhost:3000');
        openurl.open('http://localhost:3000');
      });

      resolve();
    });
  });
};
