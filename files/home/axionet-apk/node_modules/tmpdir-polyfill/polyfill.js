'use strict'

module.exports = function tmpdir () {
  var path
  if (process.platform === 'win32') {
    path = process.env.TEMP ||
      process.env.TMP ||
      (process.env.SystemRoot || process.env.windir) + '\\temp'

    if (path.length > 1 && /\\$/.test(path) && !/:\\$/.test(path)) {
      path = path.slice(0, -1)
    }
  } else {
    path = process.env.TMPDIR ||
      process.env.TMP ||
      process.env.TEMP ||
      '/tmp'

    if (path.length > 1 && /\/$/.test(path)) {
      path = path.slice(0, -1)
    }
  }
  return path
}
