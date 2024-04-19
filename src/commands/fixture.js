require("dotenv").config();
const { Embed, EmbedBuilder, User } = require("discord.js");
const getDate = require("../utils/getDateAsFormattedString.js");

// Now you can use getDate() function as before

module.exports = function fixture(interaction) {
  let superligaId = 272,
    serieAId = 207,
    premierLeagueId = 152,
    bundesligaId = 175,
    ligueOneId = 168,
    laLigaId = 302;
  let leagueID;
  let userChoice = interaction.options.get("leagues").value;
  switch (userChoice) {
    case 1:
      leagueID = premierLeagueId;
      break;
    case 2:
      leagueID = laLigaId;
      break;
    case 3:
      leagueID = serieAId;
      break;
    case 4:
      leagueID = superligaId;
      break;
    case 5:
      leagueID = bundesligaId;
      break;
    case 6:
      leagueID = ligueOneId;
      break;
    default:
      leagueID = premierLeagueId; // Default to Premier League if the user's choice is not recognized
  }
  const fixtureUrl = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagueID}&timezone=Europe/Bucharest&APIkey=${
    process.env.API_KEY
  }&from=${getDate()}&to=${getDate()}`;

  fetch(fixtureUrl)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data || data.length === 0) {
        console.log("No data");
        await interaction.reply("There are no games today!");
        return;
      } else {
        const fixtures = data.result;
        console.log("Data received:", fixtures);
        if(fixtures)
        {
          const fixtureEmbed = new EmbedBuilder()
          .setAuthor({
            name: "Unify BOT presents you",
            iconURL:
              "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-1/369726576_1958035307911719_7377222010976924482_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SISOKQjREZkAb6jlwbU&_nc_ht=scontent-muc2-1.xx&oh=00_AfDIe9smQb65t-cO4NyJdiUX0QgV44E90KsiEeDtGV47gA&oe=662715D3",
          })
          .setColor("#2A9B59")
          // .addFields({ name: "\u200B", value: "\u200B" })
          .setTimestamp()
          .setURL("https://www.instagram.com/unifyfootball.ro/");

          fixtures.forEach((fixture) => {
            fixtureEmbed.setTitle(`Today Matches - ${fixture.league_name} `)
            fixtureEmbed.setThumbnail(`${fixture.league_logo}`);
            fixtureEmbed.addFields(
              {
                name: "Event Time",
                value: `${fixture.event_time}`,
              },
              {
                name: "Home Team",
                value: `${fixture.event_home_team}`,
                inline: true,
              },
              {
                name:`${fixture.league_round}`,
                value:"vs",
                inline:true,
              },
              {
                name: "Away Team",
                value: `${fixture.event_away_team}`,
                inline: true,
              },
              { name: "\u200B", value: "\u200B" }
            );
            fixtureEmbed.setImage(`${fixture.league_logo}`)
            fixtureEmbed.setFooter({
              text: ` For more, follow us on instragram !`,
              iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
            });
          });
          await interaction.reply({ embeds: [fixtureEmbed] });
        }
        else 
        {
          await interaction.reply("no matches today for this league ;(");
        }
       
      }
    })
    .catch((error) => console.log("Error:", error));
};
