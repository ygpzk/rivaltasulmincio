import { html, raw, type Html } from '../lib/html';

/*
 * La pillola di reflection.ai: un'etichetta arrotondata con, a destra, un
 * puntino che al passaggio si allarga in un cerchio e lascia comparire la
 * freccia, mentre l'etichetta stringe il margine. Tre toni: contorno
 * (predefinito), pieno verde, pieno lime. Lo stile sta in components.css
 * («Pillole»).
 */
export type PillTone = 'outline' | 'primary' | 'accent';

const ARROW = raw(
  '<svg class="icon pill__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
);

export function pill(options: {
  href: string;
  label: string;
  tone?: PillTone;
  size?: 'sm' | 'md' | 'lg';
  /** Link esterno: nuova scheda e nota per chi legge con la voce. */
  external?: boolean;
  class?: string;
  current?: boolean;
}): Html {
  const tone = options.tone ?? 'outline';
  const size = options.size ?? 'md';
  const classes = ['pill', `pill--${tone}`, `pill--${size}`, options.class].filter(Boolean).join(' ');
  return html`<a class="${classes}" href="${options.href}"${options.external ? raw(' target="_blank" rel="noopener noreferrer"') : ''}${options.current ? raw(' aria-current="page"') : ''}><span class="pill__label">${options.label}</span><span class="pill__dot" aria-hidden="true">${ARROW}</span>${options.external ? html`<span class="visually-hidden"> (si apre in una nuova scheda)</span>` : ''}</a>`;
}

/** La stessa pillola come pulsante (invio di un modulo). */
export function pillButton(options: { label: string; tone?: PillTone; type?: 'submit' | 'button'; class?: string }): Html {
  const tone = options.tone ?? 'primary';
  const classes = ['pill', `pill--${tone}`, 'pill--md', options.class].filter(Boolean).join(' ');
  return html`<button class="${classes}" type="${options.type ?? 'submit'}"><span class="pill__label">${options.label}</span><span class="pill__dot" aria-hidden="true">${ARROW}</span></button>`;
}

/** L'etichetta a riquadro di una sezione («Solutions» su reflection.ai). */
export function tagLabel(text: string): Html {
  return html`<span class="tag">${text}</span>`;
}
