const turnoSchema = require('../../models/turnoSchema');

module.exports =  {
    
    name: 'listastaff',
    aliases: ['ldiamantes','lista-diamantes','lista-staff','ld'],
    description: '💻 Comando exclusivo de Staff',

    async execute(client, message, args, Discord) {

        if(message.guild.id !== '777620055344545842') return

        let id = ['753435606410985573','683501310527668228','743960732542042203']

        let canalstaff = client.channels.cache.get('950717214137409596')

        if(!id.some(id => message.author.id == id)) {
      
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo los Gerentes pueden usar este comando.')
            .setColor('RED')
            
            return message.reply({ embeds: [embed] })
            .then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

        try {
            
            let lista = await turnoSchema.find().sort({ diamantes: -1 })

            let embed = new Discord.MessageEmbed()

            let datos = []
            let first = []

            let c = 1

            for(let ls of lista){

                datos.push('**' + c + '.** <@' + ls.idusuario + '> <a:diamante:887714567084449892> **'+ls.diamantes+'**')
                first.push(ls.idusuario)
                c = c + 1
        
            }

            if(!lista || datos.length === 0) return message.channel.send({embeds:[
          
                new Discord.MessageEmbed()
                .setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
                .setDescription('Aún no hay staff con diamantes <:tierno:931433334960160799>')   	
                .setColor("RANDOM")
                .setFooter({ text: `Malta's Bot`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }) })

            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
            
            let best = client.users.cache.get(first[0])

            embed.setAuthor({ name: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐒𝐭𝐚𝐟𝐟', iconURL: client.user.avatarURL({ dynamic: true}) })
            embed.setTitle('𝗦𝘁𝗮𝗳𝗳 𝗱𝗲 𝗹𝗮 𝗦𝗲𝗺𝗮𝗻𝗮 (14/20 DE MARZO) ✨')
            embed.setThumbnail(best.displayAvatarURL({dynamic: true, size: 2048}))
            embed.setImage('https://images-ext-1.discordapp.net/external/qucP-6EqjGHVl7U6CLiJpM4epnV7Q9UJKiBHwqMesiA/https/c.tenor.com/739sj-Rs53YAAAAM/ekrut-coworker.gif?width=165&height=124')
            embed.setDescription(datos.join('\n\n'))   	
            embed.setColor("RANDOM")
            embed.setFooter({ text: `Malta's Bot`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }) })
            
            canalstaff.bulkDelete(2)
            canalstaff.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
            canalstaff.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=480&height=69').catch((e) => console.log('Error al enviar mensaje: '+e))
   
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