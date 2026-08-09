// components/sidebar.js — sidebar dinâmica por perfil

const MENUS = {
  sindico: [
    { rota: '/sindico/dashboard', label: 'Dashboard' },
    { rota: '/sindico/moradores', label: 'Moradores e Funcionários' },
    { rota: '/sindico/manutencao', label: 'Manutenção' },
    { rota: '/sindico/vagas-ev', label: 'Vagas EV' },
    { rota: '/sindico/sustentabilidade', label: 'Sustentabilidade' },
    { rota: '/sindico/comunicados/novo', label: 'Comunicados' },
    { rota: '/sindico/tarefas', label: 'Tarefas' },
    { rota: '/sindico/reunioes', label: 'Reuniões' },
  ],
  morador: [
    { rota: '/morador/dashboard', label: 'Dashboard' },
    { rota: '/morador/pets', label: 'Pets' },
    { rota: '/morador/vagas-ev', label: 'Vagas EV' },
    { rota: '/morador/sustentabilidade', label: 'Sustentabilidade' },
    { rota: '/morador/comunicados', label: 'Comunicados' },
    { rota: '/morador/encomendas', label: 'Encomendas' },
    { rota: '/morador/mudancas', label: 'Mudanças' },
    { rota: '/morador/areas', label: 'Áreas Comuns' },
    { rota: '/morador/historico', label: 'Histórico' },
  ],
  porteiro: [
    { rota: '/porteiro/dashboard', label: 'Dashboard' },
    { rota: '/porteiro/encomendas', label: 'Encomendas' },
    { rota: '/porteiro/acessos', label: 'Acessos' },
  ],
  funcionario: [
    { rota: '/funcionario/dashboard', label: 'Dashboard' },
    { rota: '/funcionario/tarefas', label: 'Minhas Tarefas' },
  ],
};

export function renderSidebar(perfil, rotaAtual = '') {
  const nav = document.getElementById('sidebar');
  if (!nav) return;

  nav.setAttribute('aria-label', 'Navegação principal');
  const itens = MENUS[perfil] || [];

  nav.innerHTML = `
    <div class="sidebar__group">
      <span class="sidebar__brand">CondoHub</span>
    </div>
    <div class="sidebar__group">
      ${itens
        .map(
          (item) => `
        <a
          class="sidebar__item${rotaAtual.startsWith(item.rota) ? ' sidebar__item--active' : ''}"
          href="#${item.rota}"
        >${item.label}</a>`
        )
        .join('')}
    </div>
  `;
}
