import { AppState } from '../../assets/js/state.js';
import { USUARIOS } from '../../data/users.js';
import { confirmarExclusao } from '../../components/modal.js';

const NOME_PERFIL = {
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
    const pessoas = USUARIOS.filter((u) => u.perfil !== 'sindico');

    if (!pessoas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Moradores e Funcionários</h1></header>
          <div class="empty-state">Nenhum morador ou funcionário cadastrado.</div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header">
          <h1>Moradores e Funcionários</h1>
        </header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/sindico/moradores/novo">+ Novo morador</a>
          <a class="btn btn--secondary btn--sm" href="#/sindico/funcionarios/novo">+ Novo funcionário</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Unidade/Cargo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${pessoas.map((p) => this.linha(p)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(pessoa) {
    const detalhe = pessoa.unidade || pessoa.cargo || pessoa.turno || '-';
    return `
      <tr class="data-table__row">
        <td>${pessoa.nome}</td>
        <td>${pessoa.email}</td>
        <td><span class="badge badge--blue">${NOME_PERFIL[pessoa.perfil] || pessoa.perfil}</span></td>
        <td>${detalhe}</td>
        <td>
          ${pessoa.ativo
            ? '<span class="badge badge--green">Ativo</span>'
            : '<span class="badge badge--gray">Inativo</span>'}
        </td>
        <td>
          <button type="button" class="btn btn--secondary btn--sm" data-editar="${pessoa.id}">Editar</button>
          <button type="button" class="btn btn--danger btn--sm" data-excluir="${pessoa.id}">Excluir</button>
        </td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-editar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.editar);
        const pessoa = USUARIOS.find((u) => u.id === id);
        if (!pessoa) return;

        AppState.cache.editandoUsuario = pessoa;
        location.hash = pessoa.perfil === 'morador' ? '/sindico/moradores/novo' : '/sindico/funcionarios/novo';
      });
    });

    document.querySelectorAll('[data-excluir]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.excluir);
        const pessoa = USUARIOS.find((u) => u.id === id);
        if (!pessoa) return;

        confirmarExclusao(`Excluir ${pessoa.nome}?`, () => {
          const indice = USUARIOS.findIndex((u) => u.id === id);
          USUARIOS.splice(indice, 1);
          this.render();
        });
      });
    });
  },
};
