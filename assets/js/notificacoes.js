// assets/js/notificacoes.js — geração e sincronização da central de notificações (RF06, RF09)

import { AppState } from './state.js';
import { ordens } from '../../data/manutencao.js';

const DIAS_ALERTA_MANUTENCAO = 7; // RN05

export function notificar(notificacao) {
  AppState.notificacoes.push({
    id: Math.max(0, ...AppState.notificacoes.map((n) => n.id)) + 1,
    criadoEm: new Date().toISOString(),
    lida: false,
    ...notificacao,
  });
}

// RF06 — notifica o síndico quando uma manutenção está vencida ou a até 7 dias do vencimento (RN05)
export function sincronizarAlertasManutencao() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  ordens.forEach((ordem) => {
    if (ordem.status === 'concluida') return;

    const previsao = new Date(ordem.dataPrevisao + 'T00:00:00');
    const dias = Math.round((previsao - hoje) / 86400000);
    if (dias > DIAS_ALERTA_MANUTENCAO) return;

    const jaExiste = AppState.notificacoes.some(
      (n) => n.tipo === 'manutencao' && n.referenciaId === ordem.id
    );
    if (jaExiste) return;

    notificar({
      tipo: 'manutencao',
      referenciaId: ordem.id,
      mensagem: dias < 0
        ? `Manutenção "${ordem.area}" está vencida desde ${ordem.dataPrevisao}.`
        : `Manutenção "${ordem.area}" vence em ${dias} dia(s).`,
      link: `#/sindico/manutencao/${ordem.id}`,
      destino: { perfil: 'sindico' },
    });
  });
}

export function notificacoesPara(usuario) {
  return AppState.notificacoes
    .filter((n) => (n.destino.perfil && n.destino.perfil === usuario.perfil) || (n.destino.unidade && n.destino.unidade === usuario.unidade))
    .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
}
