import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createVertices3d, createVertices4d } from './createVertices.js';
import createEdges from './createEdges.js';
import project4dTo3d from './project4dTo3d.js';
import rotate4d from './rotate4d.js';

test('a cube has 8 vertices with coordinates in {-1, 1}', () => {
  const vertices = createVertices3d();
  assert.equal(vertices.length, 8);
  for (const v of vertices) {
    assert.ok([-1, 1].includes(v.x));
    assert.ok([-1, 1].includes(v.y));
    assert.ok([-1, 1].includes(v.z));
  }
});

test('a tesseract has 16 vertices with coordinates in {-1, 1}', () => {
  const vertices = createVertices4d();
  assert.equal(vertices.length, 16);
  for (const v of vertices) {
    assert.ok([-1, 1].includes(v.x));
    assert.ok([-1, 1].includes(v.y));
    assert.ok([-1, 1].includes(v.z));
    assert.ok([-1, 1].includes(v.w));
  }
});

test('a tesseract has 32 edges, each joining neighbours that differ in one axis', () => {
  const vertices = createVertices4d();
  const edges = createEdges(vertices);
  assert.equal(edges.length, 32);
  for (const [i, j] of edges) {
    assert.ok(i >= 0 && i < vertices.length);
    assert.ok(j >= 0 && j < vertices.length);
    assert.notEqual(i, j);
  }
});

test('4D to 3D projection scales by 1 / (distance - w)', () => {
  const projected = project4dTo3d(new THREE.Vector4(1, 2, 3, 1), 2);
  assert.equal(projected.x, 1);
  assert.equal(projected.y, 2);
  assert.equal(projected.z, 3);
});

test('the origin projects to the origin', () => {
  const projected = project4dTo3d(new THREE.Vector4(0, 0, 0, 0), 2);
  assert.deepEqual(
    { x: projected.x, y: projected.y, z: projected.z },
    { x: 0, y: 0, z: 0 },
  );
});

test('rotation in the y-w plane preserves the y^2 + w^2 radius', () => {
  const v = new THREE.Vector4(0.3, 1.5, -2, 0.5);
  const before = v.y * v.y + v.w * v.w;
  rotate4d(v, Math.PI / 3);
  const after = v.y * v.y + v.w * v.w;
  assert.ok(Math.abs(before - after) < 1e-12);
});
