import { AppState } from '../../assets/js/state.js';
import { comunicados } from '../../data/comunicados.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!comunicados.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Comunicados</h1></header>
          <div class="empty-state">Nenhum comunicado enviado ainda.</div>
        </div>
      `;
    }

    const usuario = AppState.usuarioLogado;
    const ordenados = [...comunicados].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));

    return `
      <div class="page">
        <header class="page-header"><h1>Comunicados</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ordenados
              .map((c) => {
                const lido = c.leituraConfirmadaPor.includes(usuario.id);
                return `
              <tr class="data-table__row">
                <td>${c.titulo}</td>
                <td>${c.criadoEm}</td>
                <td>${lido ? '<span class="badge badge--green">Lido</span>' : '<span class="badge badge--amber">Não lido</span>'}</td>
                <td><a class="btn btn--secondary btn--sm" href="#/morador/comunicados/${c.id}">Ver</a></td>
              </tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  bindEvents() {},
};
