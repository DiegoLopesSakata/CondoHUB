// components/topbar.js — barra superior com usuário logado

import { logout } from '../assets/js/auth.js';
import { notificacoesPara } from '../assets/js/notificacoes.js';

const NOME_PERFIL = {
  sindico: 'Síndico',
  morador: 'Morador',
  porteiro: 'Porteiro',
  funcionario: 'Funcionário',
};

export function renderTopbar(usuarioLogado) {
  const header = document.getElementById('topbar');
  if (!header || !usuarioLogado) return;

  const naoLidas = notificacoesPara(usuarioLogado).filter((n) => !n.lida).length;

  header.innerHTML = `
    <div class="topbar__info">
      <strong>${usuarioLogado.nome}</strong>
      <span class="badge badge--green">${NOME_PERFIL[usuarioLogado.perfil] || usuarioLogado.perfil}</span>
    </div>
    <div class="topbar__actions">
      <a href="#/notificacoes" aria-label="${naoLidas} notificações não lidas">
        🔔${naoLidas ? `<span class="badge badge--red" style="font-size:10px; vertical-align:top;">${naoLidas}</span>` : ''}
      </a>
      <a href="#/perfil" aria-label="Perfil">👤</a>
      <button type="button" id="topbar-logout-btn" class="btn btn--secondary btn--sm">Sair</button>
    </div>
  `;

  document.getElementById('topbar-logout-btn').addEventListener('click', logout);
}
