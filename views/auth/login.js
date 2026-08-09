import { login, DASHBOARD_POR_PERFIL } from '../../assets/js/auth.js';

export default {
  render() {
    const main = document.getElementById('auth-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    return `
      <div class="card auth-card">
        <div class="card__header">Entrar no CondoHub</div>
        <div class="card__body">
          <form id="login-form" novalidate>
            <div class="form-field">
              <label class="form-label" for="login-email">E-mail</label>
              <input class="form-input" type="email" id="login-email" name="email" autocomplete="username" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="login-senha">Senha</label>
              <input class="form-input" type="password" id="login-senha" name="senha" autocomplete="current-password" required>
            </div>
            <p id="login-erro" class="form-error" hidden>E-mail ou senha inválidos.</p>
            <button class="btn btn--primary" type="submit" style="width:100%;">Entrar</button>
          </form>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('login-form');
    const erro = document.getElementById('login-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const senha = document.getElementById('login-senha').value;
      const usuario = login(email, senha);

      if (!usuario) {
        erro.hidden = false;
        return;
      }

      erro.hidden = true;
      location.hash = DASHBOARD_POR_PERFIL[usuario.perfil];
    });
  },
};
