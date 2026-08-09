import { AppState } from '../../assets/js/state.js';
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
    const usuario = AppState.usuarioLogado;
    const minhas = encomendas
      .filter((e) => e.unidade === usuario.unidade)
      .sort((a, b) => new Date(b.registradoEm) - new Date(a.registradoEm));

    if (!minhas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Minhas Encomendas</h1></header>
          <div class="empty-state">Nenhuma encomenda registrada para a sua unidade.</div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Minhas Encomendas</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Remetente</th>
              <th>Entrada</th>
              <th>Status</th>
              <th>Retirada</th>
            </tr>
          </thead>
          <tbody>
            ${minhas
              .map(
                (e) => `
              <tr class="data-table__row">
                <td>${e.remetente}</td>
                <td>${formatarData(e.registradoEm)}</td>
                <td>${e.status === 'retirada'
                  ? '<span class="badge badge--green">Retirada</span>'
                  : '<span class="badge badge--amber">Pendente na portaria</span>'}</td>
                <td>${e.retirada ? `${e.retirada.retiradoPor} em ${e.retirada.data} às ${e.retirada.hora}` : '-'}</td>
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
