/**
 * An example of a Sol LeWitt inspired "Wall Drawing" using
 * a simple generative algorithm.
 *
 * The instructions for this mural:
 *
 * - Using a 6x6 grid of evenly spaced points
 * - Connect two random points on the grid; forming a trapezoid with two parallel sides extending down
 * - Fill the trapezoid with a colour, then stroke with the background colour
 * - Find another two random points and repeat; continuing until all grid points are exhausted
 * - Layer the shapes by the average Y position of their two grid points
 */

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes/1000.json');

const settings = {
  dimensions: [2048, 1024]
};

const sketch = ({ width, height }) => {
  const nColors = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, nColors);
  const background = 'white';

  // Padding around edges
  const margin = 0;

  const createGrid = () => {
    const xCount = 6;
    const yCount = 6;
    const points = [];
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        const u = x / (xCount - 1);
        const v = y / (yCount - 1);
        const px = lerp(margin, width - margin, u);
        const py = lerp(margin, height - margin, v);
        points.push([px, py]);
      }
    }
    return points;
  };

  let grid = createGrid();

  let shapes = [];

  while (grid.length > 2) {
    const pointsToRemove = random.shuffle(grid).slice(0, 2);

    if (pointsToRemove.length < 2) {
      break;
    }

    grid = grid.filter(p => !pointsToRemove.includes(p));

    const [a, b] = pointsToRemove;
    const [x1, y1] = a
    const [x2, y2] = b

    shapes.push({
      color: random.pick(palette),
      path: [
        [x1, height - margin],
        a,
        b,
        [x2, height - margin]
      ],
      // average height of both points to layer
      y: (y1 + y2) / 2
    });
  }

  shapes.sort(({ y: y1 }, { y: y2 }) => y1 - y2);

  return ({ context, width, height }) => {
    context.globalAlpha = 1;
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    shapes.forEach(({ path, color }) => {
      context.beginPath();
      path.forEach(([x, y]) => {
        context.lineTo(x, y);
      });
      context.closePath();

      // Draw the trapezoid with a specific colour
      context.lineWidth = 20;
      context.globalAlpha = 0.85;
      context.fillStyle = color;
      context.fill();

      // Outline at full opacity
      context.lineJoin = context.lineCap = 'round';
      context.strokeStyle = background;
      context.globalAlpha = 1;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);