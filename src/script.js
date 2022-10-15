import * as THREE from 'three';
//give us access to all the three.js elements
const scene = new THREE.Scene();

//geomertry and mesh
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
