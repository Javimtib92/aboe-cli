import { promises as fs } from 'node:fs';
import { Logger } from '../utils/logger.mjs';

export async function partialReadCommand(options) {
  const { input, length = 5, offset = 0 } = options;

  let file;
  let error;

  try {
    file = await fs.open(input);
    Logger.log('Reading file: ', input);

    const something = await file.read(
      Buffer.alloc(+length),
      0,
      +length,
      +offset
    );

    Logger.success(something.buffer.toString());

    return something.buffer.toString();
  } catch (e) {
    Logger.error(e);
    error = true;
  } finally {
    Logger.log('Closing file... ');

    await file.close();

    Logger.log('File closed');

    process.exit(error ? 1 : 0);
  }
}
