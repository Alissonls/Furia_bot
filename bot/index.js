const { Telegraf } = require('telegraf');
const { logInfo } = require('../utils/logger');
const axios = require('axios');
const express = require('express');
const path = require('path');

// Carregar variáveis de ambiente
require('dotenv').config();

// Inicializar o bot
const bot = new Telegraf(process.env.BOT_TOKEN);

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
    "📈 *Equipe registra melhor desempenho no ano com 76% de vitórias!*",
  ];
  const noticia = noticias[Math.floor(Math.random() * noticias.length)];
  await ctx.reply(noticia, { parse_mode: 'Markdown' });
}

// Comandos
bot.start((ctx) => ctx.replyWithMarkdown(`
  🐯 *GRRRR! EU SOU O CAPITÃO PANTERA!* 🐾
  
  *Bem-vindo à Selva, Furioso!* 💛🖤
  
  Aqui é o lugar onde a torcida mais brava do CS:GO se reúne! Eu sou seu guia nessa jornada pela glória da FURIA. Vamos dominar o jogo juntos? 
  
  *COMO FUNCIONA ESSA FÚRIA?* 🔥
  
  */status* - Quer saber como tá o jogo? É só mandar esse comando que eu te conto TUDO: placar, estatísticas e até como os jogadores tão performando!
  
  */gritar* - HORA DO GRITO DE GUERRA! Vamos fazer barulho e mostrar porque a torcida da FURIA é a mais apaixonada! 💥 *FURIA! FURIA! FURIA!*
  
  */estatisticas* - Curioso pra saber como tá o KDA do KSCERATO? Ou quantas clutches o FalleN fez? Esse comando te mostra tudo! 📊
  
  */noticias* - As últimas novidades quentinhas da selva! Tá por dentro de tudo que rola no time! 📰
  
  *MANDA VER, TORCEDOR!* 🚀
  O que você quer fazer agora? Me diz que eu te guio nessa jornada! 
  
  *Lembre-se: PANTERA NÃO RECUA!* 🐾💪
  `));

bot.command('status', statusCommand);
bot.command('gritar', gritarCommand);
bot.command('estatisticas', estatisticasCommand);
bot.command('noticias', noticiasCommand);

// Start bot (lance o bot de forma assíncrona)
bot.launch().then(() => {
  console.log('🤖 Bot da FURIA está rodando no Telegram!');
}).catch((err) => {
  console.error('Erro ao rodar o bot:', err);
});

// Landing page Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));  // Correção aqui: fechando parênteses
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(3000, () => {
  console.log('🚀 Landing page rodando em http://localhost:3000');
});
