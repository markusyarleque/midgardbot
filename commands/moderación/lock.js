const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'lock',
    aliases: ['cerrar','bloquear'],
    description: '🔐 Bloquea el canal mencionado o dónde se ejecuta el comando.',
  
    async execute(client, message, args, Discord) {

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes permisos para ejecutar este comando')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tengo permiso para ejecutar este comando. Permiso faltante: MANAGE_CHANNELS (Gestionar Canales)')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        var everyrole = message.guild.roles.cache.find(role => role.name === "@everyone");
    
        var ch = message.mentions.channels.first() || message.channel
    
        let id = ['753435606410985573','683501310527668228']

        if(args[0] === 'all') { 
    
            try {

                if(!id.some(id => message.author.id === id)) {
      
                    const embed = new Discord.MessageEmbed()
                    .setDescription('Solo los Administradores del Bot puede usar este comando.')
                    .setColor('RED')
                
                    return message.reply({ embeds: [embed] })
                    .then(m => setTimeout(() => m.delete(), 5000))
                    .catch((e) => console.log('Error al enviar mensaje: '+e))
        
                }
    
                message.guild.channels.cache.forEach(async(channel) => {
                
                    await channel.permissionOverwrites.edit(everyrole, {
                    
                        SEND_MESSAGES: false
                
                    })

                })

                message.channel.send('🔐 Todos los canales del servidor fueron bloqueados')
                .then(m => setTimeout(() => m.delete(), 5000))
                .catch((e) => console.log('Error al enviar mensaje: '+e))
          
            } catch(e) {
            
                console.log('Error al cerrar todos los canales: '+e);
                message.reply('Hubo un error interno. Por favor, inténtelo de nuevo.').catch((e) => console.log('Error al enviar mensaje: '+e))
          
            }
    
        } else if(ch){
    
            try {
                
                ch.permissionOverwrites.edit(everyrole, {
                    
                    SEND_MESSAGES: false
                  
                })

                message.channel.send(`🔐 El canal <#${ch.id}> fue bloqueado`)
                .then(m => setTimeout(() => m.delete(), 5000))
                .catch((e) => console.log('Error al enviar mensaje: '+e))
              
            } catch (error) {
                
                console.log('Error al cerrar el canal: '+ch.name+' - Error: '+error);
                message.reply('Hubo un error interno. Por favor, inténtelo de nuevo.').catch((e) => console.log('Error al enviar mensaje: '+e))
          
            }
    
        }

    }

}