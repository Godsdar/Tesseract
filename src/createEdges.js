export default function createEdges(vertices) {
  const n = vertices.length;
  // попытка получить D = log2(n)
  const D = Math.round(Math.log2(n));
  if ((1 << D) === n) {
    // побитовый метод: для каждой вершины включаем ребро в каждое направление b (j = i ^ (1<<b))
    const pairs = [];
    for (let i = 0; i < n; i++) {
      for (let b = 0; b < D; b++) {
        const j = i ^ (1 << b);
        if (j > i) pairs.push([i, j]); // добавляем ребро один раз
      }
    }
    return pairs; // для 4D: 32 пар
  }

  // fallback (редко нужен): сравнение координат с эпсилон
  function diffCount(v1, v2, eps = 1e-6) {
    let diff = 0;
    for (const key of Object.keys(v1)) {
      if (Math.abs((v1[key] || 0) - (v2[key] || 0)) > eps) diff++;
    }
    return diff;
  }

  const pairs = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (diffCount(vertices[i], vertices[j]) === 1) pairs.push([i, j]);
    }
  }
  return pairs;
}
