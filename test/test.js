'use strict'

const { describe, it, beforeEach } = require('mocha')
const { expect } = require('chai')
const nock = require('nock')

const lib = require('../src')
const apiKey = '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb'
const secretKey = 'B7EWrck6QaJ8mPa5jYCqKNaagKiHDtq9LT'

describe('cha', () => {
  describe('valid', () => {
    beforeEach(() => {
      nock('https://api2.orionx.io', {
        reqheaders: {
          'Content-Type': 'application/json',
          'X-ORIONX-TIMESTAMP': timestamp => /^\d{10}\.\d+$/.test(timestamp),
          'X-ORIONX-APIKEY': '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb',
          'X-ORIONX-SIGNATURE': signature => /^\w{64}$/.test(signature)
        }
      })
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(200, {
          data: {
            market: {
              lastTrade: {
                price: 10000
              }
            }
          }
        })
    })

    it('should return a price', done => {
      lib(apiKey, secretKey).then(price => {
        expect(price).to.eql(10000)
        done()
      })
    })
  })

  describe('valid json with empty price', () => {
    beforeEach(() => {
      nock('https://api2.orionx.io', {
        reqheaders: {
          'Content-Type': 'application/json',
          'X-ORIONX-TIMESTAMP': timestamp => /^\d{10}\.\d+$/.test(timestamp),
          'X-ORIONX-APIKEY': '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb',
          'X-ORIONX-SIGNATURE': signature => /^\w{64}$/.test(signature)
        }
      })
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(200, {})
    })

    it('should return a null', done => {
      lib(apiKey, secretKey).then(price => {
        expect(price).to.be.an('null')
        done()
      })
    })
  })

  describe('invalid json', () => {
    beforeEach(() => {
      nock('https://api2.orionx.io', {
        reqheaders: {
          'Content-Type': 'application/json',
          'X-ORIONX-TIMESTAMP': timestamp => /^\d{10}\.\d+$/.test(timestamp),
          'X-ORIONX-APIKEY': '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb',
          'X-ORIONX-SIGNATURE': signature => /^\w{64}$/.test(signature)
        }
      })
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(200, '{10000}')
    })

    it('should return an error', done => {
      lib(apiKey, secretKey).catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })

  describe('wrong status code', () => {
    beforeEach(() => {
      nock('https://api2.orionx.io', {
        reqheaders: {
          'Content-Type': 'application/json',
          'X-ORIONX-TIMESTAMP': timestamp => /^\d{10}\.\d+$/.test(timestamp),
          'X-ORIONX-APIKEY': '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb',
          'X-ORIONX-SIGNATURE': signature => /^\w{64}$/.test(signature)
        }
      })
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(301)
    })

    it('should return an error', done => {
      lib(apiKey, secretKey).catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })

  describe('server error', () => {
    beforeEach(() => {
      nock('https://api2.orionx.io', {
        reqheaders: {
          'Content-Type': 'application/json',
          'X-ORIONX-TIMESTAMP': timestamp => /^\d{10}\.\d+$/.test(timestamp),
          'X-ORIONX-APIKEY': '5WGDN4rD3Eqpz9tnMQuqyRCfqZUP4ccJsb',
          'X-ORIONX-SIGNATURE': signature => /^\w{64}$/.test(signature)
        }
      })
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .replyWithError('Server error')
    })

    it('should return an error', done => {
      lib(apiKey, secretKey).catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })
})
