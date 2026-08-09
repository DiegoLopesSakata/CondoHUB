import { AppState } from '../../assets/js/state.js';
import { tarefas } from '../../data/tarefas.js';
import { USUARIOS } from '../../data/users.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const equipe = USUARIOS.filter((u) => u.perfil === 'funcionario' || u.perfil === 'porteiro');

    return `
      <div class="page">
        <header class="page-header">
          <h1>Criar e Atribuir Tarefa</h1>
        </header>
        <form id="tarefa-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="tar-titulo">Título</label>
              <input class="form-input" id="tar-titulo" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="tar-descricao">Descrição</label>
              <textarea class="form-textarea" id="tar-descricao" rows="3"></textarea>
            </div>
            <div class="form-field">
              <label class="form-label" for="tar-atribuido">Atribuir a</label>
              <select class="form-select" id="tar-atribuido" required>
                <option value="">Selecione</option>
                ${equipe.map((u) => `<option value="${u.id}">${u.nome}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="tar-prazo">Prazo</label>
              <input class="form-input" type="date" id="tar-prazo" required>
            </div>
            <p id="tarefa-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">Criar tarefa</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('tarefa-form');
    const erro = document.getElementById('tarefa-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const titulo = document.getElementById('tar-titulo').value.trim();
      const descricao = document.getElementById('tar-descricao').value.trim();
      const atribuidoPara = Number(document.getElementById('tar-atribuido').value);
      const prazo = document.getElementById('tar-prazo').value;

      if (!titulo || !atribuidoPara || !prazo) {
        erro.textContent = 'Preencha título, responsável e prazo.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      tarefas.push({
        id: Math.max(0, ...tarefas.map((t) => t.id)) + 1,
        titulo,
        descricao,
        atribuidoPara,
        criadoPor: usuario.id,
        prazo,
        status: 'pendente',
      });

      location.hash = '/sindico/tarefas';
    });
  },
};
