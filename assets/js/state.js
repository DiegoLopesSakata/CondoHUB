// assets/js/state.js — estado global da aplicação

export const AppState = {
  usuarioLogado: null,       // objeto do usuário autenticado
  rotaAtual: '/login',       // hash atual
  rotaAnterior: null,        // para botões "voltar"
  notificacoes: [],          // lista de notificações do usuário
  modoAcessibilidade: {
    baixaVisao: false,       // modo de ampliação sob cursor
    tamanhoBase: 16,         // font-size base em px
  },
  // Cache de dados carregados para a sessão
  cache: {},
};
