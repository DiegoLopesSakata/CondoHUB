import { AppState } from '../../assets/js/state.js';
import { pets } from '../../data/pets.js';

const DIAS_ALERTA_VACINA = 30; // RN20 — alerta de vacinação vencida ou próxima do vencimento

function statusVacinacao(proximaData) {
  if (!proximaData) return { label: 'Sem registro', classe: 'badge--gray' };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const vencimento = new Date(proximaData + 'T00:00:00');
  const dias = Math.round((vencimento - hoje) / 86400000);

  if (dias < 0) return { label: 'Vacinação vencida', classe: 'badge--red' };
  if (dias <= DIAS_ALERTA_VACINA) return { label: `Vence em ${dias} dia(s)`, classe: 'badge--amber' };
  return { label: 'Em dia', classe: 'badge--green' };
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    const usuario = AppState.usuarioLogado;
    const meusPets = pets.filter((p) => p.unidade === usuario.unidade);

    if (!meusPets.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Meus Pets</h1></header>
          <div class="empty-state">Nenhum pet cadastrado para a sua unidade.</div>
          <a class="btn btn--primary" href="#/morador/pets/novo">+ Cadastrar pet</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Meus Pets</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/morador/pets/novo">+ Novo pet</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Nome</th>
              <th>Espécie/Raça</th>
              <th>Responsável</th>
              <th>Vacinação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${meusPets.map((p) => this.linha(p)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(pet) {
    const vacina = statusVacinacao(pet.vacinacao?.proximaData);
    return `
      <tr class="data-table__row">
        <td>${pet.nome}</td>
        <td>${pet.especie} / ${pet.raca}</td>
        <td>${pet.responsavel}</td>
        <td><span class="badge ${vacina.classe}">${vacina.label}</span></td>
        <td>
          <button type="button" class="btn btn--secondary btn--sm" data-editar="${pet.id}">Editar</button>
          <button type="button" class="btn btn--danger btn--sm" data-excluir="${pet.id}">Excluir</button>
        </td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-editar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.editar);
        AppState.cache.editandoPet = pets.find((p) => p.id === id) || null;
        location.hash = '/morador/pets/novo';
      });
    });

    document.querySelectorAll('[data-excluir]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.excluir);
        const pet = pets.find((p) => p.id === id);
        if (!pet || !confirm(`Excluir ${pet.nome}?`)) return;

        const indice = pets.findIndex((p) => p.id === id);
        pets.splice(indice, 1);
        this.render();
      });
    });
  },
};
