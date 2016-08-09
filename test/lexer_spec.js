'use strict'

var lexer = require('../lib/lexer')
require('should')

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

  describe('VAR', function () {
    it('detect simple word', function () {
      lexer.setInput('hello')
      lex().should.be.eql([ 'TOKEN_VAR', 'hello' ])
    })

    it('detect multiple words', function () {
      [
        '"hello world"',
        "'hello world'"
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', 'hello world' ])
      })
    })

    it('detect latin characters', function () {
      [
        'España',
        'avión'
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', input ])
      })
    })

    it('detect _', function () {
      [
        '__foo__bar__',
        '__foo',
        'bar__'
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', input ])
      })
    })

    it('detect /', function () {
      [
        'ux/ui'
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', input ])
      })
    })

    it('detect .', function () {
      [
        '.foobar',
        'foo.bar',
        'foobar.'
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', input ])
      })
    })

    it('detect @', function () {
      [
        '@foo',
        'b@r'
      ].forEach(function (input) {
        lexer.setInput(input)
        lex().should.be.eql([ 'TOKEN_VAR', input ])
      })
    })
  })
})
