// assets/js/router.js — hash router (SPA sem reload)

import { AppState } from './state.js';
import { DASHBOARD_POR_PERFIL } from './auth.js';
import { sincronizarAlertasManutencao } from './notificacoes.js';
import { renderSidebar } from '../../components/sidebar.js';
import { renderTopbar } from '../../components/topbar.js';

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

const ROTAS_COMPILADAS = Object.entries(ROTAS).map(([padrao, modulo]) => ({
  padrao,
  modulo,
  partes: padrao.split('/').filter(Boolean),
}));

const PERFIL_POR_PREFIXO = {
  sindico: 'sindico',
  morador: 'morador',
  porteiro: 'porteiro',
  funcionario: 'funcionario',
};

const ROTAS_RESTRITAS_SINDICO = new Set(['/cadastro']); // RN03

function resolverRota(hash) {
  const caminho = hash.replace(/^#/, '') || '/login';
  const partesAtuais = caminho.split('/').filter(Boolean);

  for (const rota of ROTAS_COMPILADAS) {
    if (rota.partes.length !== partesAtuais.length) continue;

    const params = {};
    let combina = true;

    for (let i = 0; i < rota.partes.length; i++) {
      const parteRota = rota.partes[i];
      const parteAtual = partesAtuais[i];
      if (parteRota.startsWith(':')) {
        params[parteRota.slice(1)] = parteAtual;
      } else if (parteRota !== parteAtual) {
        combina = false;
        break;
      }
    }

    if (combina) {
      return { caminho: '/' + partesAtuais.join('/'), modulo: rota.modulo, params };
    }
  }

  return null;
}

let viewAtual = null;

async function renderizarRota() {
  if (!location.hash) {
    const usuario = AppState.usuarioLogado;
    location.hash = usuario ? DASHBOARD_POR_PERFIL[usuario.perfil] : '/login';
    return;
  }

  const resultado = resolverRota(location.hash);
  const usuario = AppState.usuarioLogado;

  if (!resultado) {
    location.hash = usuario ? DASHBOARD_POR_PERFIL[usuario.perfil] : '/login';
    return;
  }

  const { caminho, modulo, params } = resultado;

  // Guarda de autenticação e de perfil
  if (caminho === '/login') {
    if (usuario) {
      location.hash = DASHBOARD_POR_PERFIL[usuario.perfil];
      return;
    }
  } else if (!usuario) {
    location.hash = '/login';
    return;
  } else {
    const prefixo = caminho.split('/')[1];
    if (PERFIL_POR_PREFIXO[prefixo] && PERFIL_POR_PREFIXO[prefixo] !== usuario.perfil) {
      location.hash = DASHBOARD_POR_PERFIL[usuario.perfil];
      return;
    }
    if (ROTAS_RESTRITAS_SINDICO.has(caminho) && usuario.perfil !== 'sindico') {
      location.hash = DASHBOARD_POR_PERFIL[usuario.perfil];
      return;
    }
  }

  if (usuario) {
    sincronizarAlertasManutencao(); // RF06 — mantém a central de notificações do síndico em dia
  }

  AppState.rotaAnterior = AppState.rotaAtual;
  AppState.rotaAtual = caminho;

  const ehLogin = caminho === '/login';
  document.getElementById('app-shell').hidden = ehLogin;
  document.getElementById('auth-shell').hidden = !ehLogin;

  if (viewAtual && typeof viewAtual.destroy === 'function') {
    viewAtual.destroy();
  }

  const view = (await import(`../../views/${modulo}.js`)).default;
  viewAtual = view;
  view.render(params);

  if (!ehLogin) {
    renderSidebar(usuario.perfil, caminho);
    renderTopbar(usuario);
  }
}

export function iniciarRouter() {
  window.addEventListener('hashchange', renderizarRota);
  window.addEventListener('DOMContentLoaded', renderizarRota);
}

iniciarRouter();
