const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'berenjena',
    aliases: ['pito','banana'],
    description: '😈 Descubre cuánto te mide y registra tu récord.',
    use: '<prefix><name> [@user/id]',
    category: 'Diversión 🤣',
    vip: false,
    owner: false,
  
    async execute(client, message, args, Discord) {

        let users = message.mentions.users.first()

        if(!users){

            try {
          
                users = await client.users.fetch(args[0])

            } catch (error) {

                users = message.author
          
            }

        }

        if(users.bot) return message.reply({ embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | **¿En serio quieres ver cuánto me mide?**...Los bots somos poderosos por algo! <a:ositovino:932917500218339379>`)
      
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        const random = Math.floor(Math.random() * 26);
      
        let heard = '';
        let image = '';

        if(random === 25){
          
            heard='🤤';
            image='https://i.imgur.com/OWdkZzU.gif';
    
        } else if(random < 25 && random > 20){
          
            heard='😎';
            image='https://i.imgur.com/9T3I5Xj.gif';
    
        } else if(random < 20 && random > 15){
          
            heard='😲';
            image='https://i.imgur.com/sRDEaKz.gif';
    
        } else if(random < 15 && random > 10){
          
            heard='🤨';
            image='https://i.imgur.com/pURCHiL.gif';
    
        } else if(random < 10 && random > 5){
          
            heard='😬';
            image='https://i.imgur.com/5gsRdLH.gif';
    
        } else if(random < 5 && random > 0){
          
            heard='🤡';
            image='https://i.imgur.com/1jk66IM.gif';
    
        } else if(random === 0){
          
            heard='🚩';
            image='https://i.imgur.com/XUSvnYx.gif';
    
        }
  
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Love`, iconURL: client.user.avatarURL({ dynamic: true }) })
        .setTitle(`¿Cuánto te mide? 🍆`)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/MNWYvup.gif' })

        if(!users || users.id === message.author.id){
          
            embed.setDescription(`${heard} ¡La berenjena de **${message.author.username}** mide **${random}** centímetros! ${heard}`)
            .setImage(`${image}`)
            
            let buscarUsuario = await userSchema.findOne({ idusuario: message.author.id })

            if(buscarUsuario){

                if(random > buscarUsuario.berenjena){

                    try {
    
                        let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                            {
                                berenjena: random,
                            })
        
                        update.save().then(() => {
                            
                            console.log('Se actualizó registro de berenjena. Usuario: ' + message.author.id + ' - Marca: ' + random)
                            
                            embed.addField('¡Que Grande!','> <@' + message.author.id + '> acaba de superar su registro anterior <:mmm:932177122968076338>\n> ***¿Crees poder superarlo?***')
                            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar embed de berenjena: '+e))
                        
                        }).catch(e => console.log('Error al actualizar registro de berenjena: '+e))
                        
                    } catch (error) {
        
                        console.log('Error al actualizar berenjena. Usuario: '+message.author.id+' - Error: '+error)
                        
                    }

                } else{
                    
                    embed.addField('¡Vaya!','> Nada mal, pero no lograste superar tu mayor registro de `' + buscarUsuario.berenjena + ' cm` <:668957583889137664:882761465101180960>\n> ***¡No te rindas, aún puedes obtener más!***')
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar embed de berenjena: '+e))
                        
                }
    
            } else {
    
                let user = await userSchema.create({
    
                    idusuario: message.author.id,
                    username: message.author.username,
                    berenjena: random
    
                })
    
                user.save().then(() => {
                   
                    console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
    
                    embed.addField('¡OMG!','> <@' + message.author.id + '> acaba de realizar su primer registro <:mmm:932177122968076338>\n> ***¡Es hora de seguir buscando un Nuevo Registro!***')
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar embed de berenjena: '+e))
                
                }).catch(e => console.log('Error al actualizar registro de berenjena: '+e))
                
            }

        } else {

            let buscarUsuario = await userSchema.findOne({ idusuario: users.id })

            if(buscarUsuario){

                const random = buscarUsuario.berenjena

                if(random === 25){
          
                    heard='🤤';
                    image='https://i.imgur.com/OWdkZzU.gif';
            
                } else if(random < 25 && random > 20){
                  
                    heard='😎';
                    image='https://i.imgur.com/9T3I5Xj.gif';
            
                } else if(random < 20 && random > 15){
                  
                    heard='😲';
                    image='https://i.imgur.com/sRDEaKz.gif';
            
                } else if(random < 15 && random > 10){
                  
                    heard='🤨';
                    image='https://i.imgur.com/pURCHiL.gif';
            
                } else if(random < 10 && random > 5){
                  
                    heard='😬';
                    image='https://i.imgur.com/5gsRdLH.gif';
            
                } else if(random < 5 && random > 0){
                  
                    heard='🤡';
                    image='https://i.imgur.com/1jk66IM.gif';
            
                } else if(random === 0){
                  
                    heard='🚩';
                    image='https://i.imgur.com/XUSvnYx.gif';
            
                }            
                
                embed.setDescription(`${heard} ¡La berenjena de **${users.username}** mide **${random}** centímetros! ${heard}`)
                .setImage(`${image}`)
                    
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar embed de berenjena: '+e))
              
            } else {
               
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [

                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Vaya, no encuentro a <@` + users.id + '> en mis registros!')
                    .setTimestamp()

                ] }).catch((e) => console.log('Error al enviar mensaje: '+e))
          
            }
      
        }

    }

}