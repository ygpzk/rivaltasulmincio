import { reducedMotion } from '../animations/config';

/*
 * La frase che si accende parola per parola scorrendo (il «statement» di
 * reflection.ai): ogni parola ha `--i`, il contenitore riceve `--lit`, e
 * l'opacità di ciascuna è clamp(0.32, 0.32 + (lit − i) / 3, 1). Qui `--lit`
 * segue la posizione del blocco nella finestra: quando il suo centro entra
 * dal basso è 0, a metà schermo tutte le parole sono accese. Con «riduci
 * movimento» tutto acceso da subito. Senza JavaScript il CSS tiene `--lit`
 * alto.
 */
export function mountStatement(block: HTMLElement): void {
  const words = block.querySelectorAll<HTMLElement>('[style*="--i"]').length;
  if (words === 0) return;
  if (reducedMotion()) {
    block.style.setProperty('--lit', String(words + 3));
    return;
  }

  let ticking = false;
  const update = (): void => {
    ticking = false;
    const rect = block.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 quando il blocco è appena sotto il bordo basso, 1 quando il suo centro è al 45 % dell'altezza
    const startY = vh * 0.95;
    const endY = vh * 0.45;
    const center = rect.top + rect.height / 2;
    const progress = Math.min(1, Math.max(0, (startY - center) / (startY - endY)));
    block.style.setProperty('--lit', (progress * (words + 3)).toFixed(2));
  };

  const request = (): void => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
}
