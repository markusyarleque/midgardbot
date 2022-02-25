const { Collection } = require('mongoose');
const autoSchema = require('../../models/autoSchema');
const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'add-cc',
    aliases: ['add-auto'],
    description: '💻 Agregar autorespuestas personalizables.',

    async execute(client, message, args, Discord) {
        
        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
        if(!permiso) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | No tienes Permisos para usar este comando. Solo Administradores!')

        ]});

        let trigger, response

        trigger = args[0]
        response = args.slice(1).join(" ")

        console.log('========================= REGISTRO DE AUTORESPUESTAS =========================');
        
        try {
            
            let auto = await autoSchema.create({

                trigger: trigger,
                response: response,

            })

            auto.save();
            console.log('Autorespuesta Registrada ===> Trigger: '+ trigger + ' Response: ' + response)

            const e = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL()})
            .setColor('GREEN')
            .setDescription('<a:Verify1:931463354357276742> | Se agregó correctamente la autorespuesta: \n\n> **Trigger:** `'+trigger+'`\n> **Response:** `'+response+'`')
            .setTimestamp()
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]})

        } catch (error) {
            
            console.log('No se agregó autorespuesta : '+ error)

        }
                
        console.log('========================= REGISTRO DE AUTORESPUESTAS =========================');
   
    }

}