'use strict'

var os = require('os')
var nodeMajor = parseInt(/^v(\d+)/.exec(process.version)[1], 10)

if (nodeMajor >= 4) {
  module.exports = os.tmpdir
} else {
  module.exports = require('./polyfill.js')
}
