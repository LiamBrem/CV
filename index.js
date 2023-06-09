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
    color: 0x6bcff6,
    wireframe: true,
  })
);

scene.add(object);
object.position.z = -10;
object.position.x = 8;

function moveCamera() {
  //where the user is currently scrolled to

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

  console.log(t);
}

document.body.onscroll = moveCamera;
moveCamera();

//game loop
function animate() {
  requestAnimationFrame(animate);
  object.rotation.y += 0.05;

  /*
  torus.rotation.x += 0.0;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.0;
  */

  controls.update();

  renderer.render(scene, camera);
}

animate();
