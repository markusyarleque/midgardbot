module.exports = async (client, Discord, guild) => {

    let owner = client.users.cache.get('753435606410985573')
    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874943743185285150')
    let canalmbs = client.channels.cache.get('957231545763110984')

    let links = []

    guild.channels.cache.forEach(async (channel) => {

        if(channel.type === 'GUILD_TEXT'){

            for (let index = 0; index < guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size; index++) {
                
                try {
                
                    links[index] = channel
                    
                } catch (error) {
                    
                    console.log('Error al obtener canales de '+guild.name+' : ' + error)
    
                }
                
            }

        }

    })

    let invitacion

    let invite = await links[0].createInvite({ maxAge: 0, maxUses: 0, reason: 'Invitación creada por el Owner del Bot para estar en contacto con la comunidad.' }).then(invite => {

        invitacion = 'https://discord.gg/' + invite.code
        
    }).catch((error) => console.log('Error al crear Link de invitación de '+guild.name+' - ' + error))

        
    console.log('Link de invitación de '+guild.name+' : '+invitacion)

    let ownerserver = await guild.fetchOwner().catch((e) => console.log('Error al enviar mensaje: '+e))

    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'MaltaBot', iconURL: client.user.avatarURL() })
    .setThumbnail(guild.iconURL() ? guild.iconURL({ dynamic: true }) : 'https://i.pinimg.com/originals/04/41/ea/0441ea5619b979bde781aa040943c208.gif')
    .setTitle(`¡Server nuevo! <:abby:931432327354155038>`)
    .setDescription('<:shylove:931432905421520927> Me he unido al servidor: \n\n> Nombre: '+guild.name+'\n> \n> Id: '+guild.id+'\n> \n> Fecha: Hoy\n> \n> Invitación: '+(invitacion ? invitacion : 'Ninguna') +'\n> \n> Owner: <@' + (ownerserver ? ownerserver.id : 'Fallo al obtener owner') + '>')
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter({ text: guild.name, iconURL: (guild.bannerURL() ? guild.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png') : 'https://www.cosas-que-pasan.com/wp-content/uploads/portada-facebook-en-construccion.jpg') })

    const embedmbs = new Discord.MessageEmbed()
    .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
    .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
    .setTitle('🚧  Lista actual de servidores  🚧')
    .setDescription('***Desarrollador : ↴***\n\n```Fui creado y programado única y exclusivamente por 💻Maltazard💻#2608```\n\n***Usuarios : ↴***\n\n```Mis comandos son utilizados por '+client.users.cache.size+' usuarios.```\n\n***Servidores : ↴***\n\n```Actualmente estoy en '+client.guilds.cache.size+' servers.```\n\n')
    .addField('\u200B','\u200B')
    .addField('Nombre : ↴ ','``` - ' + client.guilds.cache.map(r => r.name).join(". \n - ")+'.```',true)
    .addField('Id : ↴ ','``` - ' + client.guilds.cache.map(r => r.id).join(". \n - ")+'.```',true)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter({ text: `Nací para crecer`, iconURL: client.user.avatarURL({ dynamic: true}) })
         
    canalmbs.bulkDelete(2)
    canalmbs.send({ embeds: [embedmbs] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    canalmbs.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
        
    try {

        channel.send({embeds: [embed]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        owner.send({embeds:[embed]}).catch(err => console.log('Error al enviar SERVER NUEVO: '+guild.name+' - '+guild.id+' al dm del owner: - Error: '+err))

    } catch (error) {
        
        console.log('No se envío dm al owner: '+error)
    }

    client.user.setPresence({
          
        status: 'online', 
        activities: [{ 
           
            name: client.guilds.cache.size + ' server' + (client.guilds.cache.size === 1 ? '' : 's')+' | '+ client.users.cache.size + ' usuarios', 
            type: 'WATCHING',
            
        }],
        
    })

}