# Tesseract 4D Visualization

An interactive 4D hypercube (tesseract) rendered in the browser. The 16 vertices
of the hypercube are rotated in 4D, projected to 3D, and drawn as a wireframe
with [three.js](https://threejs.org/).

<!-- Add a screenshot/GIF here once captured: docs/tesseract.gif -->

## What it does

- Generates the 16 vertices of a tesseract and its 32 edges from scratch.
- Rotates vertices in the **y–w plane** each frame.
- Projects 4D points to 3D with a perspective divide (`1 / (distance - w)`).
- Renders the wireframe with `THREE.LineSegments` and adds orbit controls so
  you can move around the shape.

## The math

1. **Vertices** — all combinations of `{x, y, z, w}` in `{-1, 1}` → 16 points.
2. **Edges** — two vertices are neighbours when their indices differ by one bit
   (`j = i ^ (1 << b)`), which yields the 32 edges of a tesseract.
3. **Rotation** — an orthogonal rotation matrix in the y–w plane leaves the
   `y² + w²` radius unchanged.
4. **Projection** — `(x, y, z) / (distance - w)` gives the 3D shape, where the
   `w` coordinate controls depth.

The pure math lives in small modules so it can be tested without a browser.

## Tech stack

- JavaScript (ES modules)
- [three.js](https://threejs.org/) for rendering and orbit controls
- [Vite](https://vite.dev/) for dev server and build
- `node --test` for unit tests, ESLint for linting

## Run it (3 commands)

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests for the 4D math
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Project structure

```
src/
  createVertices.js      # 3D cube and 4D tesseract vertices
  createEdges.js         # 32 edges of a tesseract (bitwise neighbours)
  rotate4d.js            # rotation in the y-w plane
  project4dTo3d.js       # perspective divide 4D -> 3D
  calculatePositions.js  # rotate all vertices and flatten edges for the buffer
  main.js                # three.js scene, camera, animation loop
  math.test.js           # unit tests for the pure math
```

## What was tricky

- **Building the edges without hardcoding them** — the bitwise-neighbour trick
  derives all 32 edges from the vertex count, so it works for any hypercube
  dimension, not just 4D.
- **Keeping the projection stable** — when `w` approaches the camera distance
  the divide blows up; the viewer keeps `w` bounded by the rotation.
- **Separating math from rendering** — pulling `rotate4d`, `project4dTo3d` and
  edge generation into pure functions is what made the tests possible.

## Development notes (AI-assisted)

The first version was generated with AI agents and then reviewed and fixed:

- Unused imports (a leftover WebGPU material and a TSL attribute helper) were
  removed; they were dead code that only survived because the build tree-shakes.
- Stray `console.log` calls in the hot path (every animation frame) were dropped.
- The 4D math is now covered by six `node --test` cases (vertex counts, edge
  count, projection scaling, rotation invariant). CI runs lint + test + build.
- Anything purely visual (colour, framing, controls) is checked in the browser,
  not in tests.

## License

MIT — see [LICENSE](LICENSE).
