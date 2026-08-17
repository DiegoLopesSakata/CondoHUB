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
      <div class="card auth-card" id="login-card">
        <div class="card__header">Entrar no CondoHub</div>

        <div class="card__body">
          <form id="login-form" novalidate>
            <div class="form-field">
              <label class="form-label" for="login-email">E-mail</label>
              <input
                class="form-input"
                type="email"
                id="login-email"
                name="email"
                autocomplete="username"
                required
              >
            </div>

            <div class="form-field">
              <label class="form-label" for="login-senha">Senha</label>
              <input
                class="form-input"
                type="password"
                id="login-senha"
                name="senha"
                autocomplete="current-password"
                required
              >
            </div>

            <p id="login-erro" class="form-error" hidden>
              E-mail ou senha inválidos.
            </p>

            <button
              class="btn btn--primary login-button"
              id="login-button"
              type="submit"
              style="width:100%;"
            >
              <span class="login-button__text">Entrar</span>

              <span class="login-button__loading" hidden>
                <span class="spinner"></span>
                Entrando...
              </span>

              <span class="login-button__success" hidden>
                ✓
              </span>
            </button>
          </form>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('login-form');
    const erro = document.getElementById('login-erro');
    const card = document.getElementById('login-card');
    const button = document.getElementById('login-button');

    const buttonText = button.querySelector('.login-button__text');
    const buttonLoading = button.querySelector('.login-button__loading');
    const buttonSuccess = button.querySelector('.login-button__success');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const senha = document.getElementById('login-senha').value;

      const usuario = login(email, senha);

      if (!usuario) {
        erro.hidden = false;

        card.classList.remove('login-card--error');

        // Força a animação a reiniciar
        void card.offsetWidth;

        card.classList.add('login-card--error');

        return;
      }

      erro.hidden = true;

      // Estado de loading
      button.disabled = true;
      buttonText.hidden = true;
      buttonLoading.hidden = false;

      // Simula o pequeno tempo visual da autenticação
      setTimeout(() => {
        buttonLoading.hidden = true;
        buttonSuccess.hidden = false;

        button.classList.add('login-button--success');

        // Aguarda a animação de sucesso
        setTimeout(() => {
          card.classList.add('login-card--exit');

          setTimeout(() => {
            location.hash = DASHBOARD_POR_PERFIL[usuario.perfil];
          }, 350);
        }, 500);
      }, 700);
    });
  },
};