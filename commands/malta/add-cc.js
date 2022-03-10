const { Collection } = require('mongoose');
const autoSchema = require('../../models/autoSchema');
const { Permissions } = require('discord.js');

module.exports =  {
    
    name: 'add-cc',
    aliases: ['add-auto'],
    description: '💻 Agregar autorespuestas personalizables.',

    async execute(client, message, args, Discord) {
        
        let id = ['753435606410985573','683501310527668228']
  
        if(!id.some(id => message.author.id == id)) return message.reply({ embeds: [
                
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription('Solo los Administradores del Bot pueden agregar frases.')
            
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
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
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [e]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } catch (error) {
            
            console.log('No se agregó autorespuesta : '+ error)

        }
                
        console.log('========================= REGISTRO DE AUTORESPUESTAS =========================');
   
    }

}