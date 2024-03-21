import { styleText } from 'node:util';

export const Logger = {
  log(...args) {
    if (this.isQuiet() || !this.isVerbose()) {
      return;
    }

    console.log(...args);
  },
  error(error, ...args) {
    console.error(styleText('red', error.stack), ...args);
  },
  success(message, ...args) {
    if (this.isQuiet()) {
      return;
    }
    console.log(styleText('green', message), ...args);
  },
  warn(message, ...args) {
    if (this.isQuiet()) {
      return;
    }
    console.warn(styleText('yellow', message), ...args);
  },
  isQuiet() {
    return process.env.VERBOSITY === 'quiet';
  },
  isVerbose() {
    return process.env.VERBOSITY === 'verbose';
  },
};
