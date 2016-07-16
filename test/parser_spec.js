'use strict'

var parser = require('../lib/parser')
var Evaluator = require('../lib/evaluator')
var assert = require('assert')

describe('Parser', function () {
  it('only tag', function () {
    var expr = parser.parse('@a')

    assert.equal(true, expr.accept(new Evaluator(), ['@a']))
    assert.equal(false, expr.accept(new Evaluator(), ['@b']))
  })

  it('AND expression', function () {
    var expr = parser.parse('@a AND @b')
    assert.equal(true, expr.accept(new Evaluator(), ['@a', '@b']))
    assert.equal(false, expr.accept(new Evaluator(), ['@a']))
    assert.equal(false, expr.accept(new Evaluator(), ['@b']))
    assert.equal(false, expr.accept(new Evaluator(), []))
  })

  it('Does it all', function () {
    var expr = parser.parse('@a AND @b OR NOT @c')
    assert.equal(true, expr.accept(new Evaluator(), ['@a', '@b']))
    assert.equal(false, expr.accept(new Evaluator(), ['@c']))
    assert.equal(true, expr.accept(new Evaluator(), []))
  })

  it('double negation', function () {
    [
      'NOT NOT@a',
      '--@a'
    ].forEach(function (str) {
      var expr = parser.parse(str)
      assert.equal(true, expr.accept(new Evaluator(), ['@a']))
      assert.equal(false, expr.accept(new Evaluator(), ['@b']))
    })
  })

  it('tag syntax', function () {
    var expr = parser.parse('NOT@a1A')
    assert.equal(false, expr.accept(new Evaluator(), ['@a1A']))
  })

  it('throws exception on scanner error', function () {
    try {
      parser.parse( // line,token_start_col
        '          \n' + // 1
        '          \n' + // 2
        '  a       \n' + // 3,3
        '    ^     \n' // 4,5
      // 0123456789
      )
      throw new Error('should fail')
    } catch(expected) {
      assert.equal(
        'Lexical error on line 4. Unrecognized text.\n' +
        '...      a           ^     \n' +
        '---------------------^'
        , expected.message)
      assert.deepEqual({
        text: '',
        token: null,
        line: 3 // Jison lines are zero-indexed.
      }, expected.hash)
    }
  })

  it('throws exception on parse error', function () {
    try {
      parser.parse(
        // line,token_start_col
        '          \n' + // 1
        '          \n' + // 2
        '  a       \n' + // 3,3
        '    OR    \n' + // 4,5
        '      c   \n' + // 5,7
        '       AND' // 6,9
      // /0123456789
      )
      throw new Error('should fail')
    } catch (expected) {
      assert.equal(
        'Parse error on line 6:\n' +
        '...     c          AND\n' +
        '----------------------^\n' +
        "Expecting 'TOKEN_VAR', 'TOKEN_NOT', 'TOKEN_LPAREN', got 'EOF'"
        , expected.message)
      assert.deepEqual({
        text: '',
        token: 'EOF',
        line: 5,
        loc: { first_line: 6, last_line: 6, first_column: 7, last_column: 10 },
        expected: [ "'TOKEN_VAR'", "'TOKEN_NOT'", "'TOKEN_LPAREN'" ]
      }, expected.hash)
    }
  })
})
