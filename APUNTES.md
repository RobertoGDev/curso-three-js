
## APUNTES THREE.JS

* Todo canvas o proyecto tiene que tener contenedor, cámara ,malla, escena y luces
* Todo lo que hagas tienes que añadirlo a la escena siempre
* Hay muchos helpers que ayudan a ver cosas como la luz, los ejes, etc.
* Debemos renderizar la luz de manera correcta con el método del 
```js
renderer.physicallyCorrectLights = true
```

## Material
### propiedades curiosas
flatShading: (bool): la redondez de los vértices
roughness: (int): la rugosidad, a 0 refleja la luz
emissive: (color): el color que reflejará
metalness: (int): la metalidad del material