const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'dep',
    aliases: ['depositar'],
    description: '🏦 Deposita tu dinero en el banco.\n `'+prefix+'dep <cantidad | all>`',
  
    async execute(client, message, args, Discord) { 

        let buscarUsuario = await userSchema.findOne({idusuario: message.author.id})

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
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto a depositar!`)

        ]}) 
        
        else if(buscarUsuario.dinero === 0) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para depositar!`)

        ]})

        else if(buscarUsuario.dinero < parseInt(args[0])) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para depositar. Actualmente tienes <a:money:930397094924124180> `+ buscarUsuario.dinero.toLocaleString('en-US'))

        ]})

        if(args[0].toLowerCase() === 'all'){

            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
    
                        dinero: 0,
                        banco: buscarUsuario.banco + buscarUsuario.dinero
    
                    });

                update.save();
                
            } catch (error) {

                console.log('Error al depositar todo el dinero: '+error)
                
            }

            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ buscarUsuario.dinero.toLocaleString('en-US')+ ' al banco')
            .setTimestamp()
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

        } else {

            if(isNaN(parseInt(args[0]))) return message.reply({embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido a depositar!`)

            ]})

            let numero = parseInt(args[0])
  
            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
    
                        dinero: buscarUsuario.dinero - numero,
                        banco: buscarUsuario.banco + numero
    
                    })

                update.save()
                
            } catch (error) {

                console.log('Error al depositar '+numero+' : '+error)

            }

            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399566622820/dep.gif?width=176&height=176')
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ numero.toLocaleString('en-US') + ' al banco')
            .setTimestamp()
          
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

        }

    }

}