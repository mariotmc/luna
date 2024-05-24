const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Info about a user")
        .addUserOption((option) => option.setName("target").setDescription("The user"))
    )
    .addSubcommand((subcommand) => subcommand.setName("server").setDescription("Info about the server")),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "user") {
      const targetUser = interaction.options.getUser("target") || interaction.user;
      const member = await interaction.guild.members.fetch(targetUser.id);

      const userEmbed = new EmbedBuilder()
        .setTitle(`${targetUser.username}'s Info`)
        .setThumbnail(targetUser.displayAvatarURL())
        .addFields(
          { name: "Username", value: targetUser.tag, inline: true },
          { name: "ID", value: targetUser.id, inline: true },
          { name: "Joined Server", value: member.joinedAt.toDateString(), inline: true },
          { name: "Account Created", value: targetUser.createdAt.toDateString(), inline: true }
        )
        .setColor("Random");

      await interaction.reply({ embeds: [userEmbed] });
    } else if (interaction.options.getSubcommand() === "server") {
      const { guild } = interaction;

      const serverEmbed = new EmbedBuilder()
        .setTitle(`${guild.name}'s Info`)
        .setThumbnail(guild.iconURL())
        .addFields(
          { name: "Server Name", value: guild.name, inline: true },
          { name: "Server ID", value: guild.id, inline: true },
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Member Count", value: guild.memberCount.toString(), inline: true },
          { name: "Created At", value: guild.createdAt.toDateString(), inline: true }
        )
        .setColor("Random");

      await interaction.reply({ embeds: [serverEmbed] });
    } else {
      await interaction.reply({ content: "Unknown subcommand", ephemeral: true });
    }
  },
};
