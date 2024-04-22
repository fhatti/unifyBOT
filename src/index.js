const client = require("./utils/discordClient");
const handleFixture = require("./commands/fixture");
const handleAdd = require("./commands/add");
const handleProfile = require("./commands/profile");
const handleDelete = require("./commands/delete");
const handleFavLeague = require("./channels/favLeague/favLeague")

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
  if (!interaction.isCommand() && !interaction.isButton()) return;

  if (interaction.isCommand()) {
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
  } else if (interaction.isButton()) {
    await handleFavLeague(interaction);
  }
});

client.login(process.env.TOKEN);
