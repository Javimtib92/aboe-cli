import { styleText } from 'node:util';

export const Logger = (() => {
  const isQuiet = () => {
    return process.env.VERBOSITY === 'quiet';
  };

  const isVerbose = () => {
    return process.env.VERBOSITY === 'verbose';
  };

  return Object.freeze({
    log(...args) {
      if (isQuiet() || !isVerbose()) {
        return;
      }

      console.log(...args);
    },
    error(error, ...args) {
      console.error(styleText('red', error.stack), ...args);
    },
    success(message, ...args) {
      if (isQuiet()) {
        return;
      }
      console.log(styleText('green', message), ...args);
    },
    warn(message, ...args) {
      if (isQuiet()) {
        return;
      }
      console.warn(styleText('yellow', message), ...args);
    },
  });
})();
