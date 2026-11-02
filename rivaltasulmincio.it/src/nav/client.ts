/*
 * Menu della testata (RESPONSIVE.md «Matrice navigazione»): sotto i 1100 px
 * la navigazione è un pannello a tutto schermo che si apre dal tasto, chiuso
 * di default; da 1100 in su le voci stanno ai lati del nome e lo stato qui
 * impostato non ha effetto (CSS). Con il menu aperto la pagina sotto non
 * scorre; se la finestra si allarga oltre la soglia il menu si chiude da sé.
 * Senza JavaScript il pulsante resta nascosto e le voci restano in vista.
 */
const WIDE = window.matchMedia('(min-width: 1100px)');

export function mountMenu(button: HTMLElement): void {
  const header = button.closest<HTMLElement>('.site-header');
  const controls = button.getAttribute('aria-controls');
  const nav = controls ? document.getElementById(controls) : null;
  if (!header || !nav) return;

  const set = (open: boolean): void => {
    header.dataset.menu = open ? 'open' : 'closed';
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
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
