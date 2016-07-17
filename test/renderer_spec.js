'use strict'

var should = require('should')
var parser = require('../lib/parser')
var Renderer = require('../lib/renderer')

describe('Renderer', function () {
  it('AND and OR precedence', function () {
    [
      '((@a AND @b) OR @c)',
      '(@a AND @b OR @c)'
    ].forEach(function (input) {
      var expr = parser.parse(input)
      expr.accept(new Renderer(), null).should.be.equal('((@a AND @b) OR @c)')
    })
  })

  it('OR and AND precedence', function () {
    [
      '@a OR @b AND @c',
      '(@a OR @b AND @c)',
      '(@a OR (@b AND @c))'
    ].forEach(function (input) {
      var expr = parser.parse(input)
      expr.accept(new Renderer(), null).should.be.equal('(@a OR (@b AND @c))')
    })
  })

  it('NOT precedence', function () {
    [
      'NOT(@a AND @b OR NOT@c)',
      'NOT((@a AND @b) OR NOT@c)'
    ].forEach(function (input) {
      var expr = parser.parse(input)
      expr.accept(new Renderer(), null).should.be.equal('NOT((@a AND @b) OR NOT@c)')
    })
  })
})
