var test = require('tap').test;
var deepFreeze = require('../');

test('preventExtensions', function (t) {
  "use strict";

  t.plan(6);

  var a = {
    // a function
      b: function() {},
  };

  deepFreeze(a, 'preventExtensions');
  t.assert(!Object.isExtensible(a));
  t.assert(!Object.isExtensible(a.b));

  t.assert(!Object.isSealed(a));
  t.assert(Object.isSealed(a.b));
  
  t.assert(!Object.isFrozen(a));
  t.assert(!Object.isFrozen(a.b)); 
});
