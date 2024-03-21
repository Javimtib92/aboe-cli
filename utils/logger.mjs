import { styleText } from 'node:util';

export const Logger = {
  log(...args) {
    console.log(...args);
  },
  error(message, ...args) {
    console.error(styleText('red', message), ...args);
  },
  success(message, ...args) {
    console.log(styleText('green', message), ...args);
  },
  warn(message, ...args) {
    console.warn(styleText('yellow', message), ...args);
  },
};
