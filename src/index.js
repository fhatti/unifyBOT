require("dotenv").config();
const {
  Client,
  IntentsBitField,
  Embed,
  EmbedBuilder,
  MessageEmbed,
  CommandInteraction,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const handleFixture = require("./commands/fixture");
const handleAdd = require("./commands/add");
const handleProfile = require("./commands/profile");
const handleDelete = require("./commands/delete");

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
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  switch (commandName) {
    case "unify":
      await interaction.reply("FOOTBALL!");
      break;

    case "add":
      await handleAdd(interaction);
      break;

    case "delete":
      handleDelete(interaction);
      break;

    case "profile":
      handleProfile(interaction);
      break;

    case "fixture":
      handleFixture(interaction);
      break;
  }
});

client.login(process.env.TOKEN);
