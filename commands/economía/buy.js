const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports =  {
    
    name: 'buy',
    aliases: ['comprar'],
    description: '🛒 Compra un ítem de la tienda.\n `_buy <item>`',

    async execute(client, message, args, Discord) {

        let it = args[0]

        if(!it) return message.reply({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399365316658/buy.gif?width=480&height=320')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Necesitas mencionar un ítem a comprar. Para más detalles ejectua: `_shop`')
        
        ]})

        let buscarUsuario = await userSchema.findOne({ idusuario: message.author.id})

        if(!buscarUsuario) return message.channel.send({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399365316658/buy.gif?width=480&height=320')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item!')
        
        ]})

        if(it.toLowerCase()==='ck' || it.toLowerCase()==='chicken'){

            if(buscarUsuario.dinero < 10) return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399365316658/buy.gif?width=480&height=320')
                .setColor('RED')
                .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item!. Actualmente tienes: <a:money:930397094924124180>'+buscarUsuario.dinero.toLocaleString('en-US'))
          
            ]})

            if(buscarUsuario.ck >= 1) return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription('<a:Verify2:931463492677017650> | Ya cuentas con tu propio pollito!')
          
            ]})

            let update = await userSchema.findOneAndUpdate({idusuario: message.author.id},
                {
                    dinero: buscarUsuario.dinero - 10,
                    total: buscarUsuario.total - 10,
                    ck: 1
                })
            
            update.save();

            return message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de adquirir un pollito!');
  
        }

        if(buscarUsuario.dinero < 10000) return message.channel.send({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399365316658/buy.gif?width=480&height=320')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item! Actualmente tienes: <a:money:930397094924124180>'+buscarUsuario.dinero.toLocaleString('en-US'))
        
        ]})

        let col

        if(it.toLowerCase()==='rojo'){
        
            col = 'RED'
      
        } else if(it.toLowerCase()==='rosa'){
       
            col = 'PINK'
      
        } else if(it.toLowerCase()==='aqua'){
      
            col = 'AQUA'
      
        } else if(it.toLowerCase()==='verde'){
      
            col = 'GREEN'
      
        } else if(it.toLowerCase()==='azul'){
      
            col = 'BLUE'
     
        } else if(it.toLowerCase()==='morado'){
     
            col = 'PURPLE'
     
        } else if(it.toLowerCase()==='dorado'){
     
            col = 'GOLD'
     
        } else if(it.toLowerCase()==='naranja'){
     
            col = 'ORANGE'
     
        } else if(it.toLowerCase()==='gris'){
     
            col = 'GREY'
     
        } else if(it.toLowerCase()==='amarillo'){
     
            col = 'YELLOW'
     
        } else if(it.toLowerCase()==='blanco'){
     
            col = 'WHITE'
     
        } else if(it.toLowerCase()==='negro'){
     
            col = 'BLACK'
     
        } else if(it.toLowerCase()==='fucsia'){
     
            col = 'FUSCHIA'
     
        } else return message.channel.send({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936150399365316658/buy.gif?width=480&height=320')
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa el nombre correcto del item!')
          
        ]})

        let update = await userSchema.findOneAndUpdate({idusuario: message.author.id},
            {
                dinero: buscarUsuario.dinero - 10000,
                total: buscarUsuario.total - 10000,
                color: col
            })
        
        update.save();

        return message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de actualizar el color de tu perfil!');

    }

}