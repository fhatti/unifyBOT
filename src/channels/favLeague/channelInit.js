const { ActionRowBuilder, ButtonBuilder, ButtonStyle , TextChannel } = require("discord.js");
const leagues = require("../../utils/returnLeague");

async function initializeFavLeagueChannel(client,c) {
  try {
    const channel = await client.channels.cache.get("1232036699408695357");
    if (!channel) return;
    const existingMessage = await channel.messages.fetch({limit:1});
    const msg = existingMessage.first();
    if (msg) {
        return;
      }
    const row = new ActionRowBuilder();
    for (const [leagueName, league] of Object.entries(leagues)) {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(league.id)
          .setLabel(`${league.name} Fan`)
          .setStyle(ButtonStyle.Primary)
      );
    }

    await channel.send({
      content: `${c.user.username} wants you to choose your favorite league!`,
      components: [row],
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = initializeFavLeagueChannel;
