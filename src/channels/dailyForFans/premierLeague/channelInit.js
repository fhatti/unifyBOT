const leagues = require("../../../utils/returnLeague");
const getData = require("../../../utils/getData");
const schedule = require("node-schedule");

const createFixtureEmbed = require("../fixture");
const createStandingsEmbed = require("../standings");
const createTopScorerEmbed = require("../topScorer");
const sendMsgToChannel = require("../sendMsgToChannel");

async function initPremierLeagueChannel(client) {
  const league = leagues["premierLeague"];

  try {
    const leagueId = league.leagueId;
    const fixtureData = await getData("Fixtures", leagueId);
    const standingsData = await getData("Standings", leagueId);
    const topScorerData = await getData("Topscorers", leagueId);

    async function scheduleMsgForFixtures() {
      const fixtureEmbed = createFixtureEmbed(fixtureData);
      const channelId = league.channels.find(
        (channel) => channel.name === "fixtures"
      ).channelId;

      await sendMsgToChannel(channelId, fixtureEmbed,client);
    }
    async function scheduleMsgForStandings() {
      const standingsEmbed = createStandingsEmbed(standingsData);
      const channelId = league.channels.find(
        (channel) => channel.name === "standings"
      ).channelId;
      await sendMsgToChannel(channelId, standingsEmbed,client);
    }

    async function scheduleMsgForTopScorers() {
      const topScorerEmbed = createTopScorerEmbed(topScorerData);
      const channelId = league.channels.find(
        (channel) => channel.name === "top-scorers"
      ).channelId;
      await sendMsgToChannel(channelId, topScorerEmbed,client);
    }

    function sendScheduledMessage() {
      schedule.scheduleJob("*/50 * * * * *", scheduleMsgForFixtures);
      schedule.scheduleJob("*/30 * * * * *", scheduleMsgForStandings);
      schedule.scheduleJob("*/200 * * * * *", scheduleMsgForTopScorers);
    }

    sendScheduledMessage();
  } catch (error) {
    console.log("Error PL:", error);
  }
}

module.exports = initPremierLeagueChannel;
