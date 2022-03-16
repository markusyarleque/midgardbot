const { Collection } = require('mongoose');
const kissSchema = require('../../models/kissSchema');

module.exports =  {
    
    name: 'kiss',
    aliases: ['besar','beso'],
    description: '😘 Da un beso a un miembro del servidor.',
  
    async execute(client, message, args, Discord) { 

        var kiss = [
            
            'https://media.discordapp.net/attachments/853500788848853002/873303560559951882/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303577492357150/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303601970315334/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303610883190784/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303633855389736/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303652230639646/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303670568124436/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303680571547648/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873303687462797372/10.gif',
            'https://i.pinimg.com/originals/15/a8/43/15a843df655233fd7829efc70932be17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/877364191877533696/11.gif?width=202&height=202',
            'https://media.discordapp.net/attachments/853500788848853002/877364200962408469/12.gif?width=448&height=331',
            'https://media.discordapp.net/attachments/853500788848853002/877364212379299861/13.gif?width=450&height=351',
            'https://media.discordapp.net/attachments/853500788848853002/877364221409644574/14.gif?width=319&height=180',
            'https://media.discordapp.net/attachments/853500788848853002/877364235447984148/15.gif?width=450&height=190',
            'https://media.discordapp.net/attachments/853500788848853002/877364246252494868/16.gif?width=308&height=227',
            'https://media.discordapp.net/attachments/853500788848853002/877364263432372284/17.gif?width=450&height=248',
            'https://media.discordapp.net/attachments/853500788848853002/877364280117325854/18.gif?width=432&height=243',
            'https://media.discordapp.net/attachments/853500788848853002/877364288724017162/19.gif?width=313&height=176',
            'https://media.discordapp.net/attachments/853500788848853002/877364300702949386/20.gif?width=450&height=315'
        
        ]

        let conteo
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkiss = kiss[Math.floor(Math.random()*kiss.length)]

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

        let consulta1 = await kissSchema.findOne({u1: message.author.id, u2: img.id})
        
        if(!consulta1){

            let consulta2 = await kissSchema.findOne({u1: img.id, u2: message.author.id})

            if(!consulta2){

                let tkiss = await kissSchema.create({

                    u1: message.author.id,
                    u2: img.id,
                    c: 1

                })

                tkiss.save()
          
                conteo = 1

            } else {

                let update = await  kissSchema.findOneAndUpdate({u1: img.id},
                    {

                        c: consulta2.c + 1

                    })

                update.save()
          
                conteo = consulta2.c + 1

            }

        } else {

            try {

                let update = await kissSchema.findOneAndUpdate({u1: message.author.id},
                    {
    
                        c: consulta1.c + 1
    
                    })
            
                update.save()
              
            } catch (error) {
                
                console.log('No se actualizó la tabla kiss por el error: '+error)

            }
 
            conteo = consulta1.c + 1

        }

        if(conteo === 1){
          
            conteo ='**'+conteo+'** vez.'
        
        } else {
          
            conteo ='**'+conteo+'** veces.'
        
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${message.author.username}** le dió un beso a **${img.user.username}**. <:GatoLove:925929538863628318>\n<a:flechad:880330587678838784> *${message.author.username}* y *${img.user.username}* se han besado ${conteo}`)
        .setImage(ramdonkiss)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}