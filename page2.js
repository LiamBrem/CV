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

//lighting - pointLight = 1 direction
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light, pointLight);

//orbitController
const controls = new OrbitControls(camera, renderer.domElement);

const object = new THREE.Mesh(
  new THREE.TorusKnotGeometry(5, 1.5, 74, 8, 2, 3),
  new THREE.MeshBasicMaterial({
    color: 0x3f00cc,
    wireframe: true,
  })
);

scene.add(object);

//game loop
function animate() {
  requestAnimationFrame(animate);

  object.rotation.y += 0.05;

  controls.update();

  renderer.render(scene, camera);
}

animate();
