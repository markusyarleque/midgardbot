const Discord = require('discord.js');

module.exports = {

    name: 'stats',
    description: '📊 Muestra la información y el estado del bot.',
    options: [],

    run: async (client, interaction) => {
        
        try {
            
            const wait = require('util').promisify(setTimeout)
            const moment = require('moment');
            require('moment-duration-format');
      
            const actividad = moment.duration(client.uptime).format(' D [dias], H [hrs], m [mins], s [segs]');
    
            let datosc = []
            let datoss = []
    
            const comandossize = client.commands.map(n => n.name)
            const scomandossize = client.slash.map(n => n.name)
        
            for(let ls of comandossize){
    
            datosc.push('**' + ls+ '**')
          
            }
        
            for(let ls of scomandossize){
    
            datoss.push('**' + ls+ '**')
          
            }
        
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
            .setAuthor({name: 'MidgardBot', iconURL: client.user.avatarURL()})
            .setTitle('Estadísticas')
            .addField('Desarrollador: ', 'Maltazard#1207')
            .addField(`Comandos de Prefix [ - ]:`, ''+(datosc.length ? datosc.length : '0'))
            .addField(`Slash Commands:`, ''+(datoss.length ? datoss.length : '0'))
            .addField('Lenguaje: ', 'JavaScript')
            .addField(`Versión:`, `1.2.1`)
            .addField(`Librería:`, Discord.version)
            .addField('RAM: ', ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
            .addField(`Actividad:`, `${actividad}`)
            .addField('Servidores: ', `${client.guilds.cache.size}`)
            .addField('Usuarios: ', ` ${client.users.cache.size}`)
            .addField(`Canales`, `${client.channels.cache.size}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL()}`})
                
            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ embeds: [e]})

        } catch (error) {

            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo!', ephemeral: true})
            
            console.log('Error en el SC stats: '+error)

        }
    
    }

}