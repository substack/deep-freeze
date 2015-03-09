var test = require('tap').test;
var deepFreeze = require('../');

/**
 * Test freeze method (freeze, seal, or preventExtensions).
 */

test('freeze', function (t) {
  "use strict";

  t.plan(4);

  var a = {
    // a function
      b: function() {},
  };

  deepFreeze(a, 'freeze');
  t.assert(Object.isFrozen(a));
  t.assert(Object.isFrozen(a.b));
  try {
    a.x = 5;
  } catch (e) {
    t.ok('error thrown as expected');
  }
  t.equal(a.x, undefined);
});

test('bad type', function (t) {
  "use strict";

  t.plan(1);

  var a = {
    // a function
      b: function() {},
  };

  try {
    deepFreeze(a, 'whoops');
  } catch (e) {
    t.ok('error thrown as expected');
  }
});