# voll

![Last version](https://img.shields.io/github/tag/Kikobeats/voll.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/voll/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/voll)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/voll.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/voll)
[![Dependency status](https://img.shields.io/david/Kikobeats/voll.svg?style=flat-square)](https://david-dm.org/Kikobeats/voll)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/voll.svg?style=flat-square)](https://david-dm.org/Kikobeats/voll#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/voll.svg?style=flat-square)](https://www.npmjs.org/package/voll)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Simple boolean expression evaluator.

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

| Operator | Description |
|----------|-------------|
| AND      |             |
| OR, +    |             |
| NOT, -   |             |

## API

### voll(input, [options])

#### input

*Required*
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `vollean`
Default: `false`

Lorem ipsum.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats)
