module.exports =  {
    
    name: 'meme',
    aliases: ['memes'],
    description: '😂 Obtén memes al azar.',
  
    async execute(client, message, args, Discord) {

        red({

            subreddit: 'SpanishMeme',
            sort: 'hot',
            allowNSFW: false,
            allowModPost: false,
            allowCrossPost: false,
            allowVideo: false
            
        }).then(
            
            post => {
                    
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
                .setTitle(post.title)
                .setImage(post.url)
                .setColor('RANDOM')
                .setTimestamp(new Date())
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
                if(!post.url){
                        
                    return message.reply({ allowedMentions: { repliedUser: false}, embeds: [

                        new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setColor('RED')
                        .setDescription(`<a:Verify2:931463492677017650> | No encontré memes <:POLQUE:856670987499208775>`)
              
                    ]})
                    
                }else{
                        
                    message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
                    
                }
    
            }
            
        ).catch(
            
            (e) => message.reply({ allowedMentions: { repliedUser: false}, content: 'Hubo un error: ' + e})
            
        )

    }

}