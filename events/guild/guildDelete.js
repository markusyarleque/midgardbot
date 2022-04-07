module.exports = async (client, Discord, guild) => {

    let owner = client.users.cache.get('753435606410985573')
    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874943743185285150')
    let canalmbs = client.channels.cache.get('957231545763110984')

    let ownerserver = await guild.fetchOwner().catch((e) => console.log('Error al enviar mensaje: '+e))

    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'MaltaBot', iconURL: client.user.avatarURL() })
    .setThumbnail(guild.iconURL() ? guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/0xgcf1W.gif')
    .setTitle(`¡Un Server menos! <:sadcat:949442305981575218>`)
    .setDescription('<:yonofui:931433119859503194> Me he salido del servidor: \n\n> Nombre: '+guild.name+'\n> \n> Id: '+guild.id+'\n> \n> Fecha: Hoy\n> \n> Owner: <@' + (ownerserver ? ownerserver.id : 'Fallo al obtener owner') + '>')
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter({ text: guild.name, iconURL: (guild.bannerURL() ? guild.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png') : null) })

    const embedmbs = new Discord.MessageEmbed()
    .setThumbnail('https://i.imgur.com/Uq0IPAU.gif')
    .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
    .setTitle('🚧  Lista actual de servidores  🚧')
    .setDescription('***Desarrollador : ↴***\n\n```Fui creado y programado única y exclusivamente por 💻Maltazard💻#2608```\n\n***Patrocinadores : ↴***\n\n```Vivo gracias a la manutención exclusiva de ✦ᴹᴳ| 𝑳𝒂 𝑰𝒏𝒔𝒑𝒆𝒄𝒕𝒐𝒓𝒂™#0001```\n\n***Usuarios : ↴***\n\n```Mis comandos son utilizados por '+client.users.cache.size+' usuarios.```\n\n***Servidores : ↴***\n\n```Actualmente estoy en '+client.guilds.cache.size+' servers.```\n\n')
    .addField('\u200B','\u200B')
    .addField('Nombre : ↴ ','``` - ' + client.guilds.cache.map(r => r.name).join(". \n - ")+'.```',true)
    .addField('Id : ↴ ','``` - ' + client.guilds.cache.map(r => r.id).join(". \n - ")+'.```',true)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter({ text: `Nací para crecer`, iconURL: client.user.avatarURL({ dynamic: true}) })
         
    canalmbs.bulkDelete(2)
    canalmbs.send({ embeds: [embedmbs] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    canalmbs.send('https://i.imgur.com/OASSWR1.gif').catch((e) => console.log('Error al enviar mensaje: '+e))
    
    try {

        channel.send({embeds: [embed]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        owner.send({embeds:[embed]}).catch(err => console.log('Error al enviar SERVER MENOS: '+guild.name+' - '+guild.id+' al dm del owner: - Error: '+err))

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