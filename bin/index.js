#!/usr/bin/env node

const chalk = require("chalk");
var Table = require('cli-table');

const {rgbaParse, rgbParse, computeAlphaComposite, computeOverlayComposite, rgbaToHex} = require('./helpers');


const yargs = require("yargs");

const options = yargs
  .command(require('./commands/result'))
  .command(require('./commands/overlay'))
  .help()
  .argv

return;
