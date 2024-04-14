require("dotenv").config();
const { Client, IntentsBitField, Embed, EmbedBuilder, MessageEmbed , CommandInteraction } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  {
    console.log(`${c.user.username} is online ;)`);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "unify") {
    await message.reply("FOOTBALL!");
  }
  if (message.content === "FCSB") await message.reply("E STEAUA!");
  if (message.content === "mue")
    await message.reply("ii dam lu bbc si noi si AI ul hahahahahha!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "unify") {
    await interaction.reply("FOOTBALL!");
  }
  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    await interaction.reply(`The sum is ${num1 + num2}`);
  }
  if (interaction.commandName === "ping") await interaction.reply("PONG!");
  if (interaction.commandName === "delete") {
    const messages = await interaction.channel.messages.fetch({ limit: 1 });
    const msg = messages.first();
    if (!msg) {
      return interaction.reply("No messages found to delete.");
    }
    try {
      await msg.delete();
      await interaction.reply("Message deleted.");
    } catch (error) {
      console.error("Failed to delete the message:", error);
      await interaction.reply("Failed to delete the message.");
    }
  }

  if (interaction.commandName === "profile") {
    console.log("salut");
  }

});

client.login(process.env.TOKEN);
