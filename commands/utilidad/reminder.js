const prefix = process.env.PREFIX;

module.exports =  {
    
  name: 'reminder',
  aliases: ['rm','remindme'],
  description: '⏰ Establece un recordatorio.',

  async execute(client, message, args, Discord) {

    let obtener = args[0]
    let mensaje = args.slice(1).join(' ')
    
    if (!obtener) {
          
      return message.reply({ allowedMentions: { repliedUser: false}, embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | Debes agregar un tiempo: `'+prefix+'remindme <tiempo en s,m,h> <recordatorio>`')

      ]})
    
    } else if(!mensaje) {
    
      return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | Debes decirme qué debo recordar: `'+prefix+'remindme <tiempo en s,m,h> <recordatorio>`')

      ]})
          
    } else {
    
      function reminder() {
    
        message.reply({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RANDOM')
          .setDescription('<a:exclama2:880930071731392512> | Tengo este recordatorio para ti: \n\n> ' + mensaje)
    
        ]})

      }
    
      switch (obtener.slice(-1)){
    
        case 's': {
    
          if (obtener.slice(0, -1) > 60) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | El tiempo no puede ser mayor de 60 segundos. Utiliza (m, s, h)!')

          ]})
    
          var msDelay = obtener.slice(0, -1)*1000
              
          message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setDescription('<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' segundos:\n\n<a:flech:931432469935312937> '+mensaje)

          ]})

          setTimeout(reminder, msDelay);
              
          break

        }
    
        case 'm': {
    
          if (obtener.slice(0, -1) > 60) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | El tiempo no puede ser mayor de 60 minutos. Utiliza (m, s, h)!')
          
          ]})

          var msDelay = obtener.slice(0, -1)*60000
              
          message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setDescription('<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' minutos:\n\n<a:flech:931432469935312937> '+mensaje)
            
          ]})

          setTimeout(reminder, msDelay);
              
          break

        }
    
        case 'h': {
    
          if (obtener.slice(0, -1) > 24) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | El tiempo no puede ser mayor de 24 horas. Utiliza (m, s, h)!')
          
          ]})
            
          var msDelay = obtener.slice(0, -1)*3600000
              
          message.reply({ allowedMentions: { repliedUser: false}, embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setDescription('<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' horas:\n\n<a:flech:931432469935312937> '+mensaje)
          
          ]})
            
          setTimeout(reminder, msDelay);
              
          break

        }
    
        default: {
    
          message.reply({ allowedMentions: { repliedUser: false}, embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Lo estás haciendo mal, es:\n\n> <1 - 60>s <recordatorio>\n> <1 - 60>m <recordatorio>\n> <1 -  24>h <recordatorio>\n\n ____Ejemplo:____\n```'+prefix+'rm 1m Recordar ir a sacar a mi perro```')
          
          ]})
              
          break;
            
        }

      }
    
    }

  }

}