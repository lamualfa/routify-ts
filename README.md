[![NPM Version](https://badgen.net/npm/v/setup-routify-ts?color=red&icon=npm&label=version&cache=300)](https://npmjs.com/package/setup-routify-ts)
[![Github License](https://badgen.net/github/license/lamualfa/setup-routify-ts?color=purple&label=license&cache=300)](https://github.com/lamualfa/setup-routify-ts/blob/master/LICENSE)

# setup-routify-ts

Use Typescript in [Routify Starter Template](https://github.com/roxiness/routify-starter).

## Usage

We have 2 methods to add Typescript support to Routify Starter Template. You can choose whichever one suits your needs.

**Support methods:**

- [Create new Routify Starter Template from Scratch](#Create-new-Routify-Starter-Template-from-Scratch)
- [Convert existing projects to Typescript](#Convert-existing-projects-to-Typescript)

<hr>

### Create new Routify Starter Template from Scratch

With this method, `setup-routify-ts` will create a Routify Starter Template and then add additional configurations for Typescript purposes.

#### Command

```bash
npx setup-routify-ts init <project-name> [routify-init-args]
```

#### Arguments

- `project-name`: Your project name (will be used as the folder name).
- `routify-init-args`: Some arguments will be passed to `npx @sveltech/routify init` command. See [Routify Get Started](https://github.com/roxiness/routify-starter#starter-templates).

#### Example

```bash
npx setup-routify-ts init my-routify-app
```

<hr>

### Convert existing projects to Typescript

`setup-routify-ts` will add additional configurations for Typescript needs to an existing project.

> Try to do backups to prevent conflicts in case of conflicts with the configuration that you have made.

#### Command

```bash
npx setup-routify-ts convert [project-directory]
```

#### Arguments

- `project-directory`: Path to your project folder. Default: `.`(Current folder).

#### Example

```bash
npx setup-routify-ts convert /home/me/my-routify-app
```

<hr>

## What we do

- Create new `tsconfig.json` file in root folder.
- Add `svelte-check` script & some `devDependencies` to `package.json`.
- Rename `src/main.js` to `src/main.ts`.
- Add `lang` property to `script` element in `src/App.svelte`.
- Add some plugins & configurations to `scripts/base.config.js`.
- Create new `extensions.json` file in `.vscode` directory.

## Note

**Routify repository:**

> Routify is a work in progress. Since v1.5 we have a stable release. But this is a relatively young project. You can expect it to evolve.

Since [Routify](https://github.com/roxiness/routify) is in the progress, a lot of changes are likely to occur. If you find an error or something that is not updated, please inform us in the [Issues](https://github.com/lamualfa/setup-routify-ts/issues/new) section or fix it yourself by creating a new Pull Request.

<hr/>

**Tested with `@sveltech/routify@v1.9.9`**
