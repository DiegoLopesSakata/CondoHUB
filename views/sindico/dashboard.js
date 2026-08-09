import { USUARIOS } from '../../data/users.js';
import { ordens } from '../../data/manutencao.js';
import { tarefas } from '../../data/tarefas.js';
import { reunioes } from '../../data/reunioes.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const moradores = USUARIOS.filter((u) => u.perfil === 'morador').length;
    const manutencoesPendentes = ordens.filter(
      (o) => o.status === 'pendente' || o.status === 'vencida'
    ).length;
    const tarefasAbertas = tarefas.filter((t) => t.status !== 'concluida').length;

    return `
      <div class="page">
        <header class="page-header">
          <h1>Dashboard do Síndico</h1>
        </header>
        <div class="stat-card-grid">
          <div class="stat-card">
            <span class="stat-card__label">Moradores cadastrados</span>
            <span class="stat-card__value">${moradores}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Manutenções pendentes</span>
            <span class="stat-card__value">${manutencoesPendentes}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Tarefas em aberto</span>
            <span class="stat-card__value">${tarefasAbertas}</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Reuniões agendadas</span>
            <span class="stat-card__value">${reunioes.length}</span>
          </div>
        </div>
        <section class="card">
          <div class="card__header">Acesso rápido</div>
          <div class="card__body">
            <a class="btn btn--secondary btn--sm" href="#/sindico/manutencao">Ver manutenções</a>
            <a class="btn btn--secondary btn--sm" href="#/sindico/tarefas">Ver tarefas</a>
            <a class="btn btn--secondary btn--sm" href="#/sindico/reunioes">Ver reuniões</a>
            <a class="btn btn--secondary btn--sm" href="#/cadastro">Cadastrar usuário</a>
          </div>
        </section>
      </div>
    `;
  },

  bindEvents() {},
};
