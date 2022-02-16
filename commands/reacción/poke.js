const anime = require('anime-actions')

module.exports =  {
    
    name: 'poke',
    aliases: ['molestar','fastidiar'],
    description: '🙄 ¡Molestar!.',
  
    async execute(client, message, args, Discord) { 

        let poke = await anime.poke()
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
   
        if (!img || img.id === message.author.id) {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** no me molestes <:gatoNojao:930403164266565642>`)
            .setImage(poke)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] });

        } else if (img.user.bot){
        
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Molesta a <:estaaa:887059768710135839>`)
        
            ]})
        
        } else {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está fastidiando a **${img.user.username}** <:gatoNojao:930403164266565642>`)
            .setImage(poke)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.channel.send({ embeds: [embed] });

        }

    }

}