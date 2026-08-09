// components/stat-card.js — cards de métrica para dashboards (.stat-card)

export function renderStatCard({ label, value, extra = '' }) {
  return `
    <div class="stat-card">
      <span class="stat-card__label">${label}</span>
      <span class="stat-card__value">${value}</span>
      ${extra}
    </div>
  `;
}

export function renderStatCardGrid(cartoes) {
  return `<div class="stat-card-grid">${cartoes.map(renderStatCard).join('')}</div>`;
}
