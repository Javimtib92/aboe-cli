import assert from 'node:assert';
import { it, describe, mock } from 'node:test';
import { promises as fs } from 'node:fs';
import { partialReadCommand } from './partialRead.mjs';

describe('partialRead Command', () => {
  it('should process properly', async () => {
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
      offset: '25',
    });

    assert.equal(result, 'Javier');
  });
});
