import { tarefas } from '../../data/tarefas.js';
import { USUARIOS } from '../../data/users.js';

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

function nomeFuncionario(id) {
  const usuario = USUARIOS.find((u) => u.id === id);
  return usuario ? usuario.nome : 'Funcionário removido';
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!tarefas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Tarefas dos Funcionários</h1></header>
          <div class="empty-state">Nenhuma tarefa criada ainda.</div>
          <a class="btn btn--primary" href="#/sindico/tarefas/nova">+ Nova tarefa</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Tarefas dos Funcionários</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/sindico/tarefas/nova">+ Nova tarefa</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Título</th>
              <th>Atribuída a</th>
              <th>Prazo</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${tarefas.map((t) => this.linha(t)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(tarefa) {
    return `
      <tr class="data-table__row">
        <td>${tarefa.titulo}</td>
        <td>${nomeFuncionario(tarefa.atribuidoPara)}</td>
        <td>${tarefa.prazo}</td>
        <td><span class="badge ${BADGE_STATUS[tarefa.status] || 'badge--gray'}">${LABEL_STATUS[tarefa.status] || tarefa.status}</span></td>
        <td>${tarefa.status === 'pendente' || tarefa.status === 'em_andamento'
          ? `<button type="button" class="btn btn--danger btn--sm" data-cancelar="${tarefa.id}">Cancelar</button>`
          : ''}</td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-cancelar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.cancelar);
        const tarefa = tarefas.find((t) => t.id === id);
        if (!tarefa || !confirm('Cancelar esta tarefa?')) return;
        tarefa.status = 'cancelada';
        this.render();
      });
    });
  },
};
