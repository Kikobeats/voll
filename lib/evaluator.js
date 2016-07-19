'use strict'

var memoize = require('mem')

function lowercase (collection) {
  if (typeof collection === 'string') return collection.toLowerCase()
  return collection.map(function _lowerCase (item) {
    return (typeof collection === 'string') ? item.toLowerCase() : lowercase(item)
  })
}

function indexof (collection, index) {
  return collection.indexOf(index)
}

function createSensitiveCompare (indexof) {
  function sensitiveCompare (node, vars) {
    return indexof(vars, node.token.value) !== -1
  }
  return sensitiveCompare
}

function createInsensitiveCompare (indexof, lowercase) {
  function insensitiveCompare (node, vars) {
    return indexof(lowercase(vars), lowercase(node.token.value)) !== -1
  }

  return insensitiveCompare
}

function Evaluator (opts) {
  if (!(this instanceof Evaluator)) return new Evaluator(opts)

  opts = opts || {}

  var compare

  if (opts.cache !== false) {
    var _indexof = memoize(indexof, opts.cacheOpts)
    if (!opts.insensitive) {
      compare = createSensitiveCompare(_indexof)
    } else {
      var _lowercase = memoize(lowercase, opts.cacheOpts)
      compare = createInsensitiveCompare(_indexof, _lowercase)
    }
  } else {
    compare = opts.insensitive ? createInsensitiveCompare(indexof, lowercase) : createSensitiveCompare(indexof)
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
