// data/users.js — mock de usuários (moradores, síndico, porteiro, funcionário)

export const PERFIS = ['sindico', 'morador', 'porteiro', 'funcionario'];

export const USUARIOS = [
  {
    id: 1,
    nome: 'Carlos Andrade',
    email: 'carlos@condohub.com',
    senha: '1234',          // mock — nunca hash em produção
    perfil: 'sindico',
    unidade: null,
    ativo: true,
  },
  {
    id: 2,
    nome: 'Ana Costa',
    email: 'ana@condohub.com',
    senha: '1234',
    perfil: 'morador',
    unidade: 'Apto 302',
    veiculoEletrico: true, // RN07 — necessário para reservar vaga com carregador EV
    inadimplente: false,   // RN11 — bloqueia reserva de área comum quando true (conforme área)
    ativo: true,
  },
  {
    id: 3,
    nome: 'Roberto Andrade',
    email: 'roberto@condohub.com',
    senha: '1234',
    perfil: 'porteiro',
    unidade: null,
    turno: '07h-15h',
    ativo: true,
  },
  {
    id: 4,
    nome: 'José Melo',
    email: 'jose@condohub.com',
    senha: '1234',
    perfil: 'funcionario',
    cargo: 'Zelador',
    ativo: true,
  },
];
