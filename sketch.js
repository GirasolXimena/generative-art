const canvasSketch = require('canvas-sketch');
// lerp is Linear intERPolation
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],

};

const sketch = () => {

  const colorCount = random.rangeFloor(1, 6)

  const palette = random.shuffle(
    random.pick(palettes)
      .slice(0, Math.max(colorCount, 2))
  )
  const createGrid = (count) => {
    const points = []
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          color: random.pick(palette),
          radius: Math.abs(random.gaussian() * 0.01),
          position: [u, v]
        })
      }
    }
    return points
  }

  // random.setSeed(420)
  const points = createGrid(40).filter(() => random.value() > 0.5)
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(({ position: [u, v], radius, color }) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2)
      context.fillStyle = color
      context.lineWidth = 10
      context.fill()

    })
  }
};

canvasSketch(sketch, settings);
