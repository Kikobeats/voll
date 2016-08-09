'use strict'

var evaluator = require('./lib/evaluator')
var parse = require('./lib/parser').parse

function createVoll (expr, params) {
  expr = parse(expr)

  function voll (input) {
    return expr.accept(evaluator(params), input)
  }

  return voll
}

module.exports = createVoll
