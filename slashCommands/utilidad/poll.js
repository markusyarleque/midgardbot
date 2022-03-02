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

            name: 'opcióna', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónb', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónc', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónd', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opcióne', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónf', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opcióng', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónh', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opcióni', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
        { 

            name: 'opciónj', 
            description: 'Ingresa una opción', 
            type: 'STRING',
            required: 'false',

        },
    ],

    run: async (client, interaction) => {
        
        const wait = require('util').promisify(setTimeout)

        try {

            let title = interaction.options.getString('título');
            let o1 = interaction.options.getString('opcióna');
            let o2 = interaction.options.getString('opciónb');
            let o3 = interaction.options.getString('opciónc');
            let o4 = interaction.options.getString('opciónd');
            let o5 = interaction.options.getString('opcióne');
            let o6 = interaction.options.getString('opciónf');
            let o7 = interaction.options.getString('opcióng');
            let o8 = interaction.options.getString('opciónh');
            let o9 = interaction.options.getString('opcióni');
            let o10 = interaction.options.getString('opciónj');

            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({ name: `Encuesta realizada por: ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTitle('**' + title + '**')
            .setTimestamp(new Date())
            .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})

            if(!o1 || !o2 ){

                embed.addField('<a:letraA:948726710713606214> **Sí**', '..........')
                embed.addField('<a:letraB:948726773938524261> **No**', '..........')
                
                await interaction.deferReply();
                await wait(500);
                await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                    i.react('<a:letraA:948726710713606214>');
                    i.react('<a:letraB:948726773938524261>');
    
                });

            } else {

                embed.addField('<a:letraA:948726710713606214> **' + o1 + '**', '..........')
                embed.addField('<a:letraB:948726773938524261> **' + o2 + '**', '..........')
                
                if(o3){

                    embed.addField('<a:letraC:948727037340827718> **' + o3 + '**', '..........');

                } 
                if(o4){

                    embed.addField('<a:letraD:948727118605459497> **' + o4 + '**', '..........');

                } 
                if(o5){

                    embed.addField('<a:letraE:948727195377999994> **' + o5 + '**', '..........');

                } 
                if(o6){

                    embed.addField('<a:letraF:948727265510981724> **' + o6 + '**', '..........');

                } 
                if(o7){

                    embed.addField('<a:letraG:948727324323508244> **' + o7 + '**', '..........');

                }
                if(o8){

                    embed.addField('<a:letraH:948727421983666276> **' + o8 + '**', '..........');

                } 
                if(o9){

                    embed.addField('<a:letraI:948727492368273439> **' + o9 + '**', '..........');

                } 
                if(o10){

                    embed.addField('<a:letraJ:948727557946245141> **' + o10 + '**', '..........');

                }

                if(!o4){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
    
                    });

                } else if(!o5){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
    
                    });

                } else if(!o6){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
    
                    });

                } else if(!o7){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
                        i.react('<a:letraF:948727265510981724>');
    
                    });

                } else if(!o8){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
                        i.react('<a:letraF:948727265510981724>');
                        i.react('<a:letraG:948727324323508244>');
    
                    });

                } else if(!o9){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
                        i.react('<a:letraF:948727265510981724>');
                        i.react('<a:letraG:948727324323508244>');
                        i.react('<a:letraH:948727421983666276>');
    
                    });

                } else if(!o10){

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
                        i.react('<a:letraF:948727265510981724>');
                        i.react('<a:letraG:948727324323508244>');
                        i.react('<a:letraH:948727421983666276>');
                        i.react('<a:letraI:948727492368273439>');
    
                    });

                } else {
                 

                    await interaction.deferReply();
                    await wait(500);
                    await interaction.editReply({ embeds: [embed]}).then(async function(i) {

                        i.react('<a:letraA:948726710713606214>');
                        i.react('<a:letraB:948726773938524261>');
                        i.react('<a:letraC:948727037340827718>');
                        i.react('<a:letraD:948727118605459497>');
                        i.react('<a:letraE:948727195377999994>');
                        i.react('<a:letraF:948727265510981724>');
                        i.react('<a:letraG:948727324323508244>');
                        i.react('<a:letraH:948727421983666276>');
                        i.react('<a:letraI:948727492368273439>');
                        i.react('<a:letraJ:948727557946245141>');

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