const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'cock-fight',
    aliases: ['cf'],
    description: '🐤 Apuesta en las peleas de pollos y gana más coins.\n `'+prefix+'cf <cantidad | all>`',
  
    async execute(client, message, args, Discord) { 

        let buscarUsuario = await userSchema.findOne({idusuario: message.author.id})

        if(!buscarUsuario || buscarUsuario.ck < 1) return message.reply({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No cuentas con tu propio pollito! Adquiere uno usando el comando `'+prefix+'buy ck`')
        
        ]})

        if(buscarUsuario.ck >= 1){

            if(!args[0]) return message.reply({embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto para apostar!`)
  
            ]})

            if(buscarUsuario.dinero === 0) return message.reply({embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                .setColor('RED')
                .setDescription('<a:Verify2:931463492677017650> | No tienes dinero para apostar! Primero debes retirar un monto.')
  
            ]})
  
            if(buscarUsuario.dinero < parseInt(args[0])) return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para apostar. Actualmente tienes <a:money:930397094924124180> `+ buscarUsuario.dinero.toLocaleString('en-US'))
  
            ]})

            let chance = Math.floor(Math.random()*11)

            if(args[0].toLowerCase() === 'all'){

                if(chance > 5){

                    try {

                        let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                            {
                
                                dinero: buscarUsuario.dinero + buscarUsuario.dinero,
                                total: buscarUsuario.total + buscarUsuario.dinero
                
                            });
            
                        update.save();
                            
                    } catch (error) {
            
                        console.log('Error al actualizar dinero del ck: '+error)
                            
                    }
          
                    const e = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                    .setColor('GREEN')
                    .setDescription(`<a:Verify1:931463354357276742> |Tu pollito ganó la pelea y obtuviste <a:money:930397094924124180> `+ (buscarUsuario.dinero*2).toLocaleString('en-US'))
                    .setTimestamp()
                    .setFooter(`Probabilidad obtenida: ${chance}0%`)
          
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

                } else {

                    try {

                        let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                            {
                
                                dinero: buscarUsuario.dinero - buscarUsuario.dinero,
                                total: buscarUsuario.total - buscarUsuario.dinero,
                                ck: 0
                
                            });
            
                        update.save();
                            
                    } catch (error) {
            
                        console.log('Error al actualiza dinero del ck: '+error)
                            
                    }

                    const e = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> |Tu pollito murió 💀 y perdiste toda la apuesta!`)
                    .setTimestamp()
                    .setFooter(`Probabilidad obtenida: ${(chance)}0%`)
          
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})
                
                }
          
            } else {
  
                if(isNaN(parseInt(args[0]))) return message.reply({embeds: [
  
                    new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido para apostar!`)
  
                ]})
  
                let numero = parseInt(args[0])

                if(chance > 5){

                    try {

                        let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                            {
                
                                dinero: buscarUsuario.dinero + numero,
                                total: buscarUsuario.total + numero
                
                            });
            
                        update.save();
                            
                    } catch (error) {
            
                        console.log('Error al actualiza dinero del ck: '+error)
                            
                    }

                    const e = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                    .setColor('GREEN')
                    .setDescription(`<a:Verify1:931463354357276742> |Tu pollito ganó la pelea y obtuviste <a:money:930397094924124180> `+ (numero*2).toLocaleString('en-US'))
                    .setTimestamp()
                    .setFooter(`Probabilidad obtenida: ${chance}0%`)
          
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

                } else {

                    try {

                        let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                            {
                
                                dinero: buscarUsuario.dinero - numero,
                                total: buscarUsuario.total - numero,
                                ck: 0
                
                            });
            
                        update.save();
                            
                    } catch (error) {
            
                        console.log('Error al actualiza dinero del ck: '+error)
                            
                    }

                    const e = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184143224643615/cf.gif?width=330&height=251')
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> |Tu pollito murió 💀 y perdiste toda la apuesta!`)
                    .setTimestamp()
                    .setFooter(`Probabilidad obtenida: ${(chance)}0%`)
          
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})
          
                }
  
            }
      
        }

    }

}