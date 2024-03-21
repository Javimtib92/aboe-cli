import { Command } from 'commander';
import figlet from 'figlet';
import { json2CsvCommand } from '../commands/json2Csv.mjs';
import { partialRead } from '../commands/partialRead.mjs';

const program = new Command();

program.addHelpText(
  'before',
  figlet.textSync('Archlet CLI', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  })
);

program
  .name('archlet-cli')
  .description('CLI to some JavaScript string utilities')
  .version('1.0.0');

program
  .command('json2csv')
  .description('Converts a JSON file to CSV')
  .requiredOption(
    '-i, --input <string>',
    'specifies the input path for the file'
  )
  .option('-o, --output <string>', 'specifies the output path for the file')
  .action(json2CsvCommand);

program
  .command('partialRead')
  .description('Reads a portion of a given file')
  .requiredOption(
    '-i, --input <string>',
    'specifies the input path for the file'
  )
  .option('--length <number>', 'specifies the character count to read')
  .option(
    '--offset <number>',
    'specifies the offset from where to start reading'
  )
  .action(partialRead);

program.parse();
