const canvas = document.getElementById('ambient-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // Canvas rendering is unavailable.
  } else {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodes = [];
  const maxNodes = 14;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedNodes() {
    nodes.length = 0;
    for (let i = 0; i < maxNodes; i += 1) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 160 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: 30 + Math.random() * 160,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    nodes.forEach((node) => {
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
      gradient.addColorStop(0, `hsla(${node.hue}, 70%, 70%, 0.18)`);
      gradient.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(node.x - node.r, node.y - node.r, node.r * 2, node.r * 2);

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -node.r || node.x > window.innerWidth + node.r) {
        node.vx *= -1;
      }
      if (node.y < -node.r || node.y > window.innerHeight + node.r) {
        node.vy *= -1;
      }
    });

    if (!prefersReduced) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  seedNodes();
  draw();

    window.addEventListener('resize', () => {
      resize();
      seedNodes();
      draw();
    });
  }
}
