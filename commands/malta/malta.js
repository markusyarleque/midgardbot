module.exports =  {
    
    name: 'malta',
    aliases: ['set-activity'],
    description: '💻 Cambiar el estado de actividad del bot.',

    async execute(client, message, args, Discord) {

        let id = ['753435606410985573']
  
        if(!id.some(id => message.author.id == id)) {
        
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo el developer del bot puede usar este comando.')
            .setColor('RED')
          
            return message.reply({ embeds: [embed] })
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
    
}