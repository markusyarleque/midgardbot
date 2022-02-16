const Canvas = require('canvas')

module.exports =  {
    
    name: 'banner',
    aliases: ['cartel'],
    description: '🔎 Muestra el banner de un usuario en el servidor.',

    async execute(client, message, args, Discord) {

        let usuario = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0])) || message.author;

        let canvas = Canvas.createCanvas(966, 70); //Creamos un nuevo canvas.

        let ctx = canvas.getContext("2d");

        let user = await client.users.fetch(usuario.id, {force: true})

        if (!user.hexAccentColor && !user.bannerURL() || user.bot) {
    
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | El usuario (${img.username}) no tiene un banner o un color personalizado.!`)
        
            return message.reply({ embeds: [e]})
    
        }

        ctx.fillStyle = (await user).hexAccentColor;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        let img = await canvas.toBuffer();

        if(!user.bannerURL()) return message.reply({ allowedMentions: { repliedUser: false}, 
            
            files: [{
              
                attachment: img,
                name: "hex.png"

            }],
            
            embeds: [
              
                new Discord.MessageEmbed() 
                .setImage("attachment://hex.png")
                .setTitle('El usuario no tiene un banner pero aquí esta su color personalizado!')
                .setColor(user.hexAccentColor)
                .setDescription(`${user.hexAccentColor.toUpperCase()}`) 
                .setTimestamp(new Date())
                .setAuthor('Color de '+user.tag, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(user.displayAvatarURL({ dynamic: true}))
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'),
            
            ],
          
        });

        message.reply({ allowedMentions: { repliedUser: false}, 
            
            embeds: [
              
                new Discord.MessageEmbed() 
                .setDescription('[Click aquí]('+`${user.bannerURL({size: 2048, dynamic: true})}`+')')
                .setTitle('Imagen completa')
                .setImage(user.bannerURL({size: 2048, dynamic: true}))
                .setColor(`COLOR_CUSTOM`)
                .setTimestamp(new Date())
                .setAuthor('Banner de '+user.tag, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(user.displayAvatarURL({ dynamic: true}))
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'),
            
            ],
        
        });

    }

}