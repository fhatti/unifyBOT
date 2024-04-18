module.exports =  async function add(interaction)
{
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
  await interaction.reply(`The sum is ${num1 + num2}`);
}