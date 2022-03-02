module.exports =  {
    
    name: 'aurora',
    aliases: [],
    description: '🏆 Prueba',
  
    async execute(client, message, args, Discord) { 

        
        function reminder() {

            const emb = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setTitle(`⏰ | Recordatorios Activados`)
            .setDescription('<a:exclama2:880930071731392512> | Tu última recompensa diaria fue reclamada hace 12 horas. ¡Ya puedes volver a usar el comando `daily` para canjear tus coins extras.\n\n Asegúrate de haber votado antes por el servidor en Top.gg para obtener el doble de beneficios. \n\n <a:flech:931432469935312937> Link: https://top.gg/servers/777620055344545842/vote')
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `MidgardBot`, iconURL: client.user.avatarURL()})
    
            message.author.send({ embeds: [emb]}).catch(err => console.log('Error al enviar recordatorio de daily al dm de: '+message.author.username+' - Error: '+err))

        }

        const server = message.guild

        const e = new Discord.MessageEmbed()
        .setAuthor(server.name, server.iconURL({ dynamic: true }))
        .setTitle('Recompensa Diaria 💵')
        .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144055111690/daily.gif?width=353&height=198')
        .setColor('RANDOM')
        .setDescription(`Felicidades **${message.author.username}**! Has recibido <a:money:930397094924124180> como recompensa diaria.\n¡Muchas gracias por usar mis comandos!`)
        .setTimestamp()
        .setFooter({ text: `MidgardBot`, iconURL: client.user.avatarURL()})

        const bRm = new Discord.MessageButton()
        .setCustomId('primary')
        .setLabel('Recuérdame')
        .setStyle('PRIMARY')
        .setEmoji('⏰')
      
        message.reply({ allowedMentions: { repliedUser: false}, embeds: [e], components: [

            new Discord.MessageActionRow()
            .addComponents(bRm)

        ]}).then(async m => {
      
            let filter = int => int.isButton() && int.user.id == message.author.id 
       
            const collector = m.createMessageComponentCollector({ filter, time: 60000 });
        
            collector.on("collect", async int => {
          
                int.deferUpdate();
       
                if (int.customId === "primary") {

                    await message.reply({ 

                        content: '<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en 1 minuto. No olvides de activar los mensajes directos!', 
                        ephemeral: true

                    }).then(m => setTimeout(() => m.delete(), 5000))

                    var msDelay = 60000
                    setTimeout(reminder, msDelay);

                    m.edit({components: []})
  
                }
  
            });
  
            collector.on("end", (collected,reason) => {
          
                if(collected < 1) return m.edit({components: [

                    new Discord.MessageActionRow()
                    .addComponents(bRm.setDisabled(true))

                ]})

                console.log('Razón del término de colección: '+reason)
            });
        
        })

    }

}