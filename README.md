# base-bower [![NPM version](https://img.shields.io/npm/v/base-bower.svg?style=flat)](https://www.npmjs.com/package/base-bower) [![NPM downloads](https://img.shields.io/npm/dm/base-bower.svg?style=flat)](https://npmjs.org/package/base-bower) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-bower.svg?style=flat)](https://travis-ci.org/jonschlinkert/base-bower)

> Base plugin that adds methods for programmatically installing bower packages.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-bower --save
```

## Usage

```js
var bower = require('base-bower');
var Base = require('base');
var app = new Base();
app.use(bower());

// install bower packages `bootstrap` and `moment`
app.bower.saveDev(['bootstrap', 'moment'], function(err) {
  if (err) throw err;
});
```

## API

### [.bower](index.js#L34)

Execute `bower install` with the given `args`, package `names` and callback.

**Params**

* `args` **{String|Array}**
* `names` **{String|Array}**
* `cb` **{Function}**: Callback

**Example**

```js
app.bower('--save', ['bootstrap'], function(err) {
  if (err) throw err;
});
```

### [.bower.install](index.js#L67)

Execute `bower install` with one or more package `names`.

**Params**

* `names` **{String|Array}**
* `cb` **{Function}**: Callback

**Example**

```js
app.bower.install('bootstrap', function(err) {
  if (err) throw err;
});
```

### [.bower.latest](index.js#L85)

Force (re-)install the latest version of all `dependencies` listed in bower.json.

**Params**

* `cb` **{Function}**: Callback

**Example**

```js
app.bower.latest(function(err) {
  if (err) throw err;
});
```

### [.bower.save](index.js#L105)

Execute `bower install --save` with one or more package `names`. Updates `dependencies` in bower.json.

**Params**

* `names` **{String|Array}**
* `cb` **{Function}**: Callback

**Example**

```js
app.bower.save('micromatch', function(err) {
  if (err) throw err;
});
```

### [.bower.saveDev](index.js#L128)

Execute `bower install --save-dev` with one or more package `names`. Updates `devDependencies` in bower.json.

**Params**

* `names` **{String|Array}**
* `cb` **{Function}**: Callback

**Example**

```js
app.bower.saveDev('bootstrap', function(err) {
  if (err) throw err;
});
```

## Related projects

You might also be interested in these projects:

* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [base-task](https://www.npmjs.com/package/base-task): base plugin that provides a very thin wrapper around [https://github.com/doowb/composer](https://github.com/doowb/composer) for adding task methods to… [more](https://www.npmjs.com/package/base-task) | [homepage](https://github.com/node-base/base-task)
* [spawn-commands](https://www.npmjs.com/package/spawn-commands): Launches a new process with the given command, with command line arguments in `args`. Should… [more](https://www.npmjs.com/package/spawn-commands) | [homepage](https://github.com/jonschlinkert/spawn-commands)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-bower/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

Follow me on GitHub or Twitter for updates about base-bower and my other libraries:

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/base-bower/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v, on April 07, 2016._