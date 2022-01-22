const { MessageActionRow, MessageButton } = require('discord.js');

const moment = require('moment');
require('moment-duration-format');

module.exports = { 

  name: 'report',
  aliases: ['reporte','reportar'],
  description: '🔴 Reporta un bug o falla del bot.',

  async execute(client, message, args, Discord) {

    const embedercancel = new Discord.MessageEmbed()
    .setDescription('<a:Verify2:931463492677017650> | Reporte cancelado. <:aisaMexicana:925926704097161216>')
    .setColor('RANDOM')

    const embednoconf = new Discord.MessageEmbed()
    .setDescription('<a:Verify2:931463492677017650> | ¡No confirmaste a tiempo! <:enojado:931434000751394867>')
    .setColor('RANDOM')

    const bSi = new MessageButton()
      .setCustomId("accept")
      .setLabel("SI")
      .setStyle("SUCCESS")
  
    const bNo = new MessageButton()
      .setCustomId("deny")
      .setLabel("NO")
      .setStyle("DANGER")

    let reporte = args.join(' ');
    if(!reporte){

      const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | **Debes agregar un reporte para enviar al desarrollador!**`)
        
      return message.channel.send({embeds: [e]})
    }

    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874891049120714752')

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
    .setTitle('<a:alerta:932374957206421614> | Reporte')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres reportar este bug? ¡Usar mal el comando causará la prohibición!`)
    .addField('Bug a reportar: ', reporte)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Developer Team - MidgardBot`, `${message.author.displayAvatarURL()}`);
    
    setTimeout(() => message.delete(), 100)
    
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
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .setDescription('Reporte confirmado con éxito! <a:clap:881331231021756437>')
          .addField('Bug reportado: ', '<a:flech:931432469935312937> '+reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit({ 
            content: 'Prueba yes',
            embeds: [bugco],
            components: []
          })

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .addField('Ha llegado el siguiente reporte: ', '<a:flech:931432469935312937> '+reporte)
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
          
        if(colected.size < 1) return m.edit({ 
          embeds: [embednoconf],
          components: []
        })
          
      });
        
    })
  }
    
}