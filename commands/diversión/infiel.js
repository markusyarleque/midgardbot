module.exports =  {
    
    name: 'infiel',
    aliases: ['infidelidad'],
    description: '💔 Descubre tu % de infidelidad.',
  
    async execute(client, message, args, Discord) {

        let users = message.mentions.users.first()

        if(!users){

            try {
          
                users = await client.users.fetch(args[0])

            } catch (error) {

                users = message.author
          
            }

        }

        if(users.bot) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | **¿En serio crees que es infiel como tú?**...Los bots son los más leales!`)
      
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        const random = Math.floor(Math.random() * 101);

        let heard = '';
        let image = '';

        if(random === 0){
          
            heard='😎';
            image='https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif';
    
        } else if(random < 20 && random >0){
          
            heard='😲';
            image='https://i.pinimg.com/originals/c2/af/e0/c2afe0dfff01bf12c4ec5ae3b78fefe8.gif';
    
        } else if(random < 50){
          
            heard='🤨';
            mage='https://www.fmdos.cl/wp-content/uploads/2016/02/infiel.gif';
    
        } else if(random < 70){
          
            heard='😬';
            image='https://media0.giphy.com/media/dVzaYGLXkSQjcdljlS/giphy.gif';
    
        } else if(random < 90){
          
            heard='🤥';
            image='https://vanidad.es/images/carpeta_gestor/archivos/2017/03/28/gif-infiel.gif';
    
        } else if(random < 100){
          
            heard='🤡';
            image='https://media.giphy.com/media/eYaRlI7BxVWvK/giphy.gif';
    
        } else if(random === 100){
          
            heard='🚩';
            image='https://c.tenor.com/xV8ISXEKTOUAAAAC/exponiendo-infieles-badabun.gif';
    
        }

        if(!users || users.id === message.author.id){

            if(message.author.id==='753435606410985573')
            {

                const r = Math.floor(Math.random() * 11);
          
                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
                .setTitle(`Nivel de Infidelidad`)
                .setDescription(`${message.author.username} es ${r}% infiel! 😎`)
                .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
            } else {

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
                .setTitle(`Nivel de Infidelidad`)
                .setDescription(`${message.author.username} es ${random}% infiel! ${heard}`)
                .setImage(`${image}`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
          
                message.reply({ allowedMentions: { repliedUser: false},  embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
            
            }

        } else {

            if(users.id==='753435606410985573')
            {

                const r = Math.floor(Math.random() * 11);

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
                .setTitle(`Nivel de Infidelidad`)
                .setDescription(`${users.username} es ${r}% infiel! 😎`)
                .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: ' + e))
        
            } else {

                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Midgard's Love`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
                .setTitle(`Nivel de Infidelidad`)
                .setDescription(`${users.username} es ${random}% infiel! ${heard}`)
                .setImage(`${image}`)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
          
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: ' + e))
          
            }

        }

    }

}