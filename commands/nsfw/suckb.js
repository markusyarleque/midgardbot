const userSchema = require('../../models/userSchema');
const serverSchema = require('../../models/serverSchema')

module.exports =  {
    
    name: 'suckb',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var suckb = [

            'https://i.imgur.com/wf0c3TJ.gif',
            'https://i.imgur.com/xTH83wl.gif',
            'https://i.imgur.com/sfcdFuz.gif',
            'https://i.imgur.com/02oMYYb.gif',
            'https://i.imgur.com/1v6GEnR.gif',
            'https://i.imgur.com/sejW6zh.gif',
            'https://i.imgur.com/I3rbluM.gif',
            'https://i.imgur.com/Y30uTWG.gif',
            'https://i.imgur.com/MzgNHQi.gif',
            'https://i.imgur.com/LM9860A.gif',
            'https://i.imgur.com/oaRtDN7.gif',
            'https://i.imgur.com/FMk68gv.gif',
            'https://i.imgur.com/UGLdAvx.gif',
            'https://i.imgur.com/wCOsZGa.gif',
            'https://i.imgur.com/pyim38S.gif',
            'https://i.imgur.com/6CLqyvq.gif',
            'https://i.imgur.com/6Amh470.gif',
            'https://i.imgur.com/8p29umR.gif',
            'https://i.imgur.com/8B1E1Mv.gif',
            'https://i.imgur.com/638p8u6.gif',
          
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

                while(!userData){

                    let user = await userSchema.create({

                        idusuario: message.author.id,
                        username: message.author.username,

                    })
    
                    user.save();
                    console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

                    userData = await userSchema.findOne({idusuario: message.author.id})
                    
                }

                if (userData.vip === false){
                    
                    let serverData = await serverSchema.findOne({idserver: message.guild.id})

                    if(!serverData || serverData.premium === false){

                        return message.reply({ embeds: [
                    
                            new Discord.MessageEmbed()
                            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setColor('RED')
                            .setDescription(`<a:Verify2:931463492677017650> | Comando requiere Usuario VIP o Servidor Premium!`)
            
                        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

                    }
                
                }

            } catch (error) {

                console.log('Error al Buscar Usuario en Comando Suck Balls: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonsuckb = suckb[Math.floor(Math.random()*suckb.length)]
            let desc

            while (!ramdonsuckb || ramdonsuckb === null || ramdonsuckb === '' || ramdonsuckb === undefined) {
                
                ramdonsuckb = suckb[Math.floor(Math.random()*suckb.length)]
                
            }
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta chupar bolas <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** se está comiendo las pelotas de **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) }).setDescription(desc)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}