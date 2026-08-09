import { AppState } from '../../assets/js/state.js';
import { pets } from '../../data/pets.js';
import { encomendas } from '../../data/encomendas.js';
import { comunicados } from '../../data/comunicados.js';
import { reunioes } from '../../data/reunioes.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado || {};
    const meusPets = pets.filter((p) => p.unidade === usuario.unidade).length;
    const minhasEncomendas = encomendas.filter(
      (e) => e.unidade === usuario.unidade && e.status !== 'retirada'
    ).length;

    const proximaReuniao = reunioes
      .filter((r) => r.data >= new Date().toISOString().slice(0, 10) && !r.presencas.includes(usuario.unidade))
      .sort((a, b) => a.data.localeCompare(b.data))[0];

    return `
      <div class="page">
        <header class="page-header">
          <h1>Dashboard do Morador</h1>
        </header>
        <div class="stat-card-grid">
          <div class="stat-card">
            <span class="stat-card__label">Meus pets</span>
            <span class="stat-card__value">${meusPets}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Encomendas pendentes</span>
            <span class="stat-card__value">${minhasEncomendas}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Comunicados</span>
            <span class="stat-card__value">${comunicados.length}</span>
          </div>
        </div>
        ${proximaReuniao
          ? `
        <div class="card" style="margin-bottom:16px;">
          <div class="card__header">Reunião pendente de confirmação</div>
          <div class="card__body">
            <p>${proximaReuniao.pauta} — ${proximaReuniao.data} às ${proximaReuniao.horario}</p>
            <a class="btn btn--primary btn--sm" href="#/morador/reunioes/${proximaReuniao.id}/presenca">Confirmar presença</a>
          </div>
        </div>`
          : ''}
        <section class="card">
          <div class="card__header">Acesso rápido</div>
          <div class="card__body">
            <a class="btn btn--secondary btn--sm" href="#/morador/areas">Reservar área comum</a>
            <a class="btn btn--secondary btn--sm" href="#/morador/vagas-ev">Vaga EV</a>
            <a class="btn btn--secondary btn--sm" href="#/morador/pets">Meus pets</a>
            <a class="btn btn--secondary btn--sm" href="#/morador/historico">Histórico</a>
          </div>
        </section>
      </div>
    `;
  },

  bindEvents() {},
};
