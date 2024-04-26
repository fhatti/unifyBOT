const { EmbedBuilder } = require("discord.js");

 module.exports = function createTopScorerEmbed(data) {
  const topScorerOfTheWeek = data[0];
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
  data.sort((a, b) => {
    if (a.goals !== b.goals) {
      return b.goals - a.goals;
    } else {
      return a.player_place - b.player_place;
    }
  });

  const listOfTopScorers = data.slice(0, 5);

  listOfTopScorers.forEach((player) => {
    embed.setTitle("Topscorer List");
    embed.setDescription("Here the topscorer list of this week!");

    embed.addFields(
      { name: "Name", value: `${player.player_name}`, inline: true },
      { name: "Team Name", value: `${player.team_name}`, inline: true },
      { name: "Goals", value: `${player.goals}`, inline: true },
      { name: "\u200B", value: "\u200B" }
    );
  });
  if (!data || data.length === 0) {
    return embed.setDescription("No top scorers available");
  }
  return embed;
}
