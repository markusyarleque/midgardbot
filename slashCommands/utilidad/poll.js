const Discord = require('discord.js');

module.exports = {

    name: 'poll',
    description: '📈 Realizar una encuesta con hasta 10 opciones.',
    options: [
        { 

            name: 'título', 
            description: 'Ingresa el título de la Encuesta', 
            type: 'STRING',
            required: 'true',

        },
        { 

            name: 'opciónA', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónB', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónC', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónD', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónE', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónF', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónG', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónH', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónI', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónJ', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
    ],

    run: async (client, interaction) => {
        
        const wait = require('util').promisify(setTimeout)

        try {

            let title = interaction.options.getString('título');
            let o1 = interaction.options.getString('opciónA');
            let o2 = interaction.options.getString('opciónB');
            let o3 = interaction.options.getString('opciónC');
            let o4 = interaction.options.getString('opciónD');
            let o5 = interaction.options.getString('opciónE');
            let o6 = interaction.options.getString('opciónF');
            let o7 = interaction.options.getString('opciónG');
            let o8 = interaction.options.getString('opciónH');
            let o9 = interaction.options.getString('opciónI');
            let o10 = interaction.options.getString('opciónJ');

            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({ name: `Encuesta realizada por: ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTitle('**' + title + '**')
            .setTimestamp(new Date())
            .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})

            if(!o1 || !o2 || !o3){

                embed.addField('<a:uno:932368116749594674> **Sí**', '..........')
                embed.addField('<a:dos:932368203458445362> **No**', '..........')
                
                await interaction.deferReply();
                await wait(500);
                await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                    i.react('<a:uno:932368116749594674>');
                    i.react('<a:dos:932368203458445362>');
    
                });

            } else {

                if(o3){

                    embed.addField('<a:tres:932368254335340614> **' + o3 + '**', '..........');

                } else if(o4){

                    embed.addField('<a:cuatro:932368291249397780> **' + o4 + '**', '..........');

                } else if(o5){

                    embed.addField('<a:cinco:932368321578426449> **' + o5 + '**', '..........');

                } else if(o6){

                    embed.addField('<a:seis:932368350187757671> **' + o6 + '**', '..........');

                } else if(o7){

                    embed.addField('<a:siete:932368376909693008> **' + o7 + '**', '..........');

                } else if(o8){

                    embed.addField('<a:ocho:932368405372223528> **' + o8 + '**', '..........');

                } else if(o9){

                    embed.addField('<a:nueve:932368436774981642> **' + o9 + '**', '..........');

                } else if(o10){

                    embed.addField('🅰 **' + o10 + '**', '..........');

                }

                if(!o4){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
    
                    });

                } else if(!o5){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
    
                    });

                } else if(!o6){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
    
                    });

                } else if(!o7){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
                        i.react('<a:seis:932368350187757671>');
    
                    });

                } else if(!o8){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
                        i.react('<a:seis:932368350187757671>');
                        i.react('<a:siete:932368376909693008>');
    
                    });

                } else if(!o9){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
                        i.react('<a:seis:932368350187757671>');
                        i.react('<a:siete:932368376909693008>');
                        i.react('<a:ocho:932368405372223528>');
    
                    });

                } else if(!o10){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
                        i.react('<a:seis:932368350187757671>');
                        i.react('<a:siete:932368376909693008>');
                        i.react('<a:ocho:932368405372223528>');
                        i.react('<a:nueve:932368436774981642>');
    
                    });

                } else {
                 

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:uno:932368116749594674>');
                        i.react('<a:dos:932368203458445362>');
                        i.react('<a:tres:932368254335340614>');
                        i.react('<a:cuatro:932368291249397780>');
                        i.react('<a:cinco:932368321578426449>');
                        i.react('<a:seis:932368350187757671>');
                        i.react('<a:siete:932368376909693008>');
                        i.react('<a:ocho:932368405372223528>');
                        i.react('<a:nueve:932368436774981642>');
                        i.react('🅰');

                    });
                    
                }

            }
            
        } catch (error) {
            
            await interaction.deferReply();
            await wait(500);
            await interaction.editReply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado. Por favor, inténtelo de nuevo!', ephemeral: true})
            
            console.log('Error en el SC poll: '+error)

        }

    }

}