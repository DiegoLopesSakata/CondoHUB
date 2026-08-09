import { AppState } from '../../assets/js/state.js';
import { tarefas } from '../../data/tarefas.js';

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  tarefaAtual() {
    return tarefas.find((t) => t.id === Number(this.params.id));
  },

  template() {
    const tarefa = this.tarefaAtual();
    const usuario = AppState.usuarioLogado;

    if (!tarefa || tarefa.atribuidoPara !== usuario.id) {
      return `
        <div class="page">
          <header class="page-header"><h1>Tarefa não encontrada</h1></header>
          <a class="btn btn--secondary" href="#/funcionario/tarefas">Voltar</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>${tarefa.titulo}</h1></header>
        <div class="card" style="max-width:520px;">
          <div class="card__body">
            <p>${tarefa.descricao || 'Sem descrição adicional.'}</p>
            <p><strong>Prazo:</strong> ${tarefa.prazo}</p>
            <p><strong>Status:</strong> <span class="badge badge--blue">${tarefa.status}</span></p>
            ${tarefa.status !== 'concluida' && tarefa.status !== 'cancelada'
              ? '<button type="button" class="btn btn--primary btn--sm" id="btn-concluir-tarefa">Marcar como concluída</button>'
              : ''}
          </div>
        </div>
        <a class="btn btn--secondary" style="margin-top:16px;" href="#/funcionario/tarefas">Voltar</a>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-concluir-tarefa')?.addEventListener('click', () => {
      const tarefa = this.tarefaAtual();
      tarefa.status = 'concluida';
      this.render(this.params);
    });
  },
};
