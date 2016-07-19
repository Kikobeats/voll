<h1 align="center">
  <img src="logo.png" alt="voll" width="200">
  <br>
  Boolean expressions evaluator.
  <br>
  <br>
</h1>

<p align="center">
  <img src="https://img.shields.io/github/tag/Kikobeats/voll.svg?style=flat-square" alt="Last version"> <a href="https://travis-ci.org/Kikobeats/voll"><img src="http://img.shields.io/travis/Kikobeats/voll/master.svg?style=flat-square" alt="Build Status"></a> <a href="https://coveralls.io/github/Kikobeats/voll"><img src="https://img.shields.io/coveralls/Kikobeats/voll.svg?style=flat-square" alt="Coverage Status"></a> <a href="https://paypal.me/kikobeats"><img src="https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square" alt="Donate"></a><br><a href="https://david-dm.org/Kikobeats/voll"><img src="http://img.shields.io/david/Kikobeats/voll.svg?style=flat-square" alt="Dependency status"></a> <a href="https://david-dm.org/Kikobeats/voll#info=devDependencies"><img src="http://img.shields.io/david/dev/Kikobeats/voll.svg?style=flat-square" alt="Dev Dependencies Status"></a> <a href="https://www.npmjs.org/package/voll"><img src="http://img.shields.io/npm/dm/voll.svg?style=flat-square" alt="NPM Status"></a>
</p>

**voll** is based mayority [bool](https://www.npmjs.com/package/bool) but improved in some aspects:

- Insensitive comparison support.
- Detect words based on unicode ranges.
- Caching level for speed up AST evaluation.
- Detect quotes words using scape quotes (`'` or `"`) for exact matches.
- Operators alias (example: `red+yellow` means the same than `red OR yellow`).

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

Enable/Disable insensitive comparison.

##### cache

Type: `boolean`
Default: `true`

Enable/Disable caching.

##### cacheOpts

Type: `object`

Provide specific cache options. See [mem#options](https://github.com/sindresorhus/mem#options).

## License

Icon made by [Darius Dan](http://www.flaticon.com/free-icon/browser_173659) from [flaticon](http://www.flaticon.com/).

MIT © [Kiko Beats](https://github.com/Kikobeats)
