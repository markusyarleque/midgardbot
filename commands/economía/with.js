const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'with',
    aliases: ['retirar','wd'],
    description: '🏧 Retira tu dinero del banco.\n `_with <cantidad | all>`',
  
    async execute(client, message, args, Discord) { 

        let buscarUsuario

        try {

            buscarUsuario = await userSchema.findOne({ idusuario: message.author.id })
            
        } catch (error) {

            console.log('Error al obtener usuario: '+error)
            return message.reply('Ha ocurrido un error inesperado. Vuelva a ejecutar el comando.')
            
        }

        if(!buscarUsuario){

            let user = await userSchema.create({

                idusuario: message.author.id,
                username: message.author.username

            })

            user.save();
            console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

        }

        if(!args[0]) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto a retirar!`)

        ]}) 

        else if(buscarUsuario.banco === 0) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para retirar!`)

        ]})

        else if(buscarUsuario.banco < parseInt(args[0])) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para retirar. Actualmente tienes en tu banco <a:money:930397094924124180> `+ buscarUsuario.banco.toLocaleString('en-US'))

        ]})

        if(args[0].toLowerCase() === 'all'){

            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
    
                        dinero: buscarUsuario.dinero + buscarUsuario.banco,
                        banco: 0
    
                    });

                update.save();
                
            } catch (error) {

                console.log('Error al retirar todo el dinero: '+error)
                
            }
        
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ buscarUsuario.banco.toLocaleString('en-US')+ ' del banco')
            .setTimestamp()
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

        } else {

            if(isNaN(parseInt(args[0]))) return message.reply({embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido para retirar!`)

            ]})

            let numero = parseInt(args[0])

            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
    
                        dinero: buscarUsuario.dinero + numero,
                        banco: buscarUsuario.banco - numero
    
                    })

                update.save()
                
            } catch (error) {

                console.log('Error al retirar '+numero+' : '+error)

            }
        
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936184144441000017/with.gif?width=150&height=150')
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ numero.toLocaleString('en-US') + ' del banco')
            .setTimestamp()
          
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

        }

    }

}