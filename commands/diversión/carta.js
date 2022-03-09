const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'carta',
    aliases: ['md','confession','confesión','dedicatoria'],
    description: '📩 Envía una carta, confesión o dedicatoria al md de un usuario del servidor. Para más información, ejecuta el comando `'+prefix+'carta`.',
  
    async execute(client, message, args, Discord) {

        const CARTA_TIEMPO_MIN = 2;
        const CARTA_TIEMPO_MAX = 5;

        const MENSAJE_AYUDA_CARTA = new Discord.MessageEmbed()
        .setDescription('<a:fijadito:931432134797848607> Carta - Envia una carta a otro usuario <:abby:931432327354155038>')
        .addField('<a:flech:931432469935312937> Uso: ','`carta <tag> <mensaje>`')
        .addField('<a:flech:931432469935312937> Argumentos: ','- tag: El tag del usuario / @user / id\n- mensaje: El mensaje que deseas enviar.\n\n-Si deseas que aparezca tu nombre, solo coloca `-n` al final del mensaje.')
        .setColor('RANDOM')
        .setFooter({ text: 'Utiliza con moderación el comando, caso contrario, serás reportado en la lista negra del Bot!', iconURL: `https://c.tenor.com/Gh9SFp64h8wAAAAC/banned-and-you-are-banned.gif` })

        if (args.length < 2) { 
        
            message.reply({embeds: [MENSAJE_AYUDA_CARTA]});
    
        } else {
    
            var target = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            
            var mensaje = args.slice(1).join(" ")
    
            if (!target) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Error: No se ha encontrado al destinatario!`)
      
            ]})
    
            if (target.id === message.author.id) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Error: No puedes autoenviarte una carta!`)
      
            ]})
        
            if (target.user.bot) return message.reply({ embeds: [

                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Error: No puedes enviarle a un bot!`)
      
            ]})
    
            var tiempo = Math.random() * (CARTA_TIEMPO_MAX - CARTA_TIEMPO_MIN) + CARTA_TIEMPO_MIN;
    
            const embcarta = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setTitle(`📩 | Cartas & Dedicatorias 💕`)
            .setDescription(target.user.username + ' Te ha llegado una **dedicatoria** <:tierno:931433334960160799>\n\n<a:flech:931432469935312937> *Enviado por:*\n<a:corazones_fn:906775240795901982> **'+ message.author.username+'**\n\n<a:fijadito:931432134797848607>\n```'+mensaje.substring(0, mensaje.length - 2)+'```\n')
            //.setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
    
            const embcartano = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(target.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setTitle(`📩 | Cartas & Dedicatorias 💕`)
            .setDescription(target.user.username + ' Te ha llegado una **dedicatoria** <:tierno:931433334960160799>\n\n<a:flech:931432469935312937> *Enviado por:*\n<a:corazones_fn:906775240795901982> **Anónimo**\n\n<a:fijadito:931432134797848607>\n```'+mensaje+'```\n')
            //.setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
    
            if(message.content.endsWith('-n'))
            {
                setTimeout(() => {
    
                    target.user.send({embeds: [embcarta]})
                    .then(() => console.log('Carta enviada con éxito!'))
                    .catch(err => message.channel.send("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))
                    
                }, tiempo * 60 * 1000)
    
            } else {
    
                setTimeout(() => {
    
                    target.user.send({embeds: [embcartano]})
                    .then(() => console.log('Carta enviada con éxito!'))
                    .catch(err => message.channel.send("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))
    
                }, tiempo * 60 * 1000)
    
            }
    
            const joto = new Discord.MessageEmbed()
            .setDescription(`Tu carta está en proceso de envío, puede tardar entre ${CARTA_TIEMPO_MIN} a ${CARTA_TIEMPO_MAX} minutos. Gracias por utilizar nuestros servicios! 💕`)
            .setColor('RANDOM')
    
            message.channel.send({embeds: [joto]})
            message.delete({timeout: 100})
            
            console.log("[Cartas][Client/Event/message] Mensaje esperando " + tiempo +  " minutos");
    
        }

    }

}