const Discord = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ allowedMentions: { parse: ['users'], repliedUser: true }, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES] });

client.snipes = new Discord.Collection()

module.exports = async (client, message, Discord) => {

  let snipes = client.snipes.get(message.channel.id) || [] 

  if(snipes.length > 10) snipes = snipes.slice(0, 10)

  snipes.unshift({//guardamos todo
    msg: message,//mensaje
    image: message.attachments.first() ? message.attachments.first().proxyURL : null, //Imagen si es que la hay
    time: Date.now() })//fecha y cerramos

  client.snipes.set(message.channel.id, snipes)//establecemos todo en la coleccion

  let sv = client.guilds.cache.get('851924635930329098')
  let channel = sv.channels.cache.get('933903109305028688')

  if(message.content.length>=1000) return channel.send('El mensaje eliminado en el canal: <#'+message.channel.id+'> es demasiado largo. Ha sido enviado  por: '+message.author)
  
  const embed = new Discord.MessageEmbed()
    .setAuthor('MaltaBot', client.user.avatarURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setTitle('📢 | Mensajes Borrados')
    .addField('Servidor: ', `<a:flech:931432469935312937> ${message.guild.name}`)
    .addField('Canal: ', `<a:flech:931432469935312937> <#${message.channel.id}>`)
    .addField('Autor: ', `<a:flech:931432469935312937> ${message.author}`)
    .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
    
  channel.send({ embeds: [embed] });
    
}