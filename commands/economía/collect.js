/*const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'collect',
    aliases: ['collect-income','income'],
    description: '🥇 Colecta todas las monedas por tus logros dentro del bot.',
  
    async execute(client, message, args, Discord) { 

        let buscarUsuario = await userSchema.findOne({idusuario: message.author.id})

        if(!buscarUsuario) return message.reply({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No cuentas con tu propio pollito! Adquiere uno usando el comando `'+prefix+'buy ck`')
        
        ]})

    }

}*/