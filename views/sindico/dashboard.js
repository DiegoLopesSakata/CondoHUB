import { USUARIOS } from '../../data/users.js';
import { ordens } from '../../data/manutencao.js';
import { tarefas } from '../../data/tarefas.js';
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
        ${renderStatCardGrid([
          { label: 'Moradores cadastrados', value: moradores },
          { label: 'Manutenções pendentes', value: manutencoesPendentes },
          { label: 'Tarefas em aberto', value: tarefasAbertas },
          { label: 'Reuniões agendadas', value: reunioes.length },
        ])}
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
