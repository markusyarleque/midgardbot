module.exports =  {
    
    name: 'poll',
    aliases: ['encuesta'],
    description: '📈 Realizar una encuesta con hasta 10 opciones.\n`_poll - pregunta - opción1 - opción2 - opción3 [opcional]...`',
  
    async execute(client, message, args, Discord) {

        const split = args.slice(1).join(' ').split('-');

        if(!split[0]) return message.reply({embeds: [
      
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:alerta:932374957206421614> `|` Ingrese una pregunta!\n\n Uso: `_poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    
        ]})

        if(!split[1]) return message.reply({embeds: [
      
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:alerta:932374957206421614> `|` Necesitas ingresar al menos 2 opciones!\n\n Uso: `_poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    
        ]})

        if(!split[2]) return message.reply({embeds: [
      
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:alerta:932374957206421614> `|` Necesitas ingresar al menos 2 opciones!\n\n Uso: `_poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    
        ]})

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Encuesta realizada por: <@${message.author.id}>`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle('**' + split[0] + '**')
        .addField('<a:uno:932368116749594674> **' + split[1] + '**', '..........')
        .addField('<a:dos:932368203458445362> **' + split[2] + '**', '..........')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        if (split[3]) embed.addField('<a:tres:932368254335340614> **' + split[3] + '**', '..........');
        
        if (split[4]) embed.addField('<a:cuatro:932368291249397780> **' + split[4] + '**', '..........');
    
        if (split[5]) embed.addField('<a:cinco:932368321578426449> **' + split[5] + '**', '..........');
    
        if (split[6]) embed.addField('<a:seis:932368350187757671> **' + split[6] + '**', '..........');
    
        if (split[7]) embed.addField('<a:siete:932368376909693008> **' + split[7] + '**', '..........');
    
        if (split[8]) embed.addField('<a:ocho:932368405372223528> **' + split[8] + '**', '..........');
    
        if (split[9]) embed.addField('<a:nueve:932368436774981642> **' + split[9] + '**', '..........');

        if (split[10]) return message.reply({embeds: [
      
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:alerta:932374957206421614> `|` Demasiadas opciones. Solo puedes ingresar 9!')
    
        ]})

        setTimeout(() => message.delete(), 100);

        if (!split[3]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');

            });

        } else if (!split[4]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');

            });

        } else if (!split[5]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');

            });
    
        } else if (!split[6]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');
                message.react('<a:cinco:932368321578426449>');

            });
    
        } else if (!split[7]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');
                message.react('<a:cinco:932368321578426449>');
                message.react('<a:seis:932368350187757671>');

            });
    
        } else if (!split[8]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');
                message.react('<a:cinco:932368321578426449>');
                message.react('<a:seis:932368350187757671>');
                message.react('<a:siete:932368376909693008>');

            });
    
        } else if (!split[9]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');
                message.react('<a:cinco:932368321578426449>');
                message.react('<a:seis:932368350187757671>');
                message.react('<a:siete:932368376909693008>');
                message.react('<a:ocho:932368405372223528>');

            });
    
        } else if (!split[10]){

            message.channel.send({ embeds: [embed] }).then(async function(message) {

                message.react('<a:uno:932368116749594674>');
                message.react('<a:dos:932368203458445362>');
                message.react('<a:tres:932368254335340614>');
                message.react('<a:cuatro:932368291249397780>');
                message.react('<a:cinco:932368321578426449>');
                message.react('<a:seis:932368350187757671>');
                message.react('<a:siete:932368376909693008>');
                message.react('<a:ocho:932368405372223528>');
                message.react('<a:nueve:932368436774981642>');

            });
    
        }

    }

}