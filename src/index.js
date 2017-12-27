'use strict'

const http = require('http')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query: '{ market(code: "CHACLP") { lastTrade { price }}}'
    })
    const options = {
      hostname: 'api.orionx.io',
      port: 80,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    const req = http.request(options, res => {
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
