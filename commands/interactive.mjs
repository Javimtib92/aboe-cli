import { createReadStream } from 'fs';
import path from 'path';
import readline from 'readline/promises';

export async function interactiveCommand() {
  const file = path.join(import.meta.dirname, '../package.json');

  const fileStream = createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    console.log(line);
  });

  rl.on('close', () => {
    console.log('End of file');
  });
}
