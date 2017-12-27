'use strict'

const { describe, it, beforeEach } = require('mocha')
const { expect } = require('chai')
const nock = require('nock')

const lib = require('../src')

describe('cha', () => {
  describe('valid', () => {
    beforeEach(() => {
      nock('http://api.orionx.io')
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
      lib().then(price => {
        expect(price).to.eql(10000)
        done()
      })
    })
  })

  describe('valid json with empty price', () => {
    beforeEach(() => {
      nock('http://api.orionx.io')
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(200, {})
    })

    it('should return a null', done => {
      lib().then(price => {
        expect(price).to.be.an('null')
        done()
      })
    })
  })

  describe('invalid json', () => {
    beforeEach(() => {
      nock('http://api.orionx.io')
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(200, '{10000}')
    })

    it('should return an error', done => {
      lib().catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })

  describe('wrong status code', () => {
    beforeEach(() => {
      nock('http://api.orionx.io')
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .reply(301)
    })

    it('should return an error', done => {
      lib().catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })

  describe('server error', () => {
    beforeEach(() => {
      nock('http://api.orionx.io')
        .post('/graphql', {
          query: '{ market(code: "CHACLP") { lastTrade { price }}}'
        })
        .replyWithError('Server error')
    })

    it('should return an error', done => {
      lib().catch(err => {
        expect(err).to.be.an('error')
        done()
      })
    })
  })
})
