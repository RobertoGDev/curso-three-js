import * as THREE from "../../node_modules/three/build/three.module.js";
import Cube from "../objects/Cube.js";

class Scene1 extends THREE.Scene {
  constructor() {
    super();
    this.background = new THREE.Color("skyblue").convertSRGBToLinear();
    this.create();
  }

    create() {
      
    this.cube = new Cube();
    this.add(this.cube);

    // const ambient_light = new THREE.AmbientLight(0xfffffff, 1);
    // this.add(ambient_light);
    const hemisphereLight = new THREE.HemisphereLight(0xfffffbb, 0x080820, 1.5);
    this.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0.8, 2, 4);
    this.add(directionalLight);
    }
    
    update() {
      this.cube.rotateX(0.01);
      this.cube.rotateY(-0.01);
    }
}

export default Scene1;
