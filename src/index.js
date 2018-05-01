'use strict'

const https = require('https')
const crypto = require('crypto')

module.exports = (apiKey, secretKey) => {
  return new Promise((resolve, reject) => {
    if (!apiKey || !secretKey) {
      return reject(new Error('Empty apiKey or secretKey'))
    }
    const timestamp = new Date().getTime() / 1000
    const postData = JSON.stringify({
      query: '{ market(code: "CHACLP") { lastTrade { price }}}'
    })
    const options = {
      hostname: 'api2.orionx.io',
      port: 443,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'X-ORIONX-TIMESTAMP': timestamp,
        'X-ORIONX-APIKEY': apiKey,
        'X-ORIONX-SIGNATURE': crypto
          .createHmac('sha256', secretKey)
          .update(`${timestamp}${postData}`)
          .digest('hex')
      }
    }
    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`))
      } else {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const json = JSON.parse(rawData)
            if (json.data && json.data.market && json.data.market.lastTrade) {
              resolve(json.data.market.lastTrade.price)
            } else {
              resolve(null)
            }
          } catch (err) {
            reject(err)
          }
        })
      }
    })
    req.on('error', err => reject(err))
    req.write(postData)
    req.end()
  })
}
