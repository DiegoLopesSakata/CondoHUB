// data/areas.js — mock de áreas comuns e reservas (RF14, RN11, RN12, RN13)

export const areas = [
  { id: 1, nome: 'Salão de Festas', capacidade: 60, bloqueiaInadimplente: true, reservas: [] },
  { id: 2, nome: 'Churrasqueira', capacidade: 20, bloqueiaInadimplente: true, reservas: [] },
  { id: 3, nome: 'Quadra Poliesportiva', capacidade: 12, bloqueiaInadimplente: false, reservas: [] },
];

export const HORARIOS_DISPONIVEIS = ['09:00-12:00', '13:00-17:00', '18:00-22:00'];
