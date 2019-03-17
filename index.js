// console.log(
//   `%c
//  █████╗ ██╗   ██╗████████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗     █████╗ ██╗
// ██╔══██╗██║   ██║╚══██╔══╝██╗   ██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔══██╗██║
// ███████║██║   ██║   ██║   ██║   ██║██╔████╔██║███████║   ██║       ███████║██║
// ██╔══██║██║   ██║   ██║   ██║   ██║██║╚██╔╝██║██╔══██║   ██║ █████╗██╔══██║██║
// ██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║   ██║ ╚════╝██║  ██║██║
// ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝
//   `,
//   'font-family:monospace;color:#1976d2;font-size:12px;',
// );

const lines = [
  `   █████╗  ██╗   ██╗████████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗     █████╗ ██╗`,
  `  ██╔══██╗ ██║   ██║╚══██╔══╝██╗   ██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔══██╗██║`,
  `  ███████║ ██║   ██║   ██║   ██║   ██║██╔████╔██║███████║   ██║       ███████║██║`,
  `  ██╔══██║ ██║   ██║   ██║   ██║   ██║██║╚██╔╝██║██╔══██║   ██║ █████╗██╔══██║██║`,
  `  ██║  ██║ ╚██████╔╝   ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║   ██║ ╚════╝██║  ██║██║`,
  `  ╚═╝  ╚═╝  ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝`,
];

function* getLines(iterable) {
  for (l of iterable) {
    yield l;
  }
}

const replaceLine = value => {
  process.stdout.write(value + '\r');
};

const iterator = getLines(lines);

const processItem = (intervalSpeed = 10) => () => {
  return new Promise(resolve => {
    const { value, done } = iterator.next();
    if (done === true) {
      // return clearInterval(intervalId);
      return;
    }

    const startLength = 10;
    const [start, end] = [
      value.substr(0, startLength),
      value.substr(startLength + 1),
    ];

    replaceLine(start);
    const characters = getLines(end);

    let baseValue = start;
    const intervalId = setInterval(() => {
      const { value: char, done: finish } = characters.next();
      if (finish === true) {
        clearInterval(intervalId);
        process.stdout.write('\n');
        return resolve();
      }

      baseValue += char;
      replaceLine(baseValue);
    }, intervalSpeed);
  });
};

console.log('\n')
processItem()()
  .then(processItem(20))
  .then(processItem(30))
  .then(processItem(5))
  .then(processItem(12))
  .then(processItem(10));
