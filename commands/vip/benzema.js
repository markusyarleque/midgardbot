module.exports =  {
    
    name: 'benzema',
    aliases: ['karim'],
    description: '⚽ Comando VIP',
  
    async execute(client, message, args, Discord) { 
 
        var ben = [

            'https://c.tenor.com/u5UImDBRyLwAAAAC/karim-france.gif',
            'https://c.tenor.com/2TlsSfkqDxUAAAAd/karim-benzema-real-madrid.gif',
            'https://c.tenor.com/psXTqdWKlQ8AAAAM/benzema-football.gif',
            'https://media3.giphy.com/media/nv5rlmTeT6gUECLhVv/200.gif',
            'https://i.giphy.com/media/TIAdvu16QOtg591u29/giphy.gif',
            'https://media1.giphy.com/media/p4sSTGKYvnhpaHpZ6f/giphy.gif',
            'https://media3.giphy.com/media/x02LE2F9wznXMegtjK/giphy.gif?cid=e1bb72ff5aebf7965965494141f3d227',
            'https://c.tenor.com/Qs-GYt4JLeAAAAAC/karim-benzema-idk.gif',
            'https://i.pinimg.com/originals/6e/d5/ab/6ed5abcd841880767555549fccedc3a7.gif'
          
        ]  

        let ramdonb = ben[Math.floor(Math.random()*ben.length)]

        while (!ramdonb || ramdonb === null || ramdonb === '' || ramdonb === undefined) {

            ramdonb = ben[Math.floor(Math.random()*ben.length)]
            
        }
        
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's VIP`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setTitle('🇫🇷 | Karim Benzema 9')
        .setImage(ramdonb)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
    }

}