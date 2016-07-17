'use strict'

function Renderer () {
  if (!(this instanceof Renderer)) return new Renderer()

  this.visit_var = function (node, vars) {
    return node.token.value
  }

  this.visit_and = function (node, _) {
    return '(' + this.render(node.left) + ' ' + node.token.value + ' ' + this.render(node.right) + ')'
  }

  this.visit_or = function (node, _) {
    return '(' + this.render(node.left) + ' ' + node.token.value + ' ' + this.render(node.right) + ')'
  }

  this.visit_not = function (node, _) {
    return node.token.value + this.render(node.operand)
  }

  this.render = function (node) {
    return node.accept(this, null)
  }
}

module.exports = Renderer
