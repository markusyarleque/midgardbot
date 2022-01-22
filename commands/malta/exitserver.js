module.exports = (client, message, args) => {

    const Discord = require('discord.js'); 
    const { MessageActionRow, MessageButton } = require('discord.js');

    let id = ['753435606410985573']
  
    if(!id.some(id => message.author.id == id)) {
      
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el developer del bot puede usar este comando.')
        .setColor('RED')
        message.channel.send({ embeds: [embed] })
        .then(m => setTimeout(() => m.delete(), 5000));

    } else {

        let argumentos = args.join(' ');

        if (!argumentos){
          
          const embed = new Discord.MessageEmbed()
          .setDescription('Dime el nombre o ID del servidor para salirme')
          .setColor('RED')
          return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000));

        }

        let serverReal = client.guilds.cache.find(s => s.name.toLowerCase() === argumentos.toLowerCase() || s.id === argumentos);
        
        if (!serverReal){
          
          const embed = new Discord.MessageEmbed()
          .setDescription('No encontré el servidor!')
          .setColor('RED')
          return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000));

        }

        const bSi = new MessageButton()
        .setCustomId("accept")
        .setLabel("SI")
        .setStyle("SUCCESS")

        const bNo = new MessageButton()
        .setCustomId("deny")
        .setLabel("NO")
        .setStyle("DANGER")

        const embed = new Discord.MessageEmbed()
        .setDescription('¿Deseas que salga del servidor **'+serverReal+'**?')
        .setColor('YELLOW')
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({
          embeds: [embed],
          components: [
            new MessageActionRow().addComponents([bSi,bNo])
          ]
        }).then(async m => {
        
          let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
         
          const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
          
          
          collector.on("collect", async int => {
            
            int.deferUpdate();
            
            if (int.customId === "accept") {
              
              await serverReal.leave();
              m.edit({
                embeds: [
                  new Discord.MessageEmbed()
                  .setDescription('¡Me he salido del servidor correctamente!')
                  .setColor('GREEN')
                  .setTimestamp(new Date())
                  .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`)
                ],
                components: []
              });
    
              
            } else if (int.customId === "deny") {
              
              m.edit({
                embeds: [
                  new Discord.MessageEmbed()
                  .setDescription('¡Menú cancelado! Aún sigo en el servidor')
                  .setColor('RED')
                  .setTimestamp(new Date())
                  .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`)
                ],
                components: []
              });
            
            }
          });
    
          collector.on("end", colected => {
           
            if(colected.size < 1) return m.edit({
              content: "**¡No confirmaste a tiempo!** <:enojado:931434000751394867>",
              components: []
            });
            
          });
          
        });

    }
    
}