import { motion, reducedMotion } from '../animations/config';

/*
 * L'archivio, lato client.
 *
 * Il confronto: con JavaScript le due fotografie si sovrappongono e la
 * linea si trascina (un <input type="range"> trasparente sopra tutto, così
 * funziona anche da tastiera). Quando la figura entra in vista, la fotografia
 * di prima entra da sinistra fino a metà; chi tocca prima la linea
 * interrompe l'ingresso. Con «riduci movimento» parte già a metà.
 */
const SWEEP_MS = 1400;
const SAFETY_MS = 4000;

export function mountCompare(figure: HTMLElement): void {
  const stage = figure.querySelector<HTMLElement>('.compare__stage');
  const input = figure.querySelector<HTMLInputElement>('input[type="range"]');
  if (!stage || !input) return;

  const set = (value: number): void => {
    stage.style.setProperty('--split', `${value}%`);
    input.value = String(value);
  };

  figure.dataset.ready = '';
  input.addEventListener('input', () => stage.style.setProperty('--split', `${input.value}%`));

  if (reducedMotion() || !('IntersectionObserver' in window)) {
    set(50);
    return;
  }

  /*
   * L'ingresso è un'animazione della proprietà `--split` (registrata in
   * archivio.css con @property, così si interpola): chi tocca la linea la
   * annulla e resta padrone del valore.
   */
  let touched = false;
  let entering: Animation | undefined;
  const touch = (): void => {
    touched = true;
    entering?.cancel();
  };
  input.addEventListener('pointerdown', touch, { once: true });
  input.addEventListener('keydown', touch, { once: true });

  set(0);
  let swept = false;
  const sweep = (): void => {
    if (swept) return;
    swept = true;
    if (touched) return;
    entering = stage.animate([{ '--split': '0%' }, { '--split': '50%' }], {
      duration: SWEEP_MS,
      easing: motion.ease.enter,
      fill: 'forwards',
    });
    entering.onfinish = () => {
      entering?.cancel();
      if (!touched) set(50);
    };
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      sweep();
    },
    { threshold: 0.3 },
  );
  observer.observe(stage);

  // Rete di sicurezza: la linea non resta a zero se l'osservatore non scatta.
  setTimeout(() => {
    if (!swept && !touched) set(50);
  }, SAFETY_MS);
}

/*
 * La finestra sulla fotografia: un <dialog> nativo, uno per pagina. Ogni
 * link `[data-lightbox]` la apre con la propria immagine (lo stesso srcset
 * del nastro, a tutta larghezza) e la didascalia; frecce e tasti freccia
 * passano alla fotografia vicina; Esc, la X e il fondo scuro chiudono.
 * Senza JavaScript il link apre il file.
 */
export function mountLightbox(dialog: HTMLDialogElement): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]')];
  const image = dialog.querySelector<HTMLImageElement>('img');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
  if (links.length === 0 || !image || !caption || !counter || typeof dialog.showModal !== 'function') return;

  let index = 0;
  const show = (next: number): void => {
    index = (next + links.length) % links.length;
    const link = links[index];
    const source = link.querySelector('img');
    image.srcset = source?.srcset ?? '';
    image.sizes = '100vw';
    image.src = link.href;
    image.alt = source?.alt ?? '';
    caption.textContent = link.dataset.lightbox ?? '';
    counter.textContent = `${index + 1} / ${links.length}`;
  };

  links.forEach((link, position) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      show(position);
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.removeAttribute('srcset');
    links[index]?.focus();
  });
}
