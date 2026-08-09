import { AppState } from '../../assets/js/state.js';
import { encomendas } from '../../data/encomendas.js';

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
          <h1>Registrar Entrada de Encomenda</h1>
        </header>
        <form id="encomenda-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="enc-unidade">Unidade destinatária</label>
              <input class="form-input" id="enc-unidade" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="enc-remetente">Remetente</label>
              <input class="form-input" id="enc-remetente" required>
            </div>
            <p id="encomenda-erro" class="form-error" hidden></p>
            <p id="encomenda-sucesso" class="form-success" hidden></p>
            <button class="btn btn--primary" type="submit">Registrar entrada</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('encomenda-form');
    const erro = document.getElementById('encomenda-erro');
    const sucesso = document.getElementById('encomenda-sucesso');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;
      sucesso.hidden = true;

      const unidade = document.getElementById('enc-unidade').value.trim();
      const remetente = document.getElementById('enc-remetente').value.trim();

      // RN09 — não é permitido registrar encomenda sem unidade destinatária e remetente
      if (!unidade || !remetente) {
        erro.textContent = 'Preencha a unidade destinatária e o remetente.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      encomendas.push({
        id: Math.max(0, ...encomendas.map((e) => e.id)) + 1,
        unidade,
        remetente,
        registradoPor: usuario.id,
        registradoEm: new Date().toISOString(),
        status: 'pendente',
        retirada: null,
      });

      sucesso.textContent = `Encomenda registrada para ${unidade}. O morador será notificado.`;
      sucesso.hidden = false;
      form.reset();
    });
  },
};
