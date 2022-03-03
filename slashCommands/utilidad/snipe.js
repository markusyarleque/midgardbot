const Discord = require('discord.js');

module.exports = {

    name: 'snipe',
    description: '🔻 Recupera el último mensaje eliminado.',
    options: [
        { 

            name: 'número', 
            description: '¿Qué número de snipe, deseas recuperar?', 
            type: 'INTEGER',
            required: 'false',

        },
        { 

            name: 'canal', 
            description: '¿De qué canal deseas recuperar?', 
            type: 'CHANNEL',
            required: 'false',

        }
    ],

    run: async (client, interaction) => {
        
        const wait = require('util').promisify(setTimeout)

        try {

            const conf = interaction.guild.channels.cache.find(ch => ch.id === '881432157602611230');

            let num = interaction.options.getInteger('número');
            let channel = interaction.options.getChannel('canal') || interaction.channel

            if(channel === conf){
                
                const e = new Discord.MessageEmbed()
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Así te quería atrapar puerco! <:ojooo:931434369283944468> ¡No puedes hacer eso aquí! <:burbuja:925928080680292352>`)
        
                await interaction.deferReply({ephemeral: true});
                await wait(500);
                await interaction.editReply({ embeds: [e], ephemeral: true})
                  
            } else {


                const snipes = client.snipes.get(channel.id);

                if (!snipes){
          
                    const e = new Discord.MessageEmbed()
                    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | No se ha borrado recientemente ningún mensaje!`)
        
                    await interaction.deferReply({ephemeral: true});
                    await wait(500);
                    await interaction.editReply({ embeds: [e], ephemeral: true})
            
                } else {
    
                    const snipe = +num - 1 || 0
                    const targer = snipes[snipe]
    
                    if(!targer){

                        const e = new Discord.MessageEmbed()
                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                        .setColor('RED')
                        .setDescription('<a:Verify2:931463492677017650> | **Solamente hay** `'+snipes.length+'` **snipes**')
        
                        await interaction.deferReply({ephemeral: true});
                        await wait(500);
                        await interaction.editReply({ embeds: [e], ephemeral: true})
            
                    } else {

                        const {msg, time, image, canal} = targer
        
                        const imgdelete = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL()})
                        .setImage(image)
                        .setTimestamp(new Date())
                        .setDescription(`> \`Mensaje eliminado:\` ${msg.content}\n\n__**Información Extra**__\n\n> \`Tiempo:\` <t:${Math.floor(time / 1000)}:R>\n> \`Canal:\` ${msg.channel}\n> \`Snipe número:\` **${snipe + 1} / ${snipes.length}**`)
                        
                        await interaction.deferReply();
                        await wait(500);
                        await interaction.editReply({ embeds: [imgdelete] })
            
                    }
    
                }

            }
            
            
        } catch (error) {
            
            await interaction.deferReply({ephemeral: true});
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo! ', ephemeral: true})
            
            console.log('Error en el SC snipe: '+error)

        }

    }

}