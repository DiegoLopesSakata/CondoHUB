import { AppState } from '../../assets/js/state.js';
import { sustentabilidade } from '../../data/sustentabilidade.js';

function variacaoPercentual(valor, media) {
  if (!media) return 0;
  return Math.round(((valor - media) / media) * 100);
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado;
    const registros = sustentabilidade
      .filter((r) => r.unidade === usuario.unidade)
      .sort((a, b) => b.mes.localeCompare(a.mes));

    if (!registros.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Sustentabilidade da Unidade</h1></header>
          <div class="empty-state">Nenhum dado de consumo registrado para a sua unidade ainda.</div>
        </div>
      `;
    }

    const atual = registros[0];
    const variacaoAgua = variacaoPercentual(atual.consumoAgua, atual.mediaCondominioAgua);
    const variacaoEnergia = variacaoPercentual(atual.consumoEnergia, atual.mediaCondominioEnergia);

    return `
      <div class="page">
        <header class="page-header">
          <h1>Sustentabilidade da Unidade</h1>
        </header>
        <div class="stat-card-grid">
          <div class="stat-card">
            <span class="stat-card__label">Água em ${atual.mes} (média condomínio: ${atual.mediaCondominioAgua} m³)</span>
            <span class="stat-card__value">${atual.consumoAgua} m³</span>
            <span>${variacaoAgua > 0 ? `<span class="badge badge--red">${variacaoAgua}% acima</span>` : `<span class="badge badge--green">${Math.abs(variacaoAgua)}% abaixo</span>`}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Energia em ${atual.mes} (média condomínio: ${atual.mediaCondominioEnergia} kWh)</span>
            <span class="stat-card__value">${atual.consumoEnergia} kWh</span>
            <span>${variacaoEnergia > 0 ? `<span class="badge badge--red">${variacaoEnergia}% acima</span>` : `<span class="badge badge--green">${Math.abs(variacaoEnergia)}% abaixo</span>`}</span>
          </div>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Mês</th>
              <th>Água (m³)</th>
              <th>Energia (kWh)</th>
            </tr>
          </thead>
          <tbody>
            ${registros
              .map(
                (r) => `
              <tr class="data-table__row">
                <td>${r.mes}</td>
                <td>${r.consumoAgua}</td>
                <td>${r.consumoEnergia}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  bindEvents() {},
};
