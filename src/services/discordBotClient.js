const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  REST,
  Routes,
  ApplicationCommandOptionType,
} = require("discord.js");

const initializeFavLeagueChannel = require("../channels/favLeague/channelInit");
const initSuperligaChannel = require("../channels/dailyForFans/superliga/channelInit");
const initPremierLeagueChannel = require("../channels/dailyForFans/premierLeague/channelInit")

const leagues = require("../utils/returnLeague");
const handleAdd = require("../commands/add");
const handleDelete = require("../commands/delete");
const handleFixture = require("../commands/fixture");
const handleProfile = require("../commands/profile");
const handleFavLeague = require("../channels/favLeague/buttonInteraction");


class DiscordBotClient {
  client;
  token;
  clientId;
  guildId;

  constructor(token, clientId, guildId) {
    this.token = token;
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
      ],
    });
    this.clientId = clientId;
    this.guildId = guildId;
  }
 async handleLogin() {
    this.client.login(this.token);
  }
  async handleReadyEvents() {
    // ON/OFF
    this.client.on("ready", (c) => {
      {
        console.log(`${c.user.username} is online ;)`);
        initializeFavLeagueChannel(this.client, c);
        initSuperligaChannel(this.client);
        initPremierLeagueChannel(this.client);
      }
    });
  }

  async handleMessageCreate() {
    // UNIFY
    this.client.on("messageCreate", async (message) => {
      if (message.author.bot) {
        return;
      }
      if (message.content === "unify") {
        await message.reply("FOOTBALL!");
      }
    });

    //
  }

 async handleInteractionCreate() {
    this.client.on("interactionCreate", async (interaction) => {
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
       try {
        await handleFavLeague(interaction);
       } catch (error) {
        console.log("unknow interaction",interaction.type, error)
       }
      }
    });
  }
   async registerCommands() {
    const commands = [
      {
        name: "add",
        description: "Adds two numbers",
        options: [
          {
            name: "first-number",
            description: "The first number",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
              {
                name: "one",
                value: 1,
              },
              {
                name: "two",
                value: 2,
              },
              {
                name: "three",
                value: 3,
              },
            ],
          },
          {
            name: "second-number",
            description: "The second number",
            type: ApplicationCommandOptionType.Number,
            required: true,
          },
        ],
      },
      {
        name: "delete",
        description: "Deletes the latest message!",
      },
      {
        name: "profile",
        description: "Sends an profile embed",
      },
      {
        name: "fixture",
        description: "Sends you a list of events happening today!",
        options: [
          {
            name: "leagues",
            description: "Pick your league",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
              {
                name: "Premier League",
                value: 1,
              },
              {
                name: "La Liga",
                value: 2,
              },
              {
                name: "Serie A",
                value: 3,
              },
              {
                name: "Superliga",
                value: 4,
              },
              {
                name: "Bundesliga",
                value: 5,
              },
              {
                name: "Ligue 1 Uber Eats",
                value: 6,
              },
            ],
          },
        ],
      },
    ];

    const rest = new REST({ version: "10" }).setToken(this.token);
try {
    await rest.put(
          Routes.applicationGuildCommands(this.clientId, this.guildId),
          { body: commands }
        );
        console.log("Slash commands were registered successfully!");
} catch (error) {
  console.log(error);
}

  }
}

module.exports = DiscordBotClient;
