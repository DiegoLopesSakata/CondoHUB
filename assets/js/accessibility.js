// assets/js/accessibility.js — modo baixa visão

import { AppState } from './state.js';

const SELETOR_FOCO = 'p, span, h1, h2, h3, h4, h5, h6, label, a, button, li, td, th';

export function ativarModoBaixaVisao() {
  document.body.classList.add('low-vision');
  AppState.modoAcessibilidade.baixaVisao = true;
}

export function desativarModoBaixaVisao() {
  document.body.classList.remove('low-vision');
  AppState.modoAcessibilidade.baixaVisao = false;
  document.querySelectorAll('.lv-focus').forEach((el) => el.classList.remove('lv-focus'));
}

export function alternarModoBaixaVisao() {
  if (AppState.modoAcessibilidade.baixaVisao) {
    desativarModoBaixaVisao();
  } else {
    ativarModoBaixaVisao();
  }
}

function inicializar() {
  const botao = document.getElementById('a11y-toggle');
  if (botao) {
    botao.addEventListener('click', alternarModoBaixaVisao);
  }

  document.addEventListener('mouseover', (evento) => {
    if (!AppState.modoAcessibilidade.baixaVisao) return;
    const alvo = evento.target.closest(SELETOR_FOCO);
    if (alvo) alvo.classList.add('lv-focus');
  });

  document.addEventListener('mouseout', (evento) => {
    if (!AppState.modoAcessibilidade.baixaVisao) return;
    const alvo = evento.target.closest('.lv-focus');
    if (alvo) alvo.classList.remove('lv-focus');
  });
}

window.addEventListener('DOMContentLoaded', inicializar);
