const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'gonewild',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
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

                console.log('Error al Buscar Usuario en Comando Gonewild: '+ error)
                
            }

            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let desc 
            const image = await nsfw3.gonewild()
    
            while (!image || image === null || image === '' || image === undefined) {
                
                image = await nsfw3.gonewild()
                
            }

            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `**${message.author.username}**, disfrútalo!`
          
            } else {
      
                desc = `**${message.author.username}** y **${img.user.username}** disfrútenlo!`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(image)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}