const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'lock',
    aliases: ['cerrar','bloquear'],
    description: '🔐 Bloquea el canal mencionado o dónde se ejecuta el comando',
  
    async execute(client, message, args, Discord) {

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes permisos para ejecutar este comando')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))
    
        var everyrole = message.guild.roles.cache.find(role => role.name === "@everyone");
    
        var ch = message.mentions.channels.first() || message.channel
    
        let id = ['753435606410985573','683501310527668228']

        if(args[0] === 'all') { 
    
            try {

                if(!id.some(id => message.author.id === id)) {
      
                    const embed = new Discord.MessageEmbed()
                    .setDescription('Solo el developer del bot puede usar este comando.')
                    .setColor('RED')
                
                    return message.reply({ embeds: [embed] })
                    .then(m => setTimeout(() => m.delete(), 5000));
        
                }
    
                message.guild.channels.cache.forEach(async(channel) => {
                
                    await channel.permissionOverwrites.edit(everyrole, {
                    
                        SEND_MESSAGES: false
                
                    });

                    channel.setName(`🔒 | ${channel.name}`)
            
                }); 

                message.channel.send('🔒 Todos los canales del servidor fueron bloqueados')
                .then(m => setTimeout(() => m.delete(), 5000));
          
            } catch(e) {
            
                console.log('Error al cerrar todos los canales: '+e);
          
            }
    
        } else if(ch){
    
            try {
                
                ch.permissionOverwrites.edit(everyrole, {
                    
                    SEND_MESSAGES: false
                  
                });

                ch.setName(`🔒 | ${ch.name}`)
            
                message.channel.send(`🔒 El canal <#${ch.id}> fue bloqueado`)
                .then(m => setTimeout(() => m.delete(), 5000));
              
            } catch (error) {
                
                console.log('Error al cerrar el canal: '+ch.name+' - Error: '+error);
          
            }
    
        }

    }

}