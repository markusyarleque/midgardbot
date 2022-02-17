const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'hug',
    aliases: ['abrazar','abrazo'],
    description: '🤗 Da un abrazo a un miembro del servidor.',
  
    async execute(client, message, args, Discord) { 
        
        var hug = [
        
            'https://media.discordapp.net/attachments/853500788848853002/873282724784386048/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282738441031780/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282749954420816/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282761681678416/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282769642475530/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282778911891526/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282789020143686/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282796213391431/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282801007493120/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873282807412187136/10.gif'
    
        ]
    
        var hug2 = [
            
            'https://media.discordapp.net/attachments/853500788848853002/873284896544673814/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284905105235968/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284910025175080/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284913078603776/14.gif?width=749&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873284925615403088/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284932531789835/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284936424099920/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284942535196682/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284951703953489/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873284958205141002/20.gif'
    
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhug = hug[Math.floor(Math.random()*hug.length)]
        let ramdonhug2 = hug2[Math.floor(Math.random()*hug2.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** se está abrazando a sí mismo.`)
            .setImage(ramdonhug2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Gracias por ese abrazo, lo necesitaba! <:burbujita:930399322183458867>`)
          
            ]})
          
        } else {

            let usuario2 = await userSchema.findOne({idusuario: img.id})
            let text

            if(!usuario2){
 
                let user = await userSchema.create({

                    idusuario: img.id,
                    username: img.username,
    
                })
    
                user.save();
                console.log('Usuario Registrado ===> Id: '+ img.id + ' Username: ' + img.username)
    
            }

            let update = await userSchema.findOneAndUpdate({idusuario: img.id},
                {

                    hug: usuario2.hug + 1
            
                });
            
            update.save()

            if((usuario2.hug + 1) === 1){
                
                text = '**'+(usuario2.hug + 1)+'** abrazo'

            } else{
            
                text = '**'+(usuario2.hug + 1)+'** abrazos'
          
            }
        
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está abrazando a **${img.user.username}**. <:burbujita:925927258789666826>\n<a:flechad:880330587678838784> *${img.user.username}* ha recibido ${text} en total.`)
            .setImage(ramdonhug)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] });
      
        }

    }

}