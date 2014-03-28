var observe = require('array-observer');
var assert = require('assert');

describe('observe array', function(){
  var arr;

  beforeEach(function(){
    arr = observe([1,2,3]);
  })

  it('#push', function(done){
    arr.on('add', function(val, i){
      assert(val === 1);
      assert(i === 3);
      done()
    });
    arr.data.push(1);
  })

  it('#pop', function(done){
    arr.on('remove', function(val, i){
      assert(val === 3);
      assert(i === 2);
      done()
    });
    arr.data.pop();
  })

  it('#shift', function(done){
    arr.on('remove', function(val, i){
      assert(val == 1);
      assert(i === 0);
      done();
    });
    arr.data.shift();
  })

  it('#unshift', function(done){
    arr.on('add', function(val, i){
      assert(val == 4);
      assert(i === 0);
      done()
    });
    arr.data.unshift(4);
  })

  it('#splice add', function(done){
    arr.on('add', function(val, i){
      assert(val == 5);
      assert(i === 0);
      done()
    });
    arr.data.splice(0, 1, 5);
  })

  it('#splice remove', function(done){
    arr.on('remove', function(val, i){
      assert(val == 1);
      assert(i === 0);
      done()
    });
    arr.data.splice(0, 1);
  })

  it('#reverse', function(done){
    arr.on('sort', function(){ done() });
    arr.data.reverse();
  })

  it('#sort', function(done){
    arr.on('sort', function(){ done() });
    arr.data.sort();
  })
})