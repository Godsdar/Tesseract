import * as THREE from "three";

export function createVertices3d() {
  const vertices = [];
  const range = [-1, 1];
  for (let x of range) {
    for (let y of range) {
      for (let z of range) {
        vertices.push(new THREE.Vector3(x, y, z));
      }
    }
  }

  return vertices;
}

export function createVertices4d() {
  const vertices = [];
  const range = [-1, 1];

  for (let x of range) {
    for (let y of range) {
      for (let z of range) {
        for (let w of range) {
          vertices.push(new THREE.Vector4(x, y, z, w));
        }
      }
    }
  }

  return vertices;
}
