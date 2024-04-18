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

const handleToday = require("./commands/today")

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
    const userUsername = interaction.user.username;
    const avatarUrl = interaction.user.displayAvatarURL();
    console.log(avatarUrl);
    const profileEmbed = new EmbedBuilder()
      .setAuthor({
        name: userUsername,
        iconURL:
          "https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-6/369726576_1958035307911719_7377222010976924482_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=COVPR9aEqtMAb4YylAp&_nc_ht=scontent-muc2-1.xx&oh=00_AfDNSX4pXiya8oFxEW9AYSQn2bVYUEQZu5Zb4218DHNRvA&oe=6621B191",
      })
      .setTitle("My First title")
      .setDescription("Description")
      .setThumbnail(avatarUrl)
      .addFields(
        { name: "1st Field title", value: "Value" },
        { name: "2nd Field title", value: " value" },
        { name: "\u200B", value: "\u200B" },
        { name: "1st Inline Field", value: "value", inline: true },
        { name: "2nd Inline Field", value: "value", inline: true },
        { name: "3rd Inline Field", value: "value", inline: true }
      )
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setFooter({ text: "Footer TExt " })
      .setTimestamp();
    interaction.reply({ embeds: [profileEmbed] });
  }
  if (interaction.commandName === "today") {
   handleToday(interaction);
  }
});

client.login(process.env.TOKEN);
