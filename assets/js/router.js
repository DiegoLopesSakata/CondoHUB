// assets/js/router.js — hash router (SPA sem reload)

export const ROTAS = {
  // Auth
  '/login':                     'auth/login',
  '/cadastro':                  'shared/cadastro',
  '/notificacoes':              'shared/notificacoes',
  '/perfil':                    'shared/perfil',

  // Síndico
  '/sindico/dashboard':         'sindico/dashboard',
  '/sindico/moradores':         'sindico/moradores-lista',
  '/sindico/moradores/novo':    'sindico/moradores-form',
  '/sindico/funcionarios/novo': 'sindico/funcionarios-form',
  '/sindico/manutencao':        'sindico/manutencao-lista',
  '/sindico/manutencao/nova':   'sindico/manutencao-form',
  '/sindico/manutencao/:id':    'sindico/manutencao-detalhe',
  '/sindico/vagas-ev':          'sindico/vagas-ev-gestao',
  '/sindico/sustentabilidade':  'sindico/sustentabilidade-geral',
  '/sindico/comunicados/novo':  'sindico/comunicados-form',
  '/sindico/tarefas':           'sindico/tarefas-lista',
  '/sindico/tarefas/nova':      'sindico/tarefas-form',
  '/sindico/reunioes':          'sindico/reunioes-lista',
  '/sindico/reunioes/nova':     'sindico/reunioes-form',
  '/sindico/reunioes/:id':      'sindico/reunioes-detalhe',
  '/sindico/reunioes/:id/ata':  'sindico/reunioes-ata',

  // Morador
  '/morador/dashboard':         'morador/dashboard',
  '/morador/pets':              'morador/pets-lista',
  '/morador/pets/novo':         'morador/pets-form',
  '/morador/vagas-ev':          'morador/vagas-ev-reservar',
  '/morador/vagas-ev/historico':'morador/vagas-ev-historico',
  '/morador/sustentabilidade':  'morador/sustentabilidade-unidade',
  '/morador/comunicados':       'morador/comunicados-lista',
  '/morador/comunicados/:id':   'morador/comunicados-detalhe',
  '/morador/encomendas':        'morador/encomendas-morador',
  '/morador/mudancas':          'morador/mudancas-lista',
  '/morador/mudancas/nova':     'morador/mudancas-form',
  '/morador/areas':             'morador/areas-lista',
  '/morador/areas/:id':         'morador/areas-calendario',
  '/morador/areas/:id/confirmar':'morador/areas-confirmar',
  '/morador/reunioes/:id/presenca':'morador/reunioes-presenca',
  '/morador/historico':         'morador/historico',

  // Porteiro
  '/porteiro/dashboard':        'porteiro/dashboard',
  '/porteiro/acessos/novo':     'porteiro/acesso-form',
  '/porteiro/acessos':          'porteiro/acesso-lista',
  '/porteiro/acessos/buscar':   'porteiro/acesso-buscar',
  '/porteiro/encomendas/nova':  'porteiro/encomendas-form',
  '/porteiro/encomendas':       'porteiro/encomendas-lista',
  '/porteiro/encomendas/:id/retirada':'porteiro/encomendas-retirada',

  // Funcionário
  '/funcionario/dashboard':     'funcionario/dashboard',
  '/funcionario/tarefas':       'funcionario/tarefas-minhas',
  '/funcionario/tarefas/:id':   'funcionario/tarefas-detalhe',
};

// TODO: escutar 'hashchange' e 'DOMContentLoaded'
// TODO: resolver a rota atual (com suporte a parâmetros ':id') contra ROTAS
// TODO: verificar AppState.usuarioLogado / perfil antes de renderizar (guarda de rota)
// TODO: importar dinamicamente a view resolvida e chamar view.render(params)
// TODO: injetar o HTML da view em #app-content (ou #auth-content quando não autenticado)
// TODO: atualizar AppState.rotaAnterior / AppState.rotaAtual a cada navegação

export function iniciarRouter() {
  // TODO: implementar
}
