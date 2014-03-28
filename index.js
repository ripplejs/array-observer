var Emitter = require('emitter');
var slice = Array.prototype.slice;

module.exports = function(arr) {

  var emitter = new Emitter();

  /**
   * Add an element to the end of the collection.
   *
   * @return {Integer} The collection length.
   * @api public
   */

  function push() {
    var startIndex = this.length;
    var result = Array.prototype.push.apply(this, arguments);
    this.slice(startIndex, this.length).forEach(function(value, i){
      emitter.emit('add', value, (startIndex + i));
    });
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
    emitter.emit('remove', result, startIndex - 1);
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
    emitter.emit('remove', result, 0);
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
    this.slice(0, this.length - length).forEach(function(value, i){
      emitter.emit('add', value, i);
    });
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
      removed.forEach(function(value, i){
        emitter.emit('remove', value, index + i);
      });
    }
    if (arguments.length > 2) {
      slice.call(arguments, 2).forEach(function(value, i){
        emitter.emit('add', value, index + i);
      });
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
    emitter.emit('sort');
    return result;
  }

  /**
   * Sort the items in the array
   *
   * @return {Array}
   */

  function sort() {
    var result = Array.prototype.sort.apply(this, arguments);
    emitter.emit('sort');
    return result;
  }

  var methods = {
    pop: pop,
    push: push,
    reverse: reverse,
    shift: shift,
    sort: sort,
    splice: splice,
    unshift: unshift
  };

  for (var method in methods) {
    arr[method] = methods[method];
  }

  emitter.data = arr;

  return emitter;
};