global.THREE = require('three');
require('three/examples/js/controls/OrbitControls');

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes/1000.json')
const eases = require('eases')
const BezierEasing = require('bezier-easing')

const settings = {
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
  dimensions: [512, 512],
  fps: 24,
  duration: 4
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.OrthographicCamera();
  // camera.position.set(2, 2, 2);
  // camera.lookAt(new THREE.Vector3());

  // const controls = new THREE.OrbitControls(camera, context.canvas)

  // Setup your scene
  const scene = new THREE.Scene();

  const palette = random.pick(palettes)


  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);


  for (let i = 0; i < 40; i++) {
    // Create the mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: random.pick(palette),
      // roughness: 0.75,
      // flatShading: true
    }))
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.multiplyScalar(0.5)
    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight('hsl(0, 0%, 15%)'))
  const light = new THREE.DirectionalLight('white', 1)
  light.position.set(3, 2, 4)
  scene.add(light)

  const easeFn = BezierEasing(0.67, 0.03, 0.29, 0.99)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.5;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());


      camera.aspect = aspect

      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ playhead }) {
      // Rotate mesh
      const t = Math.sin(playhead * Math.PI);
      scene.rotation.z = easeFn(t)
      // scene.rotation.z = time / 50;
      // scene.rotation.x = time / 50;
      // controls.update()
      // Draw scene with our camera
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
      // controls.dispose()
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);