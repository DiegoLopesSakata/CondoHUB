import { reunioes } from '../../data/reunioes.js';

function jaTerminou(reuniao) {
  // Simplificação do mock: considera terminada quando o horário de início já passou
  // (RN18 — ata só pode ser encerrada após o término da sessão)
  return new Date(`${reuniao.data}T${reuniao.horario}:00`) <= new Date();
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

  reuniaoAtual() {
    return reunioes.find((r) => r.id === Number(this.params.id));
  },

  template() {
    const reuniao = this.reuniaoAtual();

    if (!reuniao) {
      return `
        <div class="page">
          <header class="page-header"><h1>Reunião não encontrada</h1></header>
          <a class="btn btn--secondary" href="#/sindico/reunioes">Voltar</a>
        </div>
      `;
    }

    const quorumAtingido = reuniao.presencas.length >= reuniao.quorumMinimo;

    return `
      <div class="page">
        <header class="page-header"><h1>${reuniao.pauta}</h1></header>
        <div class="card" style="max-width:560px;">
          <div class="card__body">
            <p><strong>Data:</strong> ${reuniao.data} às ${reuniao.horario}</p>
            <p><strong>Local:</strong> ${reuniao.local}</p>
            <p><strong>Quórum:</strong> ${reuniao.presencas.length}/${reuniao.quorumMinimo}
              ${quorumAtingido
                ? '<span class="badge badge--green">Atingido</span>'
                : '<span class="badge badge--amber">Não atingido</span>'}
            </p>
            <p><strong>Presenças confirmadas:</strong> ${reuniao.presencas.length ? reuniao.presencas.join(', ') : 'nenhuma ainda'}</p>

            <form id="presenca-manual-form">
              <div class="form-field">
                <label class="form-label" for="presenca-unidade">Registrar presença manual (unidade)</label>
                <input class="form-input" id="presenca-unidade" style="width:200px; display:inline-block;">
              </div>
              <button class="btn btn--secondary btn--sm" type="submit">Adicionar presença</button>
            </form>

            ${reuniao.ata
              ? '<p style="margin-top:12px;"><span class="badge badge--gray">Ata já registrada e reunião encerrada</span></p>'
              : `<a class="btn btn--primary btn--sm" style="margin-top:12px;" href="#/sindico/reunioes/${reuniao.id}/ata">Registrar ata</a>`}
          </div>
        </div>
        <a class="btn btn--secondary" style="margin-top:16px;" href="#/sindico/reunioes">Voltar</a>
      </div>
    `;
  },

  bindEvents() {
    const reuniao = this.reuniaoAtual();
    if (!reuniao) return;

    document.getElementById('presenca-manual-form').addEventListener('submit', (evento) => {
      evento.preventDefault();
      const campo = document.getElementById('presenca-unidade');
      const unidade = campo.value.trim();
      if (!unidade) return;

      // RN17 — sistema registra confirmações de presença e permite síndico verificar quórum
      if (!reuniao.presencas.includes(unidade)) {
        reuniao.presencas.push(unidade);
      }
      this.render(this.params);
    });
  },
};
