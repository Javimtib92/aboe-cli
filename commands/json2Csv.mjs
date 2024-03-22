import { promises as fs } from 'node:fs';
import { Logger } from '../utils/logger.mjs';

export async function json2CsvCommand(options) {
  const { input, output } = options;

  const inputJSON = await fs.readFile(input, 'utf-8');

  const json = JSON.parse(inputJSON);

  const header = Object.keys(json[0]).join(',') + '\n';
  const rows = json.map((obj) => Object.values(obj).join(',')).join('\n');

  const csv = header + rows;

  const out = output || input.split('.')[0] + '.csv';

  await fs.writeFile(out, csv);

  Logger.success('The file has been saved!');

  return { file: out, data: csv };
}
