module.exports =  {
    
    name: 'welcome',
    aliases: ['wlc','bienvenido','bienvenida'],
    description: '🤞 Muestra un embed de bienvenida.',

    async execute(client, message, args, Discord) {

        var welcome = [
            'https://media.discordapp.net/attachments/853500788848853002/873245600936788048/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245604090892348/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245605294645308/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245608775917688/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245613217689650/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245612554993704/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245617277796394/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245617672056902/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245622017359962/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873245621820215326/10.gif'
        ]

        let img = message.mentions.users.first()

        if(!img){

            try {
          
            img = await client.users.fetch(args[0])

            } catch (error) {

            img = message.author
          
            }

        }

        if(img.bot) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes darle la bienvenida a un bot!`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        if(!img || img.id===message.author.id) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Debes mencionar o colocar id!`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        let ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
    
        while (!ramdonwelcome || ramdonwelcome === null || ramdonwelcome === '' || ramdonwelcome === undefined) {
            
            ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
            
        }

        const embed = new Discord.MessageEmbed()
        .setThumbnail(img.displayAvatarURL() ? img.displayAvatarURL({ dynamic: true }).replace('webp','png') : client.user.avatarURL({ dynamic: true }) )
        .setTitle(`Bienvenid@ <:abby:931432327354155038> **${img.username}** <a:pepedance:880928616416968745>`)
        .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
        .setImage(ramdonwelcome)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
    
        message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}