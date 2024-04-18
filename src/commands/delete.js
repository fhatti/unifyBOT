const {
    Client,
    IntentsBitField,
    Embed,
    EmbedBuilder,
    MessageEmbed,
    CommandInteraction,
  } = require("discord.js");

module.exports = async function handleDelete(interaction)
{
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