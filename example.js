'use strict';

var bower = require('./');
var Base = require('base');
var app = new Base();
app.use(bower());

app.bower.save(['bootstrap'], function(err) {
  if (err) throw err;
});
