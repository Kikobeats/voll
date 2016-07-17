'use strict'

var Evaluator = require('../lib/evaluator')
var parser = require('../lib/parser')
var should = require('should')

describe('Parser', function () {
  it('only tag', function () {
    var expr = parser.parse('@a')
    expr.accept(new Evaluator(), ['@a']).should.be.true()
    expr.accept(new Evaluator(), ['@b']).should.be.false()
  })

  it('AND expression', function () {
    var expr = parser.parse('@a AND @b')
    expr.accept(new Evaluator(), ['@a', '@b']).should.be.true()
    expr.accept(new Evaluator(), ['@a']).should.be.false()
    expr.accept(new Evaluator(), ['@b']).should.be.false()
    expr.accept(new Evaluator(), []).should.be.false()
  })

  it('Does it all', function () {
    var expr = parser.parse('@a AND @b OR NOT @c')
    expr.accept(new Evaluator(), ['@a', '@b']).should.be.true()
    expr.accept(new Evaluator(), ['@c']).should.be.false()
    expr.accept(new Evaluator(), []).should.be.true()
  })

  it('double negation', function () {
    [
      'NOT NOT@a',
      '--@a'
    ].forEach(function (str) {
      var expr = parser.parse(str)
      expr.accept(new Evaluator(), ['@a']).should.be.true()
      expr.accept(new Evaluator(), ['@b']).should.be.false()
    })
  })

  it('tag syntax', function () {
    var expr = parser.parse('NOT@a1A')
    expr.accept(new Evaluator(), ['@a1A']).should.be.false()
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
      expected.message.should.be.equal(
        'Lexical error on line 4. Unrecognized text.\n' +
        '...      a           ^     \n' +
        '---------------------^'
      )
      expected.hash.should.be.eql({
        text: '',
        token: null,
        line: 3 // Jison lines are zero-indexed.
      })
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
      expected.message.should.be.equal(
        'Parse error on line 6:\n' +
        '...     c          AND\n' +
        '----------------------^\n' +
        "Expecting 'TOKEN_VAR', 'TOKEN_NOT', 'TOKEN_LPAREN', got 'EOF'"
      )
      expected.hash.should.be.eql({
        text: '',
        token: 'EOF',
        line: 5,
        loc: { first_line: 6, last_line: 6, first_column: 7, last_column: 10 },
        expected: [ "'TOKEN_VAR'", "'TOKEN_NOT'", "'TOKEN_LPAREN'" ]
      })
    }
  })
})
