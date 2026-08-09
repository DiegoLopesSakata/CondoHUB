import { encomendas } from '../../data/encomendas.js';
import { acessos } from '../../data/acessos.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const encomendasPendentes = encomendas.filter((e) => e.status !== 'retirada').length;

    return `
      <div class="page">
        <header class="page-header">
          <h1>Dashboard da Portaria</h1>
        </header>
        <div class="stat-card-grid">
          <div class="stat-card">
            <span class="stat-card__label">Encomendas pendentes</span>
            <span class="stat-card__value">${encomendasPendentes}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Acessos registrados</span>
            <span class="stat-card__value">${acessos.length}</span>
          </div>
        </div>
        <section class="card">
          <div class="card__header">Acesso rápido</div>
          <div class="card__body">
            <a class="btn btn--secondary btn--sm" href="#/porteiro/encomendas/nova">Registrar encomenda</a>
            <a class="btn btn--secondary btn--sm" href="#/porteiro/acessos/novo">Registrar acesso</a>
          </div>
        </section>
      </div>
    `;
  },

  bindEvents() {},
};
