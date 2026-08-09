import { acessos } from '../../data/acessos.js';

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default {
  resultados: null,

  render() {
    this.resultados = null;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {
    this.resultados = null;
  },

  template() {
    return `
      <div class="page">
        <header class="page-header"><h1>Buscar Visitante por CPF</h1></header>
        <form id="busca-form" class="filter-bar">
          <input class="form-input" id="busca-cpf" placeholder="Digite o CPF" style="max-width:220px;">
          <button class="btn btn--primary btn--sm" type="submit">Buscar</button>
        </form>
        <div id="busca-resultado">${this.renderResultado()}</div>
      </div>
    `;
  },

  renderResultado() {
    if (this.resultados === null) return '';

    if (!this.resultados.length) {
      return '<div class="empty-state">Nenhum registro encontrado para este CPF.</div>';
    }

    return `
      <table class="data-table">
        <thead class="data-table__header">
          <tr><th>Nome</th><th>Unidade</th><th>Entrada</th><th>Saída</th></tr>
        </thead>
        <tbody>
          ${this.resultados
            .map(
              (a) => `
            <tr class="data-table__row">
              <td>${a.nome}</td>
              <td>${a.unidadeDestino}</td>
              <td>${formatarData(a.entrada)}</td>
              <td>${a.saida ? formatarData(a.saida) : '<span class="badge badge--amber">Dentro</span>'}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `;
  },

  bindEvents() {
    document.getElementById('busca-form').addEventListener('submit', (evento) => {
      evento.preventDefault();
      const cpf = document.getElementById('busca-cpf').value.trim();
      this.resultados = cpf
        ? acessos.filter((a) => a.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, ''))
        : [];
      document.getElementById('busca-resultado').innerHTML = this.renderResultado();
    });
  },
};
