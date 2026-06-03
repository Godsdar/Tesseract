import { createVertices3d, createVertices4d } from "./createVertices";
import createEdges from "./createEdges";
import project4dTo3d from "./project4dTo3d";
import rotate4d from "./rotate4d";

export default function calculatePositions(angle) {
  const positions = [];
  const vertices = createVertices4d().map((vec) => rotate4d(vec, Date.now() * 0.001));
  const edges = createEdges(vertices);
  const projectedVertices = vertices.map((vec) => project4dTo3d(vec));
  console.log(vertices.length)
  edges.forEach((edge) => {
    positions.push(projectedVertices[edge[0]].x, projectedVertices[edge[0]].y, projectedVertices[edge[0]].z);
    positions.push(projectedVertices[edge[1]].x, projectedVertices[edge[1]].y, projectedVertices[edge[1]].z);
  });

  return positions;
}
