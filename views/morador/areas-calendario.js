import { AppState } from '../../assets/js/state.js';
import { areas, HORARIOS_DISPONIVEIS } from '../../data/areas.js';

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  areaAtual() {
    return areas.find((a) => a.id === Number(this.params.id));
  },

  template() {
    const area = this.areaAtual();

    if (!area) {
      return `
        <div class="page">
          <header class="page-header"><h1>Área não encontrada</h1></header>
          <a class="btn btn--secondary" href="#/morador/areas">Voltar</a>
        </div>
      `;
    }

    const ativas = area.reservas
      .filter((r) => r.status !== 'cancelada')
      .sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario));

    return `
      <div class="page">
        <header class="page-header"><h1>${area.nome} — Calendário</h1></header>

        <table class="data-table">
          <thead class="data-table__header">
            <tr><th>Data</th><th>Horário</th><th>Unidade</th></tr>
          </thead>
          <tbody>
            ${ativas.length
              ? ativas.map((r) => `
              <tr class="data-table__row">
                <td>${r.data}</td>
                <td>${r.horario}</td>
                <td>${r.unidade}</td>
              </tr>`).join('')
              : '<tr class="data-table__row"><td colspan="3">Nenhuma reserva agendada.</td></tr>'}
          </tbody>
        </table>

        <div class="card" style="max-width:420px; margin-top:16px;">
          <div class="card__header">Nova reserva</div>
          <div class="card__body">
            <form id="reserva-form">
              <div class="form-field">
                <label class="form-label" for="res-data">Data</label>
                <input class="form-input" type="date" id="res-data" required>
              </div>
              <div class="form-field">
                <label class="form-label" for="res-horario">Horário</label>
                <select class="form-select" id="res-horario" required>
                  ${HORARIOS_DISPONIVEIS.map((h) => `<option value="${h}">${h}</option>`).join('')}
                </select>
              </div>
              <p id="reserva-erro" class="form-error" hidden></p>
              <button class="btn btn--primary btn--sm" type="submit">Solicitar reserva</button>
            </form>
          </div>
        </div>

        <a class="btn btn--secondary" style="margin-top:16px;" href="#/morador/areas">Voltar</a>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('reserva-form');
    const erro = document.getElementById('reserva-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const data = document.getElementById('res-data').value;
      const horario = document.getElementById('res-horario').value;

      if (!data || !horario) {
        erro.textContent = 'Selecione data e horário.';
        erro.hidden = false;
        return;
      }

      const area = this.areaAtual();
      const usuario = AppState.usuarioLogado;

      // RN11 — reserva bloqueada para moradores inadimplentes (conforme configuração do síndico)
      if (usuario.inadimplente && area.bloqueiaInadimplente) {
        erro.textContent = 'Sua unidade está inadimplente e não pode reservar esta área (RN11).';
        erro.hidden = false;
        return;
      }

      // RN12 — não é permitido duas reservas para o mesmo espaço no mesmo horário
      const conflito = area.reservas.some(
        (r) => r.data === data && r.horario === horario && r.status !== 'cancelada'
      );
      if (conflito) {
        erro.textContent = 'Já existe uma reserva para esta área nesse horário.';
        erro.hidden = false;
        return;
      }

      AppState.cache.reservaPendente = { areaId: area.id, data, horario };
      location.hash = `/morador/areas/${area.id}/confirmar`;
    });
  },
};
