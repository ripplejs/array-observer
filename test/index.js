var observable = require('observable-array');
var assert = require('assert');

describe('observable array', function(){

  it('should wrap an array', function(){
    var arr = observable([]);
  })

  it('should return an empty array if nothing is passed', function(){
    var arr = observable();
    assert(arr.push);
  })

  describe('emitting events', function(){
    var arr;

    beforeEach(function(){
      arr = observable([1,2,3]);
    })

    it('#push', function(done){
      arr.on('add', function(){ done() });
      arr.push(1);
    })

    it('#pop', function(done){
      arr.on('remove', function(){ done() });
      arr.pop();
    })

    it('#shift', function(done){
      arr.on('remove', function(){ done() });
      arr.shift();
    })

    it('#unshift', function(done){
      arr.on('add', function(){ done() });
      arr.unshift(4);
    })

    it('#splice add', function(done){
      arr.on('add', function(){ done() });
      arr.splice(0, 1, 5);
    })

    it('#splice remove', function(done){
      arr.on('remove', function(){ done() });
      arr.splice(0, 1);
    })

    it('#reverse', function(done){
      arr.on('sort', function(){ done() });
      arr.reverse();
    })

    it('#sort', function(done){
      arr.on('sort', function(){ done() });
      arr.sort();
    })

  })


})