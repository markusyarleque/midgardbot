const xpclubSchema = require('../../models/xpclubSchema');
var AsciiTable = require('ascii-table')

module.exports =  {
    
    name: 'lxp',
    aliases: [],
    description: '💻 Comando exclusivo de Staff',

    async execute(client, message, args, Discord) {

        setTimeout(() => message.delete(), 100)

        if(message.guild.id !== '777620055344545842') return

        let id = ['753435606410985573','683501310527668228']

        if(!id.some(id => message.author.id == id)) return

        let topchannel, logschannel, lista, embed, first, c, best
        
        topchannel = client.channels.cache.get('970094487059709953')
        logschannel = client.channels.cache.get('965156885558878319')

        try {
            
            lista = await xpclubSchema.find().sort({ xptotal: -1 }).limit(10)

            embed = new Discord.MessageEmbed()

            first = []

            c = 1
            
            var tablexp = new AsciiTable()
            tablexp.setHeading('**N°**','**Participante**','**XP**','**Extra**','**TOTAL**')
            tablexp.setHeadingAlignCenter()

            for(let ls of lista){

                tablexp.addRow('**' + c + '.**', '<@' + ls.idusuario + '> <a:flech:931432469935312937>', ls.xpsubtotal + ' | ', ls.xpadicional + ' | **', ls.xptotal + '**')
                first.push(ls.idusuario)
                c = c + 1
        
            }
  
            tablexp.setAlignCenter(0)
            tablexp.setAlignCenter(1)
            tablexp.setAlignRight(2)
            tablexp.setAlignRight(3)
            tablexp.setAlignRight(4)
            tablexp.removeBorder()

            if(!lista) return message.channel.send({embeds:[
              
                new Discord.MessageEmbed()
                .setDescription('Aún no hay usuarios con XP <:tierno:931433334960160799>')   	
                .setColor("RANDOM")
                .setTimestamp(new Date())
                .setFooter({ text: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐍𝐞𝐤𝐨𝐂𝐥𝐮𝐛', iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : 'https://i.imgur.com/MNWYvup.gif' })


            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

            best = client.users.cache.get(first[0])

            embed.setTitle('𝑴𝒊𝒅𝒈𝒂𝒓𝒅 𝑿𝑷 𝑹𝒂𝒄𝒆 💎')
            embed.setThumbnail(best.displayAvatarURL() ? best.displayAvatarURL({dynamic: true, size: 2048}) : message.guild.iconURL({ dynamic: true, size: 2048 }))
            embed.setImage('https://i.imgur.com/VKOLvQT.gif')
            embed.setDescription(tablexp.toString())   	
            embed.setColor("RANDOM")
            embed.setTimestamp(new Date())
            embed.setFooter({ text: '𝐌𝐢𝐝𝐠𝐚𝐫𝐝 𝐍𝐞𝐤𝐨𝐂𝐥𝐮𝐛', iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : 'https://i.imgur.com/MNWYvup.gif' })

            
            topchannel.bulkDelete(3).catch((e) => console.log('Error al eliminar mensajes: '+e))
            topchannel.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
            topchannel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
            topchannel.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))

        } catch (error) {
            
            console.log('Ocurrió un error al buscar la lista de XP: '+ error)
    
            const e = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error inesperado, por favor intenta de nuevo!\n> Error: `+error)
            .setTimestamp()
            
            logschannel.send({ content: '``` Error al Buscar la Lista de XP - User: ' + user1.id + ' - Error: ' + error + '```' }).catch((e) => console.log('Error al enviar mensaje: '+e))
            
            return message.reply({embeds: [e]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        }

    }

}