import { acessos } from '../../data/acessos.js';

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!acessos.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Histórico de Acessos</h1></header>
          <div class="empty-state">Nenhum acesso registrado.</div>
          <a class="btn btn--primary" href="#/porteiro/acessos/novo">+ Registrar acesso</a>
        </div>
      `;
    }

    const ordenados = [...acessos].sort((a, b) => new Date(b.entrada) - new Date(a.entrada));

    return `
      <div class="page">
        <header class="page-header"><h1>Histórico de Acessos</h1></header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/porteiro/acessos/novo">+ Registrar acesso</a>
          <a class="btn btn--secondary btn--sm" href="#/porteiro/acessos/buscar">Buscar por CPF</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Unidade</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ordenados.map((a) => this.linha(a)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(acesso) {
    return `
      <tr class="data-table__row">
        <td>${acesso.nome}</td>
        <td>${acesso.tipo === 'prestador' ? 'Prestador' : 'Visitante'}</td>
        <td>${acesso.unidadeDestino}</td>
        <td>${formatarData(acesso.entrada)}</td>
        <td>${acesso.saida
          ? formatarData(acesso.saida)
          : '<span class="badge badge--amber">Dentro</span>'}</td>
        <td>${acesso.saida ? '' : `<button type="button" class="btn btn--secondary btn--sm" data-saida="${acesso.id}">Registrar saída</button>`}</td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-saida]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.saida);
        const acesso = acessos.find((a) => a.id === id);
        if (!acesso) return;
        acesso.saida = new Date().toISOString();
        this.render();
      });
    });
  },
};
