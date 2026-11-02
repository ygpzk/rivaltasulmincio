/*
 * Menu della testata (RESPONSIVE.md «Matrice navigazione»): sotto i 1150 px
 * la navigazione è un pannello a tutto schermo che si apre dal tasto, chiuso
 * di default; da 1150 in su le voci stanno nella barra e lo stato qui
 * impostato non ha effetto (CSS). Con il menu aperto la pagina sotto non
 * scorre; se la finestra si allarga oltre la soglia il menu si chiude da sé.
 * Senza JavaScript il pulsante resta nascosto e le voci restano in vista.
 */
const WIDE = window.matchMedia('(min-width: 1150px)');

export function mountMenu(button: HTMLElement): void {
  const header = button.closest<HTMLElement>('.site-header');
  const controls = button.getAttribute('aria-controls');
  const nav = controls ? document.getElementById(controls) : null;
  if (!header || !nav) return;

  const set = (open: boolean): void => {
    header.dataset.menu = open ? 'open' : 'closed';
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
    if (open) header.classList.remove('is-hidden');
  };

  set(false);
  button.hidden = false;

  button.addEventListener('click', () => set(header.dataset.menu !== 'open'));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || header.dataset.menu !== 'open') return;
    set(false);
    button.focus();
  });

  WIDE.addEventListener('change', (event) => {
    if (event.matches && header.dataset.menu === 'open') set(false);
  });
}

/*
 * La barra si nasconde scendendo e torna risalendo, come su reflection.ai.
 * In cima è sempre visibile; con il menu aperto non si muove.
 */
export function mountHeaderHide(header: HTMLElement): void {
  let last = window.scrollY;
  let ticking = false;
  const update = (): void => {
    ticking = false;
    const y = window.scrollY;
    const delta = y - last;
    if (header.dataset.menu === 'open' || y < 80) header.classList.remove('is-hidden');
    else if (delta > 6) header.classList.add('is-hidden');
    else if (delta < -6) header.classList.remove('is-hidden');
    last = y;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true },
  );
}
