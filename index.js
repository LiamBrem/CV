import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//container for everything
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
//fullscreen canvas
renderer.setSize(window.innerWidth, window.innerHeight);

//render = draw
renderer.render(scene, camera);

/*
//creating an object
const geometry = new THREE.TorusKnotGeometry(10, 2.2077, 190, 10, 4, 5);
//standard = requires light basic = no light
const material = new THREE.MeshStandardMaterial({
  color: 0x81e3e1,
});

//mesh = combined
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
*/

//lighting - pointLight = 1 direction
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light, pointLight);

/*
//light helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
*/

//orbitController
const controls = new OrbitControls(camera, renderer.domElement);

//stars
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

//for loop draws stars
for (let i = 0; i < 500; i++) {
  addStar();
}

//loads the background
//const spaceTexture = new THREE.TextureLoader().load("space.jpg");
//scene.background = spaceTexture;

//moon
//const moonTexture = new THREE.TextureLoader().load("/dist/assets/moon.jpg");
//const normalTexture = new THREE.TextureLoader().load("/dist/assets/normal.jpg");

const object = new THREE.Mesh(
  new THREE.TorusKnotGeometry(5, 1.5, 74, 8, 2, 3),
  new THREE.MeshBasicMaterial({
    color: 0x3f00cc,
    wireframe: true,
  })
);

scene.add(object);

const center = new THREE.Vector3(0, 0, 0);

let radius = 25;
let angle = 0;
updateCamera();

// Function to update the camera position and look at the center point
function updateCamera() {
  // Calculate the new camera position
  let x = center.x + radius * Math.cos(angle);
  let z = center.z + radius * Math.sin(angle);
  let y = 0;

  // Update the camera position
  camera.position.set(x, y, z);

  // Update the camera's "look at" point
  camera.lookAt(center);
}

// Function to handle scroll events
function handleScroll(event) {
  // Adjust the radius based on the scroll delta
  angle += event.deltaY * 0.001; // Adjust the scroll sensitivity as needed

  // Limit the minimum and maximum radius values if desired
  // radius = Math.max(radius, minRadius);
  // radius = Math.min(radius, maxRadius);

  // Update the camera position
  updateCamera();
}

let mouseX = 0;
let mouseY = 0;

// Function to handle mouse movement
function onMouseMove(event) {
  // Calculate the normalized device coordinates (-1 to +1) based on the mouse position
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Add event listener for mouse movement
document.addEventListener("mousemove", onMouseMove, false);

//scroll event listener
window.addEventListener("wheel", handleScroll);

//game loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the sphere based on the mouse position
  object.rotation.z = mouseX * Math.PI;
  object.rotation.x = mouseY * Math.PI;
  object.rotation.y += 0.05;

  updateCamera();

  controls.update();

  renderer.render(scene, camera);
}

animate();
