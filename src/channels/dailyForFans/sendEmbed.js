const { EmbedBuilder } = require("discord.js");

module.exports = function sendMessage(channel, embed) {
  channel
    .send({ embeds: [embed] })
    .then(() => console.log("Scheduled message sent successfully"))
    .catch((error) => console.error("Error sending scheduled message:", error));
};
