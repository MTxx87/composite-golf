const { rgbaParse, computeAlphaComposite, rgbaToHex } = require('../helpers');
const chalk = require("chalk");
const error = chalk.bold.red;
const success = chalk.bold.green;

const  validate = (arg, param) => {
  let parsed = rgbaParse(arg);
  if (!parsed) {
    throw new Error(error(param + ': wrong format.'));
  }
  return parsed;
}

exports.command = 'result <backdrop> <overlay>'

exports.describe = 'Compute composite color given backdrop and overlay'

exports.builder = function (yargs) {
  return yargs
  .positional('backdrop', {
    describe: 'Backdrop color RGBa format',
    type: 'string',
    coerce: (arg) => {
      return validate(arg, 'backdrop')
    }
  })
  .positional('overlay', {
    describe: 'Overlay color RGBa format',
    type: 'string',
    coerce: (arg) => {
      return validate(arg, 'overlay')
    }
  })
}

exports.handler = function (argv) {
  let backdropColor = argv.backdrop;
  let overlayColor =  argv.overlay;
  let compositeColor = computeAlphaComposite(backdropColor, overlayColor);
  let stringified = 'Resulting color: rgba(' + Object.values(compositeColor).join(',') + ')' + ' ' + rgbaToHex(compositeColor);
  console.log(success(stringified));
}
