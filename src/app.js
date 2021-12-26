// cualquier canvas está compuesto de escena, cámara y malla, todo eso se renderíza dentro del canvas 



// Primeramente definimos el contenedor que va a ubicar la escena
const container = document.querySelector('#game-container');



// Ahora creamos la escena con THREE y le damos color
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');



// Creamos la cámara con los valores necesarios que son:
// * campo de visión en grados
// * specratio (división del Ancho y alto de la pantalla)
// * que tan cerca van a renderizarse los objetos
// * que tan lejos en metros van a renderizarse los objetos (en metros)
// Posicionamos la cámara en X, Y, Z, por defecto los objetos se crean en 0, 0, 0
const camera = new THREE.PerspectiveCamera(
    35, 
    container.clientWidth / container.clientHeight, // 
    0.1,
    1000
);


camera.position.set(0, 0, 15); // Con camera.position.copy() copiamos los parámetros de posición de otro objeto



// Creamos los elementos para la malla que son una caja de 2 unidades en X, Y, Z y un material con un color. Después creamos la malla con la geometria y el material y finalmente lo añadimos a la scene
const geometry = new THREE.BoxGeometry(2,2,2)
const material = new THREE.MeshBasicMaterial({
    color: 'teal'
})
const box_mesh = new THREE.Mesh(geometry, material);
scene.add(box_mesh);

//camera.lookAt(box_mesh.position); // Si deseamos decir a la cámara que mire a la malla usamos lookAt

 


// Por último creamos un Renderer que renderizará todo el contenido en el contenedor, debemos setear su tamaño, su pixelratio e incrustarlo en el contenedor (canvas)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);



// renderizamos en un bucle para que rote la malla y ejecutamos la función por primera vez
const loop = () => {
    box_mesh.rotateX(0.01);
    box_mesh.rotateY(0.01);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => loop());
}

loop()