import { encomendas } from '../../data/encomendas.js';

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  encomendaAtual() {
    return encomendas.find((e) => e.id === Number(this.params.id));
  },

  template() {
    const encomenda = this.encomendaAtual();

    if (!encomenda) {
      return `
        <div class="page">
          <header class="page-header"><h1>Encomenda não encontrada</h1></header>
          <a class="btn btn--secondary" href="#/porteiro/encomendas">Voltar</a>
        </div>
      `;
    }

    if (encomenda.status === 'retirada') {
      return `
        <div class="page">
          <header class="page-header"><h1>Confirmar Retirada</h1></header>
          <div class="empty-state">Esta encomenda já foi retirada por ${encomenda.retirada.retiradoPor} em ${encomenda.retirada.data} às ${encomenda.retirada.hora}.</div>
          <a class="btn btn--secondary" href="#/porteiro/encomendas">Voltar</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header"><h1>Confirmar Retirada</h1></header>
        <div class="card" style="max-width:480px;">
          <div class="card__body">
            <p><strong>Unidade:</strong> ${encomenda.unidade}</p>
            <p><strong>Remetente:</strong> ${encomenda.remetente}</p>
            <form id="retirada-form">
              <div class="form-field">
                <label class="form-label" for="ret-nome">Nome de quem está retirando</label>
                <input class="form-input" id="ret-nome" required>
              </div>
              <p id="retirada-erro" class="form-error" hidden></p>
              <button class="btn btn--primary" type="submit">Confirmar retirada</button>
              <a class="btn btn--secondary" href="#/porteiro/encomendas">Cancelar</a>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('retirada-form');
    if (!form) return;
    const erro = document.getElementById('retirada-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const nome = document.getElementById('ret-nome').value.trim();

      // RN10 — retirada deve ser confirmada com registro de data, hora e nome do retirador
      if (!nome) {
        erro.textContent = 'Informe o nome de quem está retirando a encomenda.';
        erro.hidden = false;
        return;
      }

      const encomenda = this.encomendaAtual();
      const agora = new Date();
      encomenda.status = 'retirada';
      encomenda.retirada = {
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        retiradoPor: nome,
      };

      location.hash = '/porteiro/encomendas';
    });
  },
};
