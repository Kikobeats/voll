'use strict'

var memoize = require('mem')

function isString (value) {
  return typeof value === 'string'
}

function lowercase (collection) {
  if (isString(collection)) return collection.toLowerCase()
  return collection.map(function _lowerCase (item) {
    return isString(collection) ? item.toLowerCase() : lowercase(item)
  })
}

function includes (collection, value, opts) {
  if (opts.split && isString(collection)) collection = collection.split(' ')
  return collection.indexOf(value) !== -1
}

function createSensitiveCompare (includes) {
  function sensitiveCompare (node, vars) {
    var hasSpace = includes(node.token.value, ' ', {split: false})
    return includes(vars, node.token.value, {split: !hasSpace})
  }
  return sensitiveCompare
}

function createInsensitiveCompare (includes, lowercase) {
  function insensitiveCompare (node, vars) {
    var hasSpace = includes(node.token.value, ' ', {split: false})
    return includes(lowercase(vars), lowercase(node.token.value), {split: !hasSpace})
  }

  return insensitiveCompare
}

function Evaluator (opts) {
  if (!(this instanceof Evaluator)) return new Evaluator(opts)

  opts = opts || {}

  var compare

  if (opts.cache !== false) {
    var _includes = memoize(includes, opts.cacheOpts)
    if (!opts.insensitive) {
      compare = createSensitiveCompare(_includes)
    } else {
      var _lowercase = memoize(lowercase, opts.cacheOpts)
      compare = createInsensitiveCompare(_includes, _lowercase)
    }
  } else {
    compare = opts.insensitive ? createInsensitiveCompare(includes, lowercase) : createSensitiveCompare(includes)
  }

  this.visit_var = compare

  this.visit_and = function (node, vars) {
    return this.evaluate(node.left, vars) && this.evaluate(node.right, vars)
  }

  this.visit_or = function (node, vars) {
    return this.evaluate(node.left, vars) || this.evaluate(node.right, vars)
  }

  this.visit_not = function (node, vars) {
    return !this.evaluate(node.operand, vars)
  }

  this.evaluate = function (node, vars) {
    return node.accept(this, vars)
  }
}

module.exports = Evaluator
