const { EmbedBuilder } = require("discord.js");

module.exports = function createFixtureEmbed(data) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Unify BOT presents you",
      iconURL:
        "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-1/369726576_1958035307911719_7377222010976924482_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SISOKQjREZkAb6jlwbU&_nc_ht=scontent-muc2-1.xx&oh=00_AfDIe9smQb65t-cO4NyJdiUX0QgV44E90KsiEeDtGV47gA&oe=662715D3",
    })
    .setColor("#2A9B59")
    .setTimestamp()
    .setURL("https://www.instagram.com/unifyfootball.ro/");

  if (!data || data.length === 0) {
    return embed.setDescription(
      `No fixtures available today - ${day}.${month}.${year}`
    );
  }

  data.forEach((fixture) => {
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
};
