// components/modal.js — modal genérico (.modal .modal__overlay .modal__box)

function aoTeclarEscape(evento) {
  if (evento.key === 'Escape') fecharModal();
}

export function abrirModal({ titulo, corpoHtml, onConfirmar, textoConfirmar = 'Confirmar', textoCancelar = 'Cancelar' }) {
  fecharModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal__overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <h2 id="modal-titulo">${titulo}</h2>
      <div>${corpoHtml}</div>
      <div style="margin-top:16px; display:flex; gap:8px; justify-content:flex-end;">
        <button type="button" class="btn btn--secondary btn--sm" id="modal-cancelar">${textoCancelar}</button>
        <button type="button" class="btn btn--danger btn--sm" id="modal-confirmar">${textoConfirmar}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.addEventListener('keydown', aoTeclarEscape);

  overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) fecharModal();
  });

  document.getElementById('modal-cancelar').addEventListener('click', fecharModal);
  document.getElementById('modal-confirmar').addEventListener('click', () => {
    onConfirmar();
    fecharModal();
  });

  document.getElementById('modal-confirmar').focus();
}

export function fecharModal() {
  document.getElementById('modal-overlay')?.remove();
  document.removeEventListener('keydown', aoTeclarEscape);
}

export function confirmarExclusao(mensagem, onConfirmar) {
  abrirModal({
    titulo: 'Confirmar exclusão',
    corpoHtml: `<p>${mensagem}</p>`,
    onConfirmar,
    textoConfirmar: 'Excluir',
  });
}
