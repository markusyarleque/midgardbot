module.exports =  {
    
    name: 'kless',
    aliases: ['kl','kiss-less'],
    description: '😘 Un beso entre mujeres.',
  
    async execute(client, message, args, Discord) { 

        var kl = [     
            
            'https://i.pinimg.com/originals/7d/1b/5d/7d1b5dd9d4929821fe0a14db760b7eba.gif',
            'https://nosgustas.com/img/articulos/thumbnails/04.gif',
            'https://c.tenor.com/_9Q5t_6KV0oAAAAC/clexa-the100.gif',
            'https://i.pinimg.com/originals/9e/7e/59/9e7e59edc0ed99a08b23b6bdfd50cdc0.gif',
            'https://nosgustas.com/img/articulos/thumbnails/09.gif',
            'http://pa1.narvii.com/6296/2efe16246c83e28cfc8eaaab4b94f92798a7d344_hq.gif',
            'https://www.ayojon.mx/galeria/2017/03/29689.gif',
            'https://i.pinimg.com/originals/ca/1b/e3/ca1be31030b8b341472d39684deec33f.gif',
            'https://nosgustas.com/img/articulos/thumbnails/06.gif',
            'https://thumbs.gfycat.com/MatureWellmadeBasil-size_restricted.gif',
            'https://thumbs.gfycat.com/DistinctTautFox-size_restricted.gif',
            'https://media2.giphy.com/media/5zh6PqlUhrAZfuoVzd/giphy.gif',
            'https://media.giphy.com/media/wkFXNcmQwPlu0/giphy.gif',
            'https://img.wattpad.com/615aaac710bb21e1d87109ed5ec094425de8f8c7/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4e3970414d526564646a70492d673d3d2d3539363833353131392e313534313061306564363839373537363334393536303630353035302e676966',
            'https://i.pinimg.com/originals/0a/48/b3/0a48b3c576149ad064cb38ffc86c41f3.gif',
            'https://media.giphy.com/media/N6KimGVMgtoKA/giphy.gif',
            'https://nosgustas.com/img/articulos/thumbnails/12.gif',
            'https://i.pinimg.com/originals/e4/40/b3/e440b37451b6491144f211e440a7659e.gif',
            'https://media.giphy.com/media/PmtYgrz5AffCE/giphy.gif',
            'https://nosgustas.com/img/articulos/thumbnails/11.gif',
            'https://espana-eunic.eu/wp-content/uploads/2020/08/150754.jpg',
            'https://i.gifer.com/ZfsF.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/6/R/j/96Rjb/Hot-lesbian-Kiss-%28gifs%29---015.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/6/R/i/96Rix/Hot-lesbian-Kiss-%28gifs%29---004.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/6/R/j/96Rj9/Hot-lesbian-Kiss-%28gifs%29---003.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/6/R/j/96Rj8/Hot-lesbian-Kiss-%28gifs%29---009.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/6/R/i/96RiQ/Hot-lesbian-Kiss-%28gifs%29---006.gif',
            'https://culosonline.com/wp-content/uploads/2021/09/hermanas-lesbianas-6.gif',
            'http://24.media.tumblr.com/45cb20bfbe272a37d0c076a1943e2ec0/tumblr_mi3z8oYAyV1r2hz45o1_500.gif',
            'https://pornoybizarro.com/wp-content/uploads/2016/02/1-13.gif',
            'https://78.media.tumblr.com/e6ec97eea2c5b7e3eac283772315d550/tumblr_o98zb0n48L1v3qxvmo1_500.gif',
            'https://33.media.tumblr.com/24f0c2a6bdc3473feac7f0a692dda2fd/tumblr_msawt9k1tH1s4n3nzo1_500.gif',
            'https://vayagifporno.com/wp-content/uploads/2016/05/4-15.gif',
            'https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2015/06/03/blackswan-beso.gif',
            'http://27.media.tumblr.com/tumblr_lzrpk9Mzx31r9cbsdo1_500.gif',
            'https://i.pinimg.com/originals/fa/0f/0d/fa0f0da55016f03e2b028cab41051c2e.gif',
            'https://i.pinimg.com/originals/99/2b/fc/992bfcd7009a58894ecb66f5408ac5b1.gif',
            'http://i.giphy.com/5JxIetDAMltXG.gif',
            'https://media3.giphy.com/media/VDeCzVbELX4ZRa7EXy/200.gif',
            'https://c.tenor.com/bqsxIg1JGpAAAAAd/beso-beso-lesbico.gif',
            'https://c.tenor.com/gHlVJCZEKdIAAAAC/abell46s-reface.gif',
            'https://i0.wp.com/media.giphy.com/media/zGyu9zM7dAV7q/giphy.gif?resize=458%2C458&quality=80&ssl=1',
            'https://s12.favim.com/gif_previews/7/781/7814/78145/7814547.gif',
            'https://media2.giphy.com/media/6SXVHU3Dlu5Us/giphy.gif',
            'https://i0.wp.com/www.homosensual.com/wp-content/uploads/2020/07/jennymarina-parejas-lesbicas.gif?resize=479%2C270&quality=80&ssl=1',
            'https://i.pinimg.com/originals/ca/1b/e3/ca1be31030b8b341472d39684deec33f.gif',
            'https://i.makeagif.com/media/8-29-2018/3b_W2u.gif',
            'https://pa1.narvii.com/6490/49c306a2b98918c6a3ba6ea5aef7cf2ff6958827_hq.gif',
            'https://i.pinimg.com/originals/a6/dd/3e/a6dd3e59824d563fb275431251e1661c.gif',
            'https://i.pinimg.com/originals/28/42/50/2842508712c9315385e5fa29df562a1a.gif',
          
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkl = kl[Math.floor(Math.random()*kl.length)]

        if (!img || img.id === message.author.id) return message.reply({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Te besarías a ti mismo? <:burbujita:930399322183458867>`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        if (img.user.bot) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Gracias por ese beso! <:mmm:932177122968076338>`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        while (!ramdonkl || ramdonkl === null || ramdonkl === '' || ramdonkl === undefined) {
            
            ramdonkl = kl[Math.floor(Math.random()*kl.length)]

        }
        
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${message.author.username}** y **${img.user.username}** se están dando un rico chape <a:sabroso:932177227792146433> Disfrútenlo chicas!!! <:GatoLove:925929538863628318> `)
        .setImage(ramdonkl)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}