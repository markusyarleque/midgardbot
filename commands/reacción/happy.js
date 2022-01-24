const star = require('star-labs')

module.exports =  {
    
    name: 'happy',
    aliases: ['feliz','alegre'],
    description: '😀 Demuestra tu modo feliz.',
  
    async execute(client, message, args, Discord) { 

        let happy = star.happy()

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        .setDescription(`**${message.author.username}** se puso modo feliz <a:6975wolfparty:901266259256168508>`)
        .setImage(happy)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      
        message.channel.send({ embeds: [embed] });

    }

}