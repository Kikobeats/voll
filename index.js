'use strict'

var Evaluator = require('./lib/evaluator')
var parse = require('./lib/parser').parse

function Bool (expr) {
  expr = parse(expr)

  function bool (input) {
    return expr.accept(new Evaluator(), input)
  }

  return bool
}

module.exports = Bool
