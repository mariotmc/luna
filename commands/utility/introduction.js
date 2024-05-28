const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder().setName("introduction").setDescription("Introduce yourself!"),
  async execute(interaction) {
    // Showing a modal must be the first response to an interaction. You cannot defer() or deferUpdate() then show a modal later.
    const modal = new ModalBuilder().setCustomId("myModal").setTitle("My Modal");

    const favoriteColorInput = new TextInputBuilder()
      .setCustomId("favoriteColorInput")
      .setLabel("What's your favorite color?")
      .setValue("Default Value")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const hobbiesInput = new TextInputBuilder()
      .setCustomId("hobbiesInput")
      .setLabel("What's some of your favorite hobbies?")
      .setPlaceholder("Separate each hobby with a comma")
      .setMinLength(10)
      .setMaxLength(1_000)
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },
};
