'use strict';
module.exports = function deepFreeze (o, method) {
  if (!method) {
   var method = 'freeze';
  }

  function isNotExtensible(o) {
    return !Object.isExtensible(o);
  }

  var checkFn;
  switch (method) {
    case 'freeze': checkFn = Object.isFrozen; break;
    case 'seal': checkFn = Object.isSealed; break;
    case 'preventExtensions': checkFn = isNotExtensible; break;
    default: throw new TypeError("Method must be 'freeze', 'seal', or 'preventExtensions'");
  }

  Object[method](o);

  var oIsFunction = typeof o === "function";
  var hasOwnProp = Object.prototype.hasOwnProperty;

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (hasOwnProp.call(o, prop)
    && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !checkFn(o[prop])) {
      deepFreeze(o[prop], method);
    }
  });
  
  return o;
};
