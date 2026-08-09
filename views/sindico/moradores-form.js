import { AppState } from '../../assets/js/state.js';
import { USUARIOS } from '../../data/users.js';
import { mostrarToast } from '../../components/notification.js';

export default {
  editando: null,

  render() {
    this.editando = AppState.cache.editandoUsuario && AppState.cache.editandoUsuario.perfil === 'morador'
      ? AppState.cache.editandoUsuario
      : null;
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

    return `
      <div class="page">
        <header class="page-header">
          <h1>${this.editando ? 'Editar Morador' : 'Cadastrar Morador'}</h1>
        </header>
        <form id="morador-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="mor-nome">Nome</label>
              <input class="form-input" id="mor-nome" value="${u.nome ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="mor-email">E-mail</label>
              <input class="form-input" type="email" id="mor-email" value="${u.email ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="mor-senha">${this.editando ? 'Nova senha (opcional)' : 'Senha'}</label>
              <input class="form-input" type="password" id="mor-senha" ${this.editando ? '' : 'required'}>
            </div>
            <div class="form-field">
              <label class="form-label" for="mor-unidade">Unidade</label>
              <input class="form-input" id="mor-unidade" value="${u.unidade ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="mor-ativo">
                <input type="checkbox" id="mor-ativo" ${u.ativo === false ? '' : 'checked'}>
                Ativo
              </label>
            </div>
            <p id="morador-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">${this.editando ? 'Salvar' : 'Cadastrar'}</button>
            <a class="btn btn--secondary" href="#/sindico/moradores">Cancelar</a>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('morador-form');
    const erro = document.getElementById('morador-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const nome = document.getElementById('mor-nome').value.trim();
      const email = document.getElementById('mor-email').value.trim();
      const senha = document.getElementById('mor-senha').value;
      const unidade = document.getElementById('mor-unidade').value.trim();
      const ativo = document.getElementById('mor-ativo').checked;

      // RN02 — todo morador deve estar vinculado a uma unidade
      if (!nome || !email || !unidade || (!this.editando && !senha)) {
        erro.textContent = 'Preencha nome, e-mail, senha e unidade.';
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
        alvo.nome = nome;
        alvo.email = email;
        alvo.unidade = unidade;
        alvo.ativo = ativo;
        if (senha) alvo.senha = senha;
      } else {
        USUARIOS.push({
          id: Math.max(0, ...USUARIOS.map((u) => u.id)) + 1,
          nome,
          email,
          senha,
          perfil: 'morador',
          unidade,
          ativo,
        });
      }

      mostrarToast(this.editando ? 'Morador atualizado com sucesso.' : 'Morador cadastrado com sucesso.', 'sucesso');
      location.hash = '/sindico/moradores';
    });
  },
};
