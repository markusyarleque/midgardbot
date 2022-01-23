module.exports =  {
    
    name: 'roll',
    aliases: [],
    description: '🔢 Saca un número al azar.',
  
    async execute(client, message, args, Discord) {

        if(!args[0])
        {

            var num = Math.floor(Math.random() * 100 + 1)

            const embed = new Discord.MessageEmbed() 
            .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`🔢 **${message.author.username}** ha tirado un dado de (**100**) y ha obtenido un **${num}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });

        } else {

            var num = Math.floor(Math.random() * args[0] + 1)

            const embed = new Discord.MessageEmbed() 
            .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`🔢 **${message.author.username}** ha tirado un dado de (**${args[0]}**) y ha obtenido un **${num}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });

        }

    }

}