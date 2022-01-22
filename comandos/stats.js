module.exports = (client, message, args) => { 

  const Discord = require('discord.js'); 

  const actividad = moment.duration(client.uptime).format(' D [dias], H [hrs], m [mins], s [segs]');

  const embed = new Discord.MessageEmbed()
    .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
    .setAuthor('MidgardBot', client.user.avatarURL())
    .setTitle('Estadísticas')
    .addField('Desarrollador: ', 'Maltazard#0610')
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
    .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
  message.channel.send({ embeds: [embed] });
  
}