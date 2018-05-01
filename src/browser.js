'use strict'

/* global fetch */

import jsSHA from 'jssha'

export default (apiKey, secretKey) => {
  const timestamp = new Date().getTime() / 1000
  const postData = JSON.stringify({
    query: '{ market(code: "CHACLP") { lastTrade { price }}}'
  })
  const sha = new jsSHA('SHA-512', 'TEXT') // eslint-disable-line
  sha.setHMACKey(secretKey, 'TEXT')
  sha.update(`${timestamp}${postData}`)
  const signature = sha.getHMAC('HEX')
  return fetch('https://api2.orionx.io/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'X-ORIONX-TIMESTAMP': timestamp,
      'X-ORIONX-APIKEY': apiKey,
      'X-ORIONX-SIGNATURE': signature
    },
    body: postData
  })
    .then(res => res.json())
    .then(res => res.data.market.lastTrade.price)
}
