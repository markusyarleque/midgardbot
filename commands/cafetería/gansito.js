module.exports =  {
    
    name: 'gansito',
    aliases: ['gansitos'],
    description: '🍪',
  
    async execute(client, message, args, Discord) {

        var gansito = [

            'https://c.tenor.com/cxxZK35AoxsAAAAC/recuerdame-gansito.gif',
            'https://media3.giphy.com/media/j3tkpBZw2zmDn68Cyh/giphy.gif',
            'https://media.giphy.com/media/HAr8z7fgiiQKY/giphy.gif',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/36455974-ff49-4b3b-a5c8-727004fdd9a8/d8lphjv-fa5f4c2d-d325-44c5-a47b-22f0a7aac68c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM2NDU1OTc0LWZmNDktNGIzYi1hNWM4LTcyNzAwNGZkZDlhOFwvZDhscGhqdi1mYTVmNGMyZC1kMzI1LTQ0YzUtYTQ3Yi0yMmYwYTdhYWM2OGMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.F5ixHVa42qscxeYIoajWgNYs3XRh-XDEB5o4T8M__W4',
            'https://i.makeagif.com/media/5-16-2018/ytlJhF.gif',
            'https://www.rebanando.com/uploads/externalMedia/c6/6c/0e/17/giphy-2-86.gif',
            'https://www.rebanando.com/uploads/externalMedia/6a/8b/b3/2a/giphy-5-52.gif',
            'https://c.tenor.com/HU4xu4-cABMAAAAM/behold-gansitos-food.gif',
            'https://64.media.tumblr.com/da166699a8fa88cdb9bcfe2820fc334e/tumblr_ocgswc2rHu1t9ocfzo8_500.gifv',
            'https://64.media.tumblr.com/c5221eb2c70f2eb87f7c0b0f8f9c737b/tumblr_ocgswc2rHu1t9ocfzo5_500.gifv',
            'https://i.pinimg.com/originals/b9/f7/e3/b9f7e3e5ac0985f7c39bfb0ffccb6ebc.gif',
            'https://64.media.tumblr.com/7500a6ec8e2bbbbea9b31f5c4f5a53a6/tumblr_ocgswc2rHu1t9ocfzo6_500.gifv',

        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdongansito = gansito[Math.floor(Math.random()*gansito.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`A **${message.author.username}** se le antojó un rico pastelito.`)
            .setImage(ramdongansito)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no comen gansito! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó unos deliciosos gansitos.`)
            .setImage(ramdongansito)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}