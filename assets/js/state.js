// assets/js/state.js — estado global da aplicação

let usuarioSalvo = null;
try {
  const userJson = localStorage.getItem('condohub_user');
  if (userJson) {
    usuarioSalvo = JSON.parse(userJson);
  }
} catch (e) {
  console.error('Erro ao ler usuário do localStorage', e);
}

export const AppState = {
  usuarioLogado: usuarioSalvo,       // objeto do usuário autenticado
  rotaAtual: location.hash || '/login', // hash atual
  rotaAnterior: null,        // para botões "voltar"
  notificacoes: [],          // lista de notificações do usuário
  modoAcessibilidade: {
    baixaVisao: false,       // modo de ampliação sob cursor
    tamanhoBase: 16,         // font-size base em px
  },
  // Cache de dados carregados para a sessão
  cache: {},
};
