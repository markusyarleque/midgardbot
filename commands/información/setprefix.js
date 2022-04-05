const prefixSchema = require('../../models/prefixSchema');
const { Permissions, MessageButton } = require('discord.js');

module.exports = { 

    name: 'setprefix',
    aliases: ['set-prefix'],
    description: '📝 Actualiza el prefix del bot en este servidor.',
  
    async execute(client, message, args, Discord) {

        let buscarprefix, prefix
        let canalmbp = client.channels.cache.get('960797556261146644')

        try {
    
            buscarprefix = await prefixSchema.findOne({idserver: message.guild.id})
    
            if(buscarprefix){
    
                prefix = buscarprefix.prefix
    
            } else {
    
                prefix = process.env.PREFIX
    
            }
    
        } catch (error) {
    
            console.log('Error al buscar Prefix en Servidor: '+ message.guild.id + ' - ' + error)
            prefix = process.env.PREFIX
    
        }

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes permisos para ejecutar este comando. Permiso Requerido: (Administrador del Servidor)')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        let newprefix = args[0]

        if (!newprefix) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Por Favor, ingresa un nuevo prefix.\n\n> Uso: ' + prefix + 'setprefix <nuevoprefix>')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        if (newprefix.length > 3) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Solo se permite un máximo de 3 carácteres como prefix.\n\n> Uso: ' + prefix + 'setprefix <nuevoprefix>')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        const embedinicial = new Discord.MessageEmbed()
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setColor('YELLOW')
        .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }))
        .setDescription('<a:cargando:960474774281256980> | **Actualizando prefix...**')
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        message.reply({ allowedMentions: { repliedUser: false}, embeds: [embedinicial]})
        .then(async m => {

            try {

                if(!buscarprefix){
    
                    console.log('========================= REGISTRO DE PREFIX =========================');
            
                    let setprefix = await prefixSchema.create({
    
                        idserver: message.guild.id,
                        servername: message.guild.name,
                        prefix: newprefix,
        
                    })
        
                    setprefix.save();
                    
                    console.log('Prefix registrado ===> Servidor: '+ message.guild.name + ' Prefix: ' + newprefix)
       
                    console.log('========================= REGISTRO DE PREFIX =========================');
       
                } else {
    
                    console.log('========================= ACTUALIZACIÓN DE PREFIX =========================');
       
                    let update = await prefixSchema.findOneAndUpdate({idserver: message.guild.id},
                        {
    
                            prefix: newprefix
    
                        })
    
                    update.save()
    
                    console.log('Prefix actualizado ===> Servidor: '+ message.guild.name + ' Prefix: ' + newprefix)
       
                    console.log('========================= ACTUALIZACIÓN DE PREFIX =========================');
       
                }

                const embedcambio = new Discord.MessageEmbed()
                .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
                .setColor('GREEN')
                .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }))
                .setDescription('<a:Verify1:931463354357276742> | **Prefix cambiado con éxito:** ')
                .addField('\u200B','<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>')
                .addField('Servidor: ', '<a:flech:931432469935312937> `' + message.guild.name + '`')
                .addField('Nuevo Prefix: ', '<a:flech:931432469935312937> `' + newprefix + '`\n<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>')
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()

                setTimeout(() => {
          
                    m.edit({ allowedMentions: { repliedUser: false}, embeds: [embedcambio]}).catch((e) => console.log('Error al enviar mensaje editado en setprefix: '+e))
                    
                }, 5000)

                try {
            
                    let datos = []
                    let c = 1
                    console.log('datos 1: '+datos)
                    client.guilds.cache.forEach(async (s)=>{
                        
                        let bx = await prefixSchema.findOne({idserver: s.id})

                        if(bx){
                            
                            datos.push('**' + c + '.** Nombre : `' + s.name + '` - Prefix : `' + bx.prefix + '`')
                            c = c + 1

                            console.log('datos 2: '+datos)
                        } else{
                            
                            datos.push('**' + c + '.** Nombre : `' + s.name + '` - Prefix : `_`')
                            c = c + 1

                            console.log('datos 3: '+datos)
                        }
                    
                        console.log('datos 4: '+datos)
                    })
        
                    console.log('datos 5: '+datos)
                    const embedmbp = new Discord.MessageEmbed()
                    .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
                    .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
                    .setTitle('🚧  Lista de prefix de servidores  🚧')
                    .addField('\u200B','> ' + datos.join('\n> \n> '))
                    .setColor('RANDOM')
                    .setTimestamp(new Date())
                    .setFooter({ text: `Nací para crecer`, iconURL: client.user.avatarURL({ dynamic: true}) })
                         
                    canalmbp.bulkDelete(2)
                    canalmbp.send({ embeds: [embedmbp] }).catch((e) => console.log('Error al enviar mensaje: '+e))
                    canalmbp.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
                    
                    console.log('datos 6: '+datos.join(' '))
                } catch (error) {
                    
                    console.log('Ocurrió un error al buscar la lista de prefix: '+ error)
        
                    const e = new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error inesperado, por favor intenta de nuevo!\n> Error: `+error)
                    .setTimestamp()
        
                    canalmbp.bulkDelete(2)
                    canalmbp.send({ embeds: [e] }).catch((e) => console.log('Error al enviar mensaje: '+e))
                    return canalmbp.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=450&height=65').catch((e) => console.log('Error al enviar mensaje: '+e))
                    
                }

            } catch (error) {
    
                console.log('Error al Registrar prefix en servidor: ' + message.guid.name + ' - ' + error)
                
                const e4 = new Discord.MessageEmbed()
                .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
                .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }))
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error inesperado, por favor intenta de nuevo!\n> Error: `+error)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()

                setTimeout(() => {
          
                    m.edit({ allowedMentions: { repliedUser: false}, embeds: [e4]}).catch((e) => console.log('Error al enviar mensaje editado en setprefix: '+e))
    
                }, 5000)
                
            }

        })
        .catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}