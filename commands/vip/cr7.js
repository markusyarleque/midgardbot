module.exports =  {
    
    name: 'cr7',
    aliases: ['bicho','siu'],
    description: '⚽ Comando VIP',
  
    async execute(client, message, args, Discord) { 
 
        var cr7 = [

            'https://c.tenor.com/_guXUCfQkawAAAAd/cr7-scream.gif',
            'https://c.tenor.com/CojO_4a_B4UAAAAC/cristiano-ronaldo-ronaldo.gif',
            'https://media0.giphy.com/media/c6ELCi3mRoXY8TyvMe/giphy.gif',
            'https://i.pinimg.com/originals/b0/37/df/b037df079ca328b196300f3a24816e9c.gif',
            'https://i.gifer.com/OCgH.gif',
            'https://i.pinimg.com/originals/47/3e/19/473e197bd50cd4f0c9afe0e5e4cab7df.gif',
            'https://c.tenor.com/C2Ek3c7bFv4AAAAC/cr7.gif',
            'https://64.media.tumblr.com/eb1b7211497f8671bf5addb62b99ff71/tumblr_nxxq9jXMAl1rpl5x5o1_500.gif',
            'https://i.pinimg.com/originals/62/be/44/62be4460217373e1ef4317e032732478.gif',
            'https://i.gifer.com/J4QD.gif',
            'https://media1.giphy.com/media/TpKkkJjg45XT4oY37a/200w.gif?cid=82a1493bavtfs5g785hdv7kveqz00skbfxa1ko8vjg760jot&rid=200w.gif&ct=g',
            'http://31.media.tumblr.com/1b120c5b7f3c2d04779121fb2210cd1f/tumblr_mpis77dbJu1s8nflio1_400.gif',
            'http://24.media.tumblr.com/tumblr_m9jt60jMue1qchl8do1_500.gif',
            'https://24.media.tumblr.com/25f5efbf58b7feb55192d8f56dad82f9/tumblr_mp8yncMgPF1rdts52o1_400.gif',
            'https://64.media.tumblr.com/eb1c2f3606d6a919c05d5928baa713e1/8534939c56c54b9e-6a/s540x810/9e0accd51807ce99239e8814b04bcd099f0d80f1.gif'
          
        ]  

        let ramdonc = cr7[Math.floor(Math.random()*cr7.length)]

        while (!ramdonc || ramdonc === null || ramdonc === '' || ramdonc === undefined) {
            
            ramdonc = cr7[Math.floor(Math.random()*cr7.length)]

        }
        
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's VIP`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setTitle('🇵🇹 | Cristiano Ronaldo 7')
        .setImage(ramdonc)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
    }

}