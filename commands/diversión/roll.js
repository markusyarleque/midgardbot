module.exports =  {
    
    name: 'roll',
    aliases: [],
    description: '🔢 Saca un número al azar.',
  
    async execute(client, message, args, Discord) {

        if(!args[0])
        {

            var num = Math.floor(Math.random() * 101)

            const embed = new Discord.MessageEmbed() 
            .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`🔢 **${message.author.username}** ha tirado un dado de (**100**) y ha obtenido un **${num}**`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

        } else {

            if(isNaN(args[0])) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [

                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido!`)
      
            ]})

            var num = Math.floor(Math.random() * args[0])

            const embed = new Discord.MessageEmbed() 
            .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`🔢 **${message.author.username}** ha tirado un dado de (**${args[0]}**) y ha obtenido un **${num}**`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });

        }

    }

}