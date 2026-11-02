import { reducedMotion } from '../animations/config';

/*
 * Il campo di puntini dietro l'apertura (l'equivalente leggero della scena
 * WebGL di reflection.ai): anelli concentrici di punti, visti di scorcio
 * come la superficie di un lago, che respirano piano e ruotano appena; il
 * puntatore li allontana un poco. Un solo <canvas> 2D, ridisegnato solo
 * quando la sezione è in vista e la scheda è visibile. Con «riduci
 * movimento» un fotogramma fermo. Colore: il grigio-oliva dei loro punti.
 */
const DOT = 'rgb(118 122 102 / 0.78)';
const RINGS = 14;

interface Point {
  /** Angolo e raggio nominali sull'ellisse. */
  a: number;
  r: number;
  /** Rumore proprio: fase e ampiezza del respiro. */
  phase: number;
  amp: number;
  size: number;
}

export function mountHeroCanvas(host: HTMLElement): void {
  const canvas = document.createElement('canvas');
  host.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let points: Point[] = [];
  let mouse = { x: -1e9, y: -1e9 };
  let raf = 0;
  let visible = true;
  const still = reducedMotion();
  const start = performance.now();

  const build = (): void => {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    points = [];
    const maxR = Math.max(width, height) * 0.78;
    for (let ring = 1; ring <= RINGS; ring++) {
      const r = (ring / RINGS) * maxR;
      const count = Math.round(18 + ring * 11 * (width < 760 ? 0.7 : 1));
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ring * 0.37;
        points.push({ a, r, phase: Math.random() * Math.PI * 2, amp: 4 + Math.random() * 10, size: 1.6 + Math.random() * 1.9 });
      }
    }
  };

  const draw = (now: number): void => {
    const t = still ? 0 : (now - start) / 1000;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = DOT;
    const cx = width / 2;
    // il centro degli anelli sta sotto il testo: la scena è un lago visto da riva
    const cy = height * 0.62;
    const squash = 0.42; // l'ellisse: gli anelli sono visti di scorcio
    const spin = t * 0.025;
    const hover = 0.012;
    for (const p of points) {
      const breathe = Math.sin(t * 0.5 + p.phase) * p.amp;
      const r = p.r + breathe;
      const a = p.a + spin + Math.sin(t * 0.3 + p.phase) * hover;
      let x = cx + Math.cos(a) * r;
      let y = cy + Math.sin(a) * r * squash;
      // il puntatore allontana i punti vicini
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 160 * 160) {
        const d = Math.sqrt(d2) || 1;
        const push = ((160 - d) / 160) * 18;
        x += (dx / d) * push;
        y += (dy / d) * push;
      }
      if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
      // i punti lontani dal centro sono più grandi: prospettiva al contrario, come la loro scena
      const depth = 0.55 + (r / (Math.max(width, height) * 0.78)) * 0.75;
      ctx.beginPath();
      ctx.arc(x, y, p.size * depth, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (now: number): void => {
    raf = 0;
    draw(now);
    if (!still && visible) raf = window.requestAnimationFrame(loop);
  };

  const run = (): void => {
    if (raf) return;
    raf = window.requestAnimationFrame(loop);
  };

  build();
  run();

  const ro = new ResizeObserver(() => {
    build();
    if (still) draw(performance.now());
  });
  ro.observe(host);

  host.parentElement?.addEventListener(
    'pointermove',
    (event) => {
      const rect = host.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (still) draw(performance.now());
    },
    { passive: true },
  );
  host.parentElement?.addEventListener('pointerleave', () => {
    mouse = { x: -1e9, y: -1e9 };
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting) && document.visibilityState === 'visible';
        if (visible) run();
      },
      { threshold: 0 },
    ).observe(host);
  }
  document.addEventListener('visibilitychange', () => {
    visible = document.visibilityState === 'visible';
    if (visible) run();
  });
}
