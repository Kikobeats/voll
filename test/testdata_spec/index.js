'use strict'

var jsonFuture = require('json-future')
var path = require('path')
var voll = require('../..')
var fs = require('fs')

describe('voll', function () {
  var dir = path.join(__dirname, './fixtures')

  fs.readdirSync(dir).forEach(function (file) {
    it(file, function () {
      var filepath = path.join(dir, file)
      var content = jsonFuture.load(filepath)

      content.forEach(function (unitCase) {
        var test = voll(unitCase.expr)
        test(unitCase.input).should.be.equal(unitCase.result)
      })
    })
  })
})
