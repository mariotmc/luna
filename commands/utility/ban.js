const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) => option.setName("target").setDescription("The member to ban").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for banning"))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);
    const cancelButton = new ButtonBuilder().setCustomId("cancel").setLabel("Cancel").setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancelButton, confirmButton);

    const response = await interaction.reply({
      content: `Are you sure you want to ban ${target.username} for reason: ${reason}?`,
      components: [row],
      ephemeral: true,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

      if (confirmation.customId === "confirm") {
        await interaction.guild.members.ban(target);
        await confirmation.update({
          content: `${target.username} has been banned for reason: ${reason}`,
          components: [],
          ephemeral: true,
        });
      } else if (confirmation.customId === "cancel") {
        await confirmation.update({ content: "Action cancelled", components: [], ephemeral: true });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
        ephemeral: true,
      });
    }
  },
};
