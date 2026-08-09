import { AppState } from '../../assets/js/state.js';
import { comunicados } from '../../data/comunicados.js';

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
          <h1>Enviar Comunicado</h1>
        </header>
        <form id="comunicado-form" class="card" style="max-width:560px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="com-titulo">Título</label>
              <input class="form-input" id="com-titulo" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="com-corpo">Mensagem</label>
              <textarea class="form-textarea" id="com-corpo" rows="6" required></textarea>
            </div>
            <p id="comunicado-erro" class="form-error" hidden></p>
            <p id="comunicado-sucesso" class="form-success" hidden></p>
            <button class="btn btn--primary" type="submit">Enviar comunicado</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('comunicado-form');
    const erro = document.getElementById('comunicado-erro');
    const sucesso = document.getElementById('comunicado-sucesso');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;
      sucesso.hidden = true;

      const titulo = document.getElementById('com-titulo').value.trim();
      const corpo = document.getElementById('com-corpo').value.trim();

      if (!titulo || !corpo) {
        erro.textContent = 'Preencha título e mensagem.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      comunicados.push({
        id: Math.max(0, ...comunicados.map((c) => c.id)) + 1,
        titulo,
        corpo,
        criadoPor: usuario.id,
        criadoEm: new Date().toISOString().slice(0, 10),
        leituraConfirmadaPor: [],
      });

      sucesso.textContent = 'Comunicado enviado a todos os moradores.';
      sucesso.hidden = false;
      form.reset();
    });
  },
};
