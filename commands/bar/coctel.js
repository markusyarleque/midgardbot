module.exports =  {
    
    name: 'coctel',
    aliases: ['trago'],
    description: '🍸',
  
    async execute(client, message, args, Discord) {

        var coctel = [

            'https://media.discordapp.net/attachments/853500788848853002/873266715746783342/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266726555512912/2.gif?width=404&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873266731467030528/3.gif?width=401&height=561',
            'https://media.discordapp.net/attachments/853500788848853002/873266738651869194/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266745538932796/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266760319647784/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266768460787722/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266776446738502/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266781815447602/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncoctel = coctel[Math.floor(Math.random()*coctel.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está saboreando su delicioso coctel.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Se ve delicioso! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${img.user.username}**, disfruta este coctel que te ha invitado ${message.author.username}.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })

        }

    }

}