module.exports =  {
    
    name: 'kcheek',
    aliases: ['kc','kiss-cheek'],
    description: '😘 Un beso en la mejilla.',
  
    async execute(client, message, args, Discord) { 

        var kc = [
            
            'https://c.tenor.com/PKemB3C4ZAoAAAAC/beso-en-la-mejilla-backdoor.gif',
            'https://i.pinimg.com/originals/1a/cc/fb/1accfbae750d87fb175ac960d52a0b47.gif',
            'https://c.tenor.com/-iRe2BuG0rEAAAAd/beso-rom%C3%A1ntico.gif',
            'http://eslamoda.com/wp-content/uploads/sites/2/2015/07/beso-mejilla.gif',
            'https://pa1.narvii.com/7056/2db1b6ac8b83530b2c24097cf3887875a221fb01r1-500-281_hq.gif',
            'https://i0.wp.com/www.mexmads.com/wp-content/uploads/2019/04/tumblr_ob4pgiD4ex1v8hcteo1_500.gif?resize=420%2C236&ssl=1',
            'https://uploads.vibra.fm/1/2017/02/images_mujeres_arriba_2017_Febrero_significadobesosesquineados.gif',
            'https://img.allw.mn/content/jb/qy/z55iia6y5674d89ee45fb663742984_500x243.gif',
            'https://c.tenor.com/CRK1E-v34U0AAAAd/beso-en-la-mejilla-gus.gif',
            'https://img.allw.mn/content/cw/by/qe3m1wxy5707979712c36188042927_330x221.gif',
            'https://c.tenor.com/3DxBmzHrKaEAAAAC/beso-jose-manuel.gif',
            'https://acegif.com/wp-content/uploads/2021/06/goodnight-kiss-15.gif',
            'https://c.tenor.com/eMZ4ndCAVAMAAAAC/amor-cari%C3%B1o.gif',
            'http://cd1.eju.tv/wp-content/uploads/2017/12/5a255355a1c67.gif',
            'https://c.tenor.com/RIZLskpgbskAAAAC/beso-en-la-mejilla-eslabon-armado.gif',
            'https://64.media.tumblr.com/tumblr_lkqq2lOiaz1qf4z8y.gif',
            'https://img.allw.mn/content/wt/o4/xhzvsd2c561e5e2feaa37888832054_392x219.gif',
            'https://c.tenor.com/tjI8PIzoXREAAAAC/saludar-de-beso-luis-miguel.gif',
            'http://pa1.narvii.com/6497/816bcc1da9fef3a16a43dd504829bb3def3f8101_00.gif',
            'https://i0.wp.com/parapupas.com/wp-content/uploads/2016/09/gifs-animados-up-0104182.gif?fit=400%2C221&ssl=1',
            'https://dramallama.es/wp-content/uploads/2020/06/beso-mejilla.gif',
            'https://elnoti.com/wp-content/uploads/2017/09/Despedida-Despedir-Adios-Beso-Besar-Mejilla-Sorprender-Amor-ENCANTA.gif',
            'https://i.gifer.com/1UBO.gif',
            'https://1.bp.blogspot.com/-_uu8wE5cpt0/Vs7v1jDM7sI/AAAAAAABVLU/UqBT55PR78Q/s1600/tumblr_o32snchFqJ1rv6sroo2_400.gif?w=480',
            'https://i.pinimg.com/originals/7a/62/2a/7a622ac102f4f2ac0704f57da7efb058.gif',
            'https://c.tenor.com/q9JiQwTDPrwAAAAd/va-rna.gif',
            'https://c.tenor.com/RI0shAtOSdIAAAAC/diov%C3%A8-the-doug%C3%A8s.gif',
            'https://1.bp.blogspot.com/-qoye8mFxxgI/Vw56oCKYJHI/AAAAAAAADQw/OqJmnRyLc4oM4BNvvcB9iqtzGumU4x1vgCLcB/s1600/Alien%2Bsimpsons%2Bgif%2Bbeso%2Bparodia.gif',
            'https://i.pinimg.com/originals/af/ce/80/afce8055b69eb1f8ebc3a72430d6a41e.gif',
            'https://www.elfarandi.com/wp-content/uploads/2015/10/Besogif-8.gif',
            'https://c.tenor.com/pd4-jAdnxl0AAAAC/renhyuck-renjun.gif',
            'https://i.pinimg.com/originals/79/2f/6a/792f6ae854ecc5be57910e723624000d.gif',
            'https://i.pinimg.com/originals/30/90/0d/30900d16631466460352f1ada8c3cb52.gif',
            'https://c.tenor.com/D0EOszfDcBoAAAAC/bnk48-noeybnk48.gif',
            'https://pa1.narvii.com/6432/b0a6f8332a194a96a55ac266461558db59bc4fe1_hq.gif',
            'https://i.pinimg.com/originals/df/61/5c/df615ca1cb9b6353cacefbd807eda387.gif',
            'https://c.tenor.com/ufoyqLswgFcAAAAC/bianca-fred.gif',
            'https://c.tenor.com/rj3ZVJYOp8kAAAAC/anahi.gif',
            'https://c.tenor.com/6LUFdoQFV8UAAAAd/nessa-barrett-jaden-hossler.gif',
            'https://i.pinimg.com/originals/53/44/97/534497a1780cd816d68e41297477b993.gif',
            'https://i.pinimg.com/originals/0b/0f/70/0b0f7089a54843bda5703811f2a0c597.gif',
            
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkc = kc[Math.floor(Math.random()*kc.length)]

        while (!ramdonkc || ramdonkc === null || ramdonkc === '' || ramdonkc === undefined) {
            
            ramdonkc = kc[Math.floor(Math.random()*kc.length)]

        }
        
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
        .setDescription(`**${message.author.username}** le da un beso en la mejilla a **${img.user.username}** <:burbujita:930399322183458867>`)
        .setImage(ramdonkc)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}