/*!
 * base-bower (https://github.com/jonschlinkert/base-bower)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var exists = require('fs-exists-sync');
var spawn = require('cross-spawn-async');

module.exports = function(options) {
  return function(app) {
    if (this.isRegistered('base-bower')) return;

    /**
     * Execute `bower install` with the given `args`, bower package `names`
     * and callback.
     *
     * ```js
     * app.bower('--save', ['isobject'], function(err) {
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

    function bower(args, cb) {
      if (!exists(bowerPath(app))) {
        var cwd = app.cwd || process.cwd();
        cb(new Error('bower.json does not exist in: ' + cwd));
        return;
      }

      spawn('bower', arrayify(args), {stdio: 'inherit'})
        .on('error', cb)
        .on('close', function(code, err) {
          cb(err, code);
        });
    };

    /**
     * Execute `bower install` with one or more bower package `names`.
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
      bower(['install'].concat(names), cb);
    };

    /**
     * (Re-)install and save the latest version of all `dependencies`
     * and `devDependencies` currently listed in bower.json.
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

    bower.latest = function(names, cb) {
      if (typeof names !== 'function') {
        bower.install(latest(names), cb);
        return;
      }

      var devDeps = latest(bowerProp(app, 'devDependencies'));
      var deps = latest(bowerProp(app, 'dependencies'));

      bower.save(deps, function(err) {
        if (err) return cb(err);
        bower.saveDev(devDeps, cb);
      });
    };

    /**
     * Execute `bower install --save` with one or more bower package `names`.
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

    bower.save = function(names, cb) {
      var args = [].concat.apply([], [].slice.call(arguments));
      cb = args.pop();

      if (args.length === 0) {
        args = bowerProp(app, 'dependencies');
      }

      if (!args.length) {
        cb();
        return;
      }
      bower.install(['--save'].concat(args), cb);
    };

    /**
     * Execute `bower install --save-dev` with one or more bower package `names`.
     * Updates `devDependencies` in bower.json.
     *
     * ```js
     * app.bower.saveDev('isobject', function(err) {
     *   if (err) throw err;
     * });
     * ```
     * @name .bower.saveDev
     * @param {String|Array} `names`
     * @param {Function} `cb` Callback
     * @api public
     */

    bower.saveDev = function(names, cb) {
      var args = [].concat.apply([], [].slice.call(arguments));
      cb = args.pop();

      if (args.length === 0) {
        args = bowerProp(app, 'devDependencies');
      }

      if (!args.length) {
        cb();
        return;
      }
      bower.install(['--save-dev'].concat(args), cb);
    };
  };
};

/**
 * Cast `val` to an array
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Resolve the path to `bower.json`
 */

function bowerPath(app) {
  return path.resolve(app.cwd || process.cwd(), 'bower.json');
}

/**
 * Read `bower.json`
 */

function bowerData(app) {
  return app.bower ? app.bower.data : require(bowerPath(app));
}

/**
 * Get the given `prop` in bower.json
 */

function bowerProp(app, prop) {
  return Object.keys(bowerData(app)[prop] || {});
}
