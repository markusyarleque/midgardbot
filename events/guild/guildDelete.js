const serverSchema = require('../../models/serverSchema');

module.exports = async (client, Discord, guild) => {

    let owner = client.users.cache.get('753435606410985573')
    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874943743185285150')
    let canalmbs = client.channels.cache.get('957231545763110984')
    let logschannel = client.channels.cache.get('965156885558878319')

    let ownerserver
    let buscarserver
    let amount = 2
    let canalmbp = client.channels.cache.get('965157413349130250')
    
    try {

        ownerserver = await guild.ownerId
        ownerserver = client.users.cache.get(ownerserver)
    
    } catch (error) {
        
        logschannel.send({ content: '```Ha ocurrido un error inesperado al obtener Owner de Servidor saliente: ' + guild.name + ' - Error: ' + error + '```' }).catch((e) => console.log('Error al enviar mensaje: '+e))
        console.log('Ha ocurrido un error inesperado al obtener Owner de Servidor saliente: ' + error)

    }

    try {

        buscarserver = await serverSchema.findOne({idserver: guild.id})

        if(buscarserver){

            console.log('========================= ELIMINACIÓN DE SERVIDOR =========================');
            
            let setserver = await serverSchema.findOneAndDelete({idserver: guild.id})
        
            setserver.save().then(async () => {
                
                console.log('Servidor eliminado ===> Servidor: '+ guild.name)

                let datos = []
                let c = 1
                
                client.guilds.cache.forEach(async (s)=>{
                    
                    let bx = await serverSchema.findOne({idserver: s.id, premium: true})

                    if(bx){
                        
                        datos.push('**' + c + '.** Nombre : `' + s.name + '` - Id : `' + s.id + '`')
                        c = c + 1

                    }
                
                })

                setTimeout(async () => {

                    const embedmbp = new Discord.MessageEmbed()
                    .setThumbnail('https://i.imgur.com/Uq0IPAU.gif')
                    .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
                    .setTitle('💎  Lista de servidores Premium  💎')
                    .setDescription('\n\n> ' + datos.join('\n> \n> '))
                    .setColor('RANDOM')
                    .setTimestamp(new Date())
                    .setFooter({ text: `Nací para crecer`, iconURL: client.user.avatarURL({ dynamic: true}) })
                    
                    try {
                        
                        for (let i = 0; i < Math.ceil(amount / 99); i++){ 
                        
                            const msgs = await canalmbp.messages.fetch({
                            
                                limit: Math.round(amount / Math.ceil(amount / 99)),
                        
                            });
                        
                            await canalmbp.bulkDelete(
                            
                                msgs.filter((m) => m.deletable)
                        
                            ); 
                            
                        } 

                    } catch (error) {
                        
                        console.log('Error al eliminar mensajes en MBPremiums: ' + error)
                        logschannel.send({ content: 'Error al eliminar mensajes en MBPremiums: ' + error }).catch((e) => console.log('Error al enviar mensaje: '+e))
                
                    }

                    canalmbp.send({ embeds: [embedmbp] }).catch((e) => console.log('Error al enviar mensaje: '+e))
                    canalmbp.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
                    
                }, 10000)

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: 'MaltaBot', iconURL: client.user.avatarURL() })
                .setThumbnail(guild.iconURL() ? guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/0xgcf1W.gif')
                .setTitle(`¡Un Server menos! <:sadcat:949442305981575218>`)
                .setDescription('<:yonofui:931433119859503194> Me he salido del servidor: \n\n> Nombre: '+guild.name+'\n> \n> Id: '+guild.id+'\n> \n> Fecha: Hoy\n> \n> Owner: <@' + (ownerserver ? ownerserver.id : 'Fallo al obtener owner') + '>')
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: '' + guild.name, iconURL: (guild.bannerURL() ? guild.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png') : null) })

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
            
                try {
                            
                    for (let i = 0; i < Math.ceil(amount / 99); i++){ 
                    
                        const msgs = await canalmbs.messages.fetch({
                        
                            limit: Math.round(amount / Math.ceil(amount / 99)),
                    
                        });
                    
                        await canalmbs.bulkDelete(
                        
                            msgs.filter((m) => m.deletable)
                    
                        ); 
                        
                    } 

                } catch (error) {
                    
                    console.log('Error al eliminar mensajes en MBServers: ' + error)
                    logschannel.send({ content: 'Error al eliminar mensajes en MBServers: ' + error }).catch((e) => console.log('Error al enviar mensaje: '+e))

                }   
                
                canalmbs.send({ embeds: [embedmbs] }).catch((e) => console.log('Error al enviar mensaje: '+e))
                canalmbs.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
                
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
       
            }).catch((e) => {
                
                console.log('Error al Eliminar Servidor: '+ guild.name + ' - ' + e)
       
            })     
            
            console.log('========================= ELIMINACIÓN DE SERVIDOR =========================');
    
        }

    } catch (error) {

        console.log('Error al Eliminar Servidor: '+ guild.id + ' - ' + error)
       
    }

}