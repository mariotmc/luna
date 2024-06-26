require("dotenv").config();

const { REST, Routes } = require("discord.js");
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Grab all the command folders from the commands directory
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && ("execute" in command || "autocomplete" in command)) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute"/"autocomplete" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

// deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

// delete commands for guild-based commands (replace "commandId" (Server Settings -> Integrations -> Bots and Apps) and run the file)
// rest
//   .delete(Routes.applicationGuildCommand(clientId, guildId, "commandId"))
//   .then(() => console.log("Successfully deleted guild command"))
//   .catch(console.error);

// delete commands for global commands (replace "commandId" (Server Settings -> Integrations -> Bots and Apps) and run the file)
// rest
//   .delete(Routes.applicationCommand(clientId, "commandId"))
//   .then(() => console.log("Successfully deleted application command"))
//   .catch(console.error);
