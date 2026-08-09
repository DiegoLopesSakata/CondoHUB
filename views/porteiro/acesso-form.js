import { AppState } from '../../assets/js/state.js';
import { acessos } from '../../data/acessos.js';

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
          <h1>Registrar Acesso de Visitante</h1>
        </header>
        <form id="acesso-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="acs-nome">Nome</label>
              <input class="form-input" id="acs-nome" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="acs-cpf">CPF</label>
              <input class="form-input" id="acs-cpf" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="acs-tipo">Tipo</label>
              <select class="form-select" id="acs-tipo">
                <option value="visitante">Visitante</option>
                <option value="prestador">Prestador de serviço</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="acs-unidade">Unidade de destino</label>
              <input class="form-input" id="acs-unidade" required>
            </div>
            <p id="acesso-erro" class="form-error" hidden></p>
            <p id="acesso-sucesso" class="form-success" hidden></p>
            <button class="btn btn--primary" type="submit">Registrar entrada</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('acesso-form');
    const erro = document.getElementById('acesso-erro');
    const sucesso = document.getElementById('acesso-sucesso');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;
      sucesso.hidden = true;

      const nome = document.getElementById('acs-nome').value.trim();
      const cpf = document.getElementById('acs-cpf').value.trim();
      const tipo = document.getElementById('acs-tipo').value;
      const unidadeDestino = document.getElementById('acs-unidade').value.trim();

      if (!nome || !cpf || !unidadeDestino) {
        erro.textContent = 'Preencha nome, CPF e unidade de destino.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      acessos.push({
        id: Math.max(0, ...acessos.map((a) => a.id)) + 1,
        nome,
        cpf,
        tipo,
        unidadeDestino,
        entrada: new Date().toISOString(),
        saida: null,
        registradoPor: usuario.id,
      });

      sucesso.textContent = `Entrada de ${nome} registrada para ${unidadeDestino}.`;
      sucesso.hidden = false;
      form.reset();
    });
  },
};
