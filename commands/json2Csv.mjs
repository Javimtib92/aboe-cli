import { promises as fs } from 'node:fs';
import { Logger } from '../utils/logger.mjs';

export async function json2CsvCommand(options) {
  const { input, output } = options;

  const inputJSON = await fs.readFile(input, 'utf-8');
  const json = JSON.parse(inputJSON);

  const allKeysSet = new Set();

  for (let i = 0; i < json.length; i++) {
    Object.keys(json[i]).forEach((key) => allKeysSet.add(key));
  }

  const allKeys = [...allKeysSet];

  const rows = json
    .map((obj) => allKeys.map((key) => obj[key] || '').join(','))
    .join('\n');

  const header = allKeys.join(',') + '\n';
  const csv = header + rows;

  const out = output || input.split('.')[0] + '.csv';

  await fs.writeFile(out, csv);

  Logger.success('The file has been saved!');

  return { file: out, data: csv };
}
