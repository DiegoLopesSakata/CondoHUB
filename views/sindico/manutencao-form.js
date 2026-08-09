import { AppState } from '../../assets/js/state.js';
import { ordens } from '../../data/manutencao.js';
import { mostrarToast } from '../../components/notification.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    return `
      <div class="page">
        <header class="page-header">
          <h1>Nova Ordem de Manutenção</h1>
        </header>
        <form id="manutencao-form" class="card" style="max-width:520px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="man-area">Área</label>
              <input class="form-input" id="man-area" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="man-tipo">Tipo de serviço</label>
              <input class="form-input" id="man-tipo" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="man-data">Data prevista</label>
              <input class="form-input" type="date" id="man-data" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="man-responsavel">Responsável</label>
              <input class="form-input" id="man-responsavel" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="man-contato">Contato do responsável</label>
              <input class="form-input" id="man-contato">
            </div>
            <div class="form-field">
              <label class="form-label" for="man-prioridade">Prioridade</label>
              <select class="form-select" id="man-prioridade">
                <option value="normal">Normal</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            <p id="manutencao-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">Registrar</button>
            <a class="btn btn--secondary" href="#/sindico/manutencao">Cancelar</a>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('manutencao-form');
    const erro = document.getElementById('manutencao-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const area = document.getElementById('man-area').value.trim();
      const tipo = document.getElementById('man-tipo').value.trim();
      const dataPrevisao = document.getElementById('man-data').value;
      const responsavel = document.getElementById('man-responsavel').value.trim();
      const contato = document.getElementById('man-contato').value.trim();
      const prioridade = document.getElementById('man-prioridade').value;

      // RN04 — não é permitido registrar ordem sem área, data prevista e responsável
      if (!area || !dataPrevisao || !responsavel) {
        erro.textContent = 'Preencha área, data prevista e responsável.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      ordens.push({
        id: Math.max(0, ...ordens.map((o) => o.id)) + 1,
        area,
        tipo,
        dataPrevisao,
        responsavel,
        contato,
        prioridade,
        status: 'pendente',
        criadoPor: usuario ? usuario.id : null,
        criadoEm: new Date().toISOString().slice(0, 10),
        observacoes: [],
      });

      mostrarToast('Ordem de manutenção registrada com sucesso.', 'sucesso');
      location.hash = '/sindico/manutencao';
    });
  },
};
