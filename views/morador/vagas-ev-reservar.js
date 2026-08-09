import { AppState } from '../../assets/js/state.js';
import { vagasEv } from '../../data/vagas_ev.js';

function formatarHora(iso) {
  const data = new Date(iso);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  minhaReservaAtiva() {
    const usuario = AppState.usuarioLogado;
    for (const vaga of vagasEv) {
      const reserva = vaga.reservas.find((r) => r.status === 'ativa' && r.unidade === usuario.unidade);
      if (reserva) return { vaga, reserva };
    }
    return null;
  },

  template() {
    const usuario = AppState.usuarioLogado;

    // RN07 — apenas moradores com veículo elétrico cadastrado podem reservar vaga com carregador
    if (!usuario.veiculoEletrico) {
      return `
        <div class="page">
          <header class="page-header"><h1>Vagas com Carregador EV</h1></header>
          <div class="empty-state">
            Você precisa ter um veículo elétrico cadastrado para reservar uma vaga com
            carregador (RN07). Fale com o síndico para atualizar seu cadastro.
          </div>
        </div>
      `;
    }

    const emUso = this.minhaReservaAtiva();

    if (emUso) {
      return `
        <div class="page">
          <header class="page-header"><h1>Vagas com Carregador EV</h1></header>
          <div class="card" style="max-width:420px;">
            <div class="card__header">Vaga em uso</div>
            <div class="card__body">
              <p><strong>Vaga:</strong> ${emUso.vaga.numero}</p>
              <p><strong>Início:</strong> ${formatarHora(emUso.reserva.inicio)}</p>
              <p><strong>Encerra automaticamente às:</strong> ${formatarHora(emUso.reserva.fim)}</p>
              <button type="button" class="btn btn--danger btn--sm" id="btn-encerrar">Encerrar uso</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Vagas com Carregador EV</h1></header>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Vaga</th>
              <th>Tempo máximo de uso</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${vagasEv.map((v) => this.linha(v)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(vaga) {
    const ocupada = vaga.reservas.some((r) => r.status === 'ativa');
    return `
      <tr class="data-table__row">
        <td>${vaga.numero}</td>
        <td>${vaga.tempoMaximoMinutos} min</td>
        <td>${ocupada ? '<span class="badge badge--amber">Ocupada</span>' : '<span class="badge badge--green">Livre</span>'}</td>
        <td>
          ${ocupada ? '' : `<button type="button" class="btn btn--primary btn--sm" data-reservar="${vaga.id}">Reservar</button>`}
        </td>
      </tr>
    `;
  },

  bindEvents() {
    document.getElementById('btn-encerrar')?.addEventListener('click', () => {
      const atual = this.minhaReservaAtiva();
      if (!atual) return;
      atual.reserva.status = 'concluida';
      atual.reserva.fim = new Date().toISOString();
      this.render();
    });

    document.querySelectorAll('[data-reservar]').forEach((botao) => {
      botao.addEventListener('click', () => {
        const id = Number(botao.dataset.reservar);
        const vaga = vagasEv.find((v) => v.id === id);
        if (!vaga) return;

        const usuario = AppState.usuarioLogado;
        const inicio = new Date();
        // RN08 — duração fixada pelo tempo máximo definido pelo síndico, não editável pelo morador
        const fim = new Date(inicio.getTime() + vaga.tempoMaximoMinutos * 60000);

        vaga.reservas.push({
          id: Math.max(0, ...vaga.reservas.map((r) => r.id)) + 1,
          unidade: usuario.unidade,
          inicio: inicio.toISOString(),
          fim: fim.toISOString(),
          status: 'ativa',
        });

        this.render();
      });
    });
  },
};
