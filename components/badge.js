// components/badge.js — badges de status (.badge .badge--*)

export function renderBadge(texto, variante = 'gray') {
  return `<span class="badge badge--${variante}">${texto}</span>`;
}
