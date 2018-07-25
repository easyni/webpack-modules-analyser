'use strict';

var _questions = require('./questions');

var _processFiles = require('./processFiles');

function startApp() {
  (0, _questions.questions)().then(function (answers) {
    (0, _processFiles.processJson)(answers);
  }).catch(function (error) {
    if (error) {
      throw error;
    }
    startApp();
  });
}

startApp();