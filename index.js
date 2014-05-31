function lfsr(seed, taps, leftmostBitIndex) {
  var tapDefs = taps.map(function(tap, i) {
    return 'var bit' + i + ' = (value >> ' + tap + ') & 1;'
  }).join('\n')

  var tapXOR = taps.map(function(tap, i) {
    return 'bit' + i;
  }).join(' ^ ')

  var body = ''
    + 'var value = ' + seed + ' >>> 0;\n'
    + 'return function() { \n'
      + tapDefs + ' \n'
      + 'var leftmostBit = ' + tapXOR + '; \n'
      + 'return (value = ((leftmostBit << ' + leftmostBitIndex + ') | (value >>> 1)) >>> 0); \n'
    + '} \n'

  var fn = new Function(body);
  return attachAPI(leftmostBitIndex, fn());
}

function attachAPI(leftmostBitIndex, fn) {
  var max = parseInt(Array(leftmostBitIndex+2).join(1), 2);
  fn.maxValue = max;
  fn.random = function() {
    return (fn() / max);
  }
  return fn;
}

// Not worth golfing!
// http://jsperf.com/tetris-prng-inlined-vs-variables

function tetris() {
  var value = 0x8988;
  return function() {
    var bit1 = (value >> 1) & 1;
    var bit9 = (value >> 9) & 1;
    var leftmostBit = bit1 ^ bit9;
    return (value = ((leftmostBit << 15) | (value >>> 1)) >>> 0);
  }
}

module.exports = attachAPI(15, tetris());
module.exports.lfsr = lfsr;
