function next(tap1, tap2, leftmostBitIndex, value) {
  var bit1 = (value >> tap1) & 1;
  var bit9 = (value >> tap2) & 1;
  var leftmostBit = bit1 ^ bit9;
  // >>> 0 is to ensure we don't become signed accidentally.
  return ((leftmostBit << leftmostBitIndex) | (value >>> 1)) >>> 0;
}

function seeded(seed, opt_tap1, opt_tap2, opt_leftmostBitIndex) {
  opt_tap1 = opt_tap1 || 1;
  opt_tap2 = opt_tap2 || 9;
  opt_leftmostBitIndex = opt_leftmostBitIndex || 15;
  var last = seed >>> 0; // ensure significant 32 bits are used
  return function() {
    return (last = next(opt_tap1, opt_tap2, opt_leftmostBitIndex, last));
  }
}

module.exports = seeded(0x8988, 1, 9, 15)
module.exports.seeded = seeded;
