'use strict'

var evaluator = require('./lib/evaluator')
var parse = require('./lib/parser').parse

function voll (expr) {
  expr = parse(expr)

  function bool (input) {
    return expr.accept(evaluator(), input)
  }

  return bool
}

module.exports = voll
