import { vagasEv } from '../../data/vagas_ev.js';

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
        <header class="page-header">
          <h1>Gestão de Vagas EV</h1>
        </header>

        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Vaga</th>
              <th>Tempo máximo (min)</th>
              <th>Status atual</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${vagasEv.map((v) => this.linha(v)).join('')}
          </tbody>
        </table>

        <div class="card" style="max-width:420px; margin-top:16px;">
          <div class="card__header">Nova vaga</div>
          <div class="card__body">
            <form id="vaga-form">
              <div class="form-field">
                <label class="form-label" for="vaga-numero">Número da vaga</label>
                <input class="form-input" id="vaga-numero" required>
              </div>
              <div class="form-field">
                <label class="form-label" for="vaga-tempo">Tempo máximo de uso contínuo (min)</label>
                <input class="form-input" type="number" id="vaga-tempo" min="1" value="120" required>
              </div>
              <p id="vaga-erro" class="form-error" hidden></p>
              <button class="btn btn--primary btn--sm" type="submit">Adicionar vaga</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  linha(vaga) {
    const reservaAtiva = vaga.reservas.find((r) => r.status === 'ativa');

    return `
      <tr class="data-table__row">
        <td>${vaga.numero}</td>
        <td>
          <input
            class="form-input"
            style="width:90px; display:inline-block;"
            type="number"
            min="1"
            value="${vaga.tempoMaximoMinutos}"
            data-tempo-vaga="${vaga.id}"
          >
        </td>
        <td>
          ${reservaAtiva
            ? `<span class="badge badge--amber">Em uso — ${reservaAtiva.unidade}</span>`
            : '<span class="badge badge--green">Livre</span>'}
        </td>
        <td>
          <button type="button" class="btn btn--secondary btn--sm" data-salvar-tempo="${vaga.id}">Salvar tempo</button>
        </td>
      </tr>
    `;
  },

  bindEvents() {
    document.querySelectorAll('[data-salvar-tempo]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.salvarTempo);
        const vaga = vagasEv.find((v) => v.id === id);
        const input = document.querySelector(`[data-tempo-vaga="${id}"]`);
        const novoTempo = Number(input.value);

        // RN08 — tempo máximo é definido pelo síndico e não pode ser alterado pelo morador
        if (vaga && novoTempo > 0) {
          vaga.tempoMaximoMinutos = novoTempo;
          this.render();
        }
      });
    });

    const form = document.getElementById('vaga-form');
    const erro = document.getElementById('vaga-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const numero = document.getElementById('vaga-numero').value.trim();
      const tempo = Number(document.getElementById('vaga-tempo').value);

      if (!numero || !(tempo > 0)) {
        erro.textContent = 'Informe o número da vaga e um tempo máximo válido.';
        erro.hidden = false;
        return;
      }

      vagasEv.push({
        id: Math.max(0, ...vagasEv.map((v) => v.id)) + 1,
        numero,
        tempoMaximoMinutos: tempo,
        reservas: [],
      });

      this.render();
    });
  },
};
