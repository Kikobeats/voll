# voll

![Last version](https://img.shields.io/github/tag/Kikobeats/voll.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/voll/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/voll)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/voll.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/voll)
[![Dependency status](https://img.shields.io/david/Kikobeats/voll.svg?style=flat-square)](https://david-dm.org/Kikobeats/voll)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/voll.svg?style=flat-square)](https://david-dm.org/Kikobeats/voll#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/voll.svg?style=flat-square)](https://www.npmjs.org/package/voll)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Boolean expressions evaluator.

voll is based mayority [bool](https://www.npmjs.com/package/bool) but improved in some aspects:

- Add insensitive comparison support.
- Detect words based on unicode ranges.
- Detect quotes words using scape quotes (`'` or `"`) for exact matches.
- Add operators alias (example: `red+yellow`).

## Install

```bash
$ npm install voll --save
```

## Usage

```js
var voll = require('voll')
var test = voll('(red OR blue) AND (orange OR yellow)')

test('red') //=> false
test('yellow') //=> false
test('red yellow') //=> true
```

## Operators

| Operator | Alias       |
|----------|-------------|
| `AND`    |             |
| `OR`     | `+`         |
| `NOT`    | `-`         |

## API

### voll(expr, [options])

#### expr

*Required*
Type: `string`

Boolean expression to be evaluated.

#### options
Type: `object`

Provide specific parser options

##### insensitive

Type: `boolean`
Default: `false`

Enable insensitive comparison.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats)
