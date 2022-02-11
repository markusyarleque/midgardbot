module.exports =  {
    
    name: 'morse',
    aliases: [],
    description: '🌐 Convierte un texto en código Morse o viceversa.',
  
    async execute(client, message, args, Discord) {

        let alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
		let morse = '\n,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----'.split(',')
		let text = args.join(' ').toUpperCase()
        let title

        console.log('First text : '+text)
        while (text.includes('Ä') || text.includes('Ö') || text.includes('Ü')) {
            
            text = text.replace('Ä', 'AE').replace('Ö', 'OE').replace('Ü', 'UE')
            
        }

        if (text.startsWith('.') || text.startsWith('-')) {

			//Separar el texto morse en array
			text = text.split(' ');
			//Longitud
			let length = text.length;
			//Convertir a texto normal usando un loop
			for (let i = 0; i < length; i++) {

				text[i] = alpha[morse.indexOf(text[i])];

			}

			//Volver a unir
			text = text.join('');
            title = '💫 Morse a Texto'

		} else {

			//Lo mismo. Separar
			text = text.split('');
			let length = text.length;
			//Convertir a morse

			for (let i = 0; i < length; i++) {

				text[i] = morse[alpha.indexOf(text[i])];
                console.log('Texto: '+text[i]+' - Morse: '+morse[alpha.indexOf(text[i])])

			}

			text = text.join(' ');
            console.log('After text: '+text)
            title = '💫 Texto a Morse'

		}
        
        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://c.tenor.com/Q17dDRR4Dd8AAAAC/morse-code.gif')
        .setAuthor(`Midgard's Fun`,message.guild.iconURL({ dynamic: true }))
        .setTitle(title)
        .setDescription('Solicitado por: '+message.author.username+'#'+message.author.discriminator)
        .addField('Texto:', '```'+ args.join(' ') + '```', true)
        .addField('Morse:', '```' + text + '```', true)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
		message.channel.send({ embeds: [embed]});
        
    }

}