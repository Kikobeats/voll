'use strict'

var lexer = require('../lib/lexer')
var should = require('should')

function lex () {
  return [lexer.lex(), lexer.yytext]
}

describe('Lexer', function () {
  it('AND', function () {
    lexer.setInput('  a   AND  b  ')
    ;[
      [ 'TOKEN_VAR', 'a' ],
      [ 'TOKEN_AND', 'AND' ],
      [ 'TOKEN_VAR', 'b' ]
    ].forEach(function (tokenPair) {
      lex().should.be.eql(tokenPair)
    })
  })

  it('OR', function () {
    lexer.setInput('  a   OR  b  ')
    ;[
      [ 'TOKEN_VAR', 'a' ],
      [ 'TOKEN_OR', 'OR' ],
      [ 'TOKEN_VAR', 'b' ]
    ].forEach(function (tokenPair) {
      lex().should.be.eql(tokenPair)
    })

    lexer.setInput('  a   +  b  ')
    ;[
      [ 'TOKEN_VAR', 'a' ],
      [ 'TOKEN_OR', 'OR' ],
      [ 'TOKEN_VAR', 'b' ]
    ].forEach(function (tokenPair) {
      lex().should.be.eql(tokenPair)
    })
  })

  it('NOT', function () {
    lexer.setInput('  a   NOT  b  ')
    ;[
      [ 'TOKEN_VAR', 'a' ],
      [ 'TOKEN_NOT', 'NOT' ],
      [ 'TOKEN_VAR', 'b' ]
    ].forEach(function (tokenPair) {
      lex().should.be.eql(tokenPair)
    })

    lexer.setInput('  a   -  b  ')
    ;[
      [ 'TOKEN_VAR', 'a' ],
      [ 'TOKEN_NOT', 'NOT' ],
      [ 'TOKEN_VAR', 'b' ]
    ].forEach(function (tokenPair) {
      lex().should.be.eql(tokenPair)
    })
  })
})
