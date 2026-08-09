import { AppState } from '../../assets/js/state.js';
import { USUARIOS } from '../../data/users.js';
import { mostrarToast } from '../../components/notification.js';

export default {
  editando: null,

  render() {
    const alvo = AppState.cache.editandoUsuario;
    this.editando = alvo && (alvo.perfil === 'funcionario' || alvo.perfil === 'porteiro') ? alvo : null;
    AppState.cache.editandoUsuario = null;

    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {
    this.editando = null;
  },

  template() {
    const u = this.editando || {};
    const tipoAtual = u.perfil || 'funcionario';

    return `
      <div class="page">
        <header class="page-header">
          <h1>${this.editando ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h1>
        </header>
        <form id="funcionario-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="func-tipo">Tipo</label>
              <select class="form-select" id="func-tipo">
                <option value="funcionario" ${tipoAtual === 'funcionario' ? 'selected' : ''}>Funcionário</option>
                <option value="porteiro" ${tipoAtual === 'porteiro' ? 'selected' : ''}>Porteiro</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="func-nome">Nome</label>
              <input class="form-input" id="func-nome" value="${u.nome ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="func-email">E-mail</label>
              <input class="form-input" type="email" id="func-email" value="${u.email ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="func-senha">${this.editando ? 'Nova senha (opcional)' : 'Senha'}</label>
              <input class="form-input" type="password" id="func-senha" ${this.editando ? '' : 'required'}>
            </div>
            <div class="form-field">
              <label class="form-label" for="func-cargo-turno">Cargo (funcionário) / Turno (porteiro)</label>
              <input class="form-input" id="func-cargo-turno" value="${u.cargo ?? u.turno ?? ''}">
            </div>
            <div class="form-field">
              <label class="form-label" for="func-ativo">
                <input type="checkbox" id="func-ativo" ${u.ativo === false ? '' : 'checked'}>
                Ativo
              </label>
            </div>
            <p id="funcionario-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">${this.editando ? 'Salvar' : 'Cadastrar'}</button>
            <a class="btn btn--secondary" href="#/sindico/moradores">Cancelar</a>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('funcionario-form');
    const erro = document.getElementById('funcionario-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const tipo = document.getElementById('func-tipo').value;
      const nome = document.getElementById('func-nome').value.trim();
      const email = document.getElementById('func-email').value.trim();
      const senha = document.getElementById('func-senha').value;
      const cargoTurno = document.getElementById('func-cargo-turno').value.trim();
      const ativo = document.getElementById('func-ativo').checked;

      if (!nome || !email || (!this.editando && !senha)) {
        erro.textContent = 'Preencha nome, e-mail e senha.';
        erro.hidden = false;
        return;
      }

      const emailDuplicado = USUARIOS.some(
        (u) => u.email === email && u.id !== this.editando?.id
      );
      if (emailDuplicado) {
        erro.textContent = 'Já existe um usuário com este e-mail.';
        erro.hidden = false;
        return;
      }

      if (this.editando) {
        const alvo = USUARIOS.find((u) => u.id === this.editando.id);
        alvo.perfil = tipo;
        alvo.nome = nome;
        alvo.email = email;
        alvo.ativo = ativo;
        alvo.unidade = null;
        delete alvo.cargo;
        delete alvo.turno;
        if (tipo === 'funcionario') alvo.cargo = cargoTurno;
        else alvo.turno = cargoTurno;
        if (senha) alvo.senha = senha;
      } else {
        const novo = {
          id: Math.max(0, ...USUARIOS.map((u) => u.id)) + 1,
          nome,
          email,
          senha,
          perfil: tipo,
          unidade: null,
          ativo,
        };
        if (tipo === 'funcionario') novo.cargo = cargoTurno;
        else novo.turno = cargoTurno;
        USUARIOS.push(novo);
      }

      mostrarToast(this.editando ? 'Funcionário atualizado com sucesso.' : 'Funcionário cadastrado com sucesso.', 'sucesso');
      location.hash = '/sindico/moradores';
    });
  },
};
