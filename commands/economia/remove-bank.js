const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'remove-bank',
    aliases: ['removebank','remove-banco'],
    description: '🔴 Sólo para administradores.',
    use: '<prefix><name> <@user/id> <cantidad>',
    category: 'Economía 💰',
    vip: false,
    owner: true,
  
    async execute(client, message, args, Discord) { 

        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
        if(!permiso) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes Permisos para usar este comando.')

        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
  
        let miembro = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if(!miembro) return message.reply({embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Debes mencionar o colocar id de algún usuario!')
      
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(miembro.user.bot) return message.reply({embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes quitarle dinero a un bot!`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        let usuario1

        try {

            usuario1 = await userSchema.findOne({ idusuario: miembro.id })
        
            while(!usuario1){
 
                let user = await userSchema.create({

                    idusuario: miembro.id,
                    username: miembro.username

                })

                user.save();
                console.log('Usuario Registrado ===> Id: '+ miembro.id + ' Username: ' + miembro.username)

                usuario1 = await userSchema.findOne({ idusuario: miembro.id })

            }
            
        } catch (error) {

            console.log('Error al encontrar usuario: '+error)
            return message.reply('No se encontró al usuario mencionado, por favor, asegúrese de mencionar correctamente o de ingresar una ID válida.').catch((e) => console.log('Error al enviar mensaje: '+e))
            
        }

        if(isNaN(parseInt(args[1]))) return message.reply({embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Pon una cantidad, solo puedo retirar números.`)
        
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        let monto = parseInt(args[1])

        try {

            let update = await userSchema.findOneAndUpdate({idusuario: miembro.id},
                {

                    banco: usuario1.banco - monto,
                    total: usuario1.total - monto

                })

            update.save()

            const e = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ monto.toLocaleString('en-US') + ' del banco de <@'+miembro.id+'>')
            .setTimestamp()
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]}).catch((e) => console.log('Error al enviar mensaje: '+e))

            
        } catch (error) {

            console.log('Error al retirar dinero del banco del usuario: '+miembro.id+' - Error: '+error)
            return message.reply('No se agregó el monto correctamente, por favor, inténtelo de nuevo.').catch((e) => console.log('Error al enviar mensaje: '+e))
            
        }

    }

}