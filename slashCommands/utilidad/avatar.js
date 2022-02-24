const Discord = require('discord.js');

module.exports = {

    name: 'avatar',
    description: '🔎 Muestra el avatar de un usuario en el servidor.',
    options: [
        { 

            name: 'usuario', 
            description: 'Menciona a un usuario', 
            type: 'USER',
            require: 'false',

        },
    ],

    run: async (client, interaction) => {

        try {
            
            const user = interaction.options.getUser('usuario')

            if(user){

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Avatar de ${user.username}#${user.discriminator}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                .setTitle('Imagen completa')
                .setDescription('[Click aquí]('+`${user.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
                .setImage(`${user.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
                await interaction.reply({ embeds: [embed] })

            } else {

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Avatar de ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                .setTitle('Imagen completa')
                .setDescription('[Click aquí]('+`${interaction.user.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
                .setImage(`${interaction.user.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
                
                await interaction.deferReply();
                await wait(500);
                await interaction.editReply({ embeds: [embed] })

            }

        } catch (error) {

            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo!', ephemeral: true})
            
            console.log('Error en el SC avatar: '+error)

        }

    }

}