import { AppState } from '../../assets/js/state.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const notificacoes = AppState.notificacoes;

    if (!notificacoes.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Notificações</h1></header>
          <div class="empty-state">Nenhuma notificação por enquanto.</div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Notificações</h1></header>
        <div class="card">
          <div class="card__body">
            ${notificacoes.map((n) => `<p>${n.mensagem}</p>`).join('')}
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {},
};
