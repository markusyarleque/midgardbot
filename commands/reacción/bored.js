const anime = require('anime-actions')

module.exports =  {
    
    name: 'bored',
    aliases: ['aburrido'],
    description: '🙄 ¡Aburrido!.',
  
    async execute(client, message, args, Discord) { 

        let bored = anime.bored()

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        .setDescription(`**${message.author.username}** está aburrid@ <:yonofui:931433119859503194>`)
        .setImage(bored)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
        message.channel.send({ embeds: [embed] });
       
    }

}