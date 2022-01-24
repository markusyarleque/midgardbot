const { RAE } = require('rae-api')

module.exports =  {
    
    name: 'diccionario',
    aliases: ['rae','significado','mean'],
    description: '🧷 Busca el significado, según la RAE, de cualquier palabra.',
  
    async execute(client, message, args, Discord) {

        const palabra = args.slice(0).join(' ')

        if(!palabra) return message.reply({embeds:[

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Introduce una palabra o texto para buscar!`)
        
        ]})

        try {
        
            const rae = new RAE()
            const search = await rae.searchWord(palabra)
            const wordId = search.getRes()[0].getId()

            const result = await rae.fetchWord(wordId)
            const definition = result.getDefinitions()
            const first = definition[0].getDefinition()

            const embed =  new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setDescription('<a:Verify1:931463354357276742> | Resultado obtenido:\n\n<a:flech:931432469935312937>  `'+first+'`')

            message.reply({ allowedMentions: { repliedUser: false}, embeds:[embed]})
      

        } catch (err) {

            return message.reply({embeds:[

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | No encontré significado para esa palabra!`)
          
            ]})

        }

    }

}