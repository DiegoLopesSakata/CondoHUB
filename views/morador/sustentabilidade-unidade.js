import { AppState } from '../../assets/js/state.js';
import { sustentabilidade } from '../../data/sustentabilidade.js';
import { renderStatCardGrid } from '../../components/stat-card.js';

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
        ${renderStatCardGrid([
          {
            label: `Água em ${atual.mes} (média condomínio: ${atual.mediaCondominioAgua} m³)`,
            value: `${atual.consumoAgua} m³`,
            extra: variacaoAgua > 0
              ? `<span class="badge badge--red">${variacaoAgua}% acima</span>`
              : `<span class="badge badge--green">${Math.abs(variacaoAgua)}% abaixo</span>`,
          },
          {
            label: `Energia em ${atual.mes} (média condomínio: ${atual.mediaCondominioEnergia} kWh)`,
            value: `${atual.consumoEnergia} kWh`,
            extra: variacaoEnergia > 0
              ? `<span class="badge badge--red">${variacaoEnergia}% acima</span>`
              : `<span class="badge badge--green">${Math.abs(variacaoEnergia)}% abaixo</span>`,
          },
        ])}
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
