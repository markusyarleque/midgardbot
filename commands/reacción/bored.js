const anime = require('anime-actions')

module.exports =  {
    
    name: 'bored',
    aliases: ['aburrido'],
    description: '🙄 ¡Aburrido!.',
  
    async execute(client, message, args, Discord) { 

        let bored = await anime.bored()

        while (!bored || bored === null || bored === '' || bored === undefined) {
            
            bored = await anime.bored()

        }

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Emotions 🤗`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${message.author.username}** está aburrid@ <:yonofui:931433119859503194>`)
        .setImage(bored)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
       
    }

}