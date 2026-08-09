import { AppState } from '../../assets/js/state.js';
import { tarefas } from '../../data/tarefas.js';

const BADGE_STATUS = {
  pendente: 'badge--amber',
  em_andamento: 'badge--blue',
  concluida: 'badge--green',
  cancelada: 'badge--gray',
};

const LABEL_STATUS = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado;
    const minhas = tarefas
      .filter((t) => t.atribuidoPara === usuario.id)
      .sort((a, b) => a.prazo.localeCompare(b.prazo));

    if (!minhas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Minhas Tarefas</h1></header>
          <div class="empty-state">Nenhuma tarefa atribuída a você.</div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Minhas Tarefas</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Título</th>
              <th>Prazo</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${minhas
              .map(
                (t) => `
              <tr class="data-table__row">
                <td>${t.titulo}</td>
                <td>${t.prazo}</td>
                <td><span class="badge ${BADGE_STATUS[t.status] || 'badge--gray'}">${LABEL_STATUS[t.status] || t.status}</span></td>
                <td><a class="btn btn--secondary btn--sm" href="#/funcionario/tarefas/${t.id}">Ver</a></td>
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
