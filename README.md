# commitlint-config-uphold

Shareable commitlint config enforcing Uphold's commit conventions.

## Status

[![npm version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]

## Motivation

This package ensures our commits follow our standard:

1. Header must not exceed 72 characters.
1. Header must start with a verb in the simple present tense (imperative mood).
1. Header must be sentence-cased, meaning it must start with an uppercase letter.
1. Header must not end with a full-stop.
1. Body must not exceed 72 characters per line.
1. Body can make use of all verb tenses.

## Installation

```sh
❯ npm i commitlint-config-uphold --save-dev
```

or with Yarn:

```sh
❯ yarn add commitlint-config-uphold --dev
```

### Usage with [commitlint](https://commitlint.js.org/)

Create `.commitlintrc.yml` with:

```yml
extends: "@uphold/commitlint-config"
```

## Verbs detection

Verbs are detected using data from [Wordnet](https://wordnet.princeton.edu/) provided by [wordnet](https://www.npmjs.com/package/wordnet) package.

> ⚠️ The detection algorithm simply checks if the first word is an english word that may be used as a verb (in the simple-present tense). It does not account if the word is actually a verb in the context of the phrase. It would be possible to detect if it's actually used as a verb by using natural language processing techniques. However, they often give bad results.

## License

[MIT](https://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/@uphold/commitlint-config.svg
[npm-url]: https://www.npmjs.com/package/@uphold/commitlint-config
[ci-image]: https://github.com/uphold/commitlint-config-uphold/actions/workflows/ci.yml/badge.svg?branch=master
[ci-url]: https://github.com/uphold/commitlint-config-uphold/actions/workflows/ci.yml
