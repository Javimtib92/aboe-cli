import { Command } from 'commander';
import figlet from 'figlet';
import { json2CsvCommand } from '../commands/json2Csv.mjs';
import { getVersion } from '../utils/version.mjs';
import { styleText } from 'node:util';
import { Logger } from '../utils/logger.mjs';

function actionErrorHanlder(error) {
  Logger.error(error);
}

export function actionRunner(fn) {
  return (...args) => fn(...args).catch(actionErrorHanlder);
}

const program = new Command();

program.on('option:quiet', function () {
  process.env.VERBOSITY = 'quiet';
});

program.on('option:verbose', function () {
  process.env.VERBOSITY = 'verbose';
});

program.configureOutput({
  outputError: (str, write) => write(styleText('red', str)),
});

program.addHelpText(
  'before',
  figlet.textSync('Archlet CLI', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  })
);

// node ./bin/archlet.mjs
program
  .name('archlet-cli')
  .description('CLI to some JavaScript string utilities')
  .option(
    '-q, --quiet',
    'No message needed. Users care about this mode when they don’t need to know the response. Therefore, it is not necessary to disclose any message in the output unless there is an error.'
  )
  .option(
    '-v, --verbose',
    'Logs transactions and events such as managing files.'
  )
  .version(getVersion());

// node ./bin/archlet.mjs json2csv --input example.json --output output.json --verbose
program
  .command('json2csv')
  .description('Converts a JSON file to CSV')
  .requiredOption(
    '-i, --input <string>',
    '[Required] specifies the input path for the file'
  )
  .option(
    '-o, --output <string>',
    '[Optional] specifies the output path for the file. Default is current path with the same filename'
  )
  .action(actionRunner(json2CsvCommand));

program.parseAsync();
