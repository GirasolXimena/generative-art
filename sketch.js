const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048],
  // orientation: 'landscape',
  // units: 'in',
  // pixelsPerInch: 300
};

const sketch = () => ({ context, width, height }) => {
  context.fillStyle = 'purple';
  context.fillRect(0, 0, width, height);
  context.beginPath()
  context.arc(width / 2, height / 2, width * 0.2, 0, 2 * Math.PI)
  context.fillStyle = 'orange'
  context.lineWidth = 1;
  context.strokeStyle = 'green'
  context.fill()
  context.stroke()
};

canvasSketch(sketch, settings);
