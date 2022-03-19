const turnoSchema = require('../../models/turnoSchema');

module.exports =  {
    
    name: 'listastaff',
    aliases: ['ldiamantes','lista-diamantes','lista-staff','ld'],
    description: '💻 Comando exclusivo de Staff',

    async execute(client, message, args, Discord) {

        let id = ['753435606410985573','683501310527668228','743960732542042203']

        let canalstaff = client.channels.cache.get('950717214137409596')

        if(!id.some(id => message.author.id == id)) {
      
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo los Gerentes puede usar este comando.')
            .setColor('RED')
            
            return message.reply({ embeds: [embed] })
            .then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

        try {
            
            let lista = await turnoSchema.find().sort({ diamantes: -1 })

            let embed = new Discord.MessageEmbed()

            let datos = []

            let c = 1

            for(let ls of lista){

                datos.push('**' + c + '.** <@' + ls.idusuario + '> <a:diamante:887714567084449892> **'+ls.diamantes+'**')
                c = c + 1
        
            }

            if(!lista || datos.length === 0) return message.channel.send({embeds:[
          
                new Discord.MessageEmbed()
                .setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
                .setDescription('Aún no hay usuarios con diamantes <:tierno:931433334960160799>')   	
                .setColor("RANDOM")
                .setFooter({ text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })

            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

            embed.setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
            embed.setTitle('𝗦𝘁𝗮𝗳𝗳 𝗱𝗲 𝗹𝗮 𝗦𝗲𝗺𝗮𝗻𝗮 ✨')
            embed.setThumbnail('https://images-ext-1.discordapp.net/external/qucP-6EqjGHVl7U6CLiJpM4epnV7Q9UJKiBHwqMesiA/https/c.tenor.com/739sj-Rs53YAAAAM/ekrut-coworker.gif?width=165&height=124')
            embed.setDescription(datos.join('\n\n'))   	
            embed.setColor("RANDOM")
            embed.setFooter({ text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
            
            canalstaff.bulkDelete(1)
            canalstaff.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        } catch (error) {
            
            console.log('Ocurrió un error al buscar la lista de Staff: '+ error)

            const e = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error inesperado, por favor intenta de nuevo!\n> Error: `+error)
            .setTimestamp()

            return message.reply({embeds: [e]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}