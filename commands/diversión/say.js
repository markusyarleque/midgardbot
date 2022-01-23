module.exports =  {
    
    name: 'say',
    aliases: ['decir'],
    description: '🔉 Hace que el bot diga un mensaje.',
  
    async execute(client, message, args, Discord) {

        let texto = args.join(' ');
    
        if(!texto) return message.reply({ allowedMentions: { repliedUser: false},
            
            embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Escriba un contenido para decir.`)
    
            ]
        })
        
        message.channel.send(texto);
        setTimeout(() => message.delete(), 100);

    }
    
}