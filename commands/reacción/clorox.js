module.exports =  {
    
    name: 'clorox',
    aliases: [],
    description: '🙄 ¿Te apetece un poco de clorox?.',
  
    async execute(client, message, args, Discord) {

        var clorox = [

            'https://media.discordapp.net/attachments/822642787555213312/911184609058897920/1.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184608849174548/2.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184608660426752/3.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184607515402281/4.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184607272124446/5.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184607033045012/6.gif?width=401&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/911184606345187328/7.gif',
            'https://media.discordapp.net/attachments/822642787555213312/911184606051569684/8.gif',
            'https://media.discordapp.net/attachments/822642787555213312/911184605359505448/9.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonclorox = clorox[Math.floor(Math.random()*clorox.length)]

        while (!ramdonclorox || ramdonclorox === null || ramdonclorox === '' || ramdonclorox === undefined) {
            
            ramdonclorox = clorox[Math.floor(Math.random()*clorox.length)]

        }

        if (!img || img.id === message.author.id) {
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** se ahoga con un buen clorox!`)
            .setImage(ramdonclorox)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
  
        } else if (img.user.bot){
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿Clorox? <:nogarsias:932172183453712415>`)
        
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        } else {
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, vamos a ahogarnos en la soledad con un clorox invitado por ${message.author.username}.`)
            .setImage(ramdonclorox)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        }

    }

}