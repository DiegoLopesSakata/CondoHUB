// components/notification.js — toast/snackbar de notificação (.toast)

let timeoutAtual = null;

export function mostrarToast(mensagem, tipo = 'info') {
  document.querySelectorAll('.toast').forEach((el) => el.remove());
  clearTimeout(timeoutAtual);

  const toast = document.createElement('div');
  toast.className = `toast${tipo === 'erro' ? ' toast--erro' : tipo === 'sucesso' ? ' toast--sucesso' : ''}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = mensagem;
  document.body.appendChild(toast);

  timeoutAtual = setTimeout(() => toast.remove(), 4000);
}
