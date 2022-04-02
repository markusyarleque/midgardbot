module.exports =  {
    
    name: 'spank',
    aliases: ['nalgada'],
    description: '🍑 Nalguea a alguien.',
  
    async execute(client, message, args, Discord) { 
 
        var spank = [

            'https://c.tenor.com/UJ3TRgPV3kkAAAAd/andre-the-giant-spank.gif',
            'https://c.tenor.com/jSuhWUc7eVsAAAAd/facepalm-pie.gif',
            'https://c.tenor.com/e71JhIwYb80AAAAC/cat-spank.gif',
            'https://c.tenor.com/IdBOZk00P5IAAAAC/50shades-of-grey-spank.gif',
            'https://i.gifer.com/8tqE.gif',
            'https://c.tenor.com/79Os_CGAYqgAAAAd/couples-samblum.gif',
            'https://c.tenor.com/tV5LhDTgrOgAAAAC/you-need-to-calm-down-spank.gif',
            'https://i.gifer.com/ANiQ.gif',
            'https://c.tenor.com/q_feBMj1ZG8AAAAC/spanking-spank.gif',
            'https://c.tenor.com/1nzV5Fn-2o8AAAAd/bank-spank.gif',
            'https://i.gifer.com/N1b8.gif',
            'https://i.pinimg.com/originals/7b/ed/74/7bed74638b095905867edf5346367b58.gif',
            'https://c.tenor.com/bM9jySWaEloAAAAd/captain-content-ass-spank.gif',
            'https://pornocolegialas.org/wp-content/uploads/2017/03/Gifs-de-Colegialas-encueradas-jovencitas-ardientes-2.gif?width=375&height=300',
            'https://i.makeagif.com/media/5-25-2017/Lvmn7Q.gif',
            'https://i.makeagif.com/media/6-11-2015/kWKQ5w.gif',
            'https://s-media-cache-ak0.pinimg.com/originals/ec/de/2d/ecde2d6acaa027d1b7812a92ac0d1e6c.gif',
            'https://31.media.tumblr.com/bd21568b5e5ddaa6c7e11b7982effacc/tumblr_mkovmhGBox1rjpsi2o1_250.gif',
            'https://pa1.narvii.com/6828/ee5490e48c367f4c9fa71f8e1bc6b3fd3efa0e05_hq.gif',
            'https://c.tenor.com/sX2r3mk1g3cAAAAC/spank.gif',
            'https://64.media.tumblr.com/1577f0bdf41dce67a539ce6b6bbaadb1/982de5de294ef415-97/s500x750/a2f9b4b3c55382b4479bd072342d6db0d68d0802.gif',
            'https://static.wikia.nocookie.net/villains/images/4/48/NwVJoC.gif/revision/latest/scale-to-width-down/250?cb=20180428114358',
            'https://static-ca-cdn.eporner.com/gallery/Na/4E/YnLF0xX4ENa/842540-striped.gif',
            'https://tvmedia.ign.com/tv/image/article/112/1123252/the-office-20100924005913387.gif',
            'https://c.tenor.com/MEgZWaoJdCcAAAAC/miley-cyrus-spanking.gif',
            'https://gifimage.net/wp-content/uploads/2018/11/spanking-cartoon-gif-4.gif',
            'https://i.giphy.com/media/cZ6ER8nKFJw3u08PKx/giphy.gif',
            'https://i.gifer.com/embedded/download/43mM.gif',
            'https://i.gifer.com/QOlY.gif',
            'https://i.makeagif.com/media/4-29-2015/OSigor.gif',
            'https://c.tenor.com/t7k2qjDTCrAAAAAC/keira-knightley-michael-fassbender.gif',
            'https://c.tenor.com/OdXLB1Y6TWQAAAAC/palmada-nalgada.gif',
            'https://img.wattpad.com/0bbaecdab71037c47c4c4a67036d4abd00859c22/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f66675f5f556361686a4a63796b513d3d2d3836353430393535342e313630353465353837383530303335303738343536343733313231392e676966',
            'https://media4.giphy.com/media/SqAvUK0RZ6wF6jeDzY/200w.gif?cid=82a1493bu8gmaye4ufwqecupqy8ot26hd88rpod3ygfvo9y4&rid=200w.gif&ct=g',
            'https://img.wattpad.com/43ca8551110b803d37b2e48fcd54242d21e7e834/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f67662d3648646b6f6c4439614c413d3d2d3533333233373031382e313531316337316438333030363031663633343230333539353831322e676966',
            'https://i.makeagif.com/media/12-30-2016/sUMRkf.gif',
            'https://c.tenor.com/u_HYEO-XQPcAAAAM/monolo-nalgada.gif',
            'https://forums-images.oneplus.net/data/webimg/2021/01-28/6012ad9867274.gif',
            'https://orbitapoliticamexico.files.wordpress.com/2016/07/nalgadas-la-secretaria.gif',
            'https://i.makeagif.com/media/11-08-2017/JN6JJm.gif',
            'https://cdn.sex.com/images/pinporn/2017/09/19/18381942.gif?width=300',
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonspank = spank[Math.floor(Math.random()*spank.length)]
    
        if (!img || img.id === message.author.id) {
    
            return message.reply({embeds: [
            
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿Te quieres autonalguear? <:procesando:932177969017925632>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false }, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Rica nalgada pero <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {

            while (!ramdonspank || ramdonspank === null || ramdonspank === '' || ramdonspank === undefined) {
                
                ramdonspank = spank[Math.floor(Math.random()*spank.length)]
                
            }
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** le da una rica nalgada a **${img.user.username}** <a:Nalgada:880315282101526598>.`)
            .setImage(ramdonspank ? ramdonspank : null)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}