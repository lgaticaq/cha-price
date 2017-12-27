'use strict'

/* global fetch */

module.exports = () => {
  return fetch('http://api.orionx.io/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: '{ market(code: "CHACLP") { lastTrade { price }}}'
    })
  })
    .then(res => res.json())
    .then(res => res.data.market.lastTrade.price)
}
