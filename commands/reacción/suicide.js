const star = require('star-labs')

module.exports =  {
    
    name: 'suicide',
    aliases: ['suicidar','suicidio'],
    description: '💀 ¿Te harás la automorisión?.',
  
    async execute(client, message, args, Discord) { 

        let suic = star.suicide()
  
        while (!suic || suic === null || suic === '' || suic === undefined) {
            
            suic = star.suicide()

        }
        
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${message.author.username}** se ha suicidado... <a:suicide:881550681239064626>`)
        .setImage(suic)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}