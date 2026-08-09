import { AppState } from '../../assets/js/state.js';
import { reunioes } from '../../data/reunioes.js';

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  reuniaoAtual() {
    return reunioes.find((r) => r.id === Number(this.params.id));
  },

  template() {
    const reuniao = this.reuniaoAtual();

    if (!reuniao) {
      return `
        <div class="page">
          <header class="page-header"><h1>Reunião não encontrada</h1></header>
        </div>
      `;
    }

    const usuario = AppState.usuarioLogado;
    const confirmada = reuniao.presencas.includes(usuario.unidade);

    return `
      <div class="page">
        <header class="page-header"><h1>${reuniao.pauta}</h1></header>
        <div class="card" style="max-width:480px;">
          <div class="card__body">
            <p><strong>Data:</strong> ${reuniao.data} às ${reuniao.horario}</p>
            <p><strong>Local:</strong> ${reuniao.local}</p>
            ${confirmada
              ? '<span class="badge badge--green">Presença confirmada</span>'
              : '<button type="button" class="btn btn--primary btn--sm" id="btn-confirmar-presenca">Confirmar presença</button>'}
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-confirmar-presenca')?.addEventListener('click', () => {
      const reuniao = this.reuniaoAtual();
      const usuario = AppState.usuarioLogado;
      if (!reuniao.presencas.includes(usuario.unidade)) {
        reuniao.presencas.push(usuario.unidade);
      }
      this.render(this.params);
    });
  },
};
