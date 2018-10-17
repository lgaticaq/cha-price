# cha-price

[![npm version](https://img.shields.io/npm/v/cha-price.svg)](https://www.npmjs.com/package/cha-price)
[![npm downloads](https://img.shields.io/npm/dm/cha-price.svg)](https://www.npmjs.com/package/cha-price)
[![Build Status](https://img.shields.io/travis/lgaticaq/cha-price.svg)](https://travis-ci.org/lgaticaq/cha-price)
[![Coverage Status](https://coveralls.io/repos/github/lgaticaq/cha-price/badge.svg?branch=master)](https://coveralls.io/github/lgaticaq/cha-price?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/a493eebfd3cbffa774ee/maintainability)](https://codeclimate.com/github/lgaticaq/cha-price/maintainability)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/cha-price.svg)](https://david-dm.org/lgaticaq/cha-price#info=devDependencies)

> Get price of chaucha

## Installation

```bash
npm i -S cha-price
```

## Use

[Try on RunKit](https://npm.runkit.com/cha-price)
```js
const cha = require('cha-price');

// Get from https://orionx.io/developers
const apiKey = 'your-api-key'
const secretKey = 'your-secret-key'

cha(apiKey, secretKey)
  .then(console.log)
  .catch(console.error);
```

Result:
```js
XXXXX // a number
```

## Licencia

[MIT](https://tldrlegal.com/license/mit-license)
