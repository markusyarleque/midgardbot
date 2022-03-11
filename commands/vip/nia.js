module.exports =  {
    
    name: 'nia',
    aliases: ['ninini'],
    description: '👓 Convierte las vocales de una oración en "i"',
  
    async execute(client, message, args, Discord) { 

        var cadena = args.join(' ') 

        cadena = cadena.replace(/[aeou]/ig, "i").catch((e) => console.log('Error al enviar mensaje: '+e))
        setTimeout(() => message.delete(), 100).catch((e) => console.log('Error al enviar mensaje: '+e))
        return message.channel.send(cadena).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}