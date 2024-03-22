import assert from 'node:assert';
import { it, describe, mock } from 'node:test';
import { promises as fs } from 'node:fs';
import { json2CsvCommand } from './json2Csv.mjs';

describe('json2Csv Command', () => {
  it('should process properly', async () => {
    const jsonFileContent = JSON.stringify([
      {
        name: 'javier',
        age: 32,
      },
      {
        name: 'julia',
        age: 31,
      },
    ]);
    mock.method(fs, 'readFile', async () => jsonFileContent);
    mock.method(fs, 'writeFile', async () => true);

    const result = await json2CsvCommand({ input: 'file.txt' });

    assert.strictEqual(fs.readFile.mock.calls.length, 1);
    assert.strictEqual(fs.writeFile.mock.calls.length, 1);

    assert.deepStrictEqual(result, {
      file: 'file.csv',
      data: 'name,age\njavier,32\njulia,31',
    });
  });

  it("should throw an error if input file doesn't exist", async () => {
    const error = new Error('Cannot read file');
    mock.method(fs, 'readFile', async () => Promise.reject(error));

    (async () => {
      await assert.rejects(
        async () => await json2CsvCommand({ input: 'nonexistent.json' }),
        (err) => {
          assert.strictEqual(err.message, 'Error: Cannot read file');
          return true;
        }
      );
    })();
  });
});
