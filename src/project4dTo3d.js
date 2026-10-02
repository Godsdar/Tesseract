
import * as THREE from 'three';

export default function project4dTo3d(vec, distance = 2) {
  const wFactor = 1 / (distance - vec.w);
  return new THREE.Vector3(vec.x * wFactor, vec.y * wFactor, vec.z * wFactor);
}
