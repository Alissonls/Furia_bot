# 🐆 PanteraRush_bot - FURIA CS:GO Fan Bot

Bot interativo feito com Node.js e Telegraf para torcedores da FURIA Esports. Traz informações em tempo real e interações personalizadas com a torcida do time de CS:GO. Ideal para fãs que querem acompanhar partidas, estatísticas, gritar com a torcida e receber notícias como se fossem oficiais.

----------

## 🚀 Funcionalidades

### 🎮 Comandos disponíveis

Comando

Descrição

`/start`

Mensagem de boas-vindas personalizada para fãs da FURIA

`/status`

Mostra uma simulação da próxima partida da FURIA, com estatísticas reais

`/gritar`

Exibe mensagens de torcida para incentivar o time

`/estatisticas`

Gera estatísticas individuais aleatórias dos jogadores da equipe

`/noticias`

Mostra uma notícia aleatória sobre o time, como se fosse oficial

----------

## 🔧 Tecnologias utilizadas

-   **Node.js** com Express
    
-   **Telegraf.js** (framework para bots do Telegram)
    
-   **HTML + CSS + JS** (Landing page responsiva com chatbot)
    
-   **Git + GitHub** para versionamento
    

----------

## 🌐 Landing Page


-   Layout inspirado na identidade visual da FURIA
    
-   Chatbot simulado com "Capitão Pantera", que responde mensagens como se fosse parte da equipe
    
-   Acesso rápido ao bot no Telegram
    
-   Totalmente responsivo (desktop e mobile)
    

----------

## 🧠 Arquitetura


furia-bot/
├── bot/
│   ├── index.js # Inicialização do Telegraf e comandos │   └── commands/
│       ├── status.js # Simula partidas da FURIA │       ├── gritar.js # Torcida │       ├── estatisticas.js # Stats dos jogadores │       └── noticias.js # Geração aleatória de notícias ├── public/
│   └── index.html # Landing page com chatbot ├── utils/
│   └── logger.js # Logger customizado ├── package.json
└── README.md # Você está aqui` 

----------

## ⚙️ Rodando o projeto

1.  Instale as dependências:
    

bash

CopiarEditar

`npm install` 

2.  Inicie o bot + landing page:
    

bash

CopiarEditar

`npm run start` 

> O bot será iniciado no Telegram e a landing page será servida na porta 3000.

----------

## 🧪 Testes

Os testes ainda estão sendo desenvolvidos. O arquivo `bot.test.js` está pronto para evoluções com mocks de comandos via Telegraf.

----------

## 💬 Exemplo de interação

yaml

CopiarEditar

`/status  🎮  Partida Encontrada:  FURIA  vs  Team  Liquid  Data:  01/05  -  18h  Local:  São  Paulo  🔥  Estatísticas:  -  yuurih:  24  K  /  10  D  /  4  A  -  arT:  19  K  /  13  D  /  7  A` 

----------

## 🤖 Autor

Desenvolvido por Alisson para a torcida da FURIA Esports 🐾  
Telegram: [@PanteraRush_bot](https://t.me/PanteraRush_bot)
