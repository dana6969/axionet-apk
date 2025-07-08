# tmpdir-polyfill [![NPM version](https://img.shields.io/npm/v/tmpdir-polyfill.svg?style=flat)](https://www.npmjs.com/package/tmpdir-polyfill) [![NPM downloads](https://img.shields.io/npm/dm/tmpdir-polyfill.svg?style=flat)](https://npmjs.org/package/tmpdir-polyfill) [![Build Status](https://img.shields.io/travis/martinheidegger/homedir-polyfill.svg?style=flat&label=Travis)](https://travis-ci.org/martinheidegger/tmpdir-polyfill)

> Node.js os.tmpdir polyfill for older versions of node.js.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save tmpdir-polyfill
```

## Usage

```js
var homedir = require('tmpdir-polyfill');
console.log(tmpdir());
//=> /var/folders/g2/bqbqq47d4pg7v4rqx90612m00000gn/T
```

## Reasoning

This library is a polyfill for the [node.js os.tmpdir](https://nodejs.org/api/os.html#os_os_tmpdir) to work consistently in older nodejs versions.

In versions of node.js newer or equal 4, [os.tmpdir](https://nodejs.org/api/os.html#os_os_tmpdir) is used.

## About

### Related projects

[homedir-polyfill](https://www.npmjs.com/package/homedir-polyfill): 

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new) & be kind.

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Martin Heidegger**

* [github/martinheidegger](https://github.com/martinheidegger)
* [twitter/leichtgewicht](http://twitter.com/leichtgewicht)

### License

Copyright © 2019, [Martin Heidegger](https://github.com/martinheidegger).
Released under the [MIT license](LICENSE).
