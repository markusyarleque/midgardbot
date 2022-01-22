const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = { 

    name: 'suggestion',
    aliases: ['sugerencia','sugerir'],
    description: '🟡 Envía una sugerencia para mejorar el bot.',
  
    async execute(client, message, args, Discord) {
    
      const moment = require('moment');
      require('moment-duration-format');
  
      const embedercancel = new Discord.MessageEmbed()
      .setDescription('<a:Verify2:931463492677017650> | Sugerencia cancelada. <:aisaMexicana:925926704097161216>')
      .setColor('RANDOM')
  
      const embednoconf = new Discord.MessageEmbed()
      .setDescription('<a:Verify2:931463492677017650> | ¡No confirmaste a tiempo! <:enojado:931434000751394867>')
      .setColor('RANDOM')
  
      let reporte = args.join(' ');
      if(!reporte){

        const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | **Debes agregar una sugerencia para enviar al desarrollador!**`)
          
          return message.channel.send({embeds: [e]})
      }

      let sv = client.guilds.cache.get('777620055344545842')
      let channel = sv.channels.cache.get('874922451040083978')
  
      let usera = message.author;
  
      const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
        .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
        .setDescription(`**${usera.username}** ¿Estás segur@ que quieres dar esta sugerencia? ¡Usar mal el comando causará la prohibición!`)
        .addField('Sugerencia: ', reporte)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`Developer Team - Midgard Bot`, `${message.author.displayAvatarURL()}`);
    
      setTimeout(() => message.delete(), 100)
  
      const bSi = new MessageButton()
        .setCustomId("accept")
        .setLabel("SI")
        .setStyle("SUCCESS")
    
      const bNo = new MessageButton()
        .setCustomId("deny")
        .setLabel("NO")
        .setStyle("DANGER")
      
      message.channel.send({ 
        
        embeds: [embed], 
        components: [
          new MessageActionRow()
          .addComponents([bSi,bNo])
        ] 
      }).then(async m => {
              
        let filter = int => int.isButton() && int.user.id == message.author.id
         
        const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000 });
        
        collector.on("collect", async int => {
            
          int.deferUpdate();
            
          if (int.customId === "accept") {
  
            let bugco = new Discord.MessageEmbed()
            .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
            .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
            .setColor('RANDOM')
            .setDescription('Sugerencia realizada con éxito! <a:clap:881331231021756437>')
            .addField('Sugerencia: ', '<a:flech:931432469935312937> '+reporte)
            .setTimestamp(new Date())
            .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);

            m.edit({ 
              embeds: [bugco],
              components: []
            })
  
            let bugre = new Discord.MessageEmbed()
            .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
            .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
            .setColor('RANDOM')
            .addField('Ha llegado la siguiente sugerencia: ', '<a:flech:931432469935312937> '+reporte)
            .setTimestamp(new Date())
            .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send({ embeds: [bugre]})
     
          } else if (int.customId === "deny") {
  
            m.edit({
              embeds : [embedercancel],
              components: []
            })
            
          }
        });
    
        collector.on("end", colected => {
            
          if(colected.size < 1) return 
  
          m.edit({ 
            embeds: [embednoconf],
            components: []
          })
            
        });
          
      })
    }
      
  }