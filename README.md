
# 🐆 PanteraRush_bot – FURIA CS:GO Fan Bot

Bot interativo feito com Node.js e Telegraf para torcedores da **FURIA Esports**. Proporciona interações dinâmicas com a torcida e simula informações como partidas, estatísticas e notícias.

---

## 🚀 Funcionalidades

| Comando         | Descrição                                                                 |
|-----------------|---------------------------------------------------------------------------|
| `/start`        | Mensagem de boas-vindas personalizada para fãs da FURIA                   |
| `/status`       | Simulação da próxima partida com estatísticas realistas                  |
| `/gritar`       | Grito de torcida aleatório para incentivar o time                         |
| `/estatisticas` | Estatísticas fictícias dos jogadores da equipe                            |
| `/noticias`     | Gera uma notícia aleatória como se fosse oficial                          |

---

## 🔧 Tecnologias Utilizadas

- Node.js com Express  
- Telegraf.js (framework para bots do Telegram)  
- HTML, CSS e JavaScript (Landing Page)  
- PM2 para gerenciamento em produção  
- Git + GitHub para versionamento

---

## 🌐 Landing Page

- Inspirada na identidade visual da FURIA  
- Simulação de chatbot com o “Capitão Pantera”  
- Acesso direto ao bot via Telegram  
- Responsivo para mobile e desktop

---

## 🧠 Arquitetura do Projeto

```
furia-bot/
├── bot/
│   ├── index.js          # Inicialização do Telegraf
│   └── commands/
│       ├── status.js
│       ├── gritar.js
│       ├── estatisticas.js
│       └── noticias.js
├── public/
│   └── index.html        # Landing Page
├── utils/
│   └── logger.js
├── .env                  # Variáveis de ambiente (protegido)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Rodando o Projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz e adicione:

```env
BOT_TOKEN=seu_token_aqui
```

### 3. Inicie o projeto

```bash
npm run start
```

---

## 🔁 Mantendo o Bot Ativo com PM2

### Instale o PM2 globalmente

```bash
npm install -g pm2
```

### Inicie o bot com PM2

```bash
pm2 start "bot/index.js" --name PanteraRush_bot
```

### Verifique os processos

```bash
pm2 list
```

### Logs em tempo real

```bash
pm2 logs PanteraRush_bot
```

### Pausar o bot

```bash
pm2 stop PanteraRush_bot
```

### Retomar o bot

```bash
pm2 restart PanteraRush_bot
```

### Remover o bot

```bash
pm2 delete PanteraRush_bot
```

### Salvar o processo

```bash
pm2 save
```

### Inicializar o PM2 junto com o sistema

```bash
pm2 startup
```
> Execute o comando que o PM2 retornar após isso.

---

## 💬 Exemplo de Interação

```
/status  
🎮 Partida Encontrada: FURIA vs Team Liquid  
📅 Data: 01/05 - 18h  
📍 Local: São Paulo  
🔥 Estatísticas:
- yuurih: 24 K / 10 D / 4 A  
- arT: 19 K / 13 D / 7 A
```

---

## 🤖 Autor

Desenvolvido por **Alisson Coqueiro** para a torcida da FURIA Esports 🐾  
Telegram: [@PanteraRush_bot](https://t.me/PanteraRush_bot)
