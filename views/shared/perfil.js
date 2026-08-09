import { AppState } from '../../assets/js/state.js';

const NOME_PERFIL = {
  sindico: 'Síndico',
  morador: 'Morador',
  porteiro: 'Porteiro',
  funcionario: 'Funcionário',
};

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado || {};

    return `
      <div class="page">
        <header class="page-header">
          <h1>Perfil</h1>
        </header>
        <div class="card" style="max-width:480px;">
          <div class="card__body">
            <p><strong>Nome:</strong> ${usuario.nome ?? '-'}</p>
            <p><strong>E-mail:</strong> ${usuario.email ?? '-'}</p>
            <p><strong>Perfil:</strong> <span class="badge badge--green">${NOME_PERFIL[usuario.perfil] ?? usuario.perfil ?? '-'}</span></p>
            ${usuario.unidade ? `<p><strong>Unidade:</strong> ${usuario.unidade}</p>` : ''}
            ${usuario.cargo ? `<p><strong>Cargo:</strong> ${usuario.cargo}</p>` : ''}
            ${usuario.turno ? `<p><strong>Turno:</strong> ${usuario.turno}</p>` : ''}
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {},
};
