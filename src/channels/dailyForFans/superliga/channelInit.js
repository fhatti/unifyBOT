const schedule = require("node-schedule");
const leagues = require("../../../utils/returnLeague");
const getData = require("../../../utils/getData");
const {
  scheduleMsgForFixtures,
  scheduleMsgForStandings,
  scheduleMsgForTopScorers,
} = require("../scheduleMsg");

async function initSuperligaChannel(client) {
  const league = leagues["superliga"];

  try {
    const leagueId = league.leagueId;
    const fixtureData = await getData("Fixtures", leagueId);
    const topScorerData = await getData("Topscorers", leagueId);
    const standingsData = await getData("Standings", leagueId);

    await scheduleMsgForFixtures(league, fixtureData, client);
    await scheduleMsgForStandings(league, standingsData, client);
    await scheduleMsgForTopScorers(league, topScorerData, client);

    function sendScheduledMessage() {
      // Fixtures for morning (8:00 AM and 10:00 PM)
      schedule.scheduleJob("0 8 * * *", scheduleMsgForFixtures);
      schedule.scheduleJob("0 22 * * *", scheduleMsgForFixtures);
      // Fixtures for morning (8:00 AM and 10:00 PM)
      // Standings and TopScorer for weekly, every Monday at 8:00 AM
      schedule.scheduleJob("0 8 * * 1", scheduleMsgForStandings);
      schedule.scheduleJob("0 8 * * 1", scheduleMsgForTopScorers);
      // Standings for weekly, every Monday at 8:00 AM
    }

    sendScheduledMessage();
  } catch (error) {
    console.error("Error initializing Superliga channel:", error);
  }
}

module.exports = initSuperligaChannel;
