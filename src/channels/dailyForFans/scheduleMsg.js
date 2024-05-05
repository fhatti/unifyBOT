const sendMsgToChannel = require("../dailyForFans/sendMsgToChannel");
const createFixtureEmbed = require("../dailyForFans/fixture");
const createStandingsEmbed = require("../dailyForFans/standings");
const createTopScorerEmbed = require("../dailyForFans/topScorer");

async function scheduleMsgForFixtures(league, data, client) {
  const fixtureEmbed = createFixtureEmbed(data);
  const channelId = league.channels.find(
    (channel) => channel.name === "fixtures"
  ).channelId;

  await sendMsgToChannel(channelId, fixtureEmbed, client);
}

async function scheduleMsgForStandings(league, data, client) {
  const standingsEmbed = createStandingsEmbed(data);
  const channelId = league.channels.find(
    (channel) => channel.name === "standings"
  ).channelId;

  await sendMsgToChannel(channelId, standingsEmbed, client);
}

async function scheduleMsgForTopScorers(league, data, client) {
  try {
    if (!data || data.length === 0) {
      throw new Error("Top scorer data is empty or undefined.");
    }

    const topScorerEmbed = createTopScorerEmbed(data);
    const channel = league.channels.find(
      (channel) => channel.name === "top-scorers"
    );

    if (!channel) {
      throw new Error("Channel 'top-scorers' not found in league channels.");
    }

    await sendMsgToChannel(channel.channelId, topScorerEmbed, client);
  } catch (error) {
    console.error("Error scheduling top scorers message:", error);
  }
}

module.exports = {
  scheduleMsgForFixtures,
  scheduleMsgForStandings,
  scheduleMsgForTopScorers,
};
