const axios = require('axios');

const gamesAPI = 'https://api.hltv.org/v1/matches';

async function getGameStatus() {
  try {
    const response = await axios.get(gamesAPI);
    const matchData = response.data[0];

    return {
      game: `${matchData.team1.name} vs ${matchData.team2.name}`,
      score: `${matchData.team1.score} - ${matchData.team2.score}`,
      map: matchData.map,
      matchStatus: matchData.status,
      highlightPlayer: matchData.team1.players[0].name,
    };
  } catch (error) {
    console.error('Erro ao buscar status:', error);
    return null;
  }
}

module.exports = { getGameStatus };