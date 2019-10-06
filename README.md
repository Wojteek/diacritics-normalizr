# diacritics-normalizr <!-- omit in toc -->
[![Coverage Status](https://coveralls.io/repos/github/Wojteek/diacritics-normalizr/badge.svg?branch=master)](https://coveralls.io/github/Wojteek/diacritics-normalizr?branch=master)

> It's a simple library for removing diacritics/accents from a string.

- [Installation](#installation)
- [API](#api)
    - [normalizeSync(text: string): string](#normalizesynctext-string-string)
    - [normalize(text: string): Promise\<string\>](#normalizetext-string-promisestring)
    - [diacritics: Diacritics<number, string>](#diacritics-diacriticsnumber-string)
- [CommonJS](#commonjs)
- [TypeScript](#typescript)

## Installation

via yarn:
```bash
yarn add diacritics-normalizr
```

via npm:
```bash
npm install diacritics-normalizr
```

## API

#### normalizeSync(text: string): string

This method transforms the passed string to version without any diacritics.

Example:
```ts
import { normalizeSync } from 'diacritics-normalizr';

console.log(normalizeSync('ęóń'));
// eon
```

#### normalize(text: string): Promise\<string\>

The asynchronous version of [normalizeSync()](#normalizesynctext-string-string) function.

Example:
```ts
import { normalize } from 'diacritics-normalizr';

(async () => {
  console.log(await normalize('it is á téšt óf this fûňctióñ'));
  // it is a test of this function
})();
```

_Note: it uses `async/await` API so keep in your mind that you may need to adjust your an environment for using it._

#### diacritics: Diacritics<number, string>

It exports a map of all diacritics. The structure of this map contains the Unicode value of the character (as key) and the base letter (as value).

```ts
new Map([
  // Ą
  [260, 'A'],
  // ñ
  [241, 'n'],
]) as Diacritics<number, string>;
```

See the list of the all [diacritics.json](./src/diacritics.json)

If you need to add/update/remove some diacritics you should use the API of `Map` and it must implement the `Diacritics` interface.

e.g. usage with adding a new _"diacritic"_:
```ts
import { normalize, diacritics } from 'diacritics-normalizr';

(async () => {
  // 119 - the Unicode value of the character - in this case it's: w
  // vv - base letter
  diacritics.set(119, 'vv');
  console.log(await normalize('It works!'));
  // It vvorks!
})();
```

## CommonJS

If you want to use this library in Node.js you can import the package via `require`.

```js
const { normalize } = require('diacritics-normalizr');
```

## TypeScript

This library is written in TypeScript. Types are automatically generated in build process and these types are being included in the package so you'll access to types after downloading the package.
