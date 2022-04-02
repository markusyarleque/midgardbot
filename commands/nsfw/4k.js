const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: '4k',
    aliases: ['en4','fourk','four','perrito'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var fourk = [

            'https://images-ext-1.discordapp.net/external/ueBz27grtPDSiyB7-mfhbc9_7FcMS9N7vAfipF9zwuQ/http/i.imgbox.com/adrPPK1t.gif?width=338&height=191',
            'https://images-ext-2.discordapp.net/external/6OOveE2nLGEgqUCezyWKTxEGp8k7S16bczONyGzomwM/https/vayagifporno.com/wp-content/uploads/2016/01/tumblr_o0hqqy2SBO1uy0amko6_500.gif?width=375&height=190',
            'https://www.gifs-porno.com/wp-content/uploads/2016/12/wp-1482964791251.gif',
            'https://ist6-3.filesor.com/pimpandhost.com/1/4/6/0/146081/9/R/Y/f/9RYfl/XXX-porn-%28gifs%29-00002.gif',
            'https://images-ext-1.discordapp.net/external/4Ldxm7TFDq0LxV9X_Q56r_oYSgcptRIBYjRr6YT63j4/http/vayagifporno.com/wp-content/uploads/2021/05/gif-Nekane-follando-en-brazzers.gif?width=405&height=221',
            'https://cl.phncdn.com/gif/5877921.gif',
            'https://i2.wp.com/pornopoke.com/wp-content/uploads/2017/08/gif-porno-de-sexo-caliente-4.gif?fit=439%2C237&ssl=1',
            'https://dl.phncdn.com/pics/gifs/033/113/482/(m=ldpwiqacxtE_Ai)(mh=UXDZ6vLqgLdUF517)33113482b.gif',
            'https://cl.phncdn.com/pics/gifs/032/183/991/(m=ldpwiqacxtE_Ai)(mh=SUhX5KPiEi7ntrMv)32183991b.gif',
            'https://www.gifs-porno.com/wp-content/uploads/2018/02/Inocente-en-cuatro.gif',
            'https://cdn.sex.com/images/pinporn/2017/08/17/18217015.gif?width=620',
            'https://images-ext-1.discordapp.net/external/dy_ECjSZKbODjZmqYEdEEsj7PBiDCvE2POQZNnmQNGs/https/vayagifporno.com/wp-content/uploads/2015/06/1145.gif?width=375&height=213',
            'https://cl.phncdn.com/pics/gifs/017/238/641/(m=ldpwiqacxtE_Ai)(mh=reLDubHqI0HbO5qx)17238641b.gif',
            'https://images-ext-1.discordapp.net/external/siYByJZ36yMXacr_LSrS_mKPjoZRqwIe6rL0X3BT67w/https/vayagifporno.com/wp-content/uploads/2020/12/Gifs-doggystyle-Sexo-estilo-perrito-por-detras-2.gif?width=450&height=272',
            'https://images-ext-2.discordapp.net/external/hWUci8Ra0yvlYokSCYlth5iaF4CvXQudStoCiI5boS4/https/vayagifporno.com/wp-content/uploads/2016/03/tumblr_n1z14qEluA1sqdytqo9_400-3.gif?width=372&height=277',
            'https://www.alrincon.com/imagenesblog/gif160114/22.gif',
            'https://el.phncdn.com/gif/12121281.gif',
            'https://vayagifporno.com/wp-content/uploads/2016/11/1-90.gif',
            'https://images-ext-1.discordapp.net/external/VU1MWMBN90BstS-lMOuPUvpD9HL40AO01AmEDxYG_IQ/https/vayagifporno.com/wp-content/uploads/2016/03/tumblr_n12g69Z7VR1tscvzso1_400-2.gif?width=333&height=500',
            'https://gif-porno.com/gifs/gif138.gif',
            'http://gif-porno.com/gifs/gif316.gif',
            'https://www.gifs-porno.com/wp-content/uploads/2018/05/590c69c4-3191-4243-bbbf-df27e3656097.gif',
            'https://cl.phncdn.com/pics/gifs/022/066/371/(m=ldpwiqacxtE_Ai)(mh=StuRmFNGIB315XTP)22066371b.gif',
            'https://images-ext-2.discordapp.net/external/V6mnMwui0gyDc3tntCBvgXLuoNuYIQJl-44VdQV0a4w/https/i.imgbox.com/acooDIIh?width=375&height=198',
            'https://images-ext-1.discordapp.net/external/dSiF1SCfE4LtM0Ew-iYMr17vrukXomT33JR5b39DJzU/https/vayagifporno.com/wp-content/uploads/2016/03/tumblr_n12g74Sid81tscvzso1_1280-2.gif?width=294&height=192',
            'https://el.phncdn.com/pics/gifs/018/607/721/(m=ldpwiqacxtE_Ai)(mh=XE7lA8YP92-tOAVF)18607721b.gif',
            'https://culosonline.com/wp-content/uploads/2021/11/Anales-al-estilo-del-perrito-gifs-48.gif',
            'https://images-ext-2.discordapp.net/external/xgTJnbn_7XSPq0n1wlGNWeV0HsXCwj1f034FTg0U9Do/https/i.imgbox.com/1Di95kty?width=300&height=167',
            'https://images-ext-1.discordapp.net/external/2tGtgDM4uMAIJgNTDoV_rGTTzFu0YTaP89DLzj9vZPM/https/dl.phncdn.com/pics/gifs/020/656/601/%28m%3DldpwiqacxtE_Ai%29%28mh%3DYS1lDU_wylGhZyjQ%2920656601b.gif?width=323&height=182',
            'https://www.alrincon.com/imagenesblog/gif210114/2.gif',
            'https://images-ext-2.discordapp.net/external/4sb4tlz3g0PQBPo1Jw9sejVQ0mpDPWKR3N96C7Siryg/https/ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/8/9/b/989bD/Doggystyle-Fucking-%2528gifs%2529---004.gif?width=450&height=279',
            'https://vayagifporno.com/wp-content/uploads/2018/05/1-38.gif',
            'https://www.frikiporno.com/wp-content/uploads/2014/08/follada-a-lo-perrito.gif'
          
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

                console.log('Error al Buscar Usuario en Comando 4k: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonfourk = fourk[Math.floor(Math.random()*fourk.length)]
            let desc 

            while (!ramdonfourk || ramdonfourk === null || ramdonfourk === '' || ramdonfourk === undefined) {
                
                ramdonfourk = fourk[Math.floor(Math.random()*fourk.length)]
                
            }
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta poner de perrito <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** le está dando en 4 a **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonfourk ? ramdonfourk : null)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}