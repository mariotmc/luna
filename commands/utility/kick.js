const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them.")
    .addUserOption((option) => option.setName("target").setDescription("The member to kick").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
    await interaction.guild.members.ban(target);
  },
};
