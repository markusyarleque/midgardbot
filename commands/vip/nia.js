module.exports =  {
    
    name: 'nia',
    aliases: ['ninini'],
    description: '👓 Convierte las vocales de una oración en "i"',
  
    async execute(client, message, args, Discord) { 

        var cadena = args.join(' ') 

        cadena = cadena.replace(/[aeou]/ig, "i")

        return message.channel.send(cadena)

    }

}