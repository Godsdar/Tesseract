import * as THREE from "three";

export default function rotate4d(v, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const w = v.y * sin + v.w * cos;
  const y = v.y * cos - v.w * sin;
  v.y = y;
  v.w = w;

  return v;
}
