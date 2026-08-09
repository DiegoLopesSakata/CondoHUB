import { AppState } from '../../assets/js/state.js';
import { areas } from '../../data/areas.js';
import { comunicados } from '../../data/comunicados.js';
import { encomendas } from '../../data/encomendas.js';
import { acessos } from '../../data/acessos.js';

const ABAS = [
  { chave: 'reservas', label: 'Reservas de áreas' },
  { chave: 'comunicados', label: 'Comunicados' },
  { chave: 'encomendas', label: 'Encomendas' },
  { chave: 'acessos', label: 'Acessos à unidade' },
];

export default {
  abaAtiva: 'reservas',

  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {
    this.abaAtiva = 'reservas';
  },

  template() {
    return `
      <div class="page">
        <header class="page-header"><h1>Histórico Completo</h1></header>
        <div class="filter-bar">
          ${ABAS.map(
            (aba) => `
            <button
              type="button"
              class="btn btn--sm ${aba.chave === this.abaAtiva ? 'btn--primary' : 'btn--secondary'}"
              data-aba="${aba.chave}"
            >${aba.label}</button>`
          ).join('')}
        </div>
        <div id="historico-conteudo">${this.conteudoAba()}</div>
      </div>
    `;
  },

  conteudoAba() {
    const usuario = AppState.usuarioLogado;

    if (this.abaAtiva === 'reservas') {
      const reservas = [];
      areas.forEach((area) => {
        area.reservas
          .filter((r) => r.unidade === usuario.unidade)
          .forEach((r) => reservas.push({ area: area.nome, ...r }));
      });
      reservas.sort((a, b) => b.data.localeCompare(a.data));

      if (!reservas.length) return '<div class="empty-state">Nenhuma reserva de área comum.</div>';

      return `
        <table class="data-table">
          <thead class="data-table__header"><tr><th>Área</th><th>Data</th><th>Horário</th><th>Status</th></tr></thead>
          <tbody>
            ${reservas
              .map(
                (r) => `
              <tr class="data-table__row">
                <td>${r.area}</td><td>${r.data}</td><td>${r.horario}</td>
                <td>${r.status === 'cancelada' ? '<span class="badge badge--gray">Cancelada</span>' : '<span class="badge badge--green">Confirmada</span>'}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      `;
    }

    if (this.abaAtiva === 'comunicados') {
      const ordenados = [...comunicados].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
      if (!ordenados.length) return '<div class="empty-state">Nenhum comunicado recebido.</div>';

      return `
        <table class="data-table">
          <thead class="data-table__header"><tr><th>Título</th><th>Data</th><th>Status</th></tr></thead>
          <tbody>
            ${ordenados
              .map(
                (c) => `
              <tr class="data-table__row">
                <td>${c.titulo}</td><td>${c.criadoEm}</td>
                <td>${c.leituraConfirmadaPor.includes(usuario.id) ? '<span class="badge badge--green">Lido</span>' : '<span class="badge badge--amber">Não lido</span>'}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      `;
    }

    if (this.abaAtiva === 'encomendas') {
      const minhas = encomendas
        .filter((e) => e.unidade === usuario.unidade)
        .sort((a, b) => new Date(b.registradoEm) - new Date(a.registradoEm));
      if (!minhas.length) return '<div class="empty-state">Nenhuma encomenda registrada.</div>';

      return `
        <table class="data-table">
          <thead class="data-table__header"><tr><th>Remetente</th><th>Entrada</th><th>Status</th></tr></thead>
          <tbody>
            ${minhas
              .map(
                (e) => `
              <tr class="data-table__row">
                <td>${e.remetente}</td>
                <td>${new Date(e.registradoEm).toLocaleDateString('pt-BR')}</td>
                <td>${e.status === 'retirada' ? '<span class="badge badge--green">Retirada</span>' : '<span class="badge badge--amber">Pendente</span>'}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      `;
    }

    // acessos
    const meusAcessos = acessos
      .filter((a) => a.unidadeDestino === usuario.unidade)
      .sort((a, b) => new Date(b.entrada) - new Date(a.entrada));
    if (!meusAcessos.length) return '<div class="empty-state">Nenhum acesso registrado para a sua unidade.</div>';

    return `
      <table class="data-table">
        <thead class="data-table__header"><tr><th>Nome</th><th>Tipo</th><th>Entrada</th><th>Saída</th></tr></thead>
        <tbody>
          ${meusAcessos
            .map(
              (a) => `
            <tr class="data-table__row">
              <td>${a.nome}</td>
              <td>${a.tipo === 'prestador' ? 'Prestador' : 'Visitante'}</td>
              <td>${new Date(a.entrada).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>${a.saida ? new Date(a.saida).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '<span class="badge badge--amber">Dentro</span>'}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-aba]').forEach((botao) => {
      botao.addEventListener('click', () => {
        this.abaAtiva = botao.dataset.aba;
        this.render();
      });
    });
  },
};
