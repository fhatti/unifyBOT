const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const schedule = require("node-schedule");
const leagues = require("../../../utils/returnLeague");
const getData = require("../../../utils/getData");
const createStandingsEmbed = require("../standings");

async function initSuperligaChannel(client) {
  // setup Superliga channel
  const channel = client.channels.cache.get(leagues["superliga"].channelId);

  if (!channel) {
    console.error("Channel not found.");
    return;
  }

  try {
    const fixtureData = await getData(
      "Fixtures",
      leagues["superliga"].leagueId
    );
    const topScorerData = await getData(
      "Topscorers",
      leagues["superliga"].leagueId
    );
    const standingsData = await getData(
      "Standings",
      leagues["superliga"].leagueId
    )

    function sendScheduledMessage() {
      schedule.scheduleJob("10 * * * *", scheduleMsgForFixtures);
      schedule.scheduleJob("0 20 * * *", scheduleMsgForTopScorer);
      schedule.scheduleJob("/10 0 * * *", scheduleMsgForStandings);

    }

    function scheduleMsgForFixtures() {
      const fixtureEmbed = buildFixtureEmbed(fixtureData);
      channel
        .send({ embeds: [fixtureEmbed] })
        .then(() => console.log("Scheduled message sent successfully"))
        .catch((error) =>
          console.error("Error sending scheduled message:", error)
        );
    }

    function scheduleMsgForTopScorer() {
      const topScorerEmbed = buildTopScorerEmbed(topScorerData);
      channel
        .send({ embeds: [topScorerEmbed] })
        .then(() => console.log("Scheduled message sent successfully"))
        .catch((error) =>
          console.error("Error sending scheduled message:", error)
        );
    }

    function scheduleMsgForStandings()
    {
      const standingsEmbed  = createStandingsEmbed(standingsData);
      channel
      .send({ embeds : [standingsEmbed]})
      .then(() => console.log("Standings Table (RO) sent successfully"))
      .catch((error) =>
        console.error("Error sending scheduled message:", error)
      );
  }
    

    sendScheduledMessage();
    schedule.scheduleJob('*/30 * * * * *', sendScheduledMessage); // for testing
    
  } catch (error) {
    console.error("Error initializing Superliga channel:", error);
  }
}

function buildFixtureEmbed(fixtureData) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Unify BOT presents you",
      iconURL:
        "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-1/369726576_1958035307911719_7377222010976924482_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SISOKQjREZkAb6jlwbU&_nc_ht=scontent-muc2-1.xx&oh=00_AfDIe9smQb65t-cO4NyJdiUX0QgV44E90KsiEeDtGV47gA&oe=662715D3",
    })
    .setColor("#2A9B59")
    .setTimestamp()
    .setURL("https://www.instagram.com/unifyfootball.ro/");

  if (!fixtureData || fixtureData.length === 0) {
    return embed.setDescription("No fixtures available");
  }

  fixtureData.forEach((fixture) => {
    embed.setTitle(`Today Matches`);
    embed.setThumbnail(`${fixture.league_logo}`);
    embed.addFields(
      {
        name: "Event Time",
        value: `${
          fixture.event_status === "Finished"
            ? `${fixture.event_status}`
            : `${fixture.event_time} ` || fixture.event_status === 1
            ? `${fixture.event_time}`
            : `Live`
        }`,
      },
      {
        name: "Home Team",
        value: `${fixture.event_home_team}`,
        inline: true,
      },
      {
        name: `${
          fixture.event_status === "Finished"
            ? `${fixture.event_final_result} `
            : `${fixture.league_round} `
        } `,
        value: "vs",
        inline: true,
      },
      {
        name: "Away Team",
        value: `${fixture.event_away_team}`,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" }
    );
    embed.setImage(`${fixture.league_logo}`);
  });

  embed.setFooter({
    text: "For more, follow us on Instagram!",
    iconURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
  });

  return embed;
}

function buildTopScorerEmbed(topScorerData) {
  const topScorerOfTheWeek = topScorerData[0];
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Unify BOT presents you",
      iconURL:
        "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-1/369726576_1958035307911719_7377222010976924482_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SISOKQjREZkAb6jlwbU&_nc_ht=scontent-muc2-1.xx&oh=00_AfDIe9smQb65t-cO4NyJdiUX0QgV44E90KsiEeDtGV47gA&oe=662715D3",
    })
    .setColor("#2A9B59")
    .setTimestamp()
    .setURL("https://www.instagram.com/unifyfootball.ro/");
  embed.addFields(
    {
      name: "Top Scorer Of The Week Award goes to  ⤵️",
      value: `${topScorerOfTheWeek.player_name}`,
    },
    { name: "\u200B", value: "\u200B" }
  );
  topScorerData.sort((a, b) => {
    if (a.goals !== b.goals) {
      return b.goals - a.goals;
    } else {
      return a.player_place - b.player_place;
    }
  });

  const listOfTopScorers = topScorerData.slice(0, 5);

  listOfTopScorers.forEach((player) => {
    embed.setTitle("Topscorer List");
    embed.setDescription("Here the topscorer list of this week!");
    // embed.addFields(
    // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
    // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
    //   { name: 'Inline field title', value: 'Some value here', inline: true }
    // )
    // embed.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })

    embed.addFields(
      { name: "Name", value: `${player.player_name}`, inline: true },
      { name: "Team Name", value: `${player.team_name}`, inline: true },
      { name: "Goals", value: `${player.goals}`, inline: true },
      { name: "\u200B", value: "\u200B" }
    );
    embed.setThumbnail(leagues["superliga"].logo);
  });
  if (!topScorerData || topScorerData.length === 0) {
    return embed.setDescription("No top scorers available");
  }
  return embed;
}

module.exports = initSuperligaChannel;
