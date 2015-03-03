# deep-freeze-strict

recursively `Object.freeze()` objects.

this fork works in strict mode, so when 
freezing a function you don't get the error:
```
> (function(){ "use strict"; deepFreeze(function(){}); })();

TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

# example

``` js
var deepFreeze = require('deep-freeze-strict');

deepFreeze(Buffer);
Buffer.x = 5;
console.log(Buffer.x === undefined);

Buffer.prototype.z = 3;
console.log(Buffer.prototype.z === undefined);
```

***

```
$ node example/deep.js
true
true
```

# methods

``` js
var deepFreeze = require('deep-freeze-strict')
```

## deepFreeze(obj)

Call `Object.freeze(obj)` recursively on all unfrozen properties of `obj` that
are functions or objects.

## deepFreeze(obj, 'freeze')

Same as `deepFreeze(obj)`.

## deepFreeze(obj, 'seal')

Call `Object.seal(obj)` recursively on all unsealed properties of `obj` that
are functions or objects.

## deepFreeze(obj, 'preventExtensions')

Call `Object.preventExtensions(obj)` recursively on all not isExtensible properties of `obj` that
are functions or objects.

# Freeze, seal, and preventExtensions
`'preventExtensions'` is the least restrictive. It prevents arbitraty properties from added to an object.

`'seal'` does everything preventExtensions does, and also prevents altering the attributes of the properties on the object, as well as preventing deletion of properties on the object.

`'freeze'` is the most restrictive. It does everything preventExtensions and seal does, as well as making all of the existing properties on the object read-only.

Once an object is frozen (or sealed, or not extensible), it cannot be undone.

# license

public domain

Based in part on the code snippet from
[the MDN wiki page on Object.freeze()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/freeze),
which
[is released to the public domain](https://developer.mozilla.org/en-US/docs/Project:Copyrights).
