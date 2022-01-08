const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048],

};

const sketch = () => {
  const createGrid = (count) => {
    const points = []
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        console.log(x, y, u, v, count)
        points.push([u, v])
      }
    }
    return points
  }

  const points = createGrid(5)
  console.log('points', points)

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(([u, v]) => {
      const x = u * width
      const y = v * height

      context.beginPath()
      context.arc(x, y, 100, 0, Math.PI * 2)
      context.strokeStyle = 'black'
      context.lineWidth = 40
      context.stroke()

    })
  }
};

canvasSketch(sketch, settings);
