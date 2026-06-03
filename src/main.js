import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { MeshBasicNodeMaterial } from "three/webgpu";
import calculatePositions from "./calculatePositions.js";
import { bufferAttribute } from "three/src/nodes/TSL.js";

let scene, camera, renderer, geometry, positions, tesseract;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });

  scene.background = new THREE.Color(0x111);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 7;

  const angle = 0.000001;
  positions = calculatePositions(angle);
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.attributes.position.needsUpdate = true;

  const material = new THREE.LineBasicMaterial({
    color: "yellowgreen",
  });

  tesseract = new THREE.LineSegments(geometry, material);
  scene.add(tesseract);
}

function animate() {
  // // tesseract.rotation.x += 0.005;
  // // tesseract.rotation.y += 0.005;
  positions = calculatePositions();

  tesseract.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  positions = calculatePositions(Date.now() * 0.0005);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  geometry.needsUpdate = true;
  renderer.render(scene, camera);
}

init();
