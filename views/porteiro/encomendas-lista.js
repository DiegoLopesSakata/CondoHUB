import { encomendas } from '../../data/encomendas.js';

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!encomendas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Encomendas</h1></header>
          <div class="empty-state">Nenhuma encomenda registrada.</div>
          <a class="btn btn--primary" href="#/porteiro/encomendas/nova">+ Registrar encomenda</a>
        </div>
      `;
    }

    const ordenadas = [...encomendas].sort((a, b) => new Date(b.registradoEm) - new Date(a.registradoEm));

    return `
      <div class="page">
        <header class="page-header"><h1>Encomendas</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/porteiro/encomendas/nova">+ Registrar encomenda</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Unidade</th>
              <th>Remetente</th>
              <th>Entrada</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ordenadas
              .map(
                (e) => `
              <tr class="data-table__row">
                <td>${e.unidade}</td>
                <td>${e.remetente}</td>
                <td>${formatarData(e.registradoEm)}</td>
                <td>${e.status === 'retirada'
                  ? '<span class="badge badge--green">Retirada</span>'
                  : '<span class="badge badge--amber">Pendente</span>'}</td>
                <td>${e.status === 'pendente'
                  ? `<a class="btn btn--secondary btn--sm" href="#/porteiro/encomendas/${e.id}/retirada">Confirmar retirada</a>`
                  : ''}</td>
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
