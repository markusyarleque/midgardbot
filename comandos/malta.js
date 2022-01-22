module.exports = (client, message, args) => {

    const Discord = require('discord.js'); 

    let id = ['753435606410985573']
  
    if(!id.some(id => message.author.id == id)) {
        
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el developer del bot puede usar este comando.')
        .setColor('RED')
          
        message.channel.send({ embeds: [embed] })
          .then(m => setTimeout(() => m.delete(), 5000));
  
    } else {
  
        var estadobot = message.content.split(' ').slice(1).join(' ')
  
        if(!estadobot){
  
            message.reply('Exactamente... ¿Qué quieres que ponga?').then(m => setTimeout(() => m.delete(), 5000));
  
        }else{
  
            client.user.setActivity({name:estadobot, type:'LISTENING'})
            message.reply('Estado cambiado con éxito <a:pasito:877116925291946094>')
  
        }
  
    }

}