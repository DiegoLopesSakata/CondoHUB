import { AppState } from '../../assets/js/state.js';
import { tarefas } from '../../data/tarefas.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado || {};
    const minhasTarefas = tarefas.filter((t) => t.atribuidoPara === usuario.id);
    const abertas = minhasTarefas.filter((t) => t.status !== 'concluida').length;

    return `
      <div class="page">
        <header class="page-header">
          <h1>Dashboard do Funcionário</h1>
        </header>
        <div class="stat-card-grid">
          <div class="stat-card">
            <span class="stat-card__label">Tarefas em aberto</span>
            <span class="stat-card__value">${abertas}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Total de tarefas</span>
            <span class="stat-card__value">${minhasTarefas.length}</span>
          </div>
        </div>
        <section class="card">
          <div class="card__header">Acesso rápido</div>
          <div class="card__body">
            <a class="btn btn--secondary btn--sm" href="#/funcionario/tarefas">Ver minhas tarefas</a>
          </div>
        </section>
      </div>
    `;
  },

  bindEvents() {},
};
