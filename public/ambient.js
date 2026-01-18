const canvas = document.getElementById('ambient-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // Canvas rendering is unavailable.
  } else {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [];
    const maxNodes = 12;
    const palette = [
      { hue: 42, saturation: 78, light: 60, alpha: 0.14 },
      { hue: 175, saturation: 62, light: 58, alpha: 0.12 },
      { hue: 12, saturation: 68, light: 60, alpha: 0.1 },
    ];

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
        const paletteIndex = Math.floor(Math.random() * palette.length);
        const color = palette[paletteIndex];
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 180 + Math.random() * 260,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          ...color,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      nodes.forEach((node) => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
        gradient.addColorStop(
          0,
          `hsla(${node.hue}, ${node.saturation}%, ${node.light}%, ${node.alpha})`
        );
        gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
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
