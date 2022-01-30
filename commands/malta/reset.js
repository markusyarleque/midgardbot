module.exports =  {
    
    name: 'reset',
    aliases: [],
    description: '💻 Reinicio de comandos.',
  
    async execute(client, message, args, Discord) {

        let id3 = ['753435606410985573']
    
        if(!id3.some(id => message.author.id == id)) {
         
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo el developer del bot puede usar este comando.')
            .setColor('RED')
          
            message.reply({ embeds: [embed] });
    
        } else {
            
            message.reply('🕙 | Reinicio en progreso...').then(async msg => {
          
                msg.edit('🕙 | Seguimos reiniciando...');
            
                client.destroy();
            
                await client.login(process.env.TOKEN);
                await msg.edit('🕙 | En breves, regresamos...');
            
                msg.edit(' ✅ | Reiniciado Correctamente!')
          
            })
        }

    }

}