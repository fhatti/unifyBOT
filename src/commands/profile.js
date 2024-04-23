const { EmbedBuilder } = require("discord.js");
module.exports = async function profile(interaction) {
  const userUsername = interaction.user.username;
  const avatarUrl = interaction.user.displayAvatarURL();
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
  await interaction.reply({ embeds: [profileEmbed] });
};
