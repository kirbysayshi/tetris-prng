var tprng = require('./');

init(tprng, 600, 1, 'Tetris seed, 16 bits, (range 0-65535)', 65000);
init(tprng.seeded(0x8988, 1, 9, 31), 600, 1, 'Tetris seed, 32 bits');
//init(tprng.seeded(0x0, 1, 9, 31), 600, 1, '0 seed, 32 bits');
init(tprng.seeded(0xFFFFFFFF, 1, 9, 31), 600, 1, '0xFFFFFFFF seed, 32 bits');
//init(tprng.seeded(0x1, 1, 9, 31), 600, 1, '0x1 seed, 32 bits');

function init(gen, renderWidth, renderHeight, label, scale) {
  scale = scale || 1;

  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = renderWidth;
  cvs.height = renderHeight;
  var p = document.createElement('p');
  p.textContent = label;
  var container = document.createElement('div');
  container.appendChild(cvs);
  container.appendChild(p);
  document.body.appendChild(container);

  var style = document.createElement('style');
  style.textContent = 'p { margin-top: 0; font-size: 10px; }';
  document.head.appendChild(style);

  var lastNumbers = Array(10000).join(0).split('').map(function() { return -1 });

  (function render() {
    lastNumbers.shift();
    lastNumbers.push(gen());

    ctx.clearRect(0, 0, renderWidth, renderHeight);
    var imgdata = ctx.getImageData(0, 0, renderWidth, renderHeight);

    for (var i = 0; i < lastNumbers.length; i++) {
      var alpha = Math.floor(i / (lastNumbers.length - 1) * 255);
      var value = lastNumbers[i];
      var x = Math.floor((value / 0xFFFFFFFF) * renderWidth * scale);
      var y = renderHeight / 2;

      if (x < 0) continue;

      //if (x > 1) debugger;
      // HSL: hue 0-360, saturation 0-100%, lightness 0-100%
      imgdata.data[x+0] = 0;
      imgdata.data[x+1] = 0;
      imgdata.data[x+2] = 0;
      imgdata.data[x+3] = alpha;
    }

    ctx.putImageData(imgdata, 0, 0);

    requestAnimationFrame(render);
  }())
}
