module.exports =  {
    
    name: 'ron',
    aliases: [],
    description: '🥃',
  
    async execute(client, message, args, Discord) {

        var ron = [

            'https://media.discordapp.net/attachments/853500788848853002/873266014559809536/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266031114743888/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266053608788028/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266065948438598/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266085435154502/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266090082455582/6.gif?width=562&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873266105542660156/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266116103929866/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266127617261608/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873266135775207454/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonron = ron[Math.floor(Math.random()*ron.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está celebrando con un roncito.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman ron! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${img.user.username}**, agradécele a ${message.author.username} porque te está invitando un ron.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })

        }

    }

}