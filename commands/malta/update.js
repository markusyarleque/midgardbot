const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'update',
    aliases: [],
    description: '💻 Actualización de comandos.',
  
    async execute(client, message, args, Discord) {

        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
    
        message.channel.sendTyping()
    
        setTimeout(() => {
          
            message.reply(`Ahh!!! Te la creíste wey <:gaaa:925926944254611487>`);
           
        }, 20000);
    
        message.react('✅');

    }

}