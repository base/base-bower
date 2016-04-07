/*!
 * base-bower (https://github.com/jonschlinkert/base-bower)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var commands = require('spawn-commands');

module.exports = function(options) {
  return function(app) {
    if (this.isRegistered('base-bower')) return;

    /**
     * Execute `bower install` with the given `args`, package `names`
     * and callback.
     *
     * ```js
     * app.bower('--save', ['bootstrap'], function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower
     * @param {String|Array} `args`
     * @param {String|Array} `names`
     * @param {Function} `cb` Callback
     * @api public
     */

    this.define('bower', bower);

    function bower(args, names, cb) {
      if (typeof names === 'function') {
        cb = names;
        names = [];
      }

      if (!exists(bowerPath(app))) {
        var cwd = app.cwd || process.cwd();
        cb(new Error('bower.json does not exist in: ' + cwd));
        return;
      }

      names = Array.isArray(names) ? names : [names];
      var res = ['install'].concat(names).concat(args || []);
      commands({cmd: 'bower', args: res}, cb);
    }

    /**
     * Execute `bower install` with one or more package `names`.
     *
     * ```js
     * app.bower.install('bootstrap', function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower.install
     * @param {String|Array} `names`
     * @param {Function} `cb` Callback
     * @api public
     */

    bower.install = function install(names, cb) {
      bower(null, names, cb);
    };

    /**
     * Force (re-)install the latest version of all `dependencies`
     * listed in bower.json.
     *
     * ```js
     * app.bower.latest(function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower.latest
     * @param {Function} `cb` Callback
     * @api public
     */

    bower.latest = function(cb) {
      var deps = Object.keys(bower(this).dependencies);
      bower.save('--force-latest', deps, cb);
    };

    /**
     * Execute `bower install --save` with one or more package `names`.
     * Updates `dependencies` in bower.json.
     *
     * ```js
     * app.bower.save('micromatch', function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower.save
     * @param {String|Array} `names`
     * @param {Function} `cb` Callback
     * @api public
     */

    bower.save = function save(names, cb) {
      if (typeof names === 'function') {
        cb = names;
        names = Object.keys(bower(this).dependencies);
      }
      bower('--save', names, cb);
    };

    /**
     * Execute `bower install --save-dev` with one or more package `names`.
     * Updates `devDependencies` in bower.json.
     *
     * ```js
     * app.bower.saveDev('bootstrap', function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower.saveDev
     * @param {String|Array} `names`
     * @param {Function} `cb` Callback
     * @api public
     */

    bower.saveDev = function saveDev(names, cb) {
      if (typeof names === 'function') {
        cb = names;
        names = Object.keys(bower(this).devDependencies);
      }
      bower('--save-dev', names, cb);
    };
  };
};

function bowerPath(app) {
  return path.resolve(app.cwd || process.cwd(), 'bower.json');
}

function bower(app) {
  return app.bower ? app.bower.data : require(bowerPath(app));
}

function exists(fp) {
  try {
    fs.statSync(fp);
    return true;
  } catch (err) {}
  return false;
}
