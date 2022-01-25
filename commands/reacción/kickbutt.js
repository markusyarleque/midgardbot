const star = require('star-labs')

module.exports =  {
    
    name: 'kickbutt',
    aliases: ['patear','patada'],
    description: '🦶 Tira una pateada a alguien.',
  
    async execute(client, message, args, Discord) { 

        let kick = star.kick()
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
   
        if (!img || img.id === message.author.id) {

            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿A quién quieres patear? <:pepemaje:880303225109110814>`)
        
            ]})

        } else if (img.user.bot){
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡No puedes conmigo! <:nogarsias:932172183453712415>`)
        
            ]})
        
        } else {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${img.user.username}**, ${message.author.username} te dió una patada <a:ThisGonnaBGud_retrasados:887057491081449512>`)
            .setImage(kick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] })

        }

    }

}