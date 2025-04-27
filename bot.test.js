const { Telegraf } = require('telegraf');
const axios = require('axios');
const { statusCommand } = require('./bot');  // Ajuste conforme necessário
const { gritarCommand } = require('./commands/gritar');

// Mock da biblioteca Telegraf
jest.mock('telegraf');

// Mock da biblioteca axios
jest.mock('axios');

// Corrigir o lançamento do bot apenas se não for um ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  const bot = new Telegraf('YOUR_BOT_TOKEN');
  bot.launch().then(() => console.log('🤖 Bot da FURIA está rodando!'));
}

describe('Testando o bot da FURIA', () => {
  
  let ctx;

  beforeEach(() => {
    // Cria um objeto de contexto para simular o comportamento do Telegram
    ctx = {
      reply: jest.fn(),
      telegram: {
        editMessageText: jest.fn(),
      },
    };
  });

  it('deve gerar estatísticas aleatórias para o jogador', () => {
    // Simulando a função de gerar estatísticas aleatórias
    const gerarEstatisticasJogador = () => ({
      kills: Math.floor(Math.random() * 100),
      deaths: Math.floor(Math.random() * 100),
      assists: Math.floor(Math.random() * 50),
    });

    const stats = gerarEstatisticasJogador();
    expect(stats).toHaveProperty('kills');
    expect(stats).toHaveProperty('deaths');
    expect(stats).toHaveProperty('assists');
  });

  it('deve gerar um status de jogo com placar aleatório', async () => {
    // Simulando a resposta da API de jogos
    axios.get.mockResolvedValue({
      data: [
        {
          team1: { name: 'FURIA', score: Math.floor(Math.random() * 16) },
          team2: { name: 'OpTic', score: Math.floor(Math.random() * 16) },
        },
      ],
    });

    await statusCommand(ctx);  // Chama a função de status do bot

    // Verifica se a função de editar a mensagem foi chamada
    expect(ctx.telegram.editMessageText).toHaveBeenCalled();
    expect(ctx.telegram.editMessageText).toHaveBeenCalledWith(
      expect.any(Number),  // chat id
      expect.any(Number),  // message id
      undefined,
      expect.stringContaining('FURIA'),
      { parse_mode: 'Markdown' }
    );
  });

  it('deve gerar uma mensagem de torcida', async () => {
    await gritarCommand(ctx);  // Chama a função de gritar do bot

    // Verifica se a função de reply foi chamada com a mensagem certa
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('🎶 *Gritando com a torcida da FURIA!*')
    );
  });

});
