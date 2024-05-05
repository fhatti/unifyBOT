const { EmbedBuilder } = require("discord.js");

module.exports = function createStandingsEmbed(data) {
  const standings = data.total;
  const standingsTotal = standings.slice(0, 5);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: "unify Bot",
    })
    .setTitle(` Standings - ${standings[0].league_season}`);
  if (!data || data.length === 0) {
    return embed.setDescription("No fixtures available");
  }

  standingsTotal.forEach((team) => {
    embed.addFields(
      {
        name: "Placement",
        value: `${team.standing_place}. ${team.standing_team}`,
        inline: true,
      },
      { name: "Matches Played", value: `${team.standing_P}`, inline: true },
      { name: "Points", value: `${team.standing_PTS}`, inline: true }
    );
  });

  return embed;
};
