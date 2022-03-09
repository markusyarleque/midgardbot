module.exports =  {
    
    name: 'pizza',
    aliases: ['pizzas'],
    description: '🍕',
  
    async execute(client, message, args, Discord) {

        var pizza = [

            'https://media.discordapp.net/attachments/853500788848853002/873259191702270013/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259197427499068/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259214884180008/3.gif?width=863&height=521',
            'https://media.discordapp.net/attachments/853500788848853002/873259208945057872/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259216322822174/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259219531468910/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259223440584734/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259227290947674/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259229157416960/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259232428949525/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259243074105384/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259242562396170/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873259247314559057/13.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonpizza = pizza[Math.floor(Math.random()*pizza.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está comiendo una riquísima pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | La pizza nos causa indigestión! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una sabrosa pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}