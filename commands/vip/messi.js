module.exports =  {
    
    name: 'messi',
    aliases: ['pulga','lionel'],
    description: '⚽ Comando VIP',
  
    async execute(client, message, args, Discord) { 
 
        var messi = [

            'https://media4.giphy.com/media/xUA7aT4k7JLXH71zG0/200.gif',
            'https://c.tenor.com/b_VTJ4TN0rYAAAAd/leo-messi.gif',
            'http://i.giphy.com/h2KFQRfCogoxy.gif',
            'https://i.gifer.com/73tq.gif',
            'https://i.pinimg.com/originals/bd/60/a9/bd60a9508dfc9ddef020f57b64d6cb53.gif',
            'https://c.tenor.com/S_pn1-ALg5kAAAAd/boateng-messi.gif',
            'https://64.media.tumblr.com/a7863e9efcba7b459adcc89f30e73067/a3fe3d95fe35fd67-a7/s540x810/e145c8fbe8b3158444313b2aae90e0174fc3f06b.gif',
            'https://c.tenor.com/eN_4KgMxTjIAAAAC/messi.gif',
            'https://c.tenor.com/7UbBNdn7MvkAAAAd/messi.gif',
            'https://i.pinimg.com/originals/32/73/6f/32736f7055033e91ac986c6a099b1af8.gif',
            'https://i.giphy.com/media/qp61kl8rdZwuQ/giphy.gif',
            'https://j.gifs.com/zvN18O.gif',
            'https://i.gifer.com/SQUL.gif',
            'http://i.giphy.com/R9zW4gQ0plPlS.gif',
            'https://i.pinimg.com/originals/da/a4/88/daa488302213bbf53b6921e33d6e3aa9.gif'
          
        ]   

        let ramdonm = messi[Math.floor(Math.random()*messi.length)]

        while (!ramdonm || ramdonm === null || ramdonm === '' || ramdonm === undefined) {
        
            ramdonm = messi[Math.floor(Math.random()*messi.length)]
            
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's VIP`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setTitle('🇦🇷 | Lionel Messi 10')
        .setImage(ramdonm)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
    }

}