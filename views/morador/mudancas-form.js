import { AppState } from '../../assets/js/state.js';
import { mudancas } from '../../data/mudancas.js';

const ELEVADORES = ['Elevador Social', 'Elevador de Serviço'];
const TURNOS = ['Manhã', 'Tarde', 'Noite'];

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
          <h1>Agendar Mudança</h1>
        </header>
        <form id="mudanca-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="mud-data">Data</label>
              <input class="form-input" type="date" id="mud-data" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="mud-turno">Turno</label>
              <select class="form-select" id="mud-turno" required>
                ${TURNOS.map((t) => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="mud-elevador">Elevador</label>
              <select class="form-select" id="mud-elevador" required>
                ${ELEVADORES.map((e) => `<option value="${e}">${e}</option>`).join('')}
              </select>
            </div>
            <p id="mudanca-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">Agendar mudança</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('mudanca-form');
    const erro = document.getElementById('mudanca-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const data = document.getElementById('mud-data').value;
      const turno = document.getElementById('mud-turno').value;
      const elevador = document.getElementById('mud-elevador').value;
      const usuario = AppState.usuarioLogado;

      // RN14 — não é permitido agendar mudança sem data, turno e unidade
      if (!data || !turno || !elevador) {
        erro.textContent = 'Preencha data, turno e elevador.';
        erro.hidden = false;
        return;
      }

      // RN15 — não é permitido mais de uma mudança no mesmo turno para o mesmo elevador
      const conflito = mudancas.some(
        (m) => m.data === data && m.turno === turno && m.elevador === elevador && m.status !== 'cancelada'
      );
      if (conflito) {
        erro.textContent = 'Já existe uma mudança agendada nesse turno para esse elevador.';
        erro.hidden = false;
        return;
      }

      mudancas.push({
        id: Math.max(0, ...mudancas.map((m) => m.id)) + 1,
        unidade: usuario.unidade,
        data,
        turno,
        elevador,
        status: 'agendada',
      });

      location.hash = '/morador/mudancas';
    });
  },
};
