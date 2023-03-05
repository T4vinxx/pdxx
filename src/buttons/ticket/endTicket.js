const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'endTicket',
    },
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });

        const sucessEmbed = new discord.EmbedBuilder()
        .setDescription(`${interaction.user}O ticket será apagado em **10S**.`)
        .setColor('#abb8ec')

        interaction.deferReply();
        interaction.deleteReply();

        interaction.channel.send({embeds: [sucessEmbed]});

        setTimeout(() => {
            try {
                interaction.channel.delete();
            } catch (err) {
                console.log(err);
                return;
            }
        }, 10000);

    },
}