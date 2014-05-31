tetris-prng
===========

A Fibonacci [linear feedback shift register](http://en.wikipedia.org/wiki/Linear_feedback_shift_register) used as a PRNG (Pseudo-random Number Generator), as in NES Tetris (described in http://meatfighter.com/nintendotetrisai/?a#Picking_Tetriminos).

If you just want the tetris values, here's the code:

```js
function tetris() {
  var value = 0x8988;
  return function() {
    var bit1 = (value >> 1) & 1;
    var bit9 = (value >> 9) & 1;
    var leftmostBit = bit1 ^ bit9;
    return (value = ((leftmostBit << 15) | (value >>> 1)) >>> 0);
  }
}
```

usage
------

```sh
npm install tetris-prng
```

```js
var tprng = require('tetris-prng');

// Pre-seeded with tetris-like values (2-65534, 32767 unique values).
tprng() // 17604
tprng() // 8802
tprng() // 4401
```

Or you can create your own given a seed value, taps (which bits to XOR), and the leftmost bit (cannot be greater than 31 (0-index) since bitwise operations in JS imply 32-bit integers).

```js
var tprng = require('tetris-prng');

// a seed of at least two-bytes (0x11) usually produces useful numbers
// The taps chosen were taken from
// http://www.xilinx.com/support/documentation/application_notes/xapp052.pdf
// in order to generate the longest sequence of random numbers.
// 31 implies the 31st bit, aka the largest possible number is
// 32-bits (0xFFFFFFFF, 4294967295)
var rand = tprng.lfsr(0xFFFFFFFF, [16,15,13,4], 31);

rand(); // 2147483647
rand(); // 1073741823
```

Each lfsr also contains a `random()` method that will return the next value in the sequence as a value between 0 and 1, just like `Math.random()`:

```js
var tprng = require('tetris-prng');
tprng.random(); // 0.2686198214694438
var rand = tprng.lfsr(0xFFFFFFFF, [16,15,13,4], 31);
rand.random(); // 0.4999999998835847
```

tests
-----

```
$ npm test
```

notes
-----

Running `npm run chart` will use [beefy](https://github.com/chrisdickinson/beefy) to serve a visualization of the distribution of a few different seed/tap combinations over time.

LFSRs generate a cyclic sequence of numbers, and are thus not cryptographically secure. However they can be used for games, especially when combined with user-input as a form of randomness. For example, one could trigger the LFSR each frame (or multiple times a frame), but only sample it when the user takes action, thus using time between actions as a form of random input.

I created this to both learn about LFSRs as well as have a super small PRNG for game experiments.

license
-------

MIT

