import { AppState } from '../../assets/js/state.js';
import { mudancas } from '../../data/mudancas.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado;
    const minhas = mudancas
      .filter((m) => m.unidade === usuario.unidade)
      .sort((a, b) => a.data.localeCompare(b.data));

    if (!minhas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Minhas Mudanças</h1></header>
          <div class="empty-state">Nenhuma mudança agendada.</div>
          <a class="btn btn--primary" href="#/morador/mudancas/nova">+ Agendar mudança</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Minhas Mudanças</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/morador/mudancas/nova">+ Agendar mudança</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Data</th>
              <th>Turno</th>
              <th>Elevador</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${minhas.map((m) => this.linha(m)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(mudanca) {
    return `
      <tr class="data-table__row">
        <td>${mudanca.data}</td>
        <td>${mudanca.turno}</td>
        <td>${mudanca.elevador}</td>
        <td>${mudanca.status === 'cancelada'
          ? '<span class="badge badge--gray">Cancelada</span>'
          : '<span class="badge badge--green">Agendada</span>'}</td>
        <td>${mudanca.status !== 'cancelada'
          ? `<button type="button" class="btn btn--danger btn--sm" data-cancelar="${mudanca.id}">Cancelar</button>`
          : ''}</td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-cancelar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.cancelar);
        const mudanca = mudancas.find((m) => m.id === id);
        if (!mudanca || !confirm('Cancelar esta mudança?')) return;
        mudanca.status = 'cancelada';
        this.render();
      });
    });
  },
};
