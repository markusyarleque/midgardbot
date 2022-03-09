module.exports =  {
    
    name: 'colegiala',
    aliases: [],
    description: '🤤',
  
    async execute(client, message, args, Discord) {

        var colegiala = [

            'https://media.discordapp.net/attachments/853500788848853002/873279087056142416/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279098938605568/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279109239808092/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279127359213588/4.gif?width=320&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873279134736994384/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279155377143908/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279168094298162/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279181365051392/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279204341469234/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279231214366790/10.gif?width=381&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873279245722472468/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873279257994989618/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/874073561894125568/13.gif?width=318&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/874073566121959424/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/874073579078160444/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/874073589052219412/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/874073599777062932/17.gif?width=293&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/874073609969221702/18.gif?width=449&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/874073616545906758/19.gif?width=449&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/874073630051557446/20.gif',
            'https://pornocolegialas.org/wp-content/uploads/2017/03/Gifs-de-Colegialas-encueradas-jovencitas-ardientes-12.gif',
            'https://c.tenor.com/7kVk6UGlzQgAAAAC/twerk-twerking.gif',
            'https://c.tenor.com/URGzSpjvC8EAAAAd/twerk-twerking.gif',
            'http://www.gifspx.com/gifs-animados-x/gspx_gfis-de-rubia-con-coletas-y-grandes-tetas-quiere-comertela.gif',
            'https://c.tenor.com/GQyuoR5g9PoAAAAd/twerk-twerking.gif',
            'https://nenastetonas.com/wp-content/uploads/2016/07/tumblr_o5c1n2mSdS1tobld4o2_400.gif',
            'https://c.tenor.com/pbkNo-XY6rEAAAAM/sofia-gomez.gif',
            'https://c.tenor.com/FL3tKO2fKNAAAAAd/tiktok-pigtails.gif',
            'https://c.tenor.com/cPX0dpKPyb8AAAAM/tiktok.gif',
            'https://c.tenor.com/KXhx7sQ5GLAAAAAM/tiktok.gif',
            'https://culosonline.com/wp-content/uploads/2021/07/Naughty-4-019.gif',
            'https://i.imgbox.com/wp6weOKl.gif',
            'https://pornocolegialas.org/wp-content/uploads/2017/03/Gifs-de-Colegialas-encueradas-jovencitas-ardientes-2.gif',
            'https://cdn.sex.com/images/pinporn/2018/04/01/19313693.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2021/10/07/26023884.gif?width=620',
            'https://j.gifs.com/KkwRo2.gif',
            'https://culosonline.com/wp-content/uploads/2021/07/Naughty-4-019.gif',
            'https://vayagifporno.com/wp-content/uploads/2021/05/Gifs-calientes-Remy-LaCroix.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncolegiala = colegiala[Math.floor(Math.random()*colegiala.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** pidió una colegiala y no la quiere compartir. <:gaaa:925926944254611487>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot){
          
            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Rico, pero <:nogarsias:932172183453712415>`)
          
            ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Opa! **${img.user.username}**, mira esta colegiala que ${message.author.username} te trajo. <:uyy:880315359197024286>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
           
            message.channel.send({ embeds: [embed] })
      
        }

    }

}