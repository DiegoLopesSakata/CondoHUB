// data/tarefas.js — mock de tarefas atribuídas a funcionários (RF12)
// Campo sugerido: { id, titulo, descricao, atribuidoPara, criadoPor, prazo, status }

let tarefasIniciais = [];
try {
  const salvas = localStorage.getItem('condohub_tarefas');
  if (salvas) {
    tarefasIniciais = JSON.parse(salvas);
  }
} catch (e) {
  console.error('Erro ao ler tarefas do localStorage', e);
}

export const tarefas = tarefasIniciais;

export function salvarTarefas() {
  localStorage.setItem('condohub_tarefas', JSON.stringify(tarefas));
}
