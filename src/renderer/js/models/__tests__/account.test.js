// jest.autoMockOff()

var assert = require('assert')
var ci = require('coininfo')
var quire = require('quire')
var accountFixtures = require('./account.fixtures')
var blackCoinInfo = ci('BLK')

/* global describe, it */

describe.skip('Account', function () {
  describe('create()', function () {
    var _acc1 = accountFixtures.valid[0]

    it('should create a new account', function () {
      var stubs = {'coinkey': {
        createRandom: function () {
          var CoinKey = require('coinkey')
          var privKey = new Buffer(require('./account.fixtures').valid[0].privateKey, 'hex')
          return new CoinKey(privKey, blackCoinInfo.versions)
        }
      }}

      var Account = quire('../account', stubs)
      var account = Account.create('Savings')

      assert.equal(account.wif, _acc1.wif)
      assert.equal(account.address, _acc1.address)
      assert.equal(account.id, 'account:' + _acc1.address)

      // todo, change to 'balance'
      assert.equal(account.amount, 0)

      // clean up
      // jest.dontMock('coinkey')
    })
  })

  describe('createFromWif()', function () {
    var acc0 = accountFixtures.valid[0]

    it('should create from wallet import format (private key)', function () {
      var Account = require('../account')
      var account = Account.createFromWif('Spending', acc0.wif)

      assert.equal(account.wif, acc0.wif)
      assert.equal(account.address, acc0.address)
      assert.equal(account.id, 'account:' + acc0.address)
    })
  })
})

