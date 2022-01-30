const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'top',
    aliases: ['lb'],
    description: '📊 Muestra el Top de economía y stats.\n `'+prefix+'top <cash | xp | rep | pat | hug | sape>`',

    async execute(client, message, args, Discord) {

        var server = message.guild;

        if(!args[0]){

            let lista = await userSchema.find().sort({total: -1}).limit(10)

            if(!lista) return message.channel.send({embeds:[
          
                new Discord.MessageEmbed()
                .setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true, size: 2048 }))
                .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                .setColor("RANDOM")
                .setFooter(`MidgardBot`,client.user.avatarURL())
                
            ]})

            let embed = new Discord.MessageEmbed()

            let datos = []
            let foto = []

            let c = 1

            for(let ls of lista){

                datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:money:930397094924124180> **'+ls.total.toLocaleString('en-US')+'**')
                foto.push(ls.idusuario)
                c = c + 1
        
            }

            let first = client.users.cache.get(foto[0])
 
            embed.setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true, size: 2048 }))
            embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
            embed.setDescription(datos.join('\n\n'))   	
            embed.setColor("RANDOM")
            embed.setFooter(`MidgardBot`,client.user.avatarURL())
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

        } else {

            if(args[0].toLowerCase() === 'xp'){

                let lista = await userSchema.find().sort({exp: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()
 
                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:flech:931432469935312937> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
                    foto.push(ls.idusuario)
                    c = c + 1
          
                }
            
                let first = client.users.cache.get(foto[0])

                embed.setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                embed.setColor("RANDOM")
                embed.setFooter(`Midgard's VIP`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            } else if(args[0].toLowerCase() === 'cash'){
        
                let lista = await userSchema.find().sort({dinero: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:money:930397094924124180> **'+ls.dinero.toLocaleString('en-US')+'**')
                    foto.push(ls.idusuario)

                    c = c + 1
          
                }

                let first = client.users.cache.get(foto[0])
 
                embed.setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            } else if(args[0].toLowerCase() === 'rep'){
        
                let lista = await userSchema.find().sort({rep: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    try {

                        datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:flechad:880330587678838784> **'+ls.rep+'**')
                        foto.push(ls.idusuario)
                        
                        c = c + 1
                        
                    } catch (error) {

                        console.log('Error al obtener usuarios de top rep')
                        return
                        
                    }

                }

                let first = client.users.cache.get(foto[0])
 
                embed.setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'pat'){
        
                let lista = await userSchema.find().sort({pat: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    try {

                        datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:flechad:880330587678838784> **'+ls.pat+'**')
                        foto.push(ls.idusuario)
                        c = c + 1
                        
                    } catch (error) {

                        console.log('Error al obtener usuarios de top rep')
                        return
                        
                    }
          
                }

                let first = client.users.cache.get(foto[0])
 
                embed.setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'hug'){
        
                let lista = await userSchema.find().sort({hug: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    try {

                        datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:flechad:880330587678838784> **'+ls.hug+'**')
                        foto.push(ls.idusuario)

                        c = c + 1
                        
                    } catch (error) {

                        console.log('Error al obtener usuarios de top rep')
                        return
                        
                    }
          
                }

                let first = client.users.cache.get(foto[0])
 
                embed.setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'sape'){
        
                let lista = await userSchema.find().sort({sape: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true, size: 2048 }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];
                let foto = []

                let c = 1

                for(let ls of lista){

                    datos.push('**'+c+'.** <@' + ls.idusuario + '> <a:flechad:880330587678838784> **'+ls.sape+'**')
                    foto.push(ls.idusuario)

                    c = c + 1
          
                }

                let first = client.users.cache.get(foto[0])
 
                embed.setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true, size: 2048 }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048 }))
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  

        }

    }

}