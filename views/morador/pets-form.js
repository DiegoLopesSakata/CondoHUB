import { AppState } from '../../assets/js/state.js';
import { pets } from '../../data/pets.js';
import { mostrarToast } from '../../components/notification.js';

export default {
  editando: null,

  render() {
    this.editando = AppState.cache.editandoPet || null;
    AppState.cache.editandoPet = null;

    const main = document.getElementById('app-content');
    main.innerHTML = this.template();
    this.bindEvents();
  },

  destroy() {
    this.editando = null;
  },

  template() {
    const p = this.editando || {};
    const vacinacao = p.vacinacao || {};

    return `
      <div class="page">
        <header class="page-header">
          <h1>${this.editando ? 'Editar Pet' : 'Cadastrar Pet'}</h1>
        </header>
        <form id="pet-form" class="card" style="max-width:480px;" novalidate>
          <div class="card__body">
            <div class="form-field">
              <label class="form-label" for="pet-nome">Nome</label>
              <input class="form-input" id="pet-nome" value="${p.nome ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="pet-especie">Espécie</label>
              <input class="form-input" id="pet-especie" value="${p.especie ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="pet-raca">Raça</label>
              <input class="form-input" id="pet-raca" value="${p.raca ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="pet-responsavel">Responsável</label>
              <input class="form-input" id="pet-responsavel" value="${p.responsavel ?? ''}" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="pet-ultima-vacina">Última vacinação</label>
              <input class="form-input" type="date" id="pet-ultima-vacina" value="${vacinacao.ultimaData ?? ''}">
            </div>
            <div class="form-field">
              <label class="form-label" for="pet-proxima-vacina">Próxima vacinação</label>
              <input class="form-input" type="date" id="pet-proxima-vacina" value="${vacinacao.proximaData ?? ''}">
            </div>
            <p id="pet-erro" class="form-error" hidden></p>
            <button class="btn btn--primary" type="submit">${this.editando ? 'Salvar' : 'Cadastrar'}</button>
            <a class="btn btn--secondary" href="#/morador/pets">Cancelar</a>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    const form = document.getElementById('pet-form');
    const erro = document.getElementById('pet-erro');

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      erro.hidden = true;

      const nome = document.getElementById('pet-nome').value.trim();
      const especie = document.getElementById('pet-especie').value.trim();
      const raca = document.getElementById('pet-raca').value.trim();
      const responsavel = document.getElementById('pet-responsavel').value.trim();
      const ultimaData = document.getElementById('pet-ultima-vacina').value;
      const proximaData = document.getElementById('pet-proxima-vacina').value;

      // RN19 — não é permitido cadastrar pet sem espécie, raça, nome e responsável
      if (!nome || !especie || !raca || !responsavel) {
        erro.textContent = 'Preencha nome, espécie, raça e responsável.';
        erro.hidden = false;
        return;
      }

      const usuario = AppState.usuarioLogado;

      if (this.editando) {
        const alvo = pets.find((p) => p.id === this.editando.id);
        alvo.nome = nome;
        alvo.especie = especie;
        alvo.raca = raca;
        alvo.responsavel = responsavel;
        alvo.vacinacao = { ultimaData: ultimaData || null, proximaData: proximaData || null };
      } else {
        pets.push({
          id: Math.max(0, ...pets.map((p) => p.id)) + 1,
          nome,
          especie,
          raca,
          unidade: usuario.unidade,
          responsavel,
          vacinacao: { ultimaData: ultimaData || null, proximaData: proximaData || null },
        });
      }

      mostrarToast(this.editando ? 'Pet atualizado com sucesso.' : 'Pet cadastrado com sucesso.', 'sucesso');
      location.hash = '/morador/pets';
    });
  },
};
