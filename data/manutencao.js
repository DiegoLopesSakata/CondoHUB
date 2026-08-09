// data/manutencao.js — mock de ordens de manutenção (RF05, RF06, RN04, RN05, RN06)

export const ordens = [
  {
    id: 1,
    area: 'Elevador Principal',
    tipo: 'Revisão anual obrigatória',
    dataPrevisao: '2026-07-15',
    responsavel: 'Técnico Silva',
    contato: '(11) 94000-1234',
    prioridade: 'alta',        // 'normal' | 'alta' | 'critica'
    status: 'pendente',        // 'pendente' | 'em_andamento' | 'concluida' | 'vencida'
    criadoPor: 1,              // id do usuário
    criadoEm: '2026-07-12',
    observacoes: [],
  },
];
