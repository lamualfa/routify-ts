#!/usr/bin/env node

const { resolve, join } = require('path');
const { unlinkSync, existsSync, mkdirSync, readdirSync } = require('fs');

const log = require('./helpers/log');
const execSyncLocally = require('./helpers/execSyncLocally');
const setupTypescript = require('./helpers/setupTypescript');

const Commands = {
  help: 'help',
  init: 'init',
  convert: 'convert',
};
const defaultCommand = Commands.init;
const execCommand = process.argv[2] || defaultCommand;
const additionalArgs = process.argv.slice(3);

if (execCommand === Commands.help) {
  console.log('Available commands:', '\n');
  console.log(
    '`init`',
    ':',
    'Create new Routify starter template with Typescript support.'
  );
  console.log(
    '`convert`',
    ':',
    'Add Typescript support for the existing Routify starter template.'
  );
} else {
  const targetDir = additionalArgs[0]
    ? resolve(process.cwd(), additionalArgs[0])
    : process.cwd();

  if (execCommand === Commands.init) {
    if (existsSync(targetDir)) {
      if (readdirSync(targetDir).length) {
        console.error(
          'Target directory is not empty. Please use `setup-routify-ts convert #{targetDir}` instead.'
        );
        process.exit();
      }
    } else mkdirSync(targetDir);

    log(
      "Preparing base Routify starter template. May take a few minutes. Please wait a moment."
    );
    execSyncLocally(
      targetDir,
      `npx @sveltech/routify init${
        additionalArgs.length > 1 ? additionalArgs.slice(1).join(' ') : ''
      }`
    );

    // Delete package-lock.json
    unlinkSync(join(targetDir, 'package-lock.json'));
  }

  setupTypescript(targetDir);
}
