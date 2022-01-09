const canvasSketch = require('canvas-sketch');
// lerp is Linear intERPolation
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
random.setSeed(random.getRandomSeed())

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048],

};
// console.log(random.getSeed())
const sketch = () => {

  const colorCount = random.rangeFloor(1, 6)

  const palette = random.shuffle(
    random.pick(palettes)
      .slice(0, Math.max(colorCount, 2))
  )
  const createGrid = (count) => {
    // random.setSeed(429)
    const points = []
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.05

        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v],
          rotation: random.noise2D(u, v)
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

    points.forEach(({ position: [u, v], radius, color, rotation }) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.save()
      // context.beginPath()
      // context.arc(x, y, radius * width, 0, Math.PI * 2)
      context.fillStyle = color
      context.font = `${radius * width}px "Helvetica"`
      context.translate(x, y)
      context.rotate(rotation)
      // context.lineWidth = 10
      // context.fill()
      context.fillText(random.value() >= 0.5 ? '-' : '=', 0, 0)
      context.restore()

    })
  }
};

canvasSketch(sketch, settings);
