module.exports =  {
    
    name: 'avatar',
    aliases: ['av'],
    description: '🔎 Muestra el avatar de un usuario en el servidor.',

    async execute(client, message, args, Discord) {

        let img = message.mentions.users.first()

        if(!img){

            try {
          
            img = await client.users.fetch(args[0])

            } catch (error) {

            img = message.author
          
            }

        }

        if(!img || img.id === message.author.id){

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${message.author.username}#${message.author.discriminator}`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Imagen completa')
            .setDescription('[Click aquí]('+`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
            .setImage(`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] })

        } else if (img.avatarURL === null) {
    
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | El usuario (${img.username}) no tiene avatar!`)
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${img.username}#${img.discriminator}`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Imagen completa')
            .setDescription('[Click aquí]('+`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
            .setImage(`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
      
        }

    }

}