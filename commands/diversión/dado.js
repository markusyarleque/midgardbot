module.exports =  {
    
    name: 'dado',
    aliases: ['dice'],
    description: '🎲 Lanza un dado al azar.',
  
    async execute(client, message, args, Discord) {

        let links = [
            'https://cdn.discordapp.com/attachments/684757256658747451/794277079243685888/dado-1.png',
            'https://cdn.discordapp.com/attachments/684757256658747451/794277107537805332/dado-2.png',
            'https://cdn.discordapp.com/attachments/684757256658747451/794277142800105483/dado-3.png',
            'https://cdn.discordapp.com/attachments/684757256658747451/794277176592826368/dado-4.png',
            'https://cdn.discordapp.com/attachments/684757256658747451/794277207619010590/dado-5.png',
            'https://cdn.discordapp.com/attachments/684757256658747451/794277245157113866/dado-6.png'
        ]

        var dado = links[Math.floor(Math.random() * links.length)]

        while (!dado || dado === null || dado === '' || dado === undefined) {
        
            dado = links[Math.floor(Math.random() * links.length)]
            
        }

        const embed = new Discord.MessageEmbed() 
        .setAuthor({ name: `Midgard's Fun`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setTitle(`🎲 **${message.author.username}** ha tirado el dado.`)
        .setDescription('El dado a caído en:')
        .setImage(dado)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
        
        message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}