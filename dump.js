
//var tprng = require('./').lfsr(0xFFFFFFFF, [1, 9], 31);
var tprng = require('./').lfsr(0x1, [1, 9], 15);

var max = 0;
var min = Number.MAX_VALUE;
var uniques = {};

while(1) {
  var n = tprng();
  var n2 = ('00000000000000000000000000000000' + n.toString(2)).substr(-32);
  var n8 = ('00000000' + n.toString(16)).substr(-8);
  max = Math.max(max, n);
  min = Math.min(min, n);
  uniques[n] = true;
  console.log(n2, n8, n, min, max, Object.keys(uniques).length)
}
