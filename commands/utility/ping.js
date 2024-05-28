const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.deferReply();
    const wait = require("node:timers/promises").setTimeout;
    const message = await interaction.fetchReply();
    message.react("👍");
    await wait(2_000);
    await interaction.editReply("Pong!");
    await interaction.followUp({ content: `A secret follow up message? :flushed:`, ephemeral: true });
    // await interaction.deleteReply();
  },
};
