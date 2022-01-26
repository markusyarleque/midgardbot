const star = require('star-labs')
const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'rep',
    aliases: ['carisma','cari'],
    description: '🤠 Da un punto de carisma.',
  
    async execute(client, message, args, Discord) { 

        let usuario2 = await userSchema.findOne({ idusuario: message.author.id})

        if(!usuario2){
  
            let user = await userSchema.create({

                idusuario: message.author.id,
                username: message.author.username,

            })

            user.save();
            console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

        }
  
        let cooldown = ((usuario2.crep - Date.now())/1000)
        let h = ((cooldown / 3600)-1).toFixed()
        let m = ((((cooldown % 3600)-1)/60)-1).toFixed()
        let mensaje
          
        if(h>1)
        {
          if(m>1)
          {
            mensaje = h + ' horas y ' + m + ' minutos'
          } else if(m===1)
          {
            mensaje = h + ' horas y ' + m + ' minuto'
          } else if(m<1)
          {
            mensaje = h + ' horas'
          }
        } else if(h===1){
          if(m>1)
          {
            mensaje = h + ' hora y ' + m + ' minutos'
          } else if(m===1)
          {
            mensaje = h + ' hora y ' + m + ' minuto'
          } else if(m<1)
          {
            mensaje = h + ' hora'
          }
        } else if(h<1){
          if(m>1)
          {
            mensaje = m + ' minutos'
          } else if(m===1)
          {
            mensaje = m + ' minuto'
          }
        }
  
        if(usuario2.crep > Date.now()) return message.channel.send({embeds: [
            
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:931434689481285662> | Puedes volver a dar rep en : **'+ mensaje+'**')
            
        ]})
  
        let usuario = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
  
        if(!usuario) {
  
          const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Debes mencionar correctamente a alguien o colocar una id válida!`)
          
           return message.channel.send({embeds: [e]})
        }
  
        if(usuario){
       
          if(usuario.id === message.author.id)return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No te puedes dar **rep** a ti mismo!`)
          ]})
    
          if(usuario.user.bot)return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes dar **rep** a un bot!`)
          ]})
  
          let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, usuario.id)
          let text
  
          if(!usuario1){
  
            await client.db.run(
              `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, usuario.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
              )
            usuario1 = {idusuario: usuario.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
    
          }
  
          await client.db.run(`UPDATE usuarios SET rep=rep+? WHERE idusuario=?`, 1, usuario.id)
          await client.db.run(`UPDATE usuarios SET crep=? WHERE idusuario=?`, (Date.now() + (6 * (60 * (1000 * 60)))), message.author.id)
  
          function reminder() {
      
            message.author.send('<a:exclama2:880930071731392512> | ¡Ya puedes volver a dar rep!')
    
          }
  
          if((usuario1.rep+1) === 1){
            text = '`'+(usuario1.rep+1)+'` punto'
          } else{
            text = '`'+(usuario1.rep+1)+'` puntos'
          }
    
          const server = message.guild
    
          const e = new Discord.MessageEmbed()
          .setAuthor(server.name, server.iconURL({ dynamic: true }))
          .setTitle('Carisma Diario 💟')
          .setColor('RANDOM')
          .setDescription(`Felicidades! | <@${usuario.id}> | Has recibido **1** punto de carisma.\n`+'Ahora tienes '+text+' en total!')
          .setTimestamp()
          .setFooter(`MidgardBot`,client.user.avatarURL())
  
          const bRm = new MessageButton()
    
          .setCustomId('primary')
          .setLabel('Recuérdame')
          .setStyle('PRIMARY')
          .setEmoji('⏰')
  
          message.channel.send({embeds: [e], components: [
    
            new MessageActionRow()
            .addComponents(bRm)
          ]}).then(async m => {
          
            let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
           
            const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
            
            collector.on("collect", async int => {
              
              int.deferUpdate();
           
              if (int.customId === "primary") {
                
                var msDelay = 6*3600000
                await message.reply({ content: '<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en 6 horas para volver a dar rep. No olvides de activar los mensajes directos!', ephemeral: true});
                setTimeout(reminder, msDelay);
  
                m.edit({ components: []})
  
              }
      
            });
      
            collector.on("end", (collected, reason) => {
              
              if(collected < 1) return m.edit({components: [
                new MessageActionRow()
                .addComponents(bRm.setDisabled(true))
              ]})
              
            });
            
          })
  
        }
    }

}