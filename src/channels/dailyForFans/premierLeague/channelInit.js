const leagues = require("../../../utils/returnLeague");
const getData = require("../../../utils/getData");
const schedule = require("node-schedule");

const {
  scheduleMsgForFixtures,
  scheduleMsgForStandings,
  scheduleMsgForTopScorers,
} = require("../scheduleMsg");

async function initPremierLeagueChannel(client) {
  const league = leagues["premierLeague"];

  try {
    const leagueId = league.leagueId;
    const fixtureData = await getData("Fixtures", leagueId);
    const standingsData = await getData("Standings", leagueId);
    const topScorerData = await getData("Topscorers", leagueId);

    await scheduleMsgForFixtures(league, fixtureData, client);
    await scheduleMsgForStandings(league, standingsData, client);
    await scheduleMsgForTopScorers(league, topScorerData, client);
  } catch (error) {
    console.log("Error PL:", error);
  }
}

module.exports = initPremierLeagueChannel;
