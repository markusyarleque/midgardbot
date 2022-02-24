const Discord = require('discord.js');
const Canvas = require('canvas')

module.exports = {

    name: 'banner',
    description: '🔎 Muestra el banner de un usuario en el servidor.',
    options: [
        { 

            name: 'usuario', 
            description: 'Menciona a un usuario', 
            type: 'USER',
            require: 'false',

        },
    ],

    run: async (client, interaction) => {
        
        const wait = require('util').promisify(setTimeout)

        try {
            
            const u = interaction.options.getUser('usuario')
            let usuario

            if(u){

                usuario = u

            } else {

                usuario = interaction.user

            }

            let user = await client.users.fetch(usuario.id, {force: true})

            let canvas = Canvas.createCanvas(966, 70); //Creamos un nuevo canvas.

            let ctx = canvas.getContext("2d");

            if (!user.hexAccentColor && !user.bannerURL() || user.bot) {
    
                const e = new Discord.MessageEmbed()
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | El usuario (${user.username}) no tiene un banner o un color personalizado.!`)
                
                await interaction.deferReply();
                await wait(500);
                await interaction.editReply({ embeds: [e]})
        
            } else {

                ctx.fillStyle = (await user).hexAccentColor;

                ctx.fillRect(0, 0, canvas.width, canvas.height);
  
                let img = await canvas.toBuffer();

                if(!user.bannerURL()){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ files: 
                        
                        [{

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
                            .setAuthor({ name: 'Color de '+user.tag, iconURL: interaction.guild.iconURL({ dynamic: true })})
                            .setThumbnail(user.displayAvatarURL({ dynamic: true}))
                            .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'}),
                            
                        ],

                    })

                } else {

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ 
            
                        embeds: [
                          
                            new Discord.MessageEmbed() 
                            .setDescription('[Click aquí]('+`${user.bannerURL({size: 2048, dynamic: true})}`+')')
                            .setTitle('Imagen completa')
                            .setImage(user.bannerURL({size: 2048, dynamic: true}))
                            .setColor(`COLOR_CUSTOM`)
                            .setTimestamp(new Date())
                            .setAuthor({ name: 'Banner de '+user.tag, iconURL: interaction.guild.iconURL({ dynamic: true })})
                            .setThumbnail(user.displayAvatarURL({ dynamic: true}))
                            .setFooter({ text: `${interaction.guild.name}`,iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'}),
                        
                        ],
                    
                    });
                }
            
            }

        } catch (error) {
            
            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo!', ephemeral: true})
            
            console.log('Error en el SC banner: '+error)

        }

    }

}