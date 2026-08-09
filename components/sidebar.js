// components/sidebar.js — sidebar dinâmica por perfil

export function renderSidebar(perfil) {
  const nav = document.getElementById('sidebar');
  if (!nav) return;
  // TODO: montar itens de navegação de acordo com o perfil (sindico | morador | porteiro | funcionario)
  nav.innerHTML = '';
}
