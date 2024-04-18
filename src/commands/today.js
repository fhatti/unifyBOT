require("dotenv").config();
const {
  Embed,
  EmbedBuilder,
  User,
} = require("discord.js");

module.exports =  function handleToday(interaction) {
  const fixtureUrl = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=272&APIkey=${
    process.env.API_KEY
  }&from=${getDate()}&to=2024-04-22`;

  fetch(fixtureUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data || data.length == 0) {
        console.log("No data");
        interaction.reply("There are no games today!");
        return;
      }
      const fixtures = data.result;
      console.log("ia ma", fixtures);
      const fixtureEmbed = new EmbedBuilder()
        .setTitle("Today matches")
        .setAuthor(
            {
                name: "UnifyBOT", 
                iconURL: "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-1/369726576_1958035307911719_7377222010976924482_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SISOKQjREZkAb6jlwbU&_nc_ht=scontent-muc2-1.xx&oh=00_AfDIe9smQb65t-cO4NyJdiUX0QgV44E90KsiEeDtGV47gA&oe=662715D3",

            }
        )
      fixtures.forEach((fixture) => {
        fixtureEmbed.setThumbnail(`${fixture.league_logo}`)
        fixtureEmbed.setDescription(`${fixture.league_name}`)
        fixtureEmbed.addFields(
          {
            name: "Home Team",
            value: `${fixture.event_home_team}`,
            inline: true,
          },
          {
            name: "Away Team",
            value: `${fixture.event_away_team}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B" }
        );
      });

      interaction.reply({ embeds: [fixtureEmbed] });
    })
    .catch((error) => console.log("Error:", error));
}
 
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }