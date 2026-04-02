export function initCanvasAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return () => {};

  class Perlin {
    p: number[];
    constructor() {
      this.p = [];
      const perm = [];
      for (let i = 0; i < 256; i++) perm[i] = i;
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255];
    }
    fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(a: number, b: number, t: number) { return a + t * (b - a); }
    grad(hash: number, x: number, y: number) {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    noise(x: number, y: number) {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = this.fade(x), v = this.fade(y);
      const A = this.p[X] + Y, B = this.p[X + 1] + Y;
      return this.lerp(
        this.lerp(this.grad(this.p[A], x, y), this.grad(this.p[B], x - 1, y), u),
        this.lerp(this.grad(this.p[A + 1], x, y - 1), this.grad(this.p[B + 1], x - 1, y - 1), u),
        v
      );
    }
  }

  const perlin = new Perlin();
  let heroAnimId: number;
  let insightAnimId: number;

  function initHeroFlow() {
    const canvas = document.getElementById('flowCanvas') as HTMLCanvasElement;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let w: number, h: number;
    let particles: any[] = [];
    let mouseX = -1000, mouseY = -1000;
    let PARTICLE_COUNT = 0;
    const SCALE = 0.0018;
    let time = 0;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx!.scale(dpr, dpr);
      PARTICLE_COUNT = Math.min(60, Math.floor(window.innerWidth / 25));
      initParticles();
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0, vy: 0,
          life: Math.random() * 250 + 150,
          maxLife: 400,
          size: Math.random() * 2 + 1.2,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      time += 0.0025;

      for (let p of particles) {
        const angle = perlin.noise(p.x * SCALE, p.y * SCALE + time) * Math.PI * 4;
        const speed = 0.4 + perlin.noise(p.x * SCALE + 100, p.y * SCALE + time) * 0.7;

        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let mx = 0, my = 0;
        if (dist < 250 && dist > 0) {
          const force = (1 - dist / 250) * 0.8;
          mx = -(dx / dist) * force;
          my = -(dy / dist) * force;
        }

        p.vx += (Math.cos(angle) * speed + mx - p.vx) * 0.06;
        p.vy += (Math.sin(angle) * speed + my - p.vy) * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0 || p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.vx = 0; p.vy = 0;
          p.life = Math.random() * 250 + 150;
        }

        p.alpha = Math.min(p.life / 50, 1, (p.maxLife - p.life) / 50);
      }

      const CONNECTION_DIST = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.12 * Math.min(a.alpha, b.alpha);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(120, 95, 50, ${lineAlpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      for (let p of particles) {
        const alpha = p.alpha * 0.55;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(100, 80, 42, ${alpha})`;
        ctx!.fill();

        const vel = Math.abs(p.vx) + Math.abs(p.vy);
        if (vel > 0.2) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
          ctx!.strokeStyle = `rgba(100, 80, 42, ${alpha * 0.35})`;
          ctx!.lineWidth = p.size * 0.6;
          ctx!.stroke();
        }
      }

      heroAnimId = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000; mouseY = -1000;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', () => { cancelAnimationFrame(heroAnimId); resize(); });
    
    resize();
    draw();
  }

  function initInsightCanvas() {
    const canvas = document.getElementById('insightCanvas') as HTMLCanvasElement;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let w: number, h: number;
    const dots: any[] = [];
    const COUNT = 40;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx!.scale(dpr, dpr);
    }

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.0003 + 0.00015,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);

      const positions = dots.map(d => ({
        x: d.x * w + Math.sin(t * d.speed * 6 + d.phase) * 40,
        y: d.y * h + Math.cos(t * d.speed * 4 + d.phase) * 25,
        r: d.r,
        alpha: 0.35 + Math.sin(t * d.speed * 3 + d.phase) * 0.15,
      }));

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const a = positions[i], b = positions[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const la = (1 - dist / 150) * 0.08;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(184, 161, 117, ${la})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      for (const p of positions) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(184, 161, 117, ${p.alpha})`;
        ctx!.fill();
      }
      insightAnimId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { resize(); draw(0); }
      else { cancelAnimationFrame(insightAnimId); }
    }, { threshold: 0.1 });
    observer.observe(canvas.parentElement);

    window.addEventListener('resize', resize);
  }

  initHeroFlow();
  initInsightCanvas();

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.r').forEach(el => obs.observe(el));

  return () => {
    cancelAnimationFrame(heroAnimId);
    cancelAnimationFrame(insightAnimId);
    obs.disconnect();
  };
}
