module.exports = async (client, Discord, message) => {

  console.log('ID canal dónde se ha borrado el mensaje: '+message.channel)
  let snipes = message.channel ? client.snipes.get(message.channel.id) : [] 

  if(snipes.length > 10) snipes = snipes.slice(0, 10)
  
  snipes.unshift({//guardamos todo
    msg: message,//mensaje
    image: message.attachments ? message.attachments.first().proxyURL : null, //Imagen si es que la hay
    time: Date.now() 
  })//fecha y cerramos
  
  client.snipes.set(message.channel, snipes)//establecemos todo en la coleccion

  let sv = client.guilds.cache.get('851924635930329098')
  let channel = sv.channels.cache.get('933903109305028688')

  if(message.content.length >= 1000) return channel.send('El mensaje eliminado en el canal: <#'+message.channel.id+'> es demasiado largo. Ha sido enviado  por: '+message.author)
  
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