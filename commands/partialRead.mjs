import { promises as fs } from 'node:fs';
import { Logger } from '../utils/logger.mjs';

export async function partialRead(options) {
  const { input, length = 5, offset = 0 } = options;

  const file = await fs.open(input);

  try {
    const something = await file.read(
      Buffer.alloc(+length),
      0,
      +length,
      +offset
    );

    console.log(something.buffer.toString());
  } catch (e) {
    console.log(e);
    Logger.error(e);
    process.exit(0);
  } finally {
    await file.close();
  }
}
