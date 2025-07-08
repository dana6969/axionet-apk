'use strict'
var tape = require('tape')
var os = require('os')
var tmpdir = require('./index')
var nodeMajor = parseInt(/^v(\d+)/.exec(process.version)[1], 10)

function sandbox (vars) {
  delete process.env.TEMP
  delete process.env.TMPDIR
  delete process.env.TMP
  delete process.env.SystemRoot
  delete process.env.windir
  for (var key in vars) {
    process.env[key] = vars[key]
  }
  return tmpdir()
}

tape('returns a module', function (t) {
  t.equals(typeof tmpdir, 'function')
  if (nodeMajor >= 4) {
    t.equals(tmpdir, os.tmpdir)
  }
  t.end()
})

if (process.platform === 'win32') {
  tape('environment order', function (t) {
    t.equals(sandbox({ TEMP: 'a', TMP: 'b' }), 'a')
    t.equals(sandbox({ TMP: 'b', SystemRoot: 'c' }), 'b')
    t.equals(sandbox({ SystemRoot: 'c', windir: 'd' }), 'c\\temp')
    t.equals(sandbox({ windir: 'd' }), 'd\\temp')
    t.end()
  })
  tape('suffix slice', function (t) {
    t.equals(sandbox({ TMP: '\\' }), '\\')
    t.equals(sandbox({ TMP: '\\tmp\\' }), '\\tmp')
    t.equals(sandbox({ TMP: '\\tmp:\\' }), '\\tmp:\\')
    t.end()
  })
} else {
  tape('environment order', function (t) {
    t.equals(sandbox({ TMPDIR: 'a', TMP: 'b' }), 'a')
    t.equals(sandbox({ TMP: 'b', TEMP: 'c' }), 'b')
    t.equals(sandbox({ TEMP: 'c' }), 'c')
    t.equals(sandbox({}), '/tmp')
    t.end()
  })
  tape('suffix slice', function (t) {
    t.equals(sandbox({ TMP: '/' }), '/')
    t.equals(sandbox({ TMP: '/tmp/' }), '/tmp')
    t.end()
  })
}
