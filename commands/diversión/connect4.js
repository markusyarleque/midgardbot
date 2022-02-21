const { Connect4 } = require('leaf-utils');

module.exports =  {
    
    name: 'connect4',
    aliases: ['4enraya','cuatroenraya'],
    description: '🎮 Juega 4 En Raya con algún miembro del servidor.',
  
    async execute(client, message, args, Discord) {

        let usuario = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if(!usuario) return message.reply({embeds: [
       
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Necesitas mencionar con quién jugar!`)
      
        ]})

        await Connect4({
            message: message,
            client: client,
            slash_command: false,
            time: 300000,
            opponent: usuario,
            embed: {
                title: 'Connect4',
                color: 'RED'
            },
            challenge: {
                acceptButton: 'Accept',
                denyButton: 'Deny',
            },
            emojis: {
                player1: '🔴',
                player2: '🟡',
            },
            noUser: 'Necesitas mencionar a alguien',
            acceptMessage: '{{player}} Has sido desafiado por {{opponent}}',
            cancelMessage: '{{opponent}} Se rehusa a jugar contigo!',
            endMessage: 'Juego no aceptado a tiempo',
            timeoutMessage: 'Juego detenido por inactividad',
            authorOnly: 'No es tu turno',
        })
    }

}