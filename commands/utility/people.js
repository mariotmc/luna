const { ActionRowBuilder, UserSelectMenuBuilder, SlashCommandBuilder, ComponentType } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder().setName("people").setDescription("Choose your favourite people from the server"),
  async execute(interaction) {
    // missing follow up logic
    const userSelect = new UserSelectMenuBuilder()
      .setCustomId("users")
      .setPlaceholder("Choose up to 10 people")
      .setMinValues(1)
      .setMaxValues(10);

    const row1 = new ActionRowBuilder().addComponents(userSelect);

    const response = await interaction.reply({
      content: "Choose someone",
      components: [row1],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 3_600_000,
    });

    collector.on("collect", async (i) => {
      const selection = i.values[0];
      await i.reply(`${i.user} has selected ${selection}!`);
    });
  },
};
