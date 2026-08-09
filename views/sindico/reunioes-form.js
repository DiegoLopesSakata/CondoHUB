import { reunioes } from '../../data/reunioes.js';

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
          <h1>Convocar Reunião</h1>
        </header>
        <form id="reuniao-form" class="card" style="max-width:520px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="reu-pauta">Pauta</label>
              <textarea class="form-textarea" id="reu-pauta" rows="3" required></textarea>
            </div>
            <div class="form-field">
              <label class="form-label" for="reu-data">Data</label>
              <input class="form-input" type="date" id="reu-data" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="reu-horario">Horário</label>
              <input class="form-input" type="time" id="reu-horario" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="reu-local">Local</label>
              <input class="form-input" id="reu-local" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="reu-quorum">Quórum mínimo (unidades)</label>
              <input class="form-input" type="number" id="reu-quorum" min="1" value="1" required>
            </div>
            <p id="reuniao-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">Convocar</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('reuniao-form');
    const erro = document.getElementById('reuniao-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const pauta = document.getElementById('reu-pauta').value.trim();
      const data = document.getElementById('reu-data').value;
      const horario = document.getElementById('reu-horario').value;
      const local = document.getElementById('reu-local').value.trim();
      const quorumMinimo = Number(document.getElementById('reu-quorum').value);

      // RN16 — não é permitido criar convocação sem data, horário, local e pauta
      if (!pauta || !data || !horario || !local) {
        erro.textContent = 'Preencha pauta, data, horário e local.';
        erro.hidden = false;
        return;
      }

      reunioes.push({
        id: Math.max(0, ...reunioes.map((r) => r.id)) + 1,
        pauta,
        data,
        horario,
        local,
        presencas: [],
        quorumMinimo: quorumMinimo > 0 ? quorumMinimo : 1,
        ata: null,
      });

      location.hash = '/sindico/reunioes';
    });
  },
};
