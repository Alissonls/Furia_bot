const { Telegraf } = require('telegraf');
const { logInfo } = require('../utils/logger');
const axios = require('axios');
const express = require('express');
const path = require('path');

// Token oficial do @PanteraRush_bot
const bot = new Telegraf('7812411873:AAFGTTrxC5JFYWvSO1hKExqv243hJXwxYbQ');

// Função auxiliar para gerar estatísticas realistas
function gerarEstatisticasJogador() {
  return {
    kills: Math.floor(Math.random() * 30),
    deaths: Math.floor(Math.random() * 20),
    assists: Math.floor(Math.random() * 10),
  };
}

// Comando: /status
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
        { name: 'arT', ...gerarEstatisticasJogador() },
        { name: 'KSCERATO', ...gerarEstatisticasJogador() },
        { name: 'chelo', ...gerarEstatisticasJogador() },
        { name: 'FalleN', ...gerarEstatisticasJogador() },
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
${furiaMatch.players.map((p, i) => `${i + 1}. *${p.name}*: ${p.kills} K / ${p.deaths} D / ${p.assists} A`).join('\n')}
`;

    await ctx.telegram.editMessageText(
      loadingMessage.chat.id,
      loadingMessage.message_id,
      undefined,
      mensagem,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Erro ao buscar status:', error);
    await ctx.reply('🚨 Não conseguimos obter o status agora. Tente novamente mais tarde.');
  }
}

// Comando: /gritar
async function gritarCommand(ctx) {
  const mensagem = `
🎶 *Gritando com a torcida da FURIA!* 🎶
💥 "FURIA, FURIA, FURIA!!!"
💪 AQUI É FURIAAAA!!!
🔥 #FURIA #GoFURIA #TorcidaFURIA
  `;
  await ctx.reply(mensagem, { parse_mode: 'Markdown' });
}

// Comando: /estatisticas (individual)
async function estatisticasCommand(ctx) {
  const jogadores = ['KSCERATO', 'yuurih', 'chelo', 'arT', 'FalleN'];
  const stats = jogadores.map(nome => {
    const s = gerarEstatisticasJogador();
    return `🐾 *${nome}*: ${s.kills} kills / ${s.deaths} deaths / ${s.assists} assists`;
  }).join('\n');

  await ctx.reply(`📊 *Estatísticas Individuais do Último Treino:*\n\n${stats}`, {
    parse_mode: 'Markdown'
  });
}

// Comando: /noticias (aleatórias)
async function noticiasCommand(ctx) {
  const noticias = [
    "🔥 *FURIA avança invicta para os playoffs da IEM Brasil!*",
    "🐆 *FalleN garante clutch histórico e leva a torcida à loucura!*",
    "📢 *Novo coach será anunciado em breve, diz CEO da FURIA!*",
    "💣 *KSCERATO ultrapassa 2000 kills em eventos Tier-S!*",
    "📈 *Equipe registra melhor desempenho no ano com 83% de vitórias!*",
  ];
  const noticia = noticias[Math.floor(Math.random() * noticias.length)];
  await ctx.reply(noticia, { parse_mode: 'Markdown' });
}

// Comandos
bot.start((ctx) => ctx.reply(`
🎮 Bem-vindo, Agente Pantera!
Use /status para ver o jogo!
Use /gritar para torcer!
Use /estatisticas para ver o desempenho individual!
Use /noticias para novidades da selva!
`));

bot.command('status', statusCommand);
bot.command('gritar', gritarCommand);
bot.command('estatisticas', estatisticasCommand);
bot.command('noticias', noticiasCommand);

// Start bot
bot.launch().then(() => logInfo('🤖 Bot da FURIA (PanteraRush) está rodando!'));

// Landing page Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(3000, () => {
  console.log('🚀 Landing page rodando em http://localhost:3000');
});
