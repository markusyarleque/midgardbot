const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'top',
    aliases: ['lb'],
    description: '📊 Muestra el Top de economía y stats.\n `'+prefix+'top <cash | xp | rep | pat | hug | sape>`',

    async execute(client, message, args, Discord) {

        var server = message.guild;

        const bEco = new Discord.MessageButton()
        .setCustomId('economia')
        .setLabel('Economía')
        .setStyle('PRIMARY')
        .setEmoji('930397094924124180')

        const bCash = new Discord.MessageButton()
        .setCustomId('cash')
        .setLabel('Cash')
        .setStyle('PRIMARY')
        .setEmoji('930404747326914590')

        const bXp = new Discord.MessageButton()
        .setCustomId('xp')
        .setLabel('XP')
        .setStyle('PRIMARY')
        .setEmoji('930399379800592394')

        const bRep = new Discord.MessageButton()
        .setCustomId('rep')
        .setLabel('Rep')
        .setStyle('PRIMARY')
        .setEmoji('930399275643453500')

        const bPat = new Discord.MessageButton()
        .setCustomId('pat')
        .setLabel('Pat')
        .setStyle('PRIMARY')
        .setEmoji('930399873113677834')

        const bHug = new Discord.MessageButton()
        .setCustomId('hug')
        .setLabel('Hug')
        .setStyle('PRIMARY')
        .setEmoji('930399322183458867')

        const bSape = new Discord.MessageButton()
        .setCustomId('sape')
        .setLabel('Sape')
        .setStyle('PRIMARY')
        .setEmoji('932177727589589013')

        let lista = await userSchema.find().sort({total: -1}).limit(10)

        if(!lista) return message.channel.send({embeds:[
          
            new Discord.MessageEmbed()
            .setAuthor(`MidgardBot`+' | Top Global 🏦', client.user.avatarURL())
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
                
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
 
        embed.setAuthor(`MidgardBot`+' | Top Global 🏦', client.user.avatarURL())
        embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
        embed.setDescription(datos.join('\n\n'))   	
        embed.setColor("RANDOM")
        embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
        
        message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed], components:
            [

                new Discord.MessageActionRow()
                .addComponents(bEco.setDisabled(true),bCash,bXp,bRep,bPat,bHug,bSape)

            ]
        
        }).then(async m => {
      
            let filter = int => int.isButton() && int.user.id == message.author.id 
       
            const collector = m.createMessageComponentCollector({ filter, time: 60000 });
        
            collector.on("collect", async int => {
          
                int.deferUpdate();
       
                if (int.customId === "xp") {
            
                    //await int.followUp({ content: '<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en 12 horas para reclamar tu recompensa diaria. No olvides de activar los mensajes directos!', ephemeral: true})
                    
                    let lista = await userSchema.find().sort({exp: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
            
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top XP ⭐', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp.setDisabled(true),bRep,bPat,bHug,bSape)
        
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

                    embed.setAuthor(`MidgardBot`+' | Top XP ⭐', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp.setDisabled(true),bRep,bPat,bHug,bSape)
        
                    ]});
  
                }

                if(int.customId === "cash"){

                    let lista = await userSchema.find().sort({dinero: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
            
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Cash 💵', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash.setDisabled(true),bXp,bRep,bPat,bHug,bSape)
        
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
 
                    embed.setAuthor(`MidgardBot`+' | Top Cash 💵', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash.setDisabled(true),bXp,bRep,bPat,bHug,bSape)
        
                    ]});

                }

                if(int.customId === "rep"){

                    let lista = await userSchema.find().sort({rep: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
            
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Carisma 💟', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep.setDisabled(true),bPat,bHug,bSape)
        
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
 
                    embed.setAuthor(`MidgardBot`+' | Top Carisma 💟', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
          
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep.setDisabled(true),bPat,bHug,bSape)
        
                    ]});

                }

                if(int.customId === "pat"){

                    let lista = await userSchema.find().sort({pat: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
                
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Pats ❣', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat.setDisabled(true),bHug,bSape)
        
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
     
                    embed.setAuthor(`MidgardBot`+' | Top Pats ❣', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat.setDisabled(true),bHug,bSape)
        
                    ] });
    
                }

                if(int.customId === "hug"){

                    let lista = await userSchema.find().sort({hug: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
                
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Abrazos 🤗', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat,bHug.setDisabled(true),bSape)
        
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
     
                    embed.setAuthor(`MidgardBot`+' | Top Abrazos 🤗', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat,bHug.setDisabled(true),bSape)
        
                    ] });
    
                }

                if(int.customId === "sape"){
                    
                    let lista = await userSchema.find().sort({sape: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
                
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Sapes 🤡', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat,bHug,bSape.setDisabled(true))
        
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
     
                    embed.setAuthor(`MidgardBot`+' | Top Sapes 🤡', client.user.avatarURL())
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048 }))
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
              
                    m.edit({ embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco,bCash,bXp,bRep,bPat,bHug,bSape.setDisabled(true))
        
                    ]});
    
                }

                if(int.customId === "economia"){

                    let lista = await userSchema.find().sort({total: -1}).limit(10)

                    if(!lista) return m.edit({embeds:[
                      
                        new Discord.MessageEmbed()
                        .setAuthor(`MidgardBot`+' | Top Global 🏦', client.user.avatarURL())
                        .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
                        .setColor("RANDOM")
                        .setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
                            
                    ], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco.setDisabled(true),bCash,bXp,bRep,bPat,bHug,bSape)
        
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
             
                    embed.setAuthor(`MidgardBot`+' | Top Global 🏦', client.user.avatarURL())
                    embed.setThumbnail(first.displayAvatarURL({dynamic: true, size: 2048}))
                    embed.setDescription(datos.join('\n\n'))   	
                    embed.setColor("RANDOM")
                    embed.setFooter(server.name,server.iconURL({ dynamic: true, size: 2048 }))
                    
                    m.edit({embeds: [embed], components: [

                        new Discord.MessageActionRow()
                        .addComponents(bEco.setDisabled(true),bCash,bXp,bRep,bPat,bHug,bSape)
        
                    ]})
                }
  
            });
  
            collector.on("end", (collected,reason) => {
          
                if(collected < 1) return m.edit({components: []})

                console.log('Razón del término de colección: '+reason)

            });
        
        })

    }

}