const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();
const { Permissions } = require('discord.js');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'autonsfw',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        if(message.guild.id !== '777620055344545842') return

        let id = ['753435606410985573','683501310527668228','743960732542042203']

        let autosend

        if(!id.some(id => message.author.id == id)) {
      
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo los Gerentes pueden usar este comando.')
            .setColor('RED')
            
            return message.reply({ embeds: [embed] })
            .then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        }
        
        if(!args[0]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\n\n▫ Para activar: ${prefix}autonsfw <on> <intervalo en m> <#canal/id>\n▫ Para desactivar: ${prefix}autonsfw <off>`)
    
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e)) 

        if(args[0].toLowerCase() === 'on'){

            if(!args[1]) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\n\n▫ Para activar: ${prefix}autonsfw <on> <intervalo en m> <#canal/id>\n▫ Para desactivar: ${prefix}autonsfw <off>`)
        
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e)) 
    
            if(isNaN(parseInt(args[1]))) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\n\n▫ Para activar: ${prefix}autonsfw <on> <intervalo en m> <#canal/id>\n▫ Para desactivar: ${prefix}autonsfw <off>`)
        
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e)) 

            let tiempo = parseInt(args[1])

            if(tiempo < 1 || tiempo > 60) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | El tiempo debe ser mínimo 1 y máximo 60 minutos.`)
        
            ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
        
            let canalnsfw = message.mentions.channels.first() || message.channel || client.channels.cache.get(args[2])
            
            if(!canalnsfw) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\n\n▫ Para activar: ${prefix}autonsfw <on> <intervalo en m> <#canal/id>\n▫ Para desactivar: ${prefix}autonsfw <off>`)
        
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e)) 
    
            if(!canalnsfw.nsfw){
          
                return message.reply({embeds: [
      
                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                    .setColor('RED')
                    .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, el canal elegido no es NSFW <:ojooo:925928526119571457>`)
      
                ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
            
            } else {
                
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [
                    
                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                    .setColor('GREEN')
                    .setDescription('AutoNSFW activado en un intervalo de **'+tiempo+' minutos** y en el canal de <#' + canalnsfw.id + '>.')
                    .setTimestamp()

                ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
                
                tiempo = tiempo * 60000

                try {

                    autosend = setInterval(async () => {

                        const image = await nsfw3.pgif();
                        
                        const embed = new Discord.MessageEmbed()
                        .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
                        .setDescription('AutoNSFW... Disfrútalo')
                        .setImage(image ? image : null)
                        .setColor('RANDOM')
                        .setTimestamp(new Date())
                        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
                
                        canalnsfw.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar autonsfw: '+e))
    
                    }, tiempo)

                } catch (error) {

                    console.log('Ocurrió un error al activar el autonsfw - ' + error)
                    
                }
                
            }

        } else if(args[0].toLowerCase() === 'off'){

            try {
            
                clearInterval(autosend)

            } catch (error) {
                
                console.log('Ocurrió un error al desactivar el autonsfw - ' + error)

            }

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [
                    
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('GREEN')
                .setDescription('AutoNSFW desactivado en el canal de <#' + canalnsfw.id + '>.')
                .setTimestamp()

            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
            
        } else{

            return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\nDebe ser: ${prefix}autonsfw <on/off> <intervalo en m> <#canal/id>`)
        
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e)) 

        }

    }

}