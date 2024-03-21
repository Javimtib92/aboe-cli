import { Command } from 'commander';
import figlet from 'figlet';
import { json2CsvCommand } from '../commands/json2Csv.mjs';
import { partialReadCommand } from '../commands/partialRead.mjs';

const program = new Command();

console.log(process.argv.slice(2));
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
  .version('1.0.0');

program.on('option:quiet', function () {
  process.env.VERBOSITY = 'quiet';
});

program.on('option:verbose', function () {
  process.env.VERBOSITY = 'verbose';
});

// node ./bin/archlet.mjs json2csv --input example.json --output output.json --verbose
program
  .command('json2csv')
  .description('Converts a JSON file to CSV')
  .requiredOption(
    '-i, --input <string>',
    'specifies the input path for the file'
  )
  .option('-o, --output <string>', 'specifies the output path for the file')
  .action(json2CsvCommand);

// node ./bin/archlet.mjs partialRead --input example.json --length 6 --offset 19 --verbose
program
  .command('partialRead')
  .description('Reads a portion of a given file')
  .requiredOption(
    '-i, --input <string>',
    'specifies the input path for the file'
  )
  .option('-l, --length <number>', 'specifies the character count to read')
  .option(
    '-o, --offset <number>',
    'specifies the offset from where to start reading'
  )
  .action(partialReadCommand);

program.parseAsync();
