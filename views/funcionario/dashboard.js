import { AppState } from '../../assets/js/state.js';
import { tarefas } from '../../data/tarefas.js';
import { renderStatCardGrid } from '../../components/stat-card.js';

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
        ${renderStatCardGrid([
          { label: 'Tarefas em aberto', value: abertas },
          { label: 'Total de tarefas', value: minhasTarefas.length },
        ])}
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
