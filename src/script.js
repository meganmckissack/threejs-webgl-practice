import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import * as dat from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// part of the gui
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  }
}


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// const geometry = new THREE.BufferGeometry();
// // const positionsArray = new Float32Array(9);

// // array is a one-dimensional array where you specify the x, y, and z of the first vertex, followed by the x, y, and z of the second vertex, etc
// const positionsArray = new Float32Array([
//   0, 0, 0, // First vertex
//   0, 1, 0, // Second vertex
//   1, 0, 0  // Third vertex
// ]);

// // first parameter corresponds to your typed array and the second parameter corresponds to how much values make one vertex attribute (exampel is 3 x 3 since it's 3 valuse (x, y, z))
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// //first parameter is the name of this attribute and the second parameter is the value
// //'position' as the name because Three.js internal shaders will look for that value to position the vertices
// geometry.setAttribute('position', positionsAttribute);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
  // console.log('window has been resized');
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

});

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;  //to work with safari

  if(!fullscreenElement){
    if(canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if(canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } 
  } else {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
      }
    }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// Debug


const gui = new dat.GUI();
gui.add(mesh.position, 'y')
   .min(- 3)
   .max(3)
   .step(0.01)
   .name('elevation');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.addColor(parameters, 'color')
   .onChange(() => {
    material.color.set(parameters.color);
   });
gui.add(parameters, 'spin');