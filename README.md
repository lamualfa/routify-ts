[![NPM Version](https://badgen.net/npm/v/routify-ts?color=red&icon=npm&label=version)](https://npmjs.com/package/routify-ts)
[![NPM Downloads](https://badgen.net/npm/dt/routify-ts?color=blue&label=downloads)](https://npmjs.com/package/routify-ts)
[![Github License](https://badgen.net/github/license/lamualfa/routify-ts?color=purple&label=license)](https://github.com/lamualfa/routify-ts/blob/master/LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-agnostic-pink)](https://github.com/lamualfa/routify-ts/blob/master/package.json)

# routify-ts

Use Typescript in [Routify Starter Template](https://github.com/roxiness/routify-starter).

## Important

- The script name has been changed from `setup-routify-ts` to `routify-ts`.
- This `routify-ts` script designed for [Routify Starter Template](https://github.com/roxiness/routify-starter). Not for [Svelte Template](https://github.com/sveltejs/template).
- This documentation is shown for `@sveltech/routify` version `2` and above. For versions below `2`, please visit [v1.0.0](https://github.com/lamualfa/routify-ts/tree/v1.0.0).
- Please backup your project folder before use `routify-ts convert` command. You don't need to do that for `init` command.

## Usage

We have 2 methods to add Typescript support to Routify Starter Template. You can choose whichever one suits your needs.

**Support methods:**

- [Create new Routify Starter Template from Scratch](https://github.com/lamualfa/routify-ts#Create-new-Routify-Starter-Template-from-Scratch)
- [Convert existing projects to Typescript](https://github.com/lamualfa/routify-ts#Convert-existing-projects-to-Typescript)

<hr>

### Create new Routify Starter Template from Scratch

With this method, `routify-ts` will create a Routify Starter Template and then add additional configurations for Typescript purposes.

#### Command

```bash
npx routify-ts init <project-name> [routify-init-args]
```

#### Arguments

- `project-name`: Your project name (will be used as the folder name).
- `routify-init-args`: Some arguments will be passed to `npx @sveltech/routify init` command. See [Routify Get Started](https://github.com/roxiness/routify-starter#starter-templates).

#### Example

```bash
npx routify-ts init my-routify-app
```

<hr>

### Convert existing projects to Typescript

`routify-ts` will add additional configurations for Typescript needs to an existing project.

> **Important** - Try to do backups to prevent conflicts in case of conflicts with the configuration that you have made.

#### Command

```bash
npx routify-ts convert [project-directory]
```

#### Arguments

- `project-directory`: Path to your project folder. Default: `.`(Current folder).

#### Example

```bash
npx routify-ts convert /home/me/my-routify-app
```

<hr>

## What we do

- Create new `tsconfig.json` file in root folder.
- Add `svelte-check` script & some `devDependencies` to `package.json`.
- Rename `src/main.js` to `src/main.ts`.
- Add `lang` property to `script` element in `src/App.svelte`.
- Add some plugins & configurations to `rollup.config.js` file.
- Create new `extensions.json` file in `.vscode` directory.

<hr/>

**Tested with `@roxi/routify@v2.8.5`**

<hr/>

## Related

- [routify-tailwind](https://github.com/lamualfa/routify-tailwind) - Use Tailwind CSS in Routify.
- [routify-twind](https://github.com/lamualfa/routify-twind) - Use Twind (Tailwind CSS in JS version) in Routify.
- [routify-carbon](https://github.com/lamualfa/routify-carbon) - Use IBM Carbon Framework in Routify.
