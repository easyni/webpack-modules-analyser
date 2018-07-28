import { readFileSync } from 'fs';
import express from 'express';
import openurl from 'openurl';
import loadJsonFile from 'load-json-file';
import Mustache from 'mustache';

const arv = require('minimist')(process.argv.slice(2));

const resultsTemplate = `${__dirname}/../../templates/results.mtpl`;

const formatReasons = (reasons) => {
  const reformatedReason = [];
  reasons.forEach((reason) => {
    const indexOfFindedModule =
      reformatedReason.findIndex(module => module.moduleId === reason.moduleId);
    if (indexOfFindedModule < 0) {
      reformatedReason.push({ moduleName: reason.moduleName, moduleId: reason.moduleId, used: 1 });
    } else {
      reformatedReason[indexOfFindedModule].used += 1;
    }
  });
  return reformatedReason;
};

const reformatModules =
  modules => modules.map(module => ({ ...module, reasons: formatReasons(module.reasons) }));

export const processStats = ({ filePath, minImports }) => new Promise((resolve) => {
  loadJsonFile(filePath).then((json) => {
    const formatedModule = reformatModules(json.modules);
    const { ignore } = arv;
    const formatedRegExp = (ignore && `^(?!.*(${ignore.replace(',', '|')})).*$`) || '^.*$';
    const modulesTargeted = formatedModule.filter(module => `${module.name}`.match(new RegExp(formatedRegExp, 'gi')) && module.reasons && module.reasons.length >= minImports);
    const template = readFileSync(resultsTemplate, 'utf8');
    let tabIndex = 0;
    let currentId = '';
    const myContentBase = Mustache.render(template, {
      modulesTargeted,
      minImports,
      getUsedTime() {
        return this.reasons.length;
      },
      usedIn() {
        return this.reasons;
      },
      tabIndex() {
        if (this.id !== currentId) {
          currentId = this.id;
          tabIndex += 1;
        }
        return tabIndex;
      },
    });
    const app = express();

    app.get('/', (req, res) => {
      res.send(myContentBase);
    });

    app.listen(3000, () => {
      console.log('the result are now server on http://localhost:3000'); // eslint-disable-line
      openurl.open('http://localhost:3000');
    });

    resolve();
  });
});
