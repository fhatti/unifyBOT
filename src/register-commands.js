require("dotenv").config();
const { REST, Routes, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const commands = [
 {
  name:"add",
  description:"Adds two numbers",
  options:[
    {
      name:"first-number",
      description:"The first number",
      type: ApplicationCommandOptionType.Number,
      required:true,
      choices:[
        {
          name:"one",
          value:1,
        },
        {
          name:"two",
          value:2,
        },
        {
          name:"three",
          value:3,
        },
      ]
    },
    {
      name:"second-number",
      description:"The second number",
      type: ApplicationCommandOptionType.Number,
      required:true,
    },
  ]
 },
 {
  name:"ping",
  description:"Replies with PONG!",
 }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error : ${error}`);
  }
})();
