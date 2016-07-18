'use strict'

var memoize = require('fast-memoize')

var lowercase = memoize(function lowercase (collection) {
  if (typeof collection === 'string') return collection.toLowerCase()
  return collection.map(function _lowerCase (item) {
    if (typeof collection !== 'string') return lowercase(item)
    return item.toLowerCase()
  })
})

var indexof = memoize(function indexof (collection, index) {
  return collection.indexOf(index)
})

function sensitiveCompare (node, vars) {
  return indexof(vars, node.token.value) !== -1
}

function insensitiveCompare (node, vars) {
  return indexof(lowercase(vars), lowercase(node.token.value)) !== -1
}

function Evaluator (params) {
  if (!(this instanceof Evaluator)) return new Evaluator(params)

  params = params || {}

  this.visit_var = params.insensitive ? insensitiveCompare : sensitiveCompare

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
