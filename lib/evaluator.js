'use strict'

function Evaluator () {
  if (!(this instanceof Evaluator)) return new Evaluator()

  this.visit_var = function (node, vars) {
    return vars.indexOf(node.token.value) !== -1
  }

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
