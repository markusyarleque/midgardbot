module.exports =  {
    
    name: 'perreo',
    aliases: ['twerk'],
    description: '🍑',
  
    async execute(client, message, args, Discord) {

        var perreo = [

            'https://media.discordapp.net/attachments/853500788848853002/873274148300927046/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274158027513866/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274169305997373/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274177619111966/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274193976897596/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274205532213298/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274214302486538/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274228147892264/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274256765644820/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274270090936340/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274285500805190/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274309915848774/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274322964332594/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274336100900916/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274377234427914/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274402081492992/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873274419089395722/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/877026220661944370/19.gif?width=432&height=243',
            'https://media.discordapp.net/attachments/853500788848853002/877026227356074004/20.gif?width=252&height=448',
            'https://media.discordapp.net/attachments/853500788848853002/877026237346885662/21.gif?width=432&height=432',
            'https://media.discordapp.net/attachments/853500788848853002/877026242707202088/22.gif?width=432&height=243',
            'https://media.discordapp.net/attachments/853500788848853002/877026250777051186/23.gif?width=297&height=294',
            'https://media.discordapp.net/attachments/853500788848853002/877026259887079504/24.gif?width=372&height=219',
            'https://media.discordapp.net/attachments/853500788848853002/877026271266230292/25.gif?width=237&height=418',
            'https://media.discordapp.net/attachments/853500788848853002/877026284578959400/26.gif?width=432&height=331',
            'https://media.discordapp.net/attachments/853500788848853002/877026293949034526/27.gif?width=297&height=297',
            'https://media.discordapp.net/attachments/853500788848853002/877026307911843850/28.gif?width=294&height=226',
            'https://media.discordapp.net/attachments/853500788848853002/877026322193457192/29.gif?width=486&height=246',
            'https://media.discordapp.net/attachments/853500788848853002/877026333287407696/30.gif?width=432&height=243',
            'https://media.discordapp.net/attachments/822642787555213312/916055772859863110/31.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055773522583563/32.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055774193668136/33.gif?width=262&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/916055774902517840/34.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055775120613466/35.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055775623909416/36.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055775946879006/37.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055776311795773/38.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055776638947430/39.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055777435861052/40.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055841424158830/41.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055841738752091/42.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055842070077491/43.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055842355310682/44.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055842653081630/45.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055843517136957/46.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055844200800296/47.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916055844557291520/48.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078739903897661/50.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078787152740432/51.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078787614085140/52.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078788209696828/53.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078788830441493/54.gif?width=293&height=468',
            'https://media.discordapp.net/attachments/822642787555213312/916078789589602386/55.gif',
            'https://media.discordapp.net/attachments/822642787555213312/916078790013255700/56.gif?width=411&height=468'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonperreo = perreo[Math.floor(Math.random()*perreo.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está perreando hasta el piso.`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no vamos a fiestas! <:nogarsias:932172183453712415>`)
          
            ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te está perreando duro contra el muro. <a:perreom:930719549131735040>`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] });
      
        }

    }

}