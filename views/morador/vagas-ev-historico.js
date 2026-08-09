import { AppState } from '../../assets/js/state.js';
import { vagasEv } from '../../data/vagas_ev.js';

function formatarDataHora(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
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
    const historico = [];

    vagasEv.forEach((vaga) => {
      vaga.reservas
        .filter((r) => r.unidade === usuario.unidade)
        .forEach((reserva) => historico.push({ vaga, reserva }));
    });

    historico.sort((a, b) => new Date(b.reserva.inicio) - new Date(a.reserva.inicio));

    if (!historico.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Histórico de Reservas EV</h1></header>
          <div class="empty-state">Nenhuma reserva de vaga EV registrada ainda.</div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Histórico de Reservas EV</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Vaga</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${historico
              .map(
                ({ vaga, reserva }) => `
              <tr class="data-table__row">
                <td>${vaga.numero}</td>
                <td>${formatarDataHora(reserva.inicio)}</td>
                <td>${formatarDataHora(reserva.fim)}</td>
                <td>
                  ${reserva.status === 'ativa'
                    ? '<span class="badge badge--amber">Ativa</span>'
                    : '<span class="badge badge--green">Concluída</span>'}
                </td>
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
