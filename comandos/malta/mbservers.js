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

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
        .setAuthor('MidgardBot', client.user.avatarURL())
        .setTitle('Developers')
        .setDescription('**Desarrollador:**\nMaltazard#0610\n\nActualmente estoy en **'+client.guilds.cache.size+'** servers.\n\n**'+client.users.cache.size+'** usuarios usan mis comandos.\n\n**Servidores:**\n\n> '+client.guilds.cache.map(r => r.name).join(". \n> "))
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({ embeds: [embed] });

    }

}