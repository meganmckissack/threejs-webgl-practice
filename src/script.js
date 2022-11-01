import * as THREE from 'three';
//give us access to all the three.js elements
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(2);


//geomertry and mesh
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0xff0000 });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// scene.add(axesHelper);

// mesh.position.x = 0.75
// mesh.position.y = - 0.1
// mesh.position.z = 0.3

// mesh.scale.x = 1;
// mesh.scale.y = 1;
// mesh.scale.z = 1;

// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube1.position.x = - 1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube3.position.x = 1.5;
group.add(cube3);

const sizes = {
  width: 800,
  height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// camera.lookAt(mesh.position);

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
