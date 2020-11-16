const {
  readFileSync,
  writeFileSync,
  renameSync,
  mkdirSync,
  existsSync,
} = require('fs');
const { join } = require('path');
const { argv } = require('process');

const log = require('./log');
const execSyncLocally = require('./execSyncLocally');

module.exports = function setup(targetDir) {
  log('Convert Routify starter template to Typescript.');

  // Add deps to pkg.json
  const packageJSON = JSON.parse(
    readFileSync(join(targetDir, 'package.json'), 'utf8')
  );
  packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
    'svelte-check': '^1.0.0',
    'svelte-preprocess': '^4.0.0',
    '@rollup/plugin-typescript': '^6.0.0',
    typescript: '^3.9.3',
    tslib: '^2.0.0',
    '@tsconfig/svelte': '^1.0.0',
  });

  // Add script for checking
  packageJSON.scripts = Object.assign(packageJSON.scripts, {
    validate: 'svelte-check',
  });

  // Write the package JSON
  writeFileSync(
    join(targetDir, 'package.json'),
    JSON.stringify(packageJSON, null, 3)
  );

  // mv src/main.js to main.ts - note, we need to edit rollup.config.js for this too
  const beforeMainJSPath = join(targetDir, 'src', 'main.js');
  const afterMainTSPath = join(targetDir, 'src', 'main.ts');
  renameSync(beforeMainJSPath, afterMainTSPath);

  // Switch the app.svelte file to use TS
  const appSveltePath = join(targetDir, 'src', 'App.svelte');
  let appFile = readFileSync(appSveltePath, 'utf8');
  appFile = appFile.replace('<script>', '<script lang="ts">');
  appFile = appFile.replace('export let name;', 'export let name: string;');
  writeFileSync(appSveltePath, appFile);

  // Edit rollup config
  const rollupConfigPath = join(targetDir, 'rollup.config.js');
  let rollupConfig = readFileSync(rollupConfigPath, 'utf8');

  // Edit imports
  rollupConfig = rollupConfig.replace(
    `'rollup-plugin-terser';`,
    `'rollup-plugin-terser';\nimport sveltePreprocess from 'svelte-preprocess';\nimport typescript from '@rollup/plugin-typescript';`
  );

  // Replace name of entry point
  rollupConfig = rollupConfig.replace(
    /("|'|`)src\/main\.js("|'|`)/,
    `'src/main.ts'`
  );

  // Add preprocess to the svelte config, this is tricky because there's no easy signifier.
  // Instead we look for `css:` then the next `}` and add the preprocessor to that
  let foundCSS = false;
  let match;

  // https://regex101.com/r/OtNjwo/2
  const configEditor = new RegExp(/css:.|\n*((?:\$\{[^}]*)\}|\)),\w*$/gim);
  while ((match = configEditor.exec(rollupConfig)) != null) {
    if (foundCSS) {
      const endOfCSSIndex = match.index + 1;
      rollupConfig =
        rollupConfig.slice(0, endOfCSSIndex) +
        ',\n\t\tpreprocess: sveltePreprocess()' +
        rollupConfig.slice(endOfCSSIndex);
      break;
    }
    if (match[0].includes('css:')) foundCSS = true;
  }

  // Add TypeScript
  rollupConfig = rollupConfig.replace(
    'commonjs(),',
    'commonjs(),\n\t\ttypescript({\n\t\t\tsourceMap: !production,\n\t\t\tinlineSources: !production\n\t\t}),'
  );
  writeFileSync(rollupConfigPath, rollupConfig);

  // Add TSConfig
  const tsconfig = `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"],
}`;
  const tsconfigPath = join(targetDir, 'tsconfig.json');
  writeFileSync(tsconfigPath, tsconfig);

  // Adds the extension recommendation
  mkdirSync(join(targetDir, '.vscode'));
  writeFileSync(
    join(targetDir, '.vscode', 'extensions.json'),
    `{
  "recommendations": ["svelte.svelte-vscode"]
}
`
  );

  log('Routify starter template has been converted to Typescript.');

  if (existsSync(join(targetDir, 'node_modules'))) {
    if (existsSync(join(targetDir, 'yarn.lock')))
      execSyncLocally(targetDir, `yarn install`);
    else if (existsSync(join(targetDir, 'package-lock.json')))
      execSyncLocally(targetDir, 'npm install');
    else
      console.log(
        '\nYou need to re-run your dependency manager to get started. E.g.: `npm install` or `yarn install`.'
      );
  }
};
