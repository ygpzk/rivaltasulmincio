/*
 * Il nastro delle fonti (il carosello dei loghi di reflection.ai). Il
 * markup porta due copie dell'elenco; qui si misura la larghezza di una e si
 * imposta la durata, così la velocità è la stessa qualunque sia il numero di
 * voci (circa 60 px al secondo). Il CSS fa il resto; con «riduci movimento»
 * il nastro scorre a mano.
 */
export function mountMarquee(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('.marquee__track');
  const first = track?.querySelector<HTMLElement>('ul');
  if (!track || !first) return;
  const set = (): void => {
    const distance = first.getBoundingClientRect().width;
    if (distance > 0) track.style.setProperty('--marquee-duration', `${Math.max(20, distance / 60)}s`);
  };
  set();
  new ResizeObserver(set).observe(first);
}
