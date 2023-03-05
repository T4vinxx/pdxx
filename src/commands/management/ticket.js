const discord = require('discord.js');
const { ticketChannelId } = require('../../config/config.json');

module.exports = {
    name: 'ticket',
    description: 'Criar ticket.',
    type: discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });
        const ticketChannel = client.channels.cache.find(channel => channel.id === ticketChannelId);
        if (interaction.channel.id !== ticketChannelId) return interaction.reply({ content: `Você não pode utilizar esse comando nesse chat. Utilize ${ticketChannel}` });


let nameserver  = "Pdx comeu a lais";
let fotoserver  = "https://cdn.discordapp.com/attachments/1074412781857673216/1081730772219727912/6b92eece1ac454a0cce3112baaf3dbad.gif";
        const embed = new discord.EmbedBuilder()
            .setAuthor({ name:'pdx community'})
            .setThumbnail('https://cdn.discordapp.com/attachments/1074412781857673216/1081731803297087628/pdx.gif')
            .setDescription(`**Olá! Se você está precisando de AJUDA com algum problema ou tem alguma dúvida sobre nossos serviços, você veio ao lugar certo. Aqui em nosso servidor de Discord, temos uma equipe de suporte pronta para ajudá-lo em tudo o que você precisa.**`)
            .setColor('#abb8ec')

        const ticketRow = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder()
                    .setCustomId('ticketMenu')
                    .setPlaceholder('Selecione aqui o motivo')
                    .addOptions(
                        {
                            label: 'Suporte',
                            emoji: '<:1026678246273728553:1081736446605541406>',
                            description: 'Clique aqui receber suporte.',
                            value: 'SupOption',
                        },
                        {
                            label: 'Dúvida',
                            emoji: "❓",
                            description: 'Clique aqui para tirar sua dúvida.',
                            value: 'questionOption',
                        },
                        {
                            label: 'Compra',
                            emoji: "<:carrinho_black:1080519140634263652>",
                            description: 'Clique aqui para efetuar uma compra.',
                            value: 'buyOption',
                        },
                    )
            );

        interaction.deferReply();
        interaction.deleteReply();
        return await ticketChannel.send({ embeds: [embed], components: [ticketRow]});
    },
};