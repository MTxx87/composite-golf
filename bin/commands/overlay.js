const { rgbaParse, rgbParse, computeOverlayComposite, rgbaToHex } = require('../helpers');
const chalk = require("chalk");
var Table = require('cli-table');
const error = chalk.bold.red;
const success = chalk.bold.green;

exports.command = 'overlay <backdrop> <result> [alpha]'

exports.describe = 'Compute possible overlays given backdrop and resulting color'

exports.builder = function (yargs) {
  return yargs
  .positional('backdrop', {
    describe: 'Backdrop color RGBa format',
    type: 'string',
    coerce: (arg) => {
      let parsed = rgbaParse(arg);
      if (!parsed) {
        throw new Error(error('backdrop' + ': wrong format.'));
      }
      return parsed;
    }
  })
  .positional('result', {
    describe: 'Result color RGB format',
    type: 'string',
    coerce: (arg) => {
      let parsed = rgbParse(arg);
      if (!parsed) {
        throw new Error(error('result' + ': wrong format.'));
      }
      return parsed;
    }
  })
  .option('alpha', {
    alias: 'a',
    describe: 'Number of alpha values to be taken into consideration',
    type: 'number',
    choices: [10, 100],
    default: 10
  })
}

exports.handler = function (argv) {
  let results = computeOverlayComposite(argv.backdrop, argv.result, argv.alpha);

  var table = new Table({
      head: ['Alpha', 'RGBa', 'HEX'],
  });

  for (var i=0; i<results.length; i++) {
    let color = results[i];
    var stringified = 'rgba(' + Object.values(color).join(',') + ')';
    var stringifiedHex = rgbaToHex(color);

    if (!rgbaParse(stringified)) {
      stringified = '-';
      stringifiedHex = '';
    }

    table.push(
      [
        color.alpha.toFixed(2),
        stringified,
        stringifiedHex
      ]
    )

  }

  console.log(table.toString());

}
