module.exports =  {
    
    name: 'bachata',
    aliases: [],
    description: '💘',
  
    async execute(client, message, args, Discord) {

        var bachata = [

            'https://media.discordapp.net/attachments/853500788848853002/873276689512296558/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276703626121246/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276721560948736/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276739990749314/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276749511819354/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276757724266526/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276769191489596/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276779127775252/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276791282868264/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276794428612668/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276801135300718/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276811637846056/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276819997085736/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873276834622632007/14.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonbachata = bachata[Math.floor(Math.random()*bachata.length)]
       
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`Miren a **${message.author.username}** como disfruta esa bachata.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿Quieres ver como bailo? <:nogarsias:932172183453712415>`)
          
            ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, está bachateando con ${message.author.username}.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
           
            message.channel.send({ embeds: [embed] });
      
        }

    }

}