var test = require('tape');
var tprng = require('./');

test('default seed', function(t) {
  t.equal(tprng(), 17604);
  t.equal(tprng(), 8802);
  t.equal(tprng(), 4401);
  t.end();
})

test('custom seed', function(t) {
  var rand = tprng.lfsr(1000, [1, 9], 15);
  t.equal(rand(), 33268);
  t.equal(rand(), 16634);
  t.equal(rand(), 41085);
  t.end();
})

test('range info', function(t) {

  t.ok(tprng.random());

  var rand = tprng.lfsr(1000, [1, 9], 15);
  t.equal(rand.maxValue, 65535);
  t.equal(rand.random(), 0.5076371404592965);
  t.equal(rand.random(), 0.25381857022964827);
  t.equal(rand.random(), 0.6269169146257725);

  var rand = tprng.lfsr(1000, [1, 9], 31);
  t.equal(rand.maxValue, 4294967295);
  t.equal(rand.random(), 0.5000001165317371);
  t.equal(rand.random(), 0.2500000582658686);
  t.equal(rand.random(), 0.6250000292493496);

  t.end();
})
