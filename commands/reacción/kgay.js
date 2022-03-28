module.exports =  {
    
    name: 'kgay',
    aliases: ['kg','kiss-gay'],
    description: '😘 Un beso entre hombres.',
  
    async execute(client, message, args, Discord) { 

        var kg = [

            'https://c.tenor.com/yfzENpWjgcEAAAAM/kissing-gay.gif',
            'https://c.tenor.com/5JjXwzXcLvoAAAAM/chuy-gay-kiss-shut-up-and-kiss-me.gif',
            'https://c.tenor.com/9X8zHNecHcAAAAAM/cute-gay-couple-goals.gif',
            'https://c.tenor.com/6uEg8IhPX6gAAAAM/gay-kiss.gif',
            'https://c.tenor.com/dZ2KGeUwcTcAAAAM/gay-kiss-love.gif',
            'https://c.tenor.com/VEWg8KQrrakAAAAM/gay-kiss.gif',
            'https://c.tenor.com/APtfJseYmbQAAAAM/gay-kiss.gif',
            'https://c.tenor.com/0VqDj3YhG-sAAAAM/kiss-love-is-love.gif',
            'https://c.tenor.com/0hB0ZDtCSqgAAAAM/gay-men.gif',
            'https://c.tenor.com/d_HyA1p6CsQAAAAM/dane-de-haan-gay.gif',
            'https://c.tenor.com/pyuNCHpMaH4AAAAM/gay-kiss.gif',
            'https://c.tenor.com/0aVCHZ9iWNgAAAAM/gay-kiss.gif',
            'https://c.tenor.com/OpukpwHnBasAAAAM/gay-couple-couple.gif',
            'https://c.tenor.com/nrfYsJS0uwAAAAAM/gay-love.gif',
            'https://c.tenor.com/zz9Ku_cIqfgAAAAM/gay-kiss-men.gif',
            'https://c.tenor.com/1QCoF7cHJUgAAAAM/gay-gaylove.gif',
            'https://c.tenor.com/1QCoF7cHJUgAAAAM/gay-gaylove.gif',
            'https://c.tenor.com/vVLqRj0HebQAAAAM/gay-morning.gif',
            'https://c.tenor.com/pryc2l5M3toAAAAM/gay-kiss.gif',
            'https://c.tenor.com/wcAqxfv6TTwAAAAM/gay-kiss-kiss.gif',
            'https://c.tenor.com/j6m9SYy5SVwAAAAM/gayy-gay.gif',
            'https://c.tenor.com/bxMx95FGXDYAAAAM/gay-kiss.gif',
            'https://c.tenor.com/FtKkyveReTQAAAAM/gay-gay-bear.gif',
            'https://c.tenor.com/lhGLtH8IP_gAAAAM/gay-gaykiss.gif',
            'https://c.tenor.com/bxMx95FGXDYAAAAM/gay-kiss.gif',
            'https://c.tenor.com/PwGJh7uxq8oAAAAM/good-morning-gay-kiss.gif',
            'https://c.tenor.com/mSlbzP8JaHkAAAAM/gay-kiss.gif',
            'https://c.tenor.com/4VXEou5xsXEAAAAM/gay-gay-kissing.gif',
            'https://c.tenor.com/jXs6t8Q8k54AAAAM/kiss-make-out.gif',
            'https://c.tenor.com/zVT8geeOG6wAAAAM/biracial-gay.gif',
            'https://c.tenor.com/9hRdtVSEjgAAAAAM/starry-kissing-starry.gif',
            'https://c.tenor.com/EYDaJr71VtMAAAAM/gay-pride.gif',
            'https://c.tenor.com/iGnAAvJvkVgAAAAM/gay-gay-kissing.gif',
            'https://c.tenor.com/p_qID1lN1eIAAAAM/noahs-arc-kiss.gif',
            'https://c.tenor.com/IU1y1hlVN6gAAAAM/gay-kiss.gif',
            'https://c.tenor.com/3rbiZaz_6goAAAAM/kiss-gay.gif',
            'https://c.tenor.com/Jw7I9Qf5zvkAAAAM/gay-seb-gay.gif',
            'https://c.tenor.com/mEZMztOhH-IAAAAM/gay-kiss-kiss.gif',
            'https://c.tenor.com/oWM5VSmZo14AAAAM/malec-toungue-kiss.gif',
            'https://c.tenor.com/DfVmIcCQ1A8AAAAM/first-kiss-feels-first-kiss.gif',
            'https://c.tenor.com/dozD7N9r4agAAAAM/gay-kiss.gif',
            'https://c.tenor.com/uX7w_KNAe7YAAAAM/gay-kiss.gif',
            'https://c.tenor.com/xYtyEdfbtuoAAAAM/love-gay.gif',
            'https://c.tenor.com/5FmbScDipxoAAAAM/gay-gay-cuddle.gif',
            'https://c.tenor.com/SFqn1iEsnqsAAAAM/gay-kiss-hot.gif',
            'https://c.tenor.com/5rvp7BmN8s0AAAAM/gay-gay-kissing.gif',
            'https://c.tenor.com/BmYL_ED2LbsAAAAM/gay-kissing.gif',
            'https://c.tenor.com/KzUVzOr9dI4AAAAM/gay-kiss.gif',
            'https://c.tenor.com/DGUKulKZijIAAAAM/pride-gay.gif',
            'https://c.tenor.com/paL2pjjdMe8AAAAM/first-kiss-kiss.gif',
            'https://c.tenor.com/6U8OKTn1bTgAAAAM/wedding-kiss.gif',
            'https://c.tenor.com/WTv174t46NsAAAAM/boys-gay.gif',
            'https://c.tenor.com/xjehhncFNZ0AAAAM/gay-kissing.gif',
            'https://c.tenor.com/cK2602zpnp4AAAAM/gay-kiss-kiss.gif',
            'https://c.tenor.com/q8sIEhmmrQgAAAAM/korean-kissing.gif',
            'https://c.tenor.com/suc0ecbPrKMAAAAM/gay-kiss.gif',
            'https://c.tenor.com/47ALK9LPdY4AAAAM/larry-kiss.gif',
            'https://c.tenor.com/EY_mKVmx1csAAAAM/gay-couple.gif',
            'https://c.tenor.com/1uYC54ltxZcAAAAM/gay-gay-love.gif',
            'https://c.tenor.com/mR-El-AjRvMAAAAM/beso-amor.gif',
            'https://c.tenor.com/5wAUQSsZuegAAAAM/gay-kiss.gif',
            'https://c.tenor.com/uizSrou02NQAAAAS/starry-kissing-ste-harry.gif',
            'https://c.tenor.com/rgXI7qmFKXEAAAAS/jackson-krecioch-kiss.gif',
            'https://c.tenor.com/ywtOIKd-rwMAAAAM/sebastian-stan.gif',
            'https://c.tenor.com/iaukZjik0EAAAAAM/kiss-gay.gif',
            'https://c.tenor.com/_h_uDrC4INIAAAAM/gay-kiss.gif',
            'https://c.tenor.com/QHD_PReBwRgAAAAM/gay-boys.gif',
          
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkg = kg[Math.floor(Math.random()*kg.length)]

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
        .setDescription(`**${message.author.username}** y **${img.user.username}** se están dando un rico chape <a:sabroso:932177227792146433> Disfrútenlo chicos!!! <:GatoLove:925929538863628318> `)
        .setImage(ramdonkg)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}