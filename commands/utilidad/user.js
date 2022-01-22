module.exports =  {
    
    name: 'user',
    aliases: ['infouser','usuario'],
    description: '🕵️‍♂️ Muestra la información de un usuario en el servidor.',

    async execute(client, message, args, Discord) {

        let userm = message.mentions.users.first()

        if(!userm){

            try {
          
            userm = await client.users.fetch(args[0])

            } catch (error) {

            userm = message.author
          
            }

        }

        if(userm.bot) return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes ver la info de un bot!`)
        ]})

        if(!userm || userm.id === message.author.id) {

            var user = message.author;
          
            const embed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', message.guild.iconURL({ dynamic: true }))
            //.addField('Jugando a', user.presence.game != null ? user.presence.game.name : 'Nada', true)
            //.addField('Estado:', user.presence.status, true)
            .addField('Color:', message.member.displayHexColor, true)
            .addField('Usuario:', user.username+'#'+user.discriminator, true)
            .addField('Apodo:', message.member.nickname ? message.member.nickname : 'No tiene', true)
            .addField('ID:', user.id, true)
    
            .addField('Cuenta Creada:', user.createdAt.toLocaleDateString()+', '+user.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso:', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true)
            .addField('Roles:', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(message.member.displayColor)
    
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
            return message.channel.send({ embeds: [embed] });

        } else{

            const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', message.guild.iconURL({ dynamic: true }))
            //.addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : 'Nada', true)
            //.addField('Estado:', userm.presence.status, true)
            .addField('Color:', message.member.displayHexColor, true)
            .addField('Usuario:', userm.username+'#'+userm.discriminator, true)
            .addField('Apodo:', userm.nickname ? userm.nickname : 'No tiene', true)
            .addField('ID:', userm.id, true)
            .addField('Cuenta Creada:', userm.createdAt.toLocaleDateString()+', '+userm.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso:', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true )
            .addField('Roles:', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(message.member.displayColor)
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
            message.channel.send({ embeds: [embed] });
      
        }

    }

}