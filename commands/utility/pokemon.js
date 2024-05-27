const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder().setName("pokemon").setDescription("Select a starter Pokemon"),
  async execute(interaction) {
    const select = new StringSelectMenuBuilder().setCustomId("starter").setPlaceholder("Make a selection!").addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Bulbasaur")
        .setDescription("The dual-type Grass/Poison Seed Pokémon.")
        .setValue("bulbasaur"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Charmander")
        .setDescription("The Fire-type Lizard Pokémon.")
        .setValue("charmander"),
      // setEmoji("123456789012345678").setDefault(true),
      new StringSelectMenuOptionBuilder()
        .setLabel("Squirtle")
        .setDescription("The Water-type Tiny Turtle Pokémon.")
        .setValue("squirtle")
    );

    const row = new ActionRowBuilder().addComponents(select);

    const response = await interaction.reply({
      content: "Choose your starter!",
      components: [row],
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
