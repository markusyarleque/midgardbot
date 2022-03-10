module.exports =  {
    
    name: 'say',
    aliases: ['decir'],
    description: '🔉 Hace que el bot diga un mensaje.',
  
    async execute(client, message, args, Discord) {

        let texto = args.join(' ');
    
        if(!texto) return message.reply({
            
            embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Escriba un contenido para decir.`)
    
            ]
        }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        message.channel.send(texto).catch((e) => console.log('Error al enviar mensaje: '+e))
        setTimeout(() => message.delete(), 100);

    }
    
}