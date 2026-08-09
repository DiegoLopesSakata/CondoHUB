import { areas } from '../../data/areas.js';

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    return `
      <div class="page">
        <header class="page-header"><h1>Áreas Comuns</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Área</th>
              <th>Capacidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${areas
              .map(
                (a) => `
              <tr class="data-table__row">
                <td>${a.nome}</td>
                <td>${a.capacidade} pessoas</td>
                <td><a class="btn btn--secondary btn--sm" href="#/morador/areas/${a.id}">Ver calendário</a></td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  bindEvents() {},
};
