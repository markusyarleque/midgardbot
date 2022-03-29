module.exports =  {
    
    name: 'kgay',
    aliases: ['kg','kiss-gay'],
    description: '😘 Un beso entre hombres.',
  
    async execute(client, message, args, Discord) { 

        var kg = [
            
            'https://c.tenor.com/mR-El-AjRvMAAAAC/beso-amor.gif',
            'https://i.pinimg.com/originals/05/68/cb/0568cb1869498449c74934e1acf9ce82.gif',
            'https://i.gifer.com/4dze.gif',
            'https://i.gifer.com/RAA2.gif',
            'https://i.pinimg.com/originals/a8/a9/a3/a8a9a3d6c414dd5d2c3f60429bb718ae.gif',
            'https://almomento.mx/wp-content/uploads/2017/05/anigif_sub-buzz-3121-1494206773-1.gif',
            'https://i.pinimg.com/originals/07/34/ff/0734ff8b8b3982928251607bac596572.gif',
            'https://c.tenor.com/wwxPpY1ePi0AAAAC/gay-kiss.gif',
            'http://24.media.tumblr.com/55f91b57dcd844de335f389782bafbbf/tumblr_mns4fjVCbP1rd022ro1_500.gif',
            'https://i.gifer.com/RZNn.gif',
            'https://i.pinimg.com/originals/37/c7/c8/37c7c8a9d24d0348a735216540396f1a.gif',
            'https://nosgustas.com/img/articulos/thumbnails/besos%20gay%20fotograf%C3%ADa%20(9).gif',
            'https://i0.wp.com/zonagayweb.com/wp-content/uploads/2020/08/love-simon-mejor-beso-mtv-1.gif?resize=540%2C260&ssl=1',
            'https://c.tenor.com/8-_oOuaHuPQAAAAC/kissing-gay.gif',
            'https://i.pinimg.com/originals/66/a6/6b/66a66b6705f14a1d2dc299e84af5ba38.gif',
            'https://c.tenor.com/nFnl55teFzEAAAAC/gay-gay-kiss.gif',
            'https://i.gifer.com/61rr.gif',
            'http://2.bp.blogspot.com/-BQxYjagJpAc/U3GzjDG3VjI/AAAAAAABjjQ/_wMKhBGa5a4/s1600/tumblr_n5dxusAixC1qala6eo1_500.gif',
            'https://i0.wp.com/www.notigay.com/wp-content/uploads/2017/02/151216-beso.gif?fit=500%2C280&ssl=1',
            'https://i.pinimg.com/originals/6b/7a/e3/6b7ae31e00a255a349a65eff2ac86c5f.gif',
            'https://shangay.com/sites/default/files/ezgif-1-931ff60a82.gif',
            'https://c.tenor.com/ts5LnkFKIKEAAAAC/gay-kiss.gif',
            'https://i.pinimg.com/originals/ff/7c/7b/ff7c7b6c91ccb464b0f1f3b8f2ac776c.gif',
            'https://c.tenor.com/bjZznl5Kx04AAAAd/aepete-kiss.gif',
            'https://i.gifer.com/Y7Le.gif',
            'https://i.pinimg.com/originals/6e/3c/f3/6e3cf30d6030a6dcad72a861fda7d45c.gif',
            'https://c.tenor.com/O57VtsAXlMgAAAAC/gay-kiss.gif',
            'https://i.gifer.com/WdJq.gif',
            'http://media.giphy.com/media/2z0dRvwN0jBHW/giphy.gif',
            'https://spoilertime.com/wp-content/uploads/2019/08/9-2.gif',
            'https://i.pinimg.com/originals/5d/7e/52/5d7e520a85219eb3a3e1d49bd6dcd7ed.gif',
            'http://2.bp.blogspot.com/-EZatCvC9G1o/VkDRmXZScNI/AAAAAAAANRU/WmPd0UwHpnM/s1600/gay%2Blove%2Bblog.gif',
            'https://gay.blog.br/wp-content/uploads/2021/02/Animated-GIF-downsized_large.gif',
            'https://media.giphy.com/media/4TeaJbiFiXYNa/giphy.gif',
            'https://i.gifer.com/OuRJ.gif',
            'https://j.gifs.com/31Y27A.gif',
            'http://www.guyspy.com/wp-content/uploads/2017/07/tumblr_nef0hjtg7s1tjyxheo1_500.gif',
            'http://pa1.narvii.com/6309/4b165cd43e215df2b8c5eed27666865157154390_00.gif',
            'https://c.tenor.com/bxMx95FGXDYAAAAC/gay-kiss.gif',
            'https://i.pinimg.com/originals/ff/e1/95/ffe19564e65dc4546c2efacf854c28dc.gif',
            'https://i0.wp.com/zonagayweb.com/wp-content/uploads/2020/07/Cosas-que-un-hombre-gay-debe-hacer-antes-de-cumplir-30-001.gif?resize=400%2C225&ssl=1',
            'https://thumbs.gfycat.com/GoodnaturedCaringCaimanlizard-size_restricted.gif',
            'https://shangay.com/sites/default/files/yaymyfavescence.gif',
            'https://38.media.tumblr.com/c4575157d4ebe4bb3f49f6935a77c98e/tumblr_n8xmj2voUJ1tbycouo1_500.gif',
            'https://entresuenos.files.wordpress.com/2018/08/tumblr_pbkkx7fnjz1rawmqbo1_500.gif?w=371',
            'https://i0.wp.com/pizzacinema.net/wp-content/uploads/omander-s1_1.gif?resize=500%2C248&ssl=1',
            'https://alextoledo.com/wp-content/uploads/2015/02/GAYS.gif',
            'https://c.tenor.com/ewHXJYoYRs4AAAAC/kissing-gay.gif',
            'https://i.pinimg.com/originals/a3/67/f4/a367f443b7e1cec368771f62a2a1f6b6.gif',
            'https://pa1.narvii.com/6528/0e5fea9a923923fd4055a9109a3866cc1eeb776e_hq.gif',
            'https://i.pinimg.com/originals/e9/eb/17/e9eb17ee42408ce4bad69560b8d3819d.gif',
            'https://thumbs.gfycat.com/GlitteringShockingGhostshrimp-size_restricted.gif',
            'https://i.pinimg.com/originals/9b/32/18/9b32182435d6603a5a4610d7c7588907.gif',
            'https://c.tenor.com/0aVCHZ9iWNgAAAAC/gay-kiss.gif',
            
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
        .setDescription(`**${message.author.username}** y **${img.user.username}** se están besando mientras se manosean <a:sabroso:932177227792146433>`)
        .setImage(ramdonkg)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}