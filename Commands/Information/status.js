const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js") 
const { connection } = require("mongoose")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Avoir le status du bot"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const msg = await interaction.deferReply({fetchReply: true})

        const embed = new EmbedBuilder()
        .setTitle("Voci le status du bot")
        .setDescription("Les stats du bot")
        .addFields(
            {
                name: "Latence de l'API Discord",
                value: `${client.ws.ping} ms`,
                inline: true
            },
            {
                name: "Latence du BOT",
                value: `${msg.createdTimestamp - interaction.createdTimestamp} ms`,
                inline: true
            },
        )
        .addFields(
            {
                name: "Database",
                value: `\`${switchTo(connection.readyState)}\``,
                inline: true,
            },
            {
                name: "uptime",
                value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                inline: true
            }
        )
        .setColor("Blue")


        function switchTo(val) {
            var status = " ";
            switch(val) {
                case 0: status = `🔴 Déconnecter`
                break;
                case 1: status = `🟢 Connecter`
                break;
                case 2: status = `🟠 Connexion en cours`
                break;
                case 3: status = `🟣 Déconnexion en cours`
                break;
            }
            return status
        }

        interaction.editReply({embeds: [embed]})
    }
}