module.exports =  {
    
    name: 'cigarro',
    aliases: [],
    description: '🚬',
  
    async execute(client, message, args, Discord) {

        var cigarro = [

            'https://media.discordapp.net/attachments/853500788848853002/873272694886531163/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272700343308318/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272705259024434/3.gif?width=374&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873272709335883817/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272723151945759/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272729841852496/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272736225570846/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272746136698950/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873272750955974686/10.gif',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncigarro = cigarro[Math.floor(Math.random()*cigarro.length)]

        while (!ramdoncigarro || ramdoncigarro === null || ramdoncigarro === '' || ramdoncigarro === undefined) {
            
            ramdoncigarro = cigarro[Math.floor(Math.random()*cigarro.length)]

        }

        if (!img || img.id === message.author.id) {

            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está fumando un cigarrito.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no fuman! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {

            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`Hey **${img.user.username}**, ${message.author.username} ha compartido un cigarro contigo.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}