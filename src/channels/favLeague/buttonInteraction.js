async function handleFavLeague(interaction) {
  await interaction.reply({
    content:"processing role assignment...",
    ephemeral:true,
  });


  const role = await interaction.guild.roles.cache.get(interaction.customId);
  if (!role) {
    await interaction.editReply({
      content: "I couldn't find that role",
      ephemeral: true,
    });
    return;
  }

  const hasRole = await interaction.member.roles.cache.has(role.id);

  if (hasRole) {
    await interaction.member.roles.remove(role);
    await interaction.editReply({
      content: `The role ${role} has been removed to ${interaction.user.tag}.`,
      ephemeral: true,
    });
    return;
  }
  await interaction.member.roles.add(role);
  await interaction.editReply({
    content: `The role ${role} has been added to ${interaction.user.tag}.`,
    ephemeral: true,
  });
}

module.exports = handleFavLeague;
