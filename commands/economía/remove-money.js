const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'remove-money',
    aliases: ['removemoney','remove-dinero'],
    description: '🔴 Sólo para administradores.',
  
    async execute(client, message, args, Discord) { 

        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
        if(!permiso) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes Permisos para usar este comando.')

        ]});
  
        let miembro = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if(!miembro) return message.reply({embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Debes mencionar o colocar id de algún usuario')
      
        ]})

        if(miembro.user.bot) return message.reply({embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes quitarle dinero a un bot!`)
        
        ]})

        try {

            let usuario1 = await userSchema.findOne({ idusuario: miembro.id })
        
            if(!usuario1){
 
                let user = await userSchema.create({

                    idusuario: miembro.id,
                    username: miembro.username

                })

                user.save();
                console.log('Usuario Registrado ===> Id: '+ miembro.id + ' Username: ' + miembro.username)

            }
            
        } catch (error) {

            console.log('Error al encontrar usuario: '+error)
            return message.reply('No se encontró al usuario mencionado, por favor, asegúrese de mencionar correctamente o de ingresar una ID válida.')
            
        }

        if(isNaN(parseInt(args[1]))) return message.reply({embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Pon una cantidad, solo puedo quitar números.`)
        
        ]}).then(m => setTimeout(() => m.delete(), 5000));
    
        let monto = parseInt(args[1])

        try {

            let update = await userSchema.findOneAndUpdate({idusuario: miembro.id},
                {

                    dinero: usuario1.dinero - monto,
                    total: usuario1.total - monto

                })

            update.save()

            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ monto.toLocaleString('en-US') + ' del balance de <@'+miembro.id+'>')
            .setTimestamp()
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

            
        } catch (error) {

            console.log('Error al retirar dinero al usuario: '+miembro.id+' - Error: '+error)
            return message.reply('No se retiró el monto correctamente, por favor, inténtelo de nuevo.')
            
        }

    }

}