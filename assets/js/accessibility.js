// assets/js/accessibility.js — modo baixa visão

import { AppState } from './state.js';

export function ativarModoBaixaVisao() {
  document.body.classList.add('low-vision');
  AppState.modoAcessibilidade.baixaVisao = true;
  // TODO: adicionar listener de mouseover nos elementos de texto
  // TODO: aplicar classe .lv-focus no elemento sob o cursor
  // TODO: remover a classe após X ms ou no mouseout
}

export function desativarModoBaixaVisao() {
  document.body.classList.remove('low-vision');
  AppState.modoAcessibilidade.baixaVisao = false;
  // TODO: remover todos os listeners e classes .lv-focus
}

export function alternarModoBaixaVisao() {
  if (AppState.modoAcessibilidade.baixaVisao) {
    desativarModoBaixaVisao();
  } else {
    ativarModoBaixaVisao();
  }
}

// TODO: vincular #a11y-toggle a alternarModoBaixaVisao() no carregamento da página
