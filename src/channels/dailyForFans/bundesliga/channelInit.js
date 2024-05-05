const leagues = require("../../../utils/returnLeague");
const getData = require("../../../utils/getData");

const {
  scheduleMsgForFixtures,
  scheduleMsgForStandings,
  scheduleMsgForTopScorers,
} = require("../../dailyForFans/scheduleMsg");

async function initBundesligaChannel(client) {
  const league = leagues["bundesliga"];
  try {
    const leagueId = league.leagueId;
    const fixtureData = await getData("Fixtures", leagueId);
    const standingsData = await getData("Standings", leagueId);
    const topScorerData = await getData("Topscorers", leagueId);

    await scheduleMsgForFixtures(league, fixtureData, client);
    await scheduleMsgForStandings(league, standingsData, client);
    await scheduleMsgForTopScorers(league, topScorerData, client);
  } catch (error) {
    console.log("Error rendering La Liga Category", error);
  }
}

module.exports = initBundesligaChannel;
