const Discord = require('discord.js');
const Canvas = require('canvas')

module.exports = {

    name: 'conteo',
    description: '⏳ Realizar una cuenta regresiva.',
    options: [
        { 

            name: 'número', 
            description: 'Ingresa un número', 
            type: 'INTEGER',
            require: 'true',

        },
    ],

    run: async (client, interaction) => {
        
        const wait = require('util').promisify(setTimeout)

        try {

            const time = interaction.options.getInteger('número');

            if(time <= 0){

                const e = new Discord.MessageEmbed()
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | **Ingresa solo número mayores a 0**`)
        
                await interaction.deferReply({ephemeral: true});
                await wait(500);
                await interaction.editReply({ embeds: [e], ephemeral: true})

            } else {

                if(time <= 10){

                    const e = new Discord.MessageEmbed()
                    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | **No puedo contar menos de 10 segundos**`)
            
                    await interaction.deferReply({ephemeral: true});
                    await wait(500);
                    await interaction.editReply({ embeds: [e], ephemeral: true})
    
                } else {

                    if(time > 7200){

                        const e = new Discord.MessageEmbed()
                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                        .setColor('RED')
                        .setDescription(`<a:Verify2:931463492677017650> | **No puedo contar más de 2 horas**`)
                
                        await interaction.deferReply({ephemeral: true});
                        await wait(500);
                        await interaction.editReply({ embeds: [e], ephemeral: true})
        
                    } else {

                        await interaction.deferReply();
                        await wait(500);
                        await interaction.editReply(String(time))
        
                        if(time < 60) {
                    
                            let count1 = setInterval(async () => {
                    
                                await interaction.editReply(time <= 0 ? `Se acabó el tiempo ⌛` : String(time))
                                time <= 0 ? interaction.editReply(`${interaction.user.username}... El conteo regresivo, ha llegado a su fin.`) : time
                                time <= 0 ? clearInterval(count1) : time -= 2;
                                
                            }, 2000)
                
                        } else {
                    
                            let count2 = setInterval(async () => {
                    
                                await interaction.editReply(time <= 0  ? `... Se acabó el tiempo ⌛` : String(time))
                                time <= 0 ? interaction.editReply(`${interaction.user.username}... El conteo regresivo, ha llegado a su fin.`) : time
                                time <= 0 ? clearInterval(count2) : time -= 3
                    
                            }, 3000)
                            
                        }

                    }

                }

            }
            
        } catch (error) {
            
            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo!', ephemeral: true})
            
            console.log('Error en el SC conteo: '+error)

        }

    }

}