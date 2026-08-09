import { sustentabilidade } from '../../data/sustentabilidade.js';

function badgeComparativo(valor, media) {
  if (valor > media) return '<span class="badge badge--red">Acima da média</span>';
  if (valor < media) return '<span class="badge badge--green">Abaixo da média</span>';
  return '<span class="badge badge--gray">Na média</span>';
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!sustentabilidade.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Sustentabilidade Geral</h1></header>
          <div class="empty-state">Nenhum dado de consumo registrado.</div>
        </div>
      `;
    }

    const registros = [...sustentabilidade].sort((a, b) => b.mes.localeCompare(a.mes) || a.unidade.localeCompare(b.unidade));

    return `
      <div class="page">
        <header class="page-header">
          <h1>Sustentabilidade Geral</h1>
        </header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Unidade</th>
              <th>Mês</th>
              <th>Água (m³)</th>
              <th>Energia (kWh)</th>
              <th>Comparativo água</th>
              <th>Comparativo energia</th>
            </tr>
          </thead>
          <tbody>
            ${registros
              .map(
                (r) => `
              <tr class="data-table__row">
                <td>${r.unidade}</td>
                <td>${r.mes}</td>
                <td>${r.consumoAgua}</td>
                <td>${r.consumoEnergia}</td>
                <td>${badgeComparativo(r.consumoAgua, r.mediaCondominioAgua)}</td>
                <td>${badgeComparativo(r.consumoEnergia, r.mediaCondominioEnergia)}</td>
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
