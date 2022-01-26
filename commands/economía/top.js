const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'top',
    aliases: ['lb'],
    description: '📊 Muestra el Top de economía y stats.\n `_top <cash | xp | rep | pat | hug | sape>`',

    async execute(client, message, args, Discord) {

        var server = message.guild;

        if(!args[0]){

            let lista = await userSchema.find().sort({total: -1}).limit(10)

            if(!lista) return message.channel.send({embeds:[
          
                new Discord.MessageEmbed()
                .setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true }))
                .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                .setColor("RANDOM")
                .setFooter(`MidgardBot`,client.user.avatarURL())
                
            ]})

            let embed = new Discord.MessageEmbed()

            let datos = [];

            let c = 1

            for(let ls of lista){

                let usuario = client.users.resolve(ls.idusuario)
          
                datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:930397094924124180> **'+ls.total+'**')
          
                c = c + 1
        
            }
 
            embed.setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true }))
            embed.setDescription(datos.join('\n\n'))   	
            embed.setColor("RANDOM")
            embed.setFooter(`MidgardBot`,client.user.avatarURL())
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

        } else {

            if(args[0].toLowerCase() === 'xp'){

                let lista = await userSchema.find().sort({exp: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()
 
                let datos = [];

                let c = 1

                for(let ls of lista){

                    let usuario = client.users.resolve(ls.idusuario)
            
                    datos.push('**'+c+'.** <@' + usuario.id + '> <a:flech:931432469935312937> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
            
                    c = c + 1
          
                }

                embed.setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`Midgard's VIP`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            } else if(args[0].toLowerCase() === 'cash'){
        
                let lista = await userSchema.find().sort({dinero: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];

                let c = 1

                for(let ls of lista){

                    let usuario = client.users.resolve(ls.idusuario)
            
                    datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:930397094924124180> **'+ls.dinero+'**')
            
                    c = c + 1
          
                }
 
                embed.setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            } else if(args[0].toLowerCase() === 'rep'){
        
                let lista = await userSchema.find().sort({rep: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];

                let c = 1

                for(let ls of lista){

                    try {

                        let usuario = client.users.resolve(ls.idusuario)
            
                        datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.rep+'**')
            
                        c = c + 1
                        
                    } catch (error) {

                        console.log('Error al obtener usuarios de top rep')
                        return
                        
                    }

                }
 
                embed.setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'pat'){
        
                let lista = await userSchema.find().sort({pat: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];

                let c = 1

                for(let ls of lista){

                    let usuario = client.users.resolve(ls.idusuario)
            
                    datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.pat+'**')
            
                    c = c + 1
          
                }
 
                embed.setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'hug'){
        
                let lista = await userSchema.find().sort({hug: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];

                let c = 1

                for(let ls of lista){

                    let usuario = client.users.resolve(ls.idusuario)
            
                    datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.hug+'**')
            
                    c = c + 1
          
                }
 
                embed.setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  else if(args[0].toLowerCase() === 'sape'){
        
                let lista = await userSchema.find().sort({sape: -1}).limit(10)

                if(!lista) return message.channel.send({embeds:[
            
                    new Discord.MessageEmbed()
                    .setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true }))
                    .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                    .setColor("RANDOM")
                    .setFooter(`MidgardBot`,client.user.avatarURL())
          
                ]})

                let embed = new Discord.MessageEmbed()

                let datos = [];

                let c = 1

                for(let ls of lista){

                    let usuario = client.users.resolve(ls.idusuario)
            
                    datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.sape+'**')
            
                    c = c + 1
          
                }
 
                embed.setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true }))
                embed.setDescription(datos.join('\n\n'))   	
                embed.setColor("RANDOM")
                embed.setFooter(`MidgardBot`,client.user.avatarURL())
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

            }  

        }

    }

}