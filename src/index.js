require("dotenv").config();
const DiscordBotClient = require("./services/discordBotClient");

const botClient = new DiscordBotClient(
  process.env.TOKEN,
  process.env.CLIENT_ID,
  process.env.GUILD_ID,
);

botClient.handleLogin();
botClient.registerCommands();
botClient.handleReadyEvents();
botClient.handleMessageCreate();
botClient.handleInteractionCreate();

