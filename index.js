'use strict'

var evaluator = require('./lib/evaluator')
var parse = require('./lib/parser').parse

function voll (expr, params) {
  expr = parse(expr)

  function bool (input) {
    return expr.accept(evaluator(params), input)
  }

  return bool
}

module.exports = voll
