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

        if(userm.bot) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
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
            .addField('Jugando a', message.guild.members.resolve(user.id).presence.activities[0] ? message.guild.members.resolve(user.id).presence.activities[0] : 'Nada', true)
            .addField('Estado:', message.guild.members.resolve(user.id).presence.status, true)
            .addField('Color:', message.member.displayHexColor, true)
            .addField('Usuario:', user.username+'#'+user.discriminator, true)
            .addField('Apodo:', message.guild.members.resolve(user.id).nickname ? message.guild.members.resolve(user.id).nickname : 'No tiene', true)
            .addField('ID:', user.id, true)
            .addField('Cuenta Creada:', user.createdAt.toLocaleDateString()+', '+user.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso:', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true)
            .addField('Roles:', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(message.member.displayColor)
    
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

        } else{

            const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', message.guild.iconURL({ dynamic: true }))
            .addField('Jugando a', message.guild.members.resolve(userm.id).presence.activities[0] ? message.guild.members.resolve(userm.id).presence.activities[0] : 'Nada', true)
            .addField('Estado:', message.guild.members.resolve(userm.id).presence.status, true)
            .addField('Color:', message.guild.members.resolve(userm.id).displayHexColor, true)
            .addField('Usuario:', userm.username+'#'+userm.discriminator, true)
            .addField('Apodo:', message.guild.members.resolve(userm.id).nickname ? message.guild.members.resolve(userm.id).nickname : 'No tiene', true)
            .addField('ID:', userm.id, true)
            .addField('Cuenta Creada:', userm.createdAt.toLocaleDateString()+', '+userm.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso:', message.guild.members.resolve(userm.id).joinedAt.toLocaleDateString()+', '+message.guild.members.resolve(userm.id).joinedAt.toLocaleTimeString(), true )
            .addField('Roles:', message.guild.members.resolve(userm.id).roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(message.guild.members.resolve(userm.id).displayColor)
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
      
        }

    }

}