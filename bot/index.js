const { Telegraf } = require('telegraf');
const { logInfo } = require('../utils/logger');
const axios = require('axios');
const express = require('express');
const path = require('path');

// Token oficial do @PanteraRush_bot (não esquece de proteger esse token!)
const bot = new Telegraf('7812411873:AAFGTTrxC5JFYWvSO1hKExqv243hJXwxYbQ');

// Função de gerar estatísticas aleatórias
function gerarEstatisticasJogador() {
  return {
    kills: Math.floor(Math.random() * 30),
    deaths: Math.floor(Math.random() * 20),
    assists: Math.floor(Math.random() * 10),
  };
}

// Função para o comando /status
async function statusCommand(ctx) {
  try {
    const loadingMessage = await ctx.reply('🔎 Buscando informações sobre a FURIA...');

    const furiaMatch = {
      event: { name: 'CS:GO Major Tournament' },
      team1: { name: 'FURIA', score: Math.floor(Math.random() * 16) + 10 },
      team2: { name: 'Team Liquid', score: Math.floor(Math.random() * 16) + 10 },
      date: new Date(),
      location: 'São Paulo, Brasil',
      players: [
        { name: 'yuurih', ...gerarEstatisticasJogador() },
        { name: 'art', ...gerarEstatisticasJogador() },
        { name: 'KSCERATO', ...gerarEstatisticasJogador() },
        { name: 'VINI', ...gerarEstatisticasJogador() },
        { name: 'drop', ...gerarEstatisticasJogador() },
      ]
    };

    const mensagem = `
🎮 *Partida Encontrada:*
🏆 Evento: ${furiaMatch.event.name}
🆚 Confronto: ${furiaMatch.team1.name} vs ${furiaMatch.team2.name}
🕐 Data e Hora: ${furiaMatch.date.toLocaleString('pt-BR')}
📍 Local: ${furiaMatch.location}

🔥 *Resultado Final:*
${furiaMatch.team1.name}: ${furiaMatch.team1.score} - ${furiaMatch.team2.name}: ${furiaMatch.team2.score}

🔫 *Estatísticas dos Jogadores*:
${furiaMatch.players.map((player, index) => `${index + 1}. *${player.name}*: Kills: ${player.kills}, Deaths: ${player.deaths}, Assists: ${player.assists}`).join('\n')}
    `;

    await ctx.telegram.editMessageText(
      loadingMessage.chat.id,
      loadingMessage.message_id,
      undefined,
      mensagem,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Erro ao buscar o status:', error);
    await ctx.reply('🚨 Não conseguimos obter o status agora. Tente novamente mais tarde.');
  }
}

// Função para o comando /gritar
async function gritarCommand(ctx) {
  const mensagem = `
🎶 *Gritando com a torcida da FURIA!* 🎶
💥 "FURIA, FURIA, FURIA!!!"
💪 AQUI É FURIAAAA!!!
🔥 #FURIA #GoFURIA #TorcidaFURIA
  `;
  await ctx.reply(mensagem, { parse_mode: 'Markdown' });
}

// Definindo os comandos do bot
bot.start((ctx) => ctx.reply('🎮 Bem-vindo, Agente Pantera!\nUse /status para ver o jogo!\nUse /gritar para torcer!'));
bot.command('status', statusCommand);
bot.command('gritar', gritarCommand);

// Iniciar o bot
bot.launch().then(() => logInfo('🤖 Bot da FURIA (PanteraRush) está rodando!'));

// Criar o servidor Express para a landing page
const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor na porta 3000
app.listen(3000, () => {
  console.log('🚀 Servidor da landing page rodando em http://localhost:3000');
});
