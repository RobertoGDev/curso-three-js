const container = document.querySelector('#game-container');



// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');





// CAMERA
const camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // ASPECT
    0.1, // near
    1000 // far
);
camera.position.set(0, 0, 15);






// MESH (Cilindro)
const geometry = new THREE.CylinderBufferGeometry(1, 1, 3, 8) // Cambiamos a CylinderBufferGeometry y si rellenamos los datos necesarios

const material = new THREE.MeshBasicMaterial({
    color: 'teal',
    //wireframe: true
})
material.opacity = .3;



const material_standar = new THREE.MeshStandardMaterial({
    color: 'coral'
})

// cilindro 1
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateZ(THREE.MathUtils.degToRad(90)) //Vamos a girar la malla, para eso mesh tiene métodos como son rotate que permite rotar, pero no funciona con los grados directamente porque solo admite radianes, por ello THREE tiene un helper para operaciones matemáticas que está muy bien: MathUtils
mesh.position.set(-3, 0, 0)
scene.add(mesh);

// cilindro 2
const mesh2 = new THREE.Mesh(geometry, material_standar);
mesh2.rotateZ(THREE.MathUtils.degToRad(90))
mesh2.position.set(3, 0, 0)
scene.add(mesh2);




// LUCES

// const ambien_light = new THREE.AmbientLight(0xfffffff, 1);
// scene.add(ambien_light);
const hemisphereLight = new THREE.HemisphereLight(0xfffffff, 0x080820, 1);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(.8, 2, 4);
scene.add(directionalLight);





// HELPERS (son utilidades que permiten operaciones sin complicarte)
// Ver los ejes
const helperAxes = new THREE.AxesHelper(40)
scene.add(helperAxes);

// Ver las luces direccionales
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Ver las luces hemisféricas
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
scene.add(hemisphereLightHelper);





// RENDER
const renderer = new THREE.WebGLRenderer({
    // Le pasamos atributos al renderer
    antialias: true, // Quitamos los bordes de sierra
    canvas: container
  
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//renderizar las luces de forma correcta
renderer.physicallyCorrectLights = true

// renderizamos en un bucle para que rote la malla y ejecutamos la función por primera vez
const loop = () => {
    mesh.rotateY(0.01);
    mesh2.rotateY(0.01);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => loop());
}

loop()