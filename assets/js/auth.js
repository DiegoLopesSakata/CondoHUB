// assets/js/auth.js — login/logout e controle de perfil

import { AppState } from './state.js';
import { USUARIOS } from '../../data/users.js';

export const DASHBOARD_POR_PERFIL = {
  sindico: '/sindico/dashboard',
  morador: '/morador/dashboard',
  porteiro: '/porteiro/dashboard',
  funcionario: '/funcionario/dashboard',
};

// RN01 — não é permitido login sem e-mail e senha válidos cadastrados
export function login(email, senha) {
  const usuario = USUARIOS.find(
    (u) => u.email === email && u.senha === senha && u.ativo
  );
  if (!usuario) return null;

  AppState.usuarioLogado = usuario;
  return usuario;
}

export function logout() {
  AppState.usuarioLogado = null;
  AppState.rotaAtual = '/login';
  AppState.rotaAnterior = null;
  location.hash = '/login';
}

export function usuarioAutenticado() {
  return !!AppState.usuarioLogado;
}
