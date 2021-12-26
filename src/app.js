const container = document.querySelector('#game-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');


// CAMERA
const camera = new THREE.PerspectiveCamera(
    35, 
    container.clientWidth / container.clientHeight, // 
    0.1,
    1000
);

camera.position.set(0, 0, 15);



// MESH
const geometry = new THREE.BoxBufferGeometry(2,2,2) // Cambiamos a BoxGeometry por BoxBufferGeometry que es mas eficiente
const material = new THREE.MeshBasicMaterial({
    color: 'teal'
})
const box_mesh = new THREE.Mesh(geometry, material);
scene.add(box_mesh);

 



// RENDER
const renderer = new THREE.WebGLRenderer({
    // Le pasamos atributos al renderer
    antialias: true, // Quitamos los bordes de sierra
    canvas: container
  
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);






// Vamos a remover la caja! con scene.remove
setTimeout(() => { scene.remove(box_mesh) }, 2000)


// renderizamos en un bucle para que rote la malla y ejecutamos la función por primera vez
const loop = () => {
    box_mesh.rotateX(0.01);
    box_mesh.rotateY(0.01);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => loop());
}

loop()