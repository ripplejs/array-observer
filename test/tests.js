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
    arr.push(1);
  })

  it('#pop', function(done){
    arr.on('remove', function(val, i){
      assert(val === 3);
      assert(i === 2);
      done()
    });
    arr.pop();
  })

  it('#shift', function(done){
    arr.on('remove', function(val, i){
      assert(val == 1);
      assert(i === 0);
      done();
    });
    arr.shift();
  })

  it('#unshift', function(done){
    arr.on('add', function(val, i){
      assert(val == 4);
      assert(i === 0);
      done()
    });
    arr.unshift(4);
  })

  it('#splice add', function(done){
    arr.on('add', function(val, i){
      assert(val == 5);
      assert(i === 0);
      done()
    });
    arr.splice(0, 1, 5);
  })

  it('#splice remove', function(done){
    arr.on('remove', function(val, i){
      assert(val == 1);
      assert(i === 0);
      done()
    });
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

  describe('change events', function () {

    it('push', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.push(1);
    });

    it('pop', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.pop();
    });

    it('shift', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.shift();
    });

    it('unshift', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.unshift(1);
    });

    it('reverse', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.reverse();
    });

    it('sort', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.sort();
    });

    it('splice add', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.splice(0, 1, 5);
    });

    it('splice remove', function (done) {
      arr.on('change', function(){
        done();
      });
      arr.splice(0, 1);
    });
  });

})