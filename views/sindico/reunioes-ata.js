import { reunioes } from '../../data/reunioes.js';
import { mostrarToast } from '../../components/notification.js';

function jaTerminou(reuniao) {
  // Simplificação do mock: considera terminada quando o horário de início já passou
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

    if (reuniao.ata) {
      return `
        <div class="page">
          <header class="page-header"><h1>Ata — ${reuniao.pauta}</h1></header>
          <div class="card" style="max-width:560px;">
            <div class="card__body">
              <p style="color:var(--text-500);">Encerrada em ${reuniao.ata.encerradaEm}</p>
              <p>${reuniao.ata.texto}</p>
            </div>
          </div>
          <a class="btn btn--secondary" style="margin-top:16px;" href="#/sindico/reunioes/${reuniao.id}">Voltar</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Ata Digital — ${reuniao.pauta}</h1></header>
        <form id="ata-form" class="card" style="max-width:560px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="ata-texto">Conteúdo da ata</label>
              <textarea class="form-textarea" id="ata-texto" rows="8" required></textarea>
            </div>
            <p id="ata-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">Encerrar e arquivar ata</button>
            <a class="btn btn--secondary" href="#/sindico/reunioes/${reuniao.id}">Cancelar</a>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('ata-form');
    if (!form) return;
    const erro = document.getElementById('ata-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const reuniao = this.reuniaoAtual();
      const texto = document.getElementById('ata-texto').value.trim();

      if (!texto) {
        erro.textContent = 'Escreva o conteúdo da ata.';
        erro.hidden = false;
        return;
      }

      // RN18 — ata só pode ser encerrada e arquivada pelo síndico após o término da sessão
      if (!jaTerminou(reuniao)) {
        erro.textContent = 'A ata só pode ser encerrada após o horário de início da reunião (RN18).';
        erro.hidden = false;
        return;
      }

      reuniao.ata = {
        texto,
        encerradaEm: new Date().toLocaleString('pt-BR'),
      };

      mostrarToast('Ata encerrada e arquivada com sucesso.', 'sucesso');
      location.hash = `/sindico/reunioes/${reuniao.id}`;
    });
  },
};
