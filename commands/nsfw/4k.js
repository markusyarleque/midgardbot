const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: '4k',
    aliases: ['en4','fourk','four','perrito'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var fourk = [

            'https://i.imgur.com/1KKmkfO.gif',
            'https://i.imgur.com/ixBY7LE.gif',
            'https://i.imgur.com/gH7igvm.gif',
            'https://i.imgur.com/DbAaoCo.gif',
            'https://i.imgur.com/eKXD5vy.gif',
            'https://i.imgur.com/kSWLFST.gif',
            'https://i.imgur.com/ezbFqQX.gif',
            'https://i.imgur.com/jqewopp.gif',
            'https://i.imgur.com/nS9O993.gif',
            'https://i.imgur.com/RyKhn7c.gif',
            'https://i.imgur.com/JlG7g5P.gif',
            'https://i.imgur.com/afhySFz.gif',
            'https://i.imgur.com/tVHlRsU.gif',
            'https://i.imgur.com/lm0IMUP.gif',
            'https://i.imgur.com/VNKBV6P.gif',
            'https://i.imgur.com/bg0M79D.gif',
            'https://i.imgur.com/OxNna7c.gif',
            'https://i.imgur.com/zO185F1.gif',
            'https://i.imgur.com/dk517vB.gif',
            'https://i.imgur.com/4efyfSn.gif',
            'https://i.imgur.com/Bm7ZQTt.gif',
            'https://i.imgur.com/6qatn7a.gif',
            'https://i.imgur.com/cWuwlcg.gif',
          
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