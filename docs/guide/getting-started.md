# Getting Started

[[toc]]

## Install

::: tip Test Validan with RunKit
Want to try Validan without installing it in Node.js: [https://runkit.com/npm/validan](https://runkit.com/npm/validan)
:::

To install Validan using npm:

```sh:no-line-numbers
npm install validan
```

Want to use other `package manager` ?

:::: code-group
::: code-group-item yarn

```bash:no-line-numbers
yarn add validan
```

:::
::: code-group-item pnpm

```bash:no-line-numbers
pnpm add validan
```

:::
::::

## Usage

Validan is the default exported object which contains all the utilities

### Import Validan

#### CommonJs

```js:no-line-numbers
const validan = require("validan");
```

#### ES6 Module

```js:no-line-numbers
import validan from "validan";
```

### Import Utilities

#### CommonJs

```js:no-line-numbers
const { typeOf } = require("validan"); // or
const typeOf  = require("validan/dist/typeof");
```

#### ES6 Module

```js:no-line-numbers
import { typeOf } from "validan"; // or
import typeOf from "validan/dist/typeof";
```
