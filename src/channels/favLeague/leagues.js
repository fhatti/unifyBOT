require("dotenv").config();
const { ActionRowBuilder } = require("@discordjs/builders");
const client = require("../../utils/discordClient");
const leagues = require("../../utils/returnLeague");
const { ButtonBuilder, ButtonStyle, MessageButton } = require("discord.js");



client.on('ready', async (c) => {
    try {
      const channel = await client.channels.cache.get("1231760769041825792");
      if (!channel) return;
  
      const row = new ActionRowBuilder();
  
      leagues.forEach((league) => {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(league.id)
            .setLabel(`${league.name} Fan`)
            .setStyle(ButtonStyle.Primary)
        );
        console.log("League ID:", league.id);
      });
  
      await channel.send({
        content: `${c.user.username} wants you to choose your favorite league!`,
        components: [row],
      });
      process.exit();
    } catch (error) {
      console.log(error);
    }
  });


  
  client.login(process.env.TOKEN);