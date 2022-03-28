module.exports =  {
    
    name: 'kless',
    aliases: ['kl','kiss-less'],
    description: '😘 Un beso entre mujeres.',
  
    async execute(client, message, args, Discord) { 

        var kl = [     
            
            'https://c.tenor.com/w0MDlvxGN14AAAAM/girl-kiss.gif',     
            'https://c.tenor.com/xX82UpDOXDoAAAAM/lesbian-kiss-lesbian-love.gif',
            'https://c.tenor.com/9GWmly_9sGcAAAAM/lesbians-lost-girl.gif',
            'https://c.tenor.com/Qsq8QVgLKQMAAAAM/holly-and-paige-paige-and-holly.gif',
            'https://c.tenor.com/CjHwWMOSnDcAAAAM/lesbian-love.gif',
            'https://c.tenor.com/tTmklWzChNQAAAAM/lesbian-kissing.gif',
            'https://c.tenor.com/UapocIl0MtUAAAAM/juliantina-lesbian.gif',
            'https://c.tenor.com/nnMRLwyeFzkAAAAM/lesbian-lesbian-lesbian-liplock-lesbian-liplock.gif',
            'https://c.tenor.com/0pOnRx2qexcAAAAM/glee-brittany-pierce.gif',
            'https://c.tenor.com/6m0X3PlnasMAAAAM/orphan-black-cosima.gif',
            'https://c.tenor.com/dxltBn9uDX8AAAAM/lesbian-kiss-in-cheeks.gif',
            'https://c.tenor.com/yEmHhA4cY8IAAAAM/love-kiss.gif',
            'https://c.tenor.com/9jvZHETBGrQAAAAM/lesbian-naomi-watts.gif',
            'https://c.tenor.com/cIs1zweWy5kAAAAM/lesbian-kiss-lesbian-love.gif',
            'https://c.tenor.com/2NSd38Foh3UAAAAM/kiss-lesbian.gif',
            'https://c.tenor.com/tBzFrXZEtgYAAAAM/lesbian-lesbians.gif',
            'https://c.tenor.com/wYpmaNrhr_sAAAAM/kiss-lesbian.gif',
            'https://c.tenor.com/Q0ColizFnQQAAAAM/lesbian-kiss-lesbian-love.gif',
            'https://c.tenor.com/KouwK984h-EAAAAM/spencer-and-aria-kisses.gif',
            'https://c.tenor.com/fRgv2AnIuH4AAAAM/lesbian-kiss.gif',
            'https://c.tenor.com/VHd4Yqw4vlIAAAAM/lesbian-girls-kiss.gif',
            'https://c.tenor.com/VPGdo7eBWo0AAAAM/kiss-lesbian.gif',
            'https://c.tenor.com/4NH2IydVqCgAAAAM/lesbians-cuddling.gif',
            'https://c.tenor.com/gHFsKeuCNgEAAAAM/lesbians-kiss.gif',
            'https://c.tenor.com/9wFdBQ6k0wAAAAAM/lesbian-love-you.gif',
            'https://c.tenor.com/N7K6ImjdDYIAAAAM/couple-lesbo.gif',
            'https://c.tenor.com/UVynhFv9EmEAAAAM/girl-kiss.gif',
            'https://c.tenor.com/JL2ENvC9TcAAAAAM/lesbian-kiss.gif',
            'https://c.tenor.com/4vwGjyz8mpUAAAAM/girls-girl.gif',
            'https://c.tenor.com/49gKbKFkeXcAAAAM/kiss-lesbians.gif',
            'https://c.tenor.com/FDUjNasBff4AAAAM/shannon-cammie.gif',
            'https://c.tenor.com/WQ-C47vQ2J8AAAAM/bette-porter-tina-kennard.gif',
            'https://c.tenor.com/GLPtjhEsYeEAAAAM/lesbians-lesbian.gif',
            'https://c.tenor.com/AwXv6f3M34kAAAAM/morning-kiss.gif',
            'https://c.tenor.com/X6hXyaICmisAAAAM/girl-kiss.gif',
            'https://c.tenor.com/i5FAZN1UjAcAAAAM/wayhaught-girl.gif',
            'https://c.tenor.com/XGV5ByDQcXYAAAAM/kiss-couples.gif',
            'https://c.tenor.com/HqoudtPlz8UAAAAM/love-kiss.gif',
            'https://c.tenor.com/mizjYapTx20AAAAM/kissing-lesbians.gif',
            'https://c.tenor.com/DvkzmXMsYnQAAAAM/lesbians-sexy.gif',
            'https://c.tenor.com/8GIXwxAhivcAAAAM/lesbian-kiss.gif',
            'https://c.tenor.com/r7Ww26UXYdsAAAAM/lesbian-kiss.gif',
            'https://c.tenor.com/-dg0QdGCMyYAAAAM/bly-manor.gif',
            'https://c.tenor.com/cSWKFoGNV34AAAAM/kiss-lesbian.gif',
            'https://c.tenor.com/qi29GVqvchUAAAAM/lesbians-kissing.gif',
            'https://c.tenor.com/uOKLi-qeZywAAAAM/cuddle-lesbian.gif',
            'https://c.tenor.com/Pm3snVsKZ-cAAAAM/lesbian-kiss.gif',
            'https://c.tenor.com/d1KgnWFlH5gAAAAM/hollstein-carmilla.gif',
            'https://c.tenor.com/r_8mz-dCJ8AAAAAM/roseandrosie-roseellendix.gif',
            'https://c.tenor.com/f31u8hV9QIcAAAAM/love-gay.gif',
            'https://c.tenor.com/Yg_W_4GmybcAAAAM/female-couple-gay.gif',
            'https://c.tenor.com/9s8VdLsXwFMAAAAM/sex-woman-lesbian-kiss.gif',
          
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