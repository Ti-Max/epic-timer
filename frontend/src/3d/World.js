import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
let camera;
let renderer;
let scene;

class World {
  constructor(container) {
    container = container
    renderer = new WebGLRenderer({ antialias: true });
    container.append(renderer.domElement)

    camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(-10, 3, 0);

    scene = new Scene();
    scene.background = new Color("#FF0000")

    this.resize();
  }

  start(){
    this.render();
  }
  render() {
    renderer.render(scene, camera);
  }

  resize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export default World;
