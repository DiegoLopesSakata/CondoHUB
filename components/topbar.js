// components/topbar.js — barra superior com usuário logado

export function renderTopbar(usuarioLogado) {
  const header = document.getElementById('topbar');
  if (!header) return;
  // TODO: exibir nome/perfil do usuário logado, ações rápidas (notificações, perfil, logout)
  header.innerHTML = '';
}
