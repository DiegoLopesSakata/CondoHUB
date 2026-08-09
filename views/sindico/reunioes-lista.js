import { reunioes } from '../../data/reunioes.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!reunioes.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Reuniões e Assembleias</h1></header>
          <div class="empty-state">Nenhuma reunião convocada ainda.</div>
          <a class="btn btn--primary" href="#/sindico/reunioes/nova">+ Convocar reunião</a>
        </div>
      `;
    }

    const ordenadas = [...reunioes].sort((a, b) => b.data.localeCompare(a.data));

    return `
      <div class="page">
        <header class="page-header"><h1>Reuniões e Assembleias</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/sindico/reunioes/nova">+ Convocar reunião</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Pauta</th>
              <th>Data</th>
              <th>Local</th>
              <th>Quórum</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ordenadas
              .map(
                (r) => `
              <tr class="data-table__row">
                <td>${r.pauta}</td>
                <td>${r.data} ${r.horario}</td>
                <td>${r.local}</td>
                <td>${r.presencas.length}/${r.quorumMinimo}</td>
                <td>${r.ata
                  ? '<span class="badge badge--gray">Encerrada</span>'
                  : '<span class="badge badge--green">Aberta</span>'}</td>
                <td><a class="btn btn--secondary btn--sm" href="#/sindico/reunioes/${r.id}">Ver</a></td>
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
