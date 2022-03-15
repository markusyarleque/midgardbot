const turnoSchema = require('../../models/turnoSchema');

module.exports =  {
    
    name: 'turno',
    aliases: [],
    description: '💻 Comando exclusivo de Staff',

    async execute(client, message, args, Discord) {

        let staffTurno = '888203969111916595'
        let userTurno, mensajes, puntos, fuegos

        const bSi = new Discord.MessageButton()
        .setCustomId("inicio")
        .setLabel("INICIAR")
        .setStyle("SUCCESS")
  
        const bNo = new Discord.MessageButton()
        .setCustomId("final")
        .setLabel("FINALIZAR")
        .setStyle("DANGER")

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://images-ext-2.discordapp.net/external/uzG-lPjTdi7gFoYFRZXJcTZ5CiuJxPsE82N88qb0Hg8/https/i.gifer.com/8AMQ.gif?width=375&height=188')
        .setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
        .setTitle('𝗦𝘁𝗮𝗳𝗳 𝗱𝗲 𝗧𝘂𝗿𝗻𝗼')
        .setDescription('<a:BD_decoFlechaVerde:878509031675801640> Para obtener el rol <@&888203969111916595> solo reacciona en el botón de Iniciar\n\n<a:Verifired3:882776367018700840> **Una vez finalices con tu turno, reacciona en el botón de Finalizar y el bot te dará la cantidad de mensajes que has escrito en <#870195067338506271> y la cantidad de puntos y 🔥 que se te agregarán**')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}` })
            
        message.channel.send({ embeds: [embed], components: [
  
            new Discord.MessageActionRow().addComponents([bSi,bNo.setDisabled(true)])

        ]}).then(async m => {
            
            let filter = int => int.isButton() && int.user.id == message.author.id 
           
            const collector = m.createMessageComponentCollector({ filter, time: 43200000 });
            
            collector.on("collect", async int => {
              
                int.deferUpdate();
           
                if (int.customId === "inicio") {

                    var rol = message.guild.roles.cache.find(x => x.id === staffTurno)

                    if(rol){

                        if(!message.member.roles.cache.find(r => r.id === staffTurno)){
                            
                            await message.member.roles.add(rol).catch(e => {
                    
                                console.log('Ocurrio un error al añadir ROL Staff de Turno al usuario: '+ message.author.id+ ' - '+e)
                        
                            })

                            try {

                                userTurno = await turnoSchema.findOne({idusuario: message.author.id})

                                if(!userTurno){
                    
                                    console.log('========================= REGISTRO DE STAFF DE TURNO =========================');
                            
                                    let user = await turnoSchema.create({
                    
                                        idusuario: message.author.id,
                                        mensajes: 0,
                        
                                    })
                        
                                    user.save();
                                    console.log('Staff de Turno Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
                       
                                    console.log('========================= REGISTRO DE STAFF DE TURNO =========================');
                       
                                } else {

                                    console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
                            
                                    let update = await turnoSchema.findOneAndUpdate({idusuario: message.author.id},
                                        {
                    
                                            mensajes: 0
                    
                                        })
                    
                                    update.save()
                       
                                    console.log('Staff de Turno Actualizado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
                       
                                    console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
                       
                                }

                                message.channel.send('Muchas gracias por ayudarnos a ser cada día mejor! Acabas de iniciar turno y recuerda que tus mensajes solo serán contados en el canal <#870195067338506271>. Suerte!').catch((e) => console.log('Error al enviar mensaje: '+e))

                            } catch (error) {

                                console.log('Error al Registrar Staff de Turno: '+ error)
                                message.channel.send('Ocurrió un error al Registrar Usuario: '+ error).catch((e) => console.log('Error al enviar mensaje: '+e))

                            }

                        } else {

                            return message.channel.send('Ya tienes el rol en tu perfil!').catch((e) => console.log('Error al enviar mensaje: '+e))
                            
                        }
                        
                    }

                    m.edit({
                  
                        components: [new Discord.MessageActionRow().addComponents([bSi.setDisabled(true),bNo.setDisabled(false)])]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "final") {
                
                    var rol = message.guild.roles.cache.find(x => x.id === staffTurno)

                    if(rol){

                        if(message.member.roles.cache.find(r => r.id === staffTurno)){
                            
                            await message.member.roles.remove(rol).catch(e => {
                    
                                console.log('Ocurrio un error al añadir ROL Staff de Turno al usuario: '+ message.author.id+ ' - '+e)
                        
                            })

                            try {

                                userTurno = await turnoSchema.findOne({idusuario: message.author.id})

                                if(!userTurno){
                    
                                    console.log('========================= REGISTRO DE STAFF DE TURNO =========================');
                            
                                    let user = await turnoSchema.create({
                    
                                        idusuario: message.author.id,
                                        mensajes: 0,
                        
                                    })
                        
                                    user.save();
                                    console.log('Staff de Turno Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
                       
                                    console.log('========================= REGISTRO DE STAFF DE TURNO =========================');
                       
                                } else {

                                    console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
                            
                                    let update = await turnoSchema.findOneAndUpdate({idusuario: message.author.id},
                                        {
                    
                                            mensajes: 0
                    
                                        })
                    
                                    update.save()
                       
                                    console.log('Staff de Turno Actualizado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
                       
                                    console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
                       
                                }

                                mensajes = userTurno.mensajes
                                puntos = Math.floor(mensajes * 0.3)
                                fuegos = Math.floor(puntos/20)

                                message.channel.send({ embeds: [
                                    
                                    new Discord.MessageEmbed()
                                    .setThumbnail('https://images-ext-2.discordapp.net/external/uzG-lPjTdi7gFoYFRZXJcTZ5CiuJxPsE82N88qb0Hg8/https/i.gifer.com/8AMQ.gif?width=375&height=188')
                                    .setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
                                    .setTitle('𝗦𝘁𝗮𝗳𝗳 𝗱𝗲 𝗧𝘂𝗿𝗻𝗼')
                                    .setDescription('Muchas gracias por apoyarnos en este Turno!')
                                    .addField('Total de mensajes escritos: ','<a:flech:915156906258071554> ' + mensajes, false)
                                    .addField('Total de puntos obtenidos: ','<a:flech:915156906258071554> ' + puntos, false)
                                    .addField('Total de diamantes ganados: ','<a:flech:915156906258071554> ' + fuegos, false)
                                    .setColor('RANDOM')
                                    .setTimestamp(new Date())
                                    .setFooter({ text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}` })
                                      
                                ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

                            } catch (error) {

                                console.log('Error al Registrar Staff de Turno: '+ error)
                                message.channel.send('Ocurrió un error al Registrar Usuario: '+ error).catch((e) => console.log('Error al enviar mensaje: '+e))

                            }

                        } else {

                            return message.channel.send('No tienes el rol en tu perfil!').catch((e) => console.log('Error al enviar mensaje: '+e))
                            
                        }
                        
                    }

                    m.edit({
                  
                        components: [new Discord.MessageActionRow().addComponents([bSi.setDisabled(false),bNo.setDisabled(true)])]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                }
      
            });
      
            collector.on("end", (collected, reason) => {
              
                if(collected < 1) return m.edit({
                
                    components: [
                        new Discord.MessageActionRow().addComponents([bSi.setDisabled(true),bNo.setDisabled(true)])
                    ]
                    
                }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
                console.log('Razón del término de colección de turno: '+reason)

            });
            
        }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
    }

}