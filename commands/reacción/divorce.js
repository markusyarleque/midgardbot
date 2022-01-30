const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports =  {
    
    name: 'divorce',
    aliases: [],
    description: '💔 Divórciate de tu pareja.',
  
    async execute(client, message, args, Discord) { 

        var divorce = [

            'https://c.tenor.com/2ik7IJDoQrQAAAAC/divorce.gif',
            'https://c.tenor.com/Cx_Ds0yy8CcAAAAC/divorce-kim.gif',
            'https://media4.giphy.com/media/l1KcP7rHsbSlIeAw0/giphy.gif',
            'https://media1.giphy.com/media/YWm8PxAIcJ6sgLF7nj/giphy.gif',
            'https://i2.wp.com/expatpanda.com/wp-content/uploads/2018/11/tenor-1.gif?fit=320%2C320&ssl=1'
          
        ]

        var acepta = [

            'https://c.tenor.com/IC8h3gIj074AAAAM/casada-boda.gif',
            'https://c.tenor.com/1J5kkT96dcAAAAAC/up-si-quiero.gif',
            'https://img.buzzfeed.com/buzzfeed-static/static/2018-02/21/12/asset/buzzfeed-prod-fastlane-02/anigif_sub-buzz-15864-1519234329-2.gif',
            'https://i.pinimg.com/originals/47/f2/62/47f262da64e177792047d045e815c695.gif',
            'https://media.giphy.com/media/l2SpYryWKODJq0isM/giphy.gif',
            'https://media0.giphy.com/media/UJG50B8TJD5Mk/giphy.gif',
            'https://media.giphy.com/media/3U0NmWYS4O1kQ/giphy.gif',
            'https://img.wattpad.com/5c1f2d47198a28aa862ed794c57a45beb4320f01/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f357a34634f544b4f6578517157673d3d2d3536313838373434352e313532356232626563346134316131393730373132373031383732332e676966',
            'http://i.giphy.com/xT4uQiN5Knf0Gwhzfq.gif',
            'https://luciasecasa.com/contents/uploads/2019/10/13_razones_2.gif'
          
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdond = divorce[Math.floor(Math.random()*divorce.length)]
        let ramdona = acepta[Math.floor(Math.random()*acepta.length)]
      
        if (!img || img.id===message.author.id) return message.reply({embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Divorciarte de ti mismo? <:procesando:932177969017925632>`)
      
        ]})

        if (img.user.bot) return message.reply({embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Divorciarte de un bot? <:procesando:932177969017925632>`)
      
        ]})

        let usuario1 = await userSchema.findOne({ idusuario: message.author.id })
        let usuario2 = await userSchema.findOne({ idusuario: img.id })

        if(!usuario1){
 
            let user = await userSchema.create({

              idusuario: message.author.id,
              username: message.author.username,

            })

            user.save();
            console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

        }

        if(!usuario2){
 
            let user = await userSchema.create({

                idusuario: img.id,
                username: img.username,

            })

            user.save();
            console.log('Usuario Registrado ===> Id: '+ img.id + ' Username: ' + img.username)

        }

        if(usuario1.marry !== 'Soltero(a)' ){
        
            if(usuario1.marry === img.id) {

                message.reply({ allowedMentions: { repliedUser: false}, 
                    
                    embeds: [
            
                        new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
                        .setTitle('💔 Propuesta de Divorcio 💔')
                        .setDescription(message.author.toString()+' ¿Estás seguro de querer divorciarte de '+img.toString()+" ?")
                        .setTimestamp(new Date())
                        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
          
                    ],
                    
                    components: [
                        
                        new MessageActionRow().addComponents([
              
                            new MessageButton()
                            .setCustomId("accept")
                            .setLabel("SI")
                            .setStyle("SUCCESS"),
              
                            new MessageButton()
                            .setCustomId("deny")
                            .setLabel("NO")
                            .setStyle("DANGER")
            
                        ])
          
                    ]
         
                }).then(async m => {
        
                    let filter = int => int.isButton() && int.user.id == message.author.id 
        
                    const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000 });
         
                    collector.on("collect", async int => {
            
                        int.deferUpdate();
            
                        if (int.customId === "accept") {

                            try {

                                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                                    {
                        
                                        marry: 'Soltero(a)'
                        
                                    });
                      
                                update.save();
                      
                                let update2 = await userSchema.findOneAndUpdate({ idusuario: img.id },
                                    {
                        
                                        marry: 'Soltero(a)'
                        
                                    });
                      
                                update2.save();

                                m.edit({
                                
                                    embeds: [
                    
                                        new Discord.MessageEmbed()
                                        .setColor('RANDOM')
                                        .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
                                        .setTitle('🖤 Divorcio Completado 🤵')
                                        .setDescription('💥 Felicidades!!! '+message.author.toString() + " Te has divorciado correctamente de "+img.toString()+" 🔥")
                                        .setImage(ramdond)
                                        .setTimestamp(new Date())
                                        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
                  
                                    ], components: []
                  
                                });
                                
                            } catch (error) {

                                console.log('Error al divorciarse - '+message.author.id+' y '+img.id+' - Error: '+error)
                                return message.reply('Hubo un error interno. Por favor, inténtelo de nuevo.')
            
                            }
   
                        } else if (int.customId === "deny") {
              
                            m.edit({
                                
                                embeds: [
                
                                    new Discord.MessageEmbed()
                                    .setColor('RANDOM')
                                    .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
                                    .setTitle('❤ Divorcio Rechazao 💟')
                                    .setDescription('Aún hay esperanzas en el amor... '+message.author.toString() + " aún sigues casado con "+img.toString()+" <:tierno:931433334960160799>")
                                    .setImage(ramdona)
                                    .setTimestamp(new Date())
                                    .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
              
                                ], components: []
              
                            });
            
                        }
          
                    });
    
                    collector.on("end", (collected, reason) => {
            
                        if(collected < 1) return m.edit({components: []});
             
                        console.log('Razón del término de colección de divorce: '+reason)
         
                    });
         
                });

            } else {

                message.reply({embeds: [

                    new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor('RED')
                    .setDescription(`<:GatoLove:925929538863628318> | No estás casado(a) con **`+img.user.username+'** <:yonofui:931433119859503194>')
         
                ]})
        
            }

        } else {

            message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription('<a:Verify2:931463492677017650> | No puedes divorciarte porque no estás casado con alguien!!!')
        
            ]})

        }

    }

}