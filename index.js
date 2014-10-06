module.exports = function deepFreeze (o) {
  Object.freeze(o);

  var oIsFunction = typeof o === "function";

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};
