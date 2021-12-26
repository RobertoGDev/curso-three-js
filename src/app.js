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






// GEOMETRÍAS
const geometry = new THREE.BoxBufferGeometry(2,2,2) // Cambiamos a CylinderBufferGeometry y si rellenamos los datos necesarios


// TEXTURAS
const textureLoader = new THREE.TextureLoader();
// Como es muy pesado tener rutas a texturas escritas a mano contínuamente, las seteamos con:
textureLoader.setPath('./src/assets/textures/');
const baseColor = textureLoader.load('base_color.jpg');
const roughness = textureLoader.load('metallic_roughness.png');
const normalMap = textureLoader.load('normal_map.png');


// MATERIALES
const material = new THREE.MeshBasicMaterial({
    // color: new THREE.Color('teal').convertSRGBToLinear(),
    //wireframe: true,
    map: baseColor
})
material.opacity = .3;

const material_standar = new THREE.MeshStandardMaterial({
    // color: new THREE.Color('coral').convertSRGBToLinear(),
    map: baseColor,
    roughnessMap: roughness,
    normalMap: normalMap
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
const hemisphereLight = new THREE.HemisphereLight(0xfffffbb, 0x080820, 1.5)
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(.8, 2, 4);
scene.add(directionalLight);





// RENDER
const renderer = new THREE.WebGLRenderer({
    // Le pasamos atributos al renderer
    antialias: true, // Quitamos los bordes de sierra
    canvas: container
  
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//renderizar las luces de forma correcta
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;

// renderizamos en un bucle para que rote la malla y ejecutamos la función por primera vez
const loop = () => {
    mesh.rotateY(0.01);
    mesh2.rotateY(0.01);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => loop());
}

loop()