import * as THREE from "../node_modules/three/build/three.module.js";
import Scene1 from "./scenes/Scene1.js";

class App {
  constructor(container) {
    this.container = container;

    // ESCENA
    this.scene = new Scene1();
    this.scene.background = new THREE.Color("skyblue");

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(
      35, // FOV
      container.clientWidth / container.clientHeight, // ASPECT
      0.1, // near
      1000 // far
    );
    this.camera.position.set(0, 0, 15);

    // RENDER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: container,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.render()
  }

  // renderizamos en un bucle para que rote la malla y ejecutamos la función por primera vez
  render() {
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(() => this.render());
  }
}

export default App;
