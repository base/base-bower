'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Base = require('base');
var Bower = require('bower-store');
var bower = require('./');
var app, bwr;

var fixtures = path.resolve(__dirname, 'fixtures');
var cwd = process.cwd();

describe('base-bower', function() {
  this.timeout(20000);

  beforeEach(function() {
    process.chdir(fixtures);
    bwr = new Bower(process.cwd());
    app = new Base();
    app.use(bower());
  });

  afterEach(function() {
    bwr.del('dependencies');
    bwr.del('devDependencies');
    process.chdir(cwd);
  });

  it('should export a function', function() {
    assert.equal(typeof bower, 'function');
  });

  it('should install and save to bower.json', function(cb) {
    app.bower.install('moment', function(err) {
      if (err) return cb(err);
      assert(bwr.has('dependencies.moment'));
      cb();
    });
  });

  it('should install to dependencies in bower.json', function(cb) {
    app.bower.save('moment', function(err) {
      if (err) return cb(err);
      assert(bwr.has('dependencies.moment'));
      cb();
    });
  });

  it('should install to devDependencies in bower.json', function(cb) {
    app.bower.saveDev('moment', function(err) {
      if (err) return cb(err);
      assert(bwr.has('devDependencies.moment'));
      cb();
    });
  });
});
