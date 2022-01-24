const star = require('star-labs')

module.exports =  {
    
    name: 'feed',
    aliases: ['comer','comiendo','eat'],
    description: '😋 ¿Con hambre?.',
  
    async execute(client, message, args, Discord) { 

        let feed = star.feed()
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if (!img || img.id === message.author.id) {

            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Cómete <:esta:925931250303250512>`)
        
            ]})

        } else if (img.user.bot){
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ya comí! <:nogarsias:932172183453712415>`)
        
            ]})
        
        } else {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** le dió de comer a **${img.user.username}** <a:Zuii:890684724673150996>`)
            .setImage(feed)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] });

      }

    }

}