const star = require('star-labs')

module.exports =  {
    
    name: 'dance',
    aliases: ['bailando','bailar'],
    description: '💃 ¿Bailamos?.',
  
    async execute(client, message, args, Discord) { 

        let dance = star.dance()
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if (!img || img.id === message.author.id) {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está tirando los pasos prohibidos. <a:pasito:877116925291946094>`)
            .setImage(dance)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] });

        } else if (img.user.bot){
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Yo no bailo, gracias! <:nogarsias:932172183453712415>`)
        
            ]})
        
        } else {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${img.user.username}** y **${message.author.username}** están bailando juntos <:abby:931432327354155038> `)
            .setImage(dance)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] });

        }

    }

}