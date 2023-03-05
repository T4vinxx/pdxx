const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'ticketMenu',
    },
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const guildChannels = guild.channels.cache;
        const ticketChannelName = `ticket-${interaction.user.username.toLowerCase()}`;

        const errorEmbed = new discord.EmbedBuilder()
            .setDescription('Você já possui um ticket aberto!')
            .setColor('#abb8ec')

        for (const channel of guildChannels.values()) {
            if (channel.name.startsWith('ticket')) {
                let ticketOwnerId = channel.topic;
                if (ticketOwnerId === interaction.user.id) {
                    return interaction.reply({ ephemeral: true, embeds: [errorEmbed] });
                }
            }
        }
        const ticketChannel = await guild.channels.create({
            name: `${ticketChannelName}`,
            type: discord.ChannelType.GuildText,
            parent: '1081737912279912508',
            topic: `${interaction.user.id}`,
            permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel],
				},
                {
					id: '1081721340182147195',
					allow: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: [discord.PermissionFlagsBits.ViewChannel],
                },
            ],
        });


        let ticketOption = '';

        if (interaction.values[0] === 'SupOption') {
            ticketOption = 'Suporte.';
        }
        else if (interaction.values[0] === 'questionOption') {
            ticketOption = 'Dúvida.';
        } else if (interaction.values[0] === 'buyOption') {
            ticketOption = 'Compra.';
        }

        const ticketMenuEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: 'Pdx community' })
            .setDescription(`***vc abriu o seu **TICKET** na opçao***  \`${ticketOption}\` ***espere um suporte te responder.***`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('#abb8ec')

        const ticketButtonsPainel = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('endTicket')
                    .setLabel('Encerrar Ticket')
                    .setEmoji('🔒')
                    .setStyle('Danger')
            )

        await ticketChannel.send({ embeds: [ticketMenuEmbed], content: `||<@${interaction.user.id}>||`, components: [ticketButtonsPainel] });

        const sucessEmbed = new discord.EmbedBuilder()
            .setDescription('Seu ticket foi aberto.')
            .setColor('#abb8ec')
        const goToTicketChannelButton = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setLabel('Ticket')
                    .setURL(ticketChannel.url)
                    .setStyle('Link')
            )

        await interaction.reply({embeds: [sucessEmbed], components: [goToTicketChannelButton], ephemeral: true});

    },
}
