const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'clear',
    aliases: ['limpiar','borrar'],
    description: '🧹 Elimina mensajes de un canal.',
  
    async execute(client, message, args, Discord) {

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes permisos para ejecutar este comando')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        setTimeout(() => message.delete());
            
        if (!args[0]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Por Favor, especifica una cantidad')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000));
    
        if (isNaN(args[0])) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Por favor, ingresa un número')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000));
    
        if (args[0] > 100) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No puedo eliminar más de 100 mensajes!')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000));

        if (args[0] < 1) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa un número mayor a 0!')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000));
          
        await message.channel.messages.fetch({ limit: args[0] }).then(
              
            (messages) => {

                message.channel.bulkDelete(messages)

              
            }
            
        );

        message.channel.send('```'+ args[0] +' mensajes han sido borrados.'+'```')
        .then(msg => setTimeout(() => msg.delete(), 5000));

    }

}