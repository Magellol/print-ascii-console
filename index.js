const chalk = require('chalk');

const AUTOMAT_BLUE = '#32B3DB';

const toPrint = [
  `=================================================================================`,
  `   █████╗  ██╗   ██╗████████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗     █████╗ ██╗`,
  `  ██╔══██╗ ██║   ██║╚══██╔══╝██╗   ██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔══██╗██║`,
  `  ███████║ ██║   ██║   ██║   ██║   ██║██╔████╔██║███████║   ██║       ███████║██║`,
  `  ██╔══██║ ██║   ██║   ██║   ██║   ██║██║╚██╔╝██║██╔══██║   ██║ █████╗██╔══██║██║`,
  `  ██║  ██║ ╚██████╔╝   ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║   ██║ ╚════╝██║  ██║██║`,
  `  ╚═╝  ╚═╝  ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝`,
  `=================================================================================`,
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function* createIterator(iterable) {
  for (const i of iterable) {
    yield i;
  }
}

function createIntervalP(iterator, fn, interval) {
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      const { value, done } = iterator.next();

      if (done) {
        clearInterval(intervalId);
        return resolve();
      }

      fn(value);
    }, interval);
  });
}

function createLogger(shouldPrintNewLine) {
  const accumulated = [];

  return value => {
    accumulated.push(value);
    process.stdout.write(
      chalk.hex(AUTOMAT_BLUE).bgBlack(accumulated.join('')) + '\r',
    );
    if (shouldPrintNewLine(accumulated)) {
      process.stdout.write('\n');
    }
  };
}

async function run(lines) {
  for (const line of lines) {
    await createIntervalP(
      createIterator(line),
      createLogger(acc => acc.length === line.length),
      getRandomInt(25),
    );
  }
}

run(toPrint);
