import { encomendas } from '../../data/encomendas.js';
import { acessos } from '../../data/acessos.js';
import { renderStatCardGrid } from '../../components/stat-card.js';

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
        ${renderStatCardGrid([
          { label: 'Encomendas pendentes', value: encomendasPendentes },
          { label: 'Acessos registrados', value: acessos.length },
        ])}
        <section class="card">
          <div class="card__header">Acesso rápido</div>
          <div class="card__body card__body--actions">
            <a class="btn btn--secondary btn--sm" href="#/porteiro/encomendas/nova">Registrar encomenda</a>
            <a class="btn btn--secondary btn--sm" href="#/porteiro/acessos/novo">Registrar acesso</a>
          </div>
        </section>
      </div>
    `;
  },

  bindEvents() {},
};
