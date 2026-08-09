import { ordens } from '../../data/manutencao.js';

const LABEL_STATUS = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  vencida: 'Vencida',
};

export default {
  params: {},

  render(params = {}) {
    this.params = params;
    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {},

  ordemAtual() {
    return ordens.find((o) => o.id === Number(this.params.id));
  },

  template() {
    const ordem = this.ordemAtual();

    if (!ordem) {
      return `
        <div class="page">
          <header class="page-header"><h1>Manutenção não encontrada</h1></header>
          <a class="btn btn--secondary" href="#/sindico/manutencao">Voltar</a>
        </div>
      `;
    }

    return `
      <div class="page">
        <header class="page-header">
          <h1>${ordem.area}</h1>
        </header>
        <div class="card" style="max-width:600px;">
          <div class="card__body">
            <p><strong>Tipo:</strong> ${ordem.tipo || '-'}</p>
            <p><strong>Data prevista:</strong> ${ordem.dataPrevisao}</p>
            <p><strong>Responsável:</strong> ${ordem.responsavel} ${ordem.contato ? `(${ordem.contato})` : ''}</p>
            <p><strong>Prioridade:</strong> <span class="badge badge--gray">${ordem.prioridade}</span></p>
            <p><strong>Status:</strong> <span class="badge badge--blue">${LABEL_STATUS[ordem.status] || ordem.status}</span></p>

            <div>
              ${ordem.status === 'pendente'
                ? '<button type="button" class="btn btn--secondary btn--sm" id="btn-em-andamento">Marcar em andamento</button>'
                : ''}
              ${ordem.status !== 'concluida'
                ? '<button type="button" class="btn btn--primary btn--sm" id="btn-concluir">Concluir manutenção</button>'
                : ''}
            </div>
          </div>
        </div>

        <div class="card" style="max-width:600px; margin-top:16px;">
          <div class="card__header">Observações</div>
          <div class="card__body">
            ${ordem.observacoes.length
              ? ordem.observacoes.map((obs) => `<p>${obs}</p>`).join('')
              : '<p class="form-error" style="color:var(--text-500);">Nenhuma observação registrada.</p>'}
            <form id="obs-form">
              <div class="form-field">
                <label class="form-label" for="obs-texto">Nova observação</label>
                <textarea class="form-textarea" id="obs-texto" rows="3"></textarea>
              </div>
              <button class="btn btn--secondary btn--sm" type="submit">Adicionar observação</button>
            </form>
          </div>
        </div>

        <a class="btn btn--secondary" style="margin-top:16px;" href="#/sindico/manutencao">Voltar</a>
      </div>
    `;
  },

  bindEvents() {
    const ordem = this.ordemAtual();
    if (!ordem) return;

    // RN06 — conclusão só pelo funcionário responsável ou pelo síndico; nesta tela
    // (exclusiva do síndico, por guarda de rota) a ação está sempre disponível.
    document.getElementById('btn-em-andamento')?.addEventListener('click', () => {
      ordem.status = 'em_andamento';
      this.render(this.params);
    });

    document.getElementById('btn-concluir')?.addEventListener('click', () => {
      ordem.status = 'concluida';
      this.render(this.params);
    });

    document.getElementById('obs-form').addEventListener('submit', (evento) => {
      evento.preventDefault();
      const campo = document.getElementById('obs-texto');
      const texto = campo.value.trim();
      if (!texto) return;
      ordem.observacoes.push(texto);
      this.render(this.params);
    });
  },
};
