![aboe CLI terminal](/docs/images/hero.png)


<p align="center">
	<h1 align="center"><b>aboe-cli </b></h1>
</p>

<p align="center">
    aboe-cli (A bit of everything CLI) is a multi-purpose CLI with a set of handful utility commands for day-to-day tasks.
    <br />
    <br />
</p>

[![Latest version](https://img.shields.io/npm/v/aboe-cli.svg?style=flat&label=npm%20package&color=%234B78E6&logo=&logoColor=white)](https://www.npmjs.com/package/aboe-cli)


## Installation

To install aboe-cli, ensure you have at least Node.js version `21.7.1` installed on your system. You can use nvm (Node Version Manager) to manage Node.js versions. The required Node.js version is enforced by the provided .nvmrc file.

```bash
# Install aboe-cli globally using npm
npm install -g aboe-cli
```

## Usage

After installation, you can use aboe-cli from the command line. Here are some basic usage examples:

```bash
# Display help and list available commands
aboe --help

# Run a specific utility command
aboe json2csv [options]
```

## Global Options

### `-q, --quiet`

This option enables quiet mode, where no message is displayed in the output unless there is an error. Users might prefer this mode when they don't need to see responses for every action performed by the tool.

### `-v, --verbose`

The verbose option enables detailed logging of transactions and events, such as managing files. It provides more insights into the operations performed by *aboe-cli*, which can be useful for debugging or understanding the tool's behavior.

## Available Commands

### 1. json2Csv

This command is used to convert JSON data into CSV format.

```bash
# Usage example of json2csv
aboe json2csv -i input.json -o output/output.json
```

Options:

- -i --input: Specifies the input JSON file that you want to convert to CSV.
- -o --output: Specifies the output file path and name for the resulting CSV file.

## Testing

aboe-cli is tested using [Node.js Test Runner](https://nodejs.org/api/test.html#test-runner) to keep things dependency-free.

## Contributing

Contributions to aboe-cli are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue on the GitHub repository. Additionally, if you'd like to contribute code, feel free to submit a pull request

## License
This project is licensed under the MIT License, which means you are free to use, modify, and distribute the software as long as the original license and copyright notice are included.