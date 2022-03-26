const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'cowgirl',
    aliases: ['vaquera','vaquerita'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var cowgirl = [

            'https://sexwall.me/media/2013/09/3579320-incredible-animated-photo.gif',
            'https://xch.green/xxx/cowgirl-style-sex-erotic-porn-gif.gif',
            'https://sexwall.me/media/2013/11/3623585-hot-reverse-cowgirl.gif',
            'http://nsfw-gif.net/wp-content/uploads/2018/07/KaterinaHartlova-fucking-bigitits-ridingcock-cowgirl.gif',
            'https://www.gifmeat.com/wp-content/uploads/2018/05/Big-ass-Devyn-Divine-reverse-cowgirl-dick-riding.gif',
            'https://cdn.sex.com/images/pinporn/2016/04/23/15535127.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/02/23/15068617.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/05/26/15785136.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/09/18/18378935.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/02/19/15032079.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/06/10/15895898.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/04/19/15508538.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2018/03/05/19200117.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/01/29/17288896.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/01/21/17252459.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2015/08/31/13655922.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/12/29/17131651.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/12/05/17005945.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/04/22/17664056.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/11/24/16952270.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/02/19/17381394.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/05/29/15807830.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/10/10/16701224.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/06/20/15966593.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2015/09/03/13686199.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/01/29/17288911.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/05/22/17804079.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/02/21/17390263.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/03/06/15162487.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2019/06/06/21273828.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/10/05/16670468.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/06/26/16004648.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2018/04/17/19379569.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2017/09/27/18421256.gif?width=620',
            'https://cdn.sex.com/images/pinporn/2016/07/12/16125061.gif?width=620',
            'https://gifs.iloopit.net/resources/448b62dc-2b32-4e1b-8ea9-9fda454bd218/converted.gif',
            'http://xxxpicss.com/xxx/xxx-pov-cowboy-cowgirl-pornogifs-porno-gifs-gif.gif',
            'https://thumb-p8.xhcdn.com/a/vf5y3vnG4y-X96H8SknrUA/000/108/129/398_1000.gif',
            'https://gifs.iloopit.net/resources/42babb89-b176-469b-8e05-2b09d8c14077/converted.gif',
            'https://media.discordapp.net/attachments/880312288593195028/957275083230040084/WellgroomedAnimatedLeafbird.gif?width=253&height=499',
            'https://cdn.sex.com/images/pinporn/2018/05/17/19492283.gif?width=620',

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

                console.log('Error al Buscar Usuario en Comando Cowgirl: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdoncowgirl = cowgirl[Math.floor(Math.random()*cowgirl.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta ir arriba <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** está montando a **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdoncowgirl ? ramdoncowgirl : null)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}