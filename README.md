# Tesseract

A 4D hypercube (tesseract) rendered in the browser.

![4D tesseract wireframe](docs/tesseract.png)

## What it does

- Builds the 16 vertices and 32 edges of a tesseract in code.
- Rotates them in the y-w plane every frame.
- Projects 4D to 3D with a perspective divide, then draws the wireframe.
- Orbit controls let you move around the shape.

## Stack

JavaScript, three.js, Vite, `node --test`, ESLint.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # tests for the 4D math
npm run build    # production build
```

## What was hard

Deriving the 32 edges without hardcoding them was the interesting part. Two
vertices are neighbours when their indices differ by one bit, so the same code
would work for any hypercube, not only 4D. Keeping the math in small pure
functions is what made the tests possible; the render loop stays separate.
