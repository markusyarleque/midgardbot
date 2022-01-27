const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'dep',
    aliases: ['depositar'],
    description: '🏦 Deposita tu dinero en el banco.',
  
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
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto a depositar!`)

        ]}) 
        
        else if(buscarUsuario.dinero === 0) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para depositar!`)

        ]})

        else if(buscarUsuario.dinero < parseInt(args[0])) return message.channel.send({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para depositar. Actualmente tienes <a:money:930397094924124180> `+ buscarUsuario.dinero)

        ]})

        if(args[0].toLowerCase() === 'all'){

            await client.db.run(`UPDATE usuarios SET dinero=0, banco=banco + ? WHERE idusuario=?`, buscarUsuario.dinero, message.author.id)
        
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ buscarUsuario.dinero+ ' al banco')
            .setTimestamp()
        
            message.channel.send({embeds: [e]})

        } else {

        if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido a depositar!`)

          ]})

        let numero = parseInt(args[0])
  
        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, banco=banco+? WHERE idusuario=?`, numero, numero, message.author.id)
  
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ numero + ' al banco')
          .setTimestamp()
          
        message.channel.send({embeds: [e]})

      }

    }

}