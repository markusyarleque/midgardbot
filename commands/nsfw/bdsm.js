const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'bdsm',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var bdsm = [

            'https://cdn.sex.com/images/pinporn/2017/08/13/18197466.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/10/15/8559077.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/04/15/20991911.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2018/04/11/19353643.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/02/19/22645379.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/07/11/25536615.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/05/10/5948076.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/05/10/5948076.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/01/31/4880115.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2018/12/31/20450407.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/12/13/26386346.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/01/07/17176697.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/08/17/18220225.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/09/18/16565829.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/03/26/22779655.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/05/11/17752863.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/01/21/4773390.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/08/29/13644584.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/03/10/20807626.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/01/17/22507198.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/12/12/14525750.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/09/02/13681542.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/08/07/21599584.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/12/30/18869133.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/10/09/21956397.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/12/14/17052790.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/08/15/21644390.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2013/08/19/3465358.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/07/22/7098450.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/05/08/11819203.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/05/08/11819203.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/03/01/20763525.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/01/08/20497086.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/03/15/22732208.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/04/18/15497384.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/04/16/11463908.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/04/15/24979894.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/03/22/22759153.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/12/19/18816950.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/06/04/17863067.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/04/13/20984653.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/08/28/25783129.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/06/13/21316219.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/01/21/4771147.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/06/01/12181208.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/02/05/14926879.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/03/18/24796628.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/02/07/14945265.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/07/15/25558318.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2021/07/15/25558318.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/12/22/9665277.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/02/06/4926681.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2015/10/02/13931618.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2020/03/07/22699370.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2016/05/30/15815711.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2018/10/17/20099317.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2013/11/23/4179876.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2014/04/22/5713384.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/01/16/20540116.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2018/10/14/20087463.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2018/10/14/20087463.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/12/25/18843948.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2013/12/21/4437632.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2019/01/05/20476333.gif?width=300',
            'https://cdn.sex.com/images/pinporn/2017/08/28/18271949.gif?width=300',
            
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

                console.log('Error al Buscar Usuario en Comando BDSM: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonbdsm = bdsm[Math.floor(Math.random()*bdsm.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta rudo y salvage <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** está dominando a **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonbdsm ? ramdonbdsm : null)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}