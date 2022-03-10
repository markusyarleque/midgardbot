const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'update',
    aliases: [],
    description: '💻 Actualización de Evento Ready - Activity.',
  
    async execute(client, message, args, Discord) {

        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.').catch((e) => console.log('Error al enviar mensaje: '+e))
    
        message.channel.sendTyping().catch((e) => console.log('Error al enviar mensaje: '+e))
    
        setTimeout(() => {
          
  
            client.user.setActivity({
                
                name: client.guilds.cache.size + ' server' + (client.guilds.cache.size === 1 ? '' : 's')+' | '+ client.users.cache.size + ' usuarios', 
                type:'WATCHING'
            
            })

            console.log('Estado cambiado con éxito - Update succefull')
  
            message.reply(`Ahh!!! Te la creíste wey <:gaaa:925926944254611487>`).catch((e) => console.log('Error al enviar mensaje: '+e))
           
        }, 10000);

        message.react('✅').catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}