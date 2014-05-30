var test = require('tape');
var tprng = require('./');

test('default seed', function(t) {
  t.equal(tprng(), 17604);
  t.equal(tprng(), 8802);
  t.equal(tprng(), 4401);
  t.end();
})

test('custom seed', function(t) {
  var rand = tprng.seeded(1000);
  t.equal(rand(), 33268);
  t.equal(rand(), 16634);
  t.equal(rand(), 41085);
  t.end();
})
