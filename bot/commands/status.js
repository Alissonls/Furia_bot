import { getGameStatus } from 'http://localhost:3000';

async function statusCommand(ctx) {
  const gameStatus = await getGameStatus();
  if (gameStatus) {
    ctx.reply(`🎯 *Status ao Vivo: ${gameStatus.game}*
🕹️ *Placar:* ${gameStatus.score}
🗺️ *Mapa:* ${gameStatus.map}
🔥 *Status da Partida:* ${gameStatus.matchStatus}
🦁 *Jogador em Destaque:* ${gameStatus.highlightPlayer}`);
  } else {
    ctx.reply('🚨 Não conseguimos obter o status agora. Tente novamente mais tarde!');
  }
}

export default { statusCommand };