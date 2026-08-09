export default {
  render(params = {}) {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template(params);
    this.bindEvents();
  },

  destroy() {
    // TODO: remover event listeners se necessário
  },

  template(params = {}) {
    return `
      <div class="page">
        <header class="page-header">
          <h1>Notificações</h1>
        </header>
        <section>
          <!-- TODO: implementar tela -->
        </section>
      </div>
    `;
  },

  bindEvents() {
    // TODO: querySelector dentro de #app-content apenas
  },
};
