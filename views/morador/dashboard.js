import { AppState } from '../../assets/js/state.js';
import { pets } from '../../data/pets.js';
import { encomendas } from '../../data/encomendas.js';
import { comunicados } from '../../data/comunicados.js';
import { reunioes } from '../../data/reunioes.js';
import { renderStatCardGrid } from '../../components/stat-card.js';

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
        ${renderStatCardGrid([
          { label: 'Meus pets', value: meusPets },
          { label: 'Encomendas pendentes', value: minhasEncomendas },
          { label: 'Comunicados', value: comunicados.length },
        ])}
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
          <div class="card__body card__body--actions">
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
