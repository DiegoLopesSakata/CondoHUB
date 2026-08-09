import { AppState } from '../../assets/js/state.js';
import { notificacoesPara } from '../../assets/js/notificacoes.js';

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
    const minhas = notificacoesPara(usuario);

    if (!minhas.length) {
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
            ${minhas.map((n) => this.item(n)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  item(notificacao) {
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid var(--text-200);">
        <div>
          <p style="margin:0;">${notificacao.mensagem} ${notificacao.lida ? '' : '<span class="badge badge--amber">Nova</span>'}</p>
          <p style="margin:0; color:var(--text-500); font-size:12px;">${formatarData(notificacao.criadoEm)}</p>
        </div>
        <a class="btn btn--secondary btn--sm" href="${notificacao.link || '#'}" data-marcar-lida="${notificacao.id}">Ver</a>
      </div>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-marcar-lida]').forEach((link) => {
      link.addEventListener('click', () => {
        const id = Number(link.dataset.marcarLida);
        const notificacao = AppState.notificacoes.find((n) => n.id === id);
        if (notificacao) notificacao.lida = true;
      });
    });
  },
};
