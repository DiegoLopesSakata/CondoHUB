import { ordens } from '../../data/manutencao.js';

const DIAS_ALERTA = 7; // RN05 — alerta com no mínimo 7 dias de antecedência (ver Seção 14 do CLAUDE.md)

const BADGE_STATUS = {
  pendente: 'badge--amber',
  em_andamento: 'badge--blue',
  concluida: 'badge--green',
  vencida: 'badge--red',
};

const LABEL_STATUS = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  vencida: 'Vencida',
};

function diasParaVencimento(dataPrevisao) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const previsao = new Date(dataPrevisao + 'T00:00:00');
  return Math.round((previsao - hoje) / 86400000);
}

export default {
  render() {
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  template() {
    if (!ordens.length) {
      return `
        <div class="page">
          <header class="page-header"><h1>Ordens de Manutenção</h1></header>
          <div class="empty-state">Nenhuma ordem de manutenção registrada.</div>
          <a class="btn btn--primary" href="#/sindico/manutencao/nova">+ Nova ordem</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header">
          <h1>Ordens de Manutenção</h1>
        </header>
        <div class="filter-bar">
          <a class="btn btn--primary btn--sm" href="#/sindico/manutencao/nova">+ Nova ordem</a>
        </div>
        <table class="data-table">
          <thead class="data-table__header">
            <tr>
              <th>Área</th>
              <th>Tipo</th>
              <th>Previsão</th>
              <th>Responsável</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${ordens.map((o) => this.linha(o)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  linha(ordem) {
    const dias = diasParaVencimento(ordem.dataPrevisao);
    let status = ordem.status;
    if (status !== 'concluida' && dias < 0) status = 'vencida';

    const alertaVencimento =
      status === 'pendente' && dias >= 0 && dias <= DIAS_ALERTA
        ? ` <span class="badge badge--amber" title="RN05 — vence em ${dias} dia(s)">alerta</span>`
        : '';

    return `
      <tr class="data-table__row">
        <td>${ordem.area}</td>
        <td>${ordem.tipo}</td>
        <td>${ordem.dataPrevisao}</td>
        <td>${ordem.responsavel}</td>
        <td><span class="badge badge--gray">${ordem.prioridade}</span></td>
        <td><span class="badge ${BADGE_STATUS[status] || 'badge--gray'}">${LABEL_STATUS[status] || status}</span>${alertaVencimento}</td>
        <td><a class="btn btn--secondary btn--sm" href="#/sindico/manutencao/${ordem.id}">Ver</a></td>
      </tr>
    `;
  },

  bindEvents() {},
};
