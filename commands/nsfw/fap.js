const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'fap',
    aliases: ['falopa','pajear','masturbar'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var fap = [

            'https://dl.phncdn.com/pics/gifs/001/938/451/(m=ldpwiqacxtE_Ai)(mh=xs2zhdSaG-S9sDTe)1938451b.gif',
            'https://el.phncdn.com/gif/11137721.gif',
            'https://images-ext-2.discordapp.net/external/R7rbwUFdyg6tOKPQvJ-jZGEyJwFOHYMEyoIt4jXrg74/https/cuantoporno.com/wp-content/uploads/2020/09/Gifs-XXX-Masturbaciones-vaginales.gif?width=450&height=215',
            'https://dl.phncdn.com/pics/gifs/024/425/171/(m=ldpwiqacxtE_Ai)(mh=wZ-2aRTOVNN1CRR4)24425171b.gif',
            'https://images-ext-2.discordapp.net/external/y3oKqC4Kg-CosZ8wqcroEQJVrhQHvC-_SZw2jef60tQ/https/images2.imgbox.com/a2/6d/pW6tF0Zs_o.gif?width=450&height=254',
            'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/7/1/D/g/71Dgc/Orgasm%2010.gif',
            'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/7/1/D/g/71Dgf/Orgasm%2021.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/8/Y/c/b/8YcbT/Anal-masturbation-%28gifs%29-014.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/8/Y/c/b/8YcbT/Anal-masturbation-%28gifs%29-014.gif',
            'https://images-ext-1.discordapp.net/external/4XJnw3o1-oiIdWKeSpvq7w36x5jxbzpK4_wf5npVYzI/https/vayagifporno.com/wp-content/uploads/2018/05/1-31-15.gif?width=375&height=210',
            'https://images2.imgbox.com/a7/57/MBWYAeuB_o.gif',
            'https://thumb-p3.xhcdn.com/a/l4Wzuj8NlX-HDeoS934i2g/000/427/135/093_1000.gif',
            'https://thumb-p8.xhcdn.com/a/5N2VNc0Brq_IkXtyVz_qTw/000/458/605/788_1000.gif',
            'https://pics.realelders.com/gifs/masturbation/masturbation-35686.gif',
            'http://64.media.tumblr.com/162111cf505feea296f17030b1099bb3/tumblr_nk36ayKoKv1s8maa0o1_500.gif',
            'https://images-ext-1.discordapp.net/external/z2vgdD0gTG9gE6IZzUi2eFzWi8RMmOPL_Xn7dDubsZE/https/kama-proekt.ru/javgrown/wp-content/uploads/2013/10/198.gif?width=375&height=152',
            'https://images-ext-2.discordapp.net/external/ywIRldkQ6RSt_2llk80MJDGAmZb7kx656NV3aHxt-cQ/https/vayagifporno.com/wp-content/uploads/2014/10/14.gif?width=287&height=208',
            'https://kama-proekt.ru/javgrown/wp-content/uploads/2014/02/198.gif',
            'https://images-ext-2.discordapp.net/external/XkAfdVMViKIFFSIz4mv0gaaFcQAA84U7CmzE-eErBMA/https/vayagifporno.com/wp-content/uploads/2014/02/1101.gif?width=375&height=225',
            'http://blowjobgif.net/albums/2019/02/18/21/1/sasha-grey-bdsm.gif'

        ]

        var fap2 = [

            'https://images-ext-1.discordapp.net/external/suWc4iFapfwfv5riLXnowJ_KToPzGDYH9fSB6h0Z13s/https/cl.phncdn.com/pics/gifs/012/814/971/%28m%3DldpwiqacxtE_Ai%29%28mh%3DNqyzGTqVGrsRp9BR%2912814971b.gif?width=323&height=182',
            'https://dl.phncdn.com/gif/11109201.gif',
            'https://www.gifs-porno.com/wp-content/uploads/2017/11/Masturbaci%C3%B3n-mut%C3%BAa.gif',
            'https://images-ext-1.discordapp.net/external/5KxzyZEsgseDnX8xYFfwBI2yjitUsI8wyBUPylAptyo/https/vayagifporno.com/wp-content/uploads/2017/12/1-31.gif?width=256&height=188',
            'https://www.gifs-porno.com/wp-content/uploads/2019/07/Masturbando-la-polla-de-su-novio.gif',
            'https://images-ext-2.discordapp.net/external/h5mFNs3LJ3fdW-uzg0I5m__vMdQwUnvMVEhz05QYu_c/https/www.webporno.xxx/wp-content/uploads/2019/12/chica-masturbando-en-el-coche.gif?width=375&height=211',
            'https://vayagifporno.com/wp-content/uploads/2014/03/1214.gif',
            'https://static-ca-cdn.eporner.com/gallery/tv/ty/8CxRvKQtytv/839155-hands-on-the-prize.gif',
            'https://ist6-2.filesor.com/pimpandhost.com/2/1/3/6/213632/9/0/5/n/905nF/f25704ba-cdfe-4bed-bbea-b0d07fa266e1.gif',
            'https://images-ext-1.discordapp.net/external/QrJvHcJ8LlrBWjhqTvuBPVJcwHmBWpoEMB-3NQrio3s/https/www.gatitasperversas.com/wp-content/uploads/2016/12/gifdepajas346-gatitasperversas.gif?width=540&height=282'

        ]
  
        if(!message.channel.nsfw){
          
            return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                .setColor('RED')
                .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>`)
  
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        } else {

            try {
                
                let userData = await userSchema.findOne({idusuario: message.author.id})

                if(!userData){

                    let user = await userSchema.create({

                        idusuario: message.author.id,
                        username: message.author.username,

                    })
    
                    user.save();
                    console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

                }

                if (userData.vip === false) return message.reply({ embeds: [
                            
                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Comando VIP!`)
        
                ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    

            } catch (error) {

                console.log('Error al Buscar Usuario en Comando Fap: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonfap
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `**${message.author.username}** se está dando autoamor <a:sabroso:880695816497541180>`
                ramdonfap = fap[Math.floor(Math.random()*fap.length)]

                while (!ramdonfap || ramdonfap === null || ramdonfap === '' || ramdonfap === undefined) {
                    
                    ramdonfap = fap[Math.floor(Math.random()*fap.length)]

                }

            } else {
      
                desc = `**${message.author.username}** le está dando amor a **${img.user.username}** <a:sabroso:880695816497541180>.`
                ramdonfap = fap2[Math.floor(Math.random()*fap2.length)]

                while (!ramdonfap || ramdonfap === null || ramdonfap === '' || ramdonfap === undefined) {
                    
                    ramdonfap = fap2[Math.floor(Math.random()*fap2.length)]

                }

            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonfap ? ramdonfap : null)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}