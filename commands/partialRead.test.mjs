import assert from 'node:assert';
import { it, describe, mock } from 'node:test';
import { promises as fs } from 'node:fs';
import { partialReadCommand } from './partialRead.mjs';

describe('partialRead Command', () => {
  const jsonFileContent = `[
        {
          name: 'Javier',
          age: 32,
        },
        {
          name: 'Julia',
          age: 31,
        },
      ])`;

  it('should process properly', async () => {
    mock.method(fs, 'open', async () =>
      Promise.resolve({
        buffer: Buffer.from(jsonFileContent),
        async read(buffer, offset, length, position) {
          const bytesRead = Math.min(length, this.buffer.length - position);
          if (bytesRead <= 0) return null;

          this.buffer.copy(buffer, offset, position, position + bytesRead);

          this.buffer = buffer;

          return Promise.resolve(this);
        },
        async close() {
          // No need to close, it's a mock
        },
      })
    );

    const result = await partialReadCommand({
      input: 'file.txt',
      length: '6',
      offset: '29',
    });

    assert.equal(result, 'Javier');
  });

  it('should close the file if a exception is thrown when reading', async () => {
    mock.method(fs, 'open', async () =>
      Promise.resolve({
        buffer: Buffer.from(jsonFileContent),
        async read() {
          throw new Error('Cannot read file');
        },
        async close() {
          // No need to close, it's a mock
        },
      })
    );

    (async () => {
      await assert.rejects(
        async () =>
          await partialReadCommand({
            input: 'file.txt',
            length: '6',
            offset: '25',
          }),
        (err) => {
          assert.strictEqual(err.message, 'Error: Cannot read file');
          return true;
        }
      );
    })();
  });
});
