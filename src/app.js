import { questions } from './questions';
import { processJson } from './processFiles';

function startApp() {
  questions()
    .then((answers) => {
      processJson(answers);
    }).catch((error) => {
      if (error) {
        throw error;
      }
      startApp();
    });
}

startApp();
