module.exports =  {
    
    name: '8ball',
    aliases: [],
    description: '❓ El bot responderá lo que le preguntes.',
    use: '<prefix><name> <pregunta>',
    category: 'Diversión 🤣',
    vip: false,
    owner: false,
  
    async execute(client, message, args, Discord) {

        let texto = args.join(' ');
    
        var rpts = [
            
            'https://media.discordapp.net/attachments/938965106275025017/990028920336310402/8ball-Si.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990034941834309662/8ball-No.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990044343484170250/8ball-PorQue.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990049066245312532/8ball-NoSe.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990051563835887616/8ball-TalVez.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990077462140583937/8ball-Claro.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990082427772874792/8ball-PorSupuesto.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990102808835555348/8ball-DNM.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990108327721709628/8ball-EMP.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990111369363849226/8ball-PSQN.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990117030516645928/8ball-PFNMPE.gif?width=281&height=499',
            'https://media.discordapp.net/attachments/938965106275025017/990119792264503326/8ball-Obvio.gif?width=281&height=499',

        ]

        if(!texto) return message.reply({
            
            embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Escriba una pregunta`)
    
            ]
        }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        message.reply({ allowedMentions: { repliedUser: false}, 
            embeds:
            [
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setImage(await rpts[Math.floor(Math.random() * rpts.length)])
                .setDescription('**Pregunta:**\n\n> '+texto)
                .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/MNWYvup.gif' })
          
            ]
        }).catch((e) => console.log('Error al enviar mensaje: '+e))
            
    }

}