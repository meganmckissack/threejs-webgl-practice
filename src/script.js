import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//gives us access to all the three.js elements
const scene = new THREE.Scene();


//Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = - (event.clientY / sizes.height - 0.5); 

  console.log(event.clientX, event.clientY);
});

//Canvas
const canvas = document.querySelector('canvas.webgl');

//geometry and mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.position.x = 0.75
mesh.position.y = - 0.1
mesh.position.z = 0.3

const sizes = {
  width: 800,
  height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2;
controls.enableDamping = true; //to make the animation smoother


//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);




//Animation
const tick = () => {
  //update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  //update controls
  controls.update();

  // renderer
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();
