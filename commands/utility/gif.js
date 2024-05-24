const { SlashCommandBuilder } = require("discord.js");

async function getRandomGifUrl(category) {
  // Replace this with actual logic to fetch a GIF from an API or a database.
  const gifs = {
    gif_funny: ["https://example.com/funny1.gif", "https://example.com/funny2.gif", "https://example.com/funny3.gif"],
    gif_meme: ["https://example.com/meme1.gif", "https://example.com/meme2.gif", "https://example.com/meme3.gif"],
    gif_movie: ["https://example.com/movie1.gif", "https://example.com/movie2.gif", "https://example.com/movie3.gif"],
  };

  const gifList = gifs[category];
  const randomIndex = Math.floor(Math.random() * gifList.length);
  return gifList[randomIndex];
}

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
        .addChoices(
          { name: "Funny", value: "gif_funny" },
          { name: "Meme", value: "gif_meme" },
          { name: "Movie", value: "gif_movie" }
        )
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    const gifUrl = await getRandomGifUrl(category);

    await interaction.reply({ content: gifUrl });
  },
};
