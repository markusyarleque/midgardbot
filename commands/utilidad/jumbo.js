const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'jumbo',
    aliases: ['jb','emoji'],
    description: '👀 Ver en grande un emoji.',
  
    async execute(client, message, args, Discord) {

        if(!args[0]) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\nDebe ser: _jumbo <emoji> \n*Si quieres añadirlo al servidor añade --s al final*`)
    
        ]}) 
            
        const emoticon = require('discord.js').Util.parseEmoji(args[0]) // Usaremos el metodo que nos da discord.js para obtener info del emoji
              
        if(emoticon.id === null) return message.reply({embeds: [
              
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Emoji inválido!!!`)
    
        ]})
            
        let palta = `https://cdn.discordapp.com/emojis/` + `${emoticon.id}.` + (emoticon.animated ? 'gif' : 'png') // Conseguimos el url 
              
        if(message.content.endsWith('--s')) { // Si termina con --s
            
            if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply({embeds: [
                
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor('RED')
              .setDescription(`<a:Verify2:931463492677017650> | No tienes permisos para agregar emojis!!!`)
    
            ]})
            
            if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply({embeds: [
                
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor('RED')
              .setDescription(`<a:Verify2:931463492677017650> | No tengo los permisos para agregar emojis!!!`)
    
            ]})
            const emojis = message.guild.emojis.cache.size;
    
            if(emojis === 500) return message.reply({embeds: [
                
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor('RED')
              .setDescription(`<a:Verify2:931463492677017650> | No hay espacio suficiente para agregar el emoji!!!`)
    
            ]})
    
            try {
    
              message.guild.emojis.create(palta, emoticon.name) // Creamos un emoji con la imagen del emoji 
              
              return message.channel.send({embeds: [
              
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setDescription(`<a:Verify1:931463354357276742> |Emoji agregado correctamente : **`+ emoticon.name+'**')
                .setTimestamp()
              ]}) 

            } catch (error) {
                
              return message.reply({embeds: [
                
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error al agregar emoji!\n\n**Error:**\n> `+error)
      
              ]})
    
            }
              
        } 
              
        message.channel.send(palta)
        
    }

}