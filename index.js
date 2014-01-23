var emitter = require('emitter');
var slice = Array.prototype.slice;
var proto = [];

/**
 * Add an element to the end of the collection.
 *
 * @return {Integer} The collection length.
 * @api public
 */

function push() {
  var startIndex = this.length;
  var result = Array.prototype.push.apply(this, arguments);
  this.emit('add', this.slice(startIndex, this.length), startIndex);
  return result;
}

/**
 * Remove the last element from the collection.
 *
 * @return {Integer} The collection length.
 * @api public
 */

function pop() {
  var startIndex = this.length;
  var result = Array.prototype.pop.apply(this, arguments);
  this.emit('remove', [result], startIndex - 1);
  return result;
}

/**
 * Remove the first element from the collection.
 *
 * @return {Integer} The collection length.
 * @api public
 */

function shift() {
  var startIndex = this.length;
  var result = Array.prototype.shift.apply(this, arguments);
  this.emit('remove', [result], 0);
  return result;
}

/**
 * Add an element to the beginning of the collection.
 *
 * @api public
 */

function unshift() {
  var length = this.length;
  var result = Array.prototype.unshift.apply(this, arguments);
  this.emit('add', this.slice(0, this.length - length), 0);
  return result;
}

/**
 * changes the content of an array, adding new elements
 * while removing old elements.
 *
 * @param {Number} index
 * @param {Number} length
 * @param {Items} [items]* Items to add
 *
 * @return {Array}
 */

function splice(index, length) {
  var removed = Array.prototype.splice.apply(this, arguments);
  if (removed.length) {
    this.emit('remove', removed, index);
  }
  if (arguments.length > 2) {
    this.emit('add', slice.call(arguments, 2), index);
  }
  return removed;
}

/**
 * Reverse the items in the array
 *
 * @return {Array}
 */

function reverse() {
  var result = Array.prototype.reverse.apply(this, arguments);
  this.emit('sort');
  return result;
}

/**
 * Sort the items in the array
 *
 * @return {Array}
 */

function sort() {
  var result = Array.prototype.sort.apply(this, arguments);
  this.emit('sort');
  return result;
}

/**
 * Define methods.
 */

var methods = {
  pop: pop,
  push: push,
  reverse: reverse,
  shift: shift,
  sort: sort,
  splice: splice,
  unshift: unshift
};

emitter(methods);

for (var method in methods) {
  proto[method] = methods[method];
}

exports.wrap = function(arr) {
  if(!arr) arr = [];
  if(arr.__observable__) return;
  arr.__proto__ = proto;
  arr.__observable__ = true;
  return arr;
};

exports.unwrap = function(arr) {
  delete arr.__observable__;
  arr.__proto__ = Array.prototype;
  return arr;
};