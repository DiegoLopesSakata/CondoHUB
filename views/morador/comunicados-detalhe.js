import { AppState } from '../../assets/js/state.js';
import { comunicados } from '../../data/comunicados.js';

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  comunicadoAtual() {
    return comunicados.find((c) => c.id === Number(this.params.id));
  },

  template() {
    const comunicado = this.comunicadoAtual();

    if (!comunicado) {
      return `
        <div class="page">
          <header class="page-header"><h1>Comunicado não encontrado</h1></header>
          <a class="btn btn--secondary" href="#/morador/comunicados">Voltar</a>
        </div>
      `;
    }

    const usuario = AppState.usuarioLogado;
    const lido = comunicado.leituraConfirmadaPor.includes(usuario.id);

    return `
      <div class="page">
        <header class="page-header"><h1>${comunicado.titulo}</h1></header>
        <div class="card" style="max-width:600px;">
          <div class="card__body">
            <p style="color:var(--text-500);">Enviado em ${comunicado.criadoEm}</p>
            <p>${comunicado.corpo}</p>
            ${lido
              ? '<span class="badge badge--green">Leitura confirmada</span>'
              : '<button type="button" class="btn btn--primary btn--sm" id="btn-confirmar-leitura">Confirmar leitura</button>'}
          </div>
        </div>
        <a class="btn btn--secondary" style="margin-top:16px;" href="#/morador/comunicados">Voltar</a>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-confirmar-leitura')?.addEventListener('click', () => {
      const comunicado = this.comunicadoAtual();
      const usuario = AppState.usuarioLogado;
      if (!comunicado.leituraConfirmadaPor.includes(usuario.id)) {
        comunicado.leituraConfirmadaPor.push(usuario.id);
      }
      this.render(this.params);
    });
  },
};
