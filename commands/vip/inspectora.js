module.exports =  {
    
    name: 'inspectora',
    aliases: ['inspeccciones','inspeccionar'],
    description: '👓 Revisa tus niveles según Inspectora',
  
    async execute(client, message, args, Discord) { 

        let id = ['753435606410985573','683501310527668228']

        if(!id.some(id => message.author.id == id)) return

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0])) || message.author
        
        var extra = [
            
            'Hot **24/7** 🥵',
            'Pendejitis aguda',
            'Creyó en su ex 🤡',
            'Es la **perfección**',
            'Huele a obo 🤢',
            '**No** se baña',
            'Puro meco le hace caso 🤠',
            'Se cree un **monumento** 🐸',
            'Llora por todo',
            '**Re simp** 🥺',
            '🌺 Huele a flores',
            'Le gusta la **pizza con piña** 🤮',
            'Drama **24/7**',
            'Toma puro FourLoko 🥴',
            'Le gustan los 🌿 marihuanos',
            'Puro **naik** pirata 🌝',
            'Perreo **24/7** 😈',
            'Ya duérmete mejor',
            'Fuma puro 🚬 pallmall de pepino 🥒',
            '**Tu que wey?**',
            'Lame botas 👢 le llaman',
            '*Indescriptible*… aun procesando ⚙️',
            'Hijito de mami 🥺',
            'Hijito de papi 🐣',
            'Hijito de mami 🐣',
            'Hijito de papi 🥺',
            'Muy hot 🔥 para calcular',
            'Huele a podrido 🤢',
            'Se cree la verga 🤡….. ||no lo es||',
           
        ]

        let fidelidad = Math.floor(Math.random() * 101)
        let lealtad = Math.floor(Math.random() * 101)
        let sinceridad = Math.floor(Math.random() * 101)
        let lindura = Math.floor(Math.random() * 101)
        let dramas = Math.floor(Math.random() * 101)
        let toxicidad = Math.floor(Math.random() * 101)
        let ramdonextra = extra[Math.floor(Math.random()*extra.length)]
    
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Inspecciones 📊`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTittle('Inspección realizada con éxito 🧬')
        .setThumbnail(img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png'))
        .setDescription(`Según ***Inspectora*** <a:ayajasisi:945203356140441650>, tus niveles son los siguientes: `)
        .addField('Nivel de fidelidad:','<a:flech:915156906258071554> ' + fidelidad, false)
        .addField('Nivel de lealtad:','<a:flech:915156906258071554> ' + lealtad, false)
        .addField('Nivel de sinceridad:','<a:flech:915156906258071554> ' + sinceridad, false)
        .addField('Nivel de lindura:','<a:flech:915156906258071554> ' + lindura, false)
        .addField('Nivel de dramas:','<a:flech:915156906258071554> ' + dramas, false)
        .addField('Nivel de toxicidad:','<a:flech:915156906258071554> ' + toxicidad, false)
        .addField('\u200B','\u200B')
        .addField('Información extra:', '> ' + ramdonextra )
        .setImage('https://www.ina-pidte.ac.cr/pluginfile.php/14399/mod_resource/content/15/images/ima_2.gif?crc=3941956428')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })

       
        message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}