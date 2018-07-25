import { existsSync, readFileSync, writeFile } from 'fs';
import express from 'express';
import openurl from 'openurl';
import loadJsonFile from 'load-json-file';
import Mustache from 'mustache';

const resultsTemplate = `${__dirname}/../../templates/results.mtpl`;


export const process = ({ filePath, minImports }) => {
  return new Promise((resolve) => {
    loadJsonFile(filePath).then((json) => {
      const modulesTargeted = json.modules.filter((module) => module.reasons && module.reasons.length >= minImports);
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
