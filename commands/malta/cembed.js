module.exports =  {
    
    name: 'cembed',
    aliases: ['newembed'],
    description: '💻 Crear un embed.',

    async execute(client, message, args, Discord) {
    
        let id = ['753435606410985573','683501310527668228']

        if(!id.some(id => message.author.id == id)) {
      
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo los admins del bot puede usar este comando.')
            .setColor('RED')
            
            return message.reply({ embeds: [embed] })
            .then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {

            let e = 0;

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === args[0]) || message.channel;

            if(channel.guild.id !== message.guild.id) return 

            const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g

            let datos = [

                'Para cancelar escribe `exit`\nPara omitir algo (excepto en los campos) escribe `none`\n\nEscribe algún mensaje que aparecerá antes del embed:',
                'Ingresa nombre del autor:',
                'Ingresa imagen del autor (link o sube un archivo):',
                'Ingresa el link del autor:',
                'Ingresa el título:',
                'Ingresa el link del embed:',
                'Ingresa una descripción:',
                'Ingresa imagen thumbnail (link o sube un archivo):',
                'Ingresa imagen del embed (link o sube un archivo):',
                'Ingresa texto del footer:',
                'Ingresa imagen del footer (link o sube un archivo):',
                'Ingresa color del embed',
                '¿Quieres agregar campos? Si/No',

            ]

            const d = new Discord.MessageEmbed()
            .setThumbnail('https://i.imgur.com/9sJsVmV.gif')
            .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
            .setTitle('🚧  Construyendo un Embed  🚧')
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `Para cancelar: exit - Para omitir: none`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}` })
            
            await message.channel.send({ embeds: [d.setDescription(datos[0])] });
            
            let msgContent = "";
            let author = "";
            let authorimg = "";
            let authorlink = "";
            let footer = "";

            const embed = new Discord.MessageEmbed();

            let collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, { idle: 120000 })

            collector.on('collect', async m => {

                if(m.content.toLowerCase() === 'exit') return collector.stop('Cancelado');

                switch(e) {

                    case 0:

                        if(m.content.toLowerCase() === 'none'){
                            
                            msgContent = undefined
                          
                        } else {
                            
                            msgContent = m.content
                          
                        }

                        e++

                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                    break

                    case 1:

                        if(m.content.toLowerCase() === 'none'){

                            e = e + 3

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                        } else{
                            
                            author = m.content

                            e++

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                        }

                    break

                    case 2:

                        if(m.content.toLowerCase() === 'none'){

                            authorimg = undefined

                            e++

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                        } else{
                            
                            if(!m.attachments.first() && !linkregex.test(m.content)){

                                return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                            } else if (m.attachments.first()){
                                
                                authorimg = m.attachments.first().url;
                                
                                e++

                              
                            } else if (linkregex.test(m.content)) {
                                
                                authorimg = m.content;
                                
                                e++
                              
                            }
                             
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                        }
                        
                    break

                    case 3:

                        if(m.content.toLowerCase() === 'none'){

                            authorlink = undefined

                            e++

                            embed.setAuthor({ name: author, iconURL: authorimg, url: authorlink })

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })

                        } else{

                            if (!linkregex.test(m.content)){

                                return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                            } else{

                                authorlink = m.content

                                e++

                            }

                            embed.setAuthor({ name: author, iconURL: authorimg, url: authorlink })

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                           
                        }
                    break

                    case 4:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++

                        } else{

                            embed.setTitle(m.content)

                            e++
                        }
                        
                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                    break

                    case 5:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++

                        } else if(linkregex.test(m.content)){

                            embed.setURL(m.content)

                            e++

                        } else{

                            return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                        }

                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                    break

                    case 6:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++

                        } else{

                            embed.setDescription(m.content)

                            e++

                        }
                    
                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                    break

                    case 7:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++
                            
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        } else{

                            if(!m.attachments.first() && !linkregex.test(m.content)){

                                return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                            } else if(m.attachments.first()){

                                embed.setThumbnail(m.attachments.first().url)

                                e++

                            } else if(linkregex.test(m.content)){
                                
                                embed.setThumbnail(m.content)
                               
                                e++

                            }
                            
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        }
                    
                    break

                    case 8:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++
                            
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        } else{

                            if(!m.attachments.first() && !linkregex.test(m.content)){

                                return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                            } else if(m.attachments.first()){

                                embed.setImage(m.attachments.first().url)

                                e++

                            } else if(linkregex.test(m.content)){
                                
                                embed.setImage(m.content)
                               
                                e++

                            }
                            
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        }
                    
                    break

                    case 9:

                        if(m.content.toLowerCase() === 'none'){
                        
                            footer = undefined

                            e = e + 2
                            
                        } else{

                            footer = m.content

                            e++
                            
                        }
                    
                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                    break

                    case 10:

                        if(m.content.toLowerCase() === 'none'){
                        
                            e++
                            
                            embed.setFooter({ text: footer })

                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        } else{

                            if(!m.attachments.first() && !linkregex.test(m.content)){

                                return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | URL inválido')] })

                            } else if(m.attachments.first()){

                                embed.setFooter({ text: footer, iconURL: m.attachments.first().url })

                                e++

                            } else if(linkregex.test(m.content)){
                                
                                embed.setFooter({ text: footer, iconURL: m.content })
                               
                                e++

                            }
                            
                            await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                        }
                    
                    break

                    case 11:

                        if(m.content.toLowerCase() === 'none'){
                        
                            embed.setColor('RANDOM')

                            e++
                            
                        } else{

                            embed.setColor(m.content)

                            e++
                            
                        }
                    
                        await message.channel.send({ embeds: [d.setDescription(datos[e])] })
                    
                    break

                    case 12:

                        if(m.content.toLowerCase() === 'si'){

                            collector.stop('Agregará Campos')

                        } else if(m.content.toLowerCase() === 'no'){

                            collector.stop('Finalizado')

                        } else{

                            return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Opción invalida! Ingrese `si` o `no`')] })

                        }

                    break

                }

            })

            collector.on('end', async (collected, reason) => {

                if(reason === 'Cancelado'){

                    message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Menú cancelado con éxito!')] })

                } else if(reason === 'Agregará Campos'){

                    fields(message, embed).then(embed => {
                        
                        channel.send({ content: [msgContent], embeds: [embed] })

                    }).catch(reason => {

                        if(reason === 'idle'){

                            message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Tu tiempo acabó! Recuerda que solo tienes 2 minutos, vuelve a ejecutar el comando si deseas construir un Embed')] })

                        } else{

                            message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Colector finalizó  por : ' + reason)] }).catch(err => {})
                        
                        }

                    })

                } else if(reason === 'Finalizado'){

                    channel.send({ content: [msgContent], embeds: [embed] })

                } else if(reason === 'idle'){

                    message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Tu tiempo acabó! Recuerda que solo tienes 2 minutos, vuelve a ejecutar el comando si deseas construir un Embed')] })

                } else{

                    message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Colector finalizó  por : ' + reason)] }).catch(err => {})
                        
                }

            })

            function fields(message, embed){

                return new Promise((resolve, reject) => {

                    let o = 1
                    let i = 0
                    let title = ''
                    let desc = ''

                    let array = [

                        'Ingrese el nombre del campo:',
                        'Ingrese el valor del campo:',
                        '¿Quieres que este campo esté en línea? Si/No',
                        '¿Quieres agregar otro campo? Si/No'

                    ]

                    message.channel.send({ embeds: [d.setDescription(array[i])] })

                    let collector = message.channel.createMessageCollector((m) => {
                        
                        m.author.id === message.author.id, { idle: 120000 }

                    })

                    collector.on('collect', m => {

                        switch(i) {

                            case 0:
        
                                title = m.content
        
                                i++
        
                                message.channel.send({ embeds: [d.setDescription(array[i])] })
        
                            break
        
                            case 1:
        
                                desc = m.content
        
                                i++
        
                                message.channel.send({ embeds: [d.setDescription(array[i])] })
        
                            break

                            case 2:
        
                                if(m.content.toLowerCase() === 'si'){

                                    embed.addField(title, desc, true)

                                    i++

                                } else if(m.content.toLowerCase() === 'no'){

                                    embed.addField(title, desc)

                                    i++

                                } else{

                                    return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Opción invalida! Ingrese `si` o `no`')] })

                                }

                                if(o <= 25){

                                    message.channel.send({ embeds: [d.setDescription(array[i])] })

                                } else{

                                    collector.stop('OK')
                                
                                }
                               
                            break

                            case 3:
        
                                if(m.content.toLowerCase() === 'si'){

                                    o++

                                    title = undefined
                                    desc = undefined
                                    i = 0
                                    
                                    message.channel.send({ embeds: [d.setDescription(array[i])] })
                                    
                                } else if(m.content.toLowerCase() === 'no'){

                                    collector.stop('OK')

                                } else{

                                    return message.channel.send({ embeds: [d.setDescription('<a:Verify2:931463492677017650> | Opción invalida! Ingrese `si` o `no`')] })

                                }

                            break
                            
                        }

                    })

                    collector.on('end', (collected, reason) => {

                        if(reason === 'OK'){

                            resolve(embed)

                        } else{

                            reject(reason)

                        }
                        
                    })

                })

            }

        }
    
    }

}