async function handleFavLeague(interaction) {
  if (!interaction.isButton()) return;
  await interaction.deferReply({ ephemeral: true });

  const role = interaction.guild.roles.cache.get(interaction.customId);
  if (!role) {
    interaction.editReply({
      content: "I couldn't find that role",
    });
    return;
  }

  const hasRole = interaction.member.roles.cache.has(role.id);

  if (hasRole) {
    await interaction.member.roles.remove(role);
    await interaction.editReply(`The role ${role} has been removed to ${interaction.user.tag}.`);
    return;
  }

  await interaction.member.roles.add(role);
  await interaction.editReply(`The role ${role} has been added to ${interaction.user.tag}.`);
}

module.exports = handleFavLeague;
