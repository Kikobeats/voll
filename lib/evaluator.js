'use strict'

function lowercase (collection) {
  if (typeof collection === 'string') return collection.toLowerCase()
  return collection.map(function _lowerCase (item) {
    if (typeof collection !== 'string') return lowercase(item)
    return item.toLowerCase()
  })
  return collection
}

function sensitiveCompare (node, vars) {
  return vars.indexOf(node.token.value) !== -1
}

function insensitiveCompare (node, vars) {
  return lowercase(vars).indexOf(node.token.value.toLowerCase()) !== -1
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
