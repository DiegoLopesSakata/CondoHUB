import { AppState } from '../../assets/js/state.js';
import { areas } from '../../data/areas.js';

function inicioReserva(data, horario) {
  const [horaInicio] = horario.split('-');
  return new Date(`${data}T${horaInicio}:00`);
}

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

    const pendente = AppState.cache.reservaPendente;
    if (pendente && pendente.areaId === area.id) {
      return `
        <div class="page">
          <header class="page-header"><h1>Confirmar Reserva</h1></header>
          <div class="card" style="max-width:420px;">
            <div class="card__body">
              <p><strong>Área:</strong> ${area.nome}</p>
              <p><strong>Data:</strong> ${pendente.data}</p>
              <p><strong>Horário:</strong> ${pendente.horario}</p>
              <p id="confirmar-erro" class="form-error" hidden></p>
              <button type="button" class="btn btn--primary btn--sm" id="btn-confirmar">Confirmar reserva</button>
              <button type="button" class="btn btn--secondary btn--sm" id="btn-descartar">Descartar</button>
            </div>
          </div>
        </div>
      `;
    }

    const usuario = AppState.usuarioLogado;
    const minhas = area.reservas.filter((r) => r.unidade === usuario.unidade && r.status !== 'cancelada');

    if (!minhas.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Reservas de ${area.nome}</h1></header>
          <div class="empty-state">Você não tem reservas ativas nesta área.</div>
          <a class="btn btn--secondary" href="#/morador/areas/${area.id}">Voltar ao calendário</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Reservas de ${area.nome}</h1></header>
        <p id="cancelar-erro" class="form-error" hidden></p>
        <table class="data-table">
          <thead class="data-table__header">
            <tr><th>Data</th><th>Horário</th><th></th></tr>
          </thead>
          <tbody>
            ${minhas
              .map(
                (r) => `
              <tr class="data-table__row">
                <td>${r.data}</td>
                <td>${r.horario}</td>
                <td><button type="button" class="btn btn--danger btn--sm" data-cancelar="${r.id}">Cancelar</button></td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
        <a class="btn btn--secondary" style="margin-top:16px;" href="#/morador/areas/${area.id}">Voltar ao calendário</a>
      </div>
    `;
  },

  bindEvents() {
    const area = this.areaAtual();
    if (!area) return;

    document.getElementById('btn-confirmar')?.addEventListener('click', () => {
      const pendente = AppState.cache.reservaPendente;
      const erro = document.getElementById('confirmar-erro');

      // RN12 — revalida no momento da confirmação, contra corrida com outra reserva
      const conflito = area.reservas.some(
        (r) => r.data === pendente.data && r.horario === pendente.horario && r.status !== 'cancelada'
      );
      if (conflito) {
        erro.textContent = 'Este horário acabou de ser reservado por outra unidade.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;
      area.reservas.push({
        id: Math.max(0, ...area.reservas.map((r) => r.id)) + 1,
        unidade: usuario.unidade,
        data: pendente.data,
        horario: pendente.horario,
        status: 'confirmada',
      });

      AppState.cache.reservaPendente = null;
      location.hash = `/morador/areas/${area.id}`;
    });

    document.getElementById('btn-descartar')?.addEventListener('click', () => {
      AppState.cache.reservaPendente = null;
      location.hash = `/morador/areas/${area.id}`;
    });

    document.querySelectorAll('[data-cancelar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.cancelar);
        const reserva = area.reservas.find((r) => r.id === id);
        const erro = document.getElementById('cancelar-erro');
        erro.hidden = true;

        // RN13 — cancelamento deve ocorrer com mínimo de 24h de antecedência
        const horasParaInicio = (inicioReserva(reserva.data, reserva.horario) - new Date()) / 3600000;
        if (horasParaInicio < 24) {
          erro.textContent = 'Cancelamento só é permitido com no mínimo 24h de antecedência (RN13).';
          erro.hidden = false;
          return;
        }

        reserva.status = 'cancelada';
        this.render(this.params);
      });
    });
  },
};
