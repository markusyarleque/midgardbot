const { FastClick } = require('leaf-utils');

module.exports =  {
    
    name: 'fastclick',
    aliases: ['fastc','fc','first','fast'],
    description: '💢 ¿Quién es más rápido?',
  
    async execute(client, message, args, Discord) {

        let usuario = message.mentions.users.first() || message.guild.members.resolve(client.users.cache.get(args[0]));

        if(!usuario) return message.reply({embeds: [
       
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Necesitas mencionar con quién jugar!`)
      
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        await FastClick({

            message: message,
            slash_command: false,
            time: 300000,
            opponent: usuario,
            embed: {
              title: 'Fast Click',
              color: 'RANDOM'
            },
            challenge: {
              acceptButton: 'Si',
              denyButton: 'No',
            },
            buttons: {
              correctText: 'Click en este botón para ganar',
              wrongText: 'Aquí no',
            },
            colors: {
              correctButton: 'SUCCESS',
              wrongButton: 'DANGER',
            },
            noUser: 'Deberías mencionar a un usuario',
            startMessage: 'El botón aparecerá en unos segundos... Buena suerte!',
            mainMessage: 'Haz Click en el botón correcto para Ganar',
            acceptMessage: '{{opponent}} Has sido desafiado por {{player}}',
            cancelMessage: '{{opponent}} Se rehusa a jugar contigo!',
            winMessage: '{{winner}} Ganó en {{time}} segundos!',
            wrongClick: '{{winneruser}} Ganó porque {{loser}} dió click en el botón equivocado!',
            endMessage: 'Juego no aceptado a tiempo',
            authorOnly: 'No puedes usar estos botones'

        }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}