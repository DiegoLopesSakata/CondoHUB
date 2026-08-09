import { USUARIOS, PERFIS } from '../../data/users.js';

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
        <header class="page-header"><h1>Cadastro de Usuário</h1></header>
        <form id="cadastro-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="cad-nome">Nome</label>
              <input class="form-input" id="cad-nome" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="cad-email">E-mail</label>
              <input class="form-input" type="email" id="cad-email" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="cad-senha">Senha</label>
              <input class="form-input" type="password" id="cad-senha" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="cad-perfil">Perfil</label>
              <select class="form-select" id="cad-perfil" required>
                ${PERFIS.map((p) => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="cad-unidade">Unidade (obrigatório para morador)</label>
              <input class="form-input" id="cad-unidade">
            </div>
            <p id="cadastro-erro" class="form-error" hidden></p>
            <p id="cadastro-sucesso" class="form-success" hidden></p>
            <button class="btn btn--primary" type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('cadastro-form');
    const erro = document.getElementById('cadastro-erro');
    const sucesso = document.getElementById('cadastro-sucesso');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;
      sucesso.hidden = true;

      const nome = document.getElementById('cad-nome').value.trim();
      const email = document.getElementById('cad-email').value.trim();
      const senha = document.getElementById('cad-senha').value;
      const perfil = document.getElementById('cad-perfil').value;
      const unidade = document.getElementById('cad-unidade').value.trim();

      if (!nome || !email || !senha) {
        erro.textContent = 'Preencha nome, e-mail e senha.';
        erro.hidden = false;
        return;
      }

      // RN02 — todo usuário deve estar vinculado a uma unidade, exceto funcionário/porteiro
      if (perfil === 'morador' && !unidade) {
        erro.textContent = 'Informe a unidade do morador.';
        erro.hidden = false;
        return;
      }

      if (USUARIOS.some((u) => u.email === email)) {
        erro.textContent = 'Já existe um usuário com este e-mail.';
        erro.hidden = false;
        return;
      }

      USUARIOS.push({
        id: USUARIOS.length + 1,
        nome,
        email,
        senha,
        perfil,
        unidade: perfil === 'morador' ? unidade : null,
        ativo: true,
      });

      sucesso.textContent = 'Usuário cadastrado com sucesso.';
      sucesso.hidden = false;
      form.reset();
    });
  },
};
