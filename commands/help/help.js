const serverSchema = require('../../models/serverSchema');
var AsciiTable = require('ascii-table')

module.exports =  {
    
    name: 'help',
    aliases: ['h','ayuda','comandos','commands'],
    description: '❗ Menú de ayuda con la lista de los comandos del bot.',
    use: '<prefix><name>',
    category: 'Información 📌',
    vip: false,
    owner: false,
  
    async execute(client, message, args, Discord) {

        let cmd, buscarprefix, prefix, svp, idowner, descripcion, alias, category, uso, vip, owner
        try {

            buscarprefix = await serverSchema.findOne({idserver: message.guild.id})

            if(buscarprefix){

                prefix = buscarprefix.prefix
                
                if(buscarprefix.premium === true){

                    svp = ' | Servidor Premium 💎'

                } else{

                    svp = ' | ' + message.guild.name

                }

            } else {

                prefix = '_'
                svp = ' | ' + message.guild.name

            }

        } catch (error) {

            var tableerror = new AsciiTable()
    
            tableerror.setHeading('Campos','Valores')
            tableerror.addRow('ERROR', error)
            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
            tableerror.addRow('FECHA', new Date())
    
            console.log(tableerror.toString())
    
            prefix = '_'
    
        }

        idowner = ['753435606410985573','683501310527668228']
        cmd = args[0]

        const help = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : 'https://i.imgur.com/L7CrF87.gif')
        .setTimestamp(new Date())
        .setColor('RANDOM')
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
    
        const fila1 = new Discord.MessageActionRow()
        .addComponents([

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('mp')
            .setLabel('🏠'),
            
            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('cbd')
            .setLabel('🥂'),

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('div')
            .setLabel('🤣'),

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('eco')
            .setLabel('💰'),

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('inf')
            .setLabel('📌'),

        ])

        const fila2 = new Discord.MessageActionRow()
        .addComponents([

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('mod')
            .setLabel('🔒'),
        
            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('nsfw')
            .setLabel('🔥'),

            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('rea')
            .setLabel('😎'),
        
            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('util')
            .setLabel('💡'),

            new Discord.MessageButton()
            .setStyle('DANGER')
            .setCustomId('exit')
            .setLabel('✖'),

        ])

        const fila3 = new Discord.MessageActionRow()
        .addComponents([
            
            new Discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('mp')
            .setLabel('🏠'),
            
            new Discord.MessageButton()
            .setStyle('DANGER')
            .setCustomId('exit')
            .setLabel('✖'),
      
        ])

        if(!cmd){

            message.reply({ allowedMentions: { repliedUser: false}, 
            
                embeds: [
                    
                    help    
                    .setAuthor({ name: 'MidgardBot' + svp, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTitle('Bienvenido al apartado de Ayuda 💌')
                    .setDescription('Hola <@' + message.author.id + '> esta es la Lista de **Comandos** y **Funciones** de **MidgardBot**, además te brindamos:\n\n> <:developer:972668211365576724> [Servidor de soporte](https://discord.gg/CM9yAmXPfC)\n> <:emoji_41:989454718537465967> [Website](https://midgardbot-web.herokuapp.com/)\n> <:Worlds_Icon_Invite:989451828301287424> [Link de invitación](https://discord.com/api/oauth2/authorize?client_id=904290001196556369&permissions=1619202014423&scope=bot%20applications.commands)\n\nMi prefix en `' + message.guild.name + '` es: `' + prefix + '`\n\nPara ver la ayuda de cada comando, ejecuta: `help <comando>`\n\nPara más información de cada categoría, navega por el menú:\n\n> 🥂 • Bar | Cafetería | Disco\n> 🤣 • Diversión\n> 💰 • Economía\n> 📌 • Información\n> 🔒 • Moderación\n> 🔥 • NSFW\n> 😎 • Reacción\n> 💡 • Utilidad\n\n<a:flech:931432469935312937> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
                    .setImage('https://media.discordapp.net/attachments/880312288593195028/989453623207546880/unknown.png?width=767&height=383')
                    
                ],
                components: [fila1, fila2]
              
            }).then(async m => {
                
                let filter = int => int.isButton() && int.user.id == message.author.id 
               
                const collector = m.createMessageComponentCollector({ filter });
                
                collector.on('collect', async int => {
                  
                    int.deferUpdate();
               
                    if (int.customId === 'mp') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help 
                                .setAuthor({ name: 'MidgardBot' + svp, iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setTitle('Bienvenido al apartado de Ayuda 💌')
                                .setDescription('Hola <@' + message.author.id + '> esta es la Lista de **Comandos** y **Funciones** de **MidgardBot**, además te brindamos:\n\n> <:developer:972668211365576724> [Servidor de soporte](https://discord.gg/CM9yAmXPfC)\n> <:emoji_41:989454718537465967> [Website](https://midgardbot-web.herokuapp.com/)\n> <:Worlds_Icon_Invite:989451828301287424> [Link de invitación](https://discord.com/api/oauth2/authorize?client_id=904290001196556369&permissions=1619202014423&scope=bot%20applications.commands)\n\nMi prefix en `' + message.guild.name + '` es: `' + prefix + '`\n\nPara ver la ayuda de cada comando, ejecuta: `help <comando>`\n\nPara más información de cada categoría, navega por el menú:\n\n> 🥂 • Bar | Cafetería | Disco\n> 🤣 • Diversión\n> 💰 • Economía\n> 📌 • Información\n> 🔒 • Moderación\n> 🔥 • NSFW\n> 😎 • Reacción\n> 💡 • Utilidad\n\n<a:flech:931432469935312937> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
                                .setImage('https://media.discordapp.net/attachments/880312288593195028/989453623207546880/unknown.png?width=767&height=383')
                                
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'cbd') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('• Comandos Acción-Reacción / Interactivos •')
                                .setAuthor({ name: 'MidgardBot | Comandos CBD', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Visita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n**Cafetería** ☕\n> **• ' + client.commands.filter(c => c.category === 'Cafetería ☕' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n**Bar** 🥂\n> **• ' + client.commands.filter(c => c.category === 'Bar 🥂' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n**Disco** 💃\n> **• ' + client.commands.filter(c => c.category === 'Disco 💃' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'div') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Diversión 🤣', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Diversión 🤣' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n**Solo VIP**\n> ** • ' + client.commands.filter(c => c.category === 'VIP 💎' && c.vip === true && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'eco') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Economía 💰', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Economía 💰' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'inf') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Información 📌', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Información 📌' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'mod') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Moderación 🔒', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Moderación 🔒' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'nsfw') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos NSFW 🔥', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Comandos única y exclusivamente para canales NSFW.\n\nUtilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> • ~~' + client.commands.filter(c => c.category === 'NSFW 🔥' && c.vip === false && c.owner === false).map(c => c.name).join('~~\n> • ~~') + '~~\n\n**Solo VIP**\n> • ~~' + client.commands.filter(c => c.category === 'NSFW 🔥' && c.vip === true && c.owner === false).map(c => c.name).join('~~\n> • ~~') + '~~\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'rea') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Reacción 😎', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Reacción 😎' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'util') {
                    
                        m.edit({
                      
                            embeds: [
                                
                                help
                                .setTitle('')
                                .setAuthor({ name: 'MidgardBot | Comandos de Utilidad 💡', iconURL: client.user.avatarURL({ dynamic: true }) })
                                .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Utilidad 💡' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                            ],
                            components: [fila1, fila2]
                    
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
          
                    } else if (int.customId === 'exit') {
                    
                        m.delete().catch((e) => console.log('Error al eliminar mensaje de help: '+e))

                    }
          
                });
          
                collector.on('end', (collected, reason) => {
                  
                    if(collected.size < 1) return m.edit({
                    
                        components: []
                  
                    }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
    
                    console.log('El collect del help finalizó por: '+reason)
                  
                });
              
            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })

        } else{

            let query

            try {
                
                query = client.commands.get(cmd) ||
                        client.commands.find((a) => a.aliases && a.aliases.includes(cmd)) // Obtiene el comando de la colección client.commandos

            } catch (error) {

                console.log('Error al buscar comando: ' + cmd + ' - ' + error)
                
                const e4 = new Discord.MessageEmbed()
                .setAuthor({ name: 'MidgardBot' + svp, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ dynamic: true }))
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error inesperado, por favor intenta de nuevo!\n> Error: `+error)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()

                return message.reply({embeds: [e4]}).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
            }

            if(query){

                descripcion = query.description
                category = query.category ? query.category : 'Sin categoría'
                uso = query.use ? query.use : 'En edición...'
                alias = query.aliases ? query.aliases : 'Ninguno'
                owner = query.owner

                if(owner === true){

                    if(!idowner.some(id => message.author.id == id)) return

                }
                
                if(alias.length <= 0){
                    
                    alias = 'Ninguno'
                    
                } else{
                   
                    let l = alias.toString()
                    
                    l = l.split(',')
                    
                    alias = l ? ('`' + l.map(l => l).join('` `') + '`') : alias
                  
                }
                
                if(query.vip === true){

                    vip = '💎 | Comando VIP'

                } else{

                    vip = '©'

                }

                if(category == 'NSFW 🔥'){

                    if(!message.channel.nsfw){
        
                        return message.reply({embeds: [
                  
                          new Discord.MessageEmbed()
                          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                          .setThumbnail('https://i.imgur.com/9hw4JPi.gif')
                          .setColor('RED')
                          .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, necesitas un canal NSFW para ver este menú <:ojooo:925928526119571457>`)
                  
                        ]}).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
                        
                    }

                }

                if(descripcion.includes('[prefix]')){

                    descripcion = descripcion.replace('[prefix]',prefix)

                }
                
                if(uso.includes('<prefix>')){

                    uso = uso.replace('<prefix>',prefix)

                }

                if(uso.includes('<name>')){

                    uso = uso.replace('<name>',query.name)

                }

                const helpcmd = new Discord.MessageEmbed()
                .setAuthor({ name: 'MidgardBot | ' + message.guild.name, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setFooter({ text: vip, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true, size: 2048 }) : 'https://i.imgur.com/L7CrF87.gif' })
                .setTimestamp(new Date())
                .setThumbnail(message.author.avatarURL() ? message.author.avatarURL({ dynamic: true, size: 2048 }) : 'https://i.imgur.com/kwMaqLo.gif')
                .setColor('RANDOM')
                .setDescription('<:CC_Hi:989683609508143144> **Hola** <@' + message.author.id + '>. Bienvenid@ a mi apartado de ayuda para `' + query.name + '`.')
                .addField('<a:point:953436509426581564> __Categoría__ ',' ' + category)
                .addField('<a:point:953436509426581564> __Descripción__ ',' ' + descripcion)
                
                if(uso.includes('<')){

                    if(uso.includes('[')){

                        helpcmd
                        .addField('<a:point:953436509426581564> __Uso__ ','`' + uso + '`\n\n> <> • requerido\n> [] • opcional\n\n')
                
                    } else{
                        
                        helpcmd
                        .addField('<a:point:953436509426581564> __Uso__ ','`' + uso + '`\n\n> <> • requerido\n\n')

                    }

                } else if(uso.includes('[')){
                    
                    helpcmd
                    .addField('<a:point:953436509426581564> __Uso__ ','`' + uso + '`\n\n> [] • opcional\n\n')

                } else{

                    helpcmd
                    .addField('<a:point:953436509426581564> __Uso__ ','`' + uso + '`\n\n')

                }

                if(alias === 'Ninguno'){

                    helpcmd.addField('\u200B','<a:fijadito:897243194943737866>\n> 🏠 • Volver al menú principal\n> ❌ • Cerrar menú de ayuda')
                
                } else{
                    
                    helpcmd
                    .addField('<a:point:953436509426581564> __Alias__ ',' ' + alias)
                    .addField('\u200B','<a:fijadito:897243194943737866>\n> 🏠 • Volver al menú principal\n> ❌ • Cerrar menú de ayuda')
                    
                }
                
                message.reply({ allowedMentions: { repliedUser: false}, 
            
                    embeds: [helpcmd],
                    components: [fila3]
                  
                }).then(async m => {
                
                    let filter = int => int.isButton() && int.user.id == message.author.id 
                   
                    const collector = m.createMessageComponentCollector({ filter });
                    
                    collector.on('collect', async int => {
                      
                        int.deferUpdate();
                   
                        if (int.customId === 'mp') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help 
                                    .setAuthor({ name: 'MidgardBot' + svp, iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setTitle('Bienvenido al apartado de Ayuda 💌')
                                    .setDescription('Hola <@' + message.author.id + '> esta es la Lista de **Comandos** y **Funciones** de **MidgardBot**, además te brindamos:\n\n> <:developer:972668211365576724> [Servidor de soporte](https://discord.gg/CM9yAmXPfC)\n> <:emoji_41:989454718537465967> [Website](https://midgardbot-web.herokuapp.com/)\n> <:Worlds_Icon_Invite:989451828301287424> [Link de invitación](https://discord.com/api/oauth2/authorize?client_id=904290001196556369&permissions=1619202014423&scope=bot%20applications.commands)\n\nMi prefix en `' + message.guild.name + '` es: `' + prefix + '`\n\nPara ver la ayuda de cada comando, ejecuta: `help <comando>`\n\nPara más información de cada categoría, navega por el menú:\n\n> 🥂 • Bar | Cafetería | Disco\n> 🤣 • Diversión\n> 💰 • Economía\n> 📌 • Información\n> 🔒 • Moderación\n> 🔥 • NSFW\n> 😎 • Reacción\n> 💡 • Utilidad\n\n<a:flech:931432469935312937> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
                                    .setImage('https://media.discordapp.net/attachments/880312288593195028/989453623207546880/unknown.png?width=767&height=383')
                                    
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'cbd') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('• Comandos Acción-Reacción / Interactivos •')
                                    .setAuthor({ name: 'MidgardBot | Comandos CBD', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Visita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n**Cafetería** ☕\n> **• ' + client.commands.filter(c => c.category === 'Cafetería ☕' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n**Bar** 🥂\n> **• ' + client.commands.filter(c => c.category === 'Bar 🥂' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n**Disco** 💃\n> **• ' + client.commands.filter(c => c.category === 'Disco 💃' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> **• ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'div') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Diversión 🤣', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Diversión 🤣' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n**Solo VIP**\n> ** • ' + client.commands.filter(c => c.category === 'VIP 💎' && c.vip === true && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                          
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'eco') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Economía 💰', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Economía 💰' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'inf') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Información 📌', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Información 📌' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'mod') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Moderación 🔒', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Moderación 🔒' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'nsfw') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos NSFW 🔥', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Comandos única y exclusivamente para canales NSFW.\n\nUtilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> • ~~' + client.commands.filter(c => c.category === 'NSFW 🔥' && c.vip === false && c.owner === false).map(c => c.name).join('~~\n> • ~~') + '~~\n\n**Solo VIP**\n> • ~~' + client.commands.filter(c => c.category === 'NSFW 🔥' && c.vip === true && c.owner === false).map(c => c.name).join('~~\n> • ~~') + '~~\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'rea') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Reacción 😎', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Reacción 😎' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'util') {
                        
                            m.edit({
                          
                                embeds: [
                                    
                                    help
                                    .setTitle('')
                                    .setAuthor({ name: 'MidgardBot | Comandos de Utilidad 💡', iconURL: client.user.avatarURL({ dynamic: true }) })
                                    .setDescription('Utilizando `' + prefix + 'help <comando>` obtienes ayuda detallada sobre cada comando.\n\nVisita mi [website](https://midgardbot-web.herokuapp.com/) y conoce todas mis funciones.\n\n> ** • ' + client.commands.filter(c => c.category === 'Utilidad 💡' && c.vip === false && c.owner === false).map(c => c.name).join('**\n> ** • ') + '**\n\n')
                              
                                ],
                                components: [fila1, fila2]
                        
                            }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
              
                        } else if (int.customId === 'exit') {
                        
                            m.delete().catch((e) => console.log('Error al eliminar mensaje de help: '+e))
    
                        }
              
                    });
              
                    collector.on('end', (collected, reason) => {
                      
                        if(collected.size < 1) return m.edit({
                        
                            components: []
                      
                        }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })
        
                        console.log('El collect del help finalizó por: '+reason)
                      
                    });
                  
                }).catch((e) => { 
            
                            var tableerror = new AsciiTable()

                            tableerror.setHeading('Campos','Valores')
                            tableerror.addRow('ERROR', e)
                            tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                            tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                            tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                            tableerror.addRow('FECHA', new Date())

                            console.log(tableerror.toString())
                        
                        })

            } else{

                return message.reply({ embeds: [

                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setColor('RED')
                    .setDescription('<a:Verify2:931463492677017650> | No se encontró ningún comando con ese nombre o alias!')
            
                ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => { 
            
                    var tableerror = new AsciiTable()

                    tableerror.setHeading('Campos','Valores')
                    tableerror.addRow('ERROR', e)
                    tableerror.addRow('AUTOR', message.author.username + ' (' + message.author.id + ')')
                    tableerror.addRow('SERVIDOR', message.guild.name + ' (' + message.guild.id + ')')
                    tableerror.addRow('CANAL', message.channel.name + ' (' + message.channel.id + ')')
                    tableerror.addRow('FECHA', new Date())

                    console.log(tableerror.toString())
                        
                })
            
            }

        }
        

    }

}
