const prefix = process.env.PREFIX;
const Similar = require('string-similarity');
const { Permissions } = require('discord.js');

//& Modelos
const userModel = require('../../models/userSchema');
const blSchema = require('../../models/blSchema');
const autoSchema = require('../../models/autoSchema');
const turnoSchema = require('../../models/turnoSchema');
//& Modelos

module.exports = async (client, Discord, message) => {
    
    if (message.channel.type === 'dm') {

        let sv = client.guilds.cache.get('777620055344545842')
        let channel = sv.channels.cache.get('874943743185285150')
  
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado al dm por: '+message.author).catch((e) => console.log('Error al enviar mensaje del dm al canal: '+e))
    
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
        .setAuthor({ name: 'MaltaBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setTitle('📢 | Mensaje directo')
        .addField('Autor: ', `<a:flech:931432469935312937> ${message.author}`)
        .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `Id: ${message.author.id}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        
        channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje del dm al canal: '+e))
    
    }

    let sv = client.guilds.cache.get('851924635930329098')
    let channel
    let idcanal = message.channel.id
  
    const em = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) )
      .setAuthor({ name: 'MaltaBot', iconURL: client.user.avatarURL({ dynamic: true }) })
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `<a:flech:931432469935312937> <#${idcanal}>`)
      .addField('Autor: ', `<a:flech:931432469935312937> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content : 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter({ text: `Id: ${message.author.id}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
  
    if(idcanal === '880290686107275304')
    {
        channel = sv.channels.cache.get('880267684950999050')
  
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en alto cargo por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
  
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } else if(idcanal === '880292291443556383')
    {
        channel = sv.channels.cache.get('880280405993996339')
    
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en élite por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } else if(idcanal === '840161683732693033')
    {
        channel = sv.channels.cache.get('880280308732272640')
    
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en staff por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } else if(idcanal === '923716261542781018')
    {
        channel = sv.channels.cache.get('933917185695428628')
    
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en supervisores por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
  
    } else if(idcanal === '909722451745837106')
    {
        channel = sv.channels.cache.get('880280346208395305')
    
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en admin por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } else if(idcanal === '870195067338506271')
    {
        channel = sv.channels.cache.get('880280535304372234')
    
        if(message.content.length >= 1000) return channel.send('Mensaje demasiado largo, enviado en chat general por: '+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } else
    {
        var canalrestringidos = [
          '880280265216389140','880267684950999050',
          '880280405993996339', '880280308732272640',
          '880280346208395305', '880280369126051861',
          '880280535304372234', '880280557051858974',
          '933903109305028688', '933917185695428628'
        ]
  
        if(!canalrestringidos.some(id => idcanal == id))
        {
          channel = sv.channels.cache.get('880280265216389140')
      
          if(message.content.length>=1000) return channel.send(`Mensaje demasiado largo, enviado en <#${idcanal}> por: `+message.author).catch((e) => console.log('Error al enviar mensaje: '+e))
      
          em.addField('Servidor: ', `<a:flech:931432469935312937> ${message.guild.name}`)
      
          channel.send({ embeds: [em] }).catch((e) => console.log('Error al enviar mensaje: '+e))
  
        } else {
          return
        }
    
    }
    
    if (message.author.bot) return;

    let userTurno

    if(idcanal === '870195067338506271'){

        try {

            userTurno = await turnoSchema.findOne({idusuario: message.author.id})

            if(userTurno){

                console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
        
                let update = await turnoSchema.findOneAndUpdate({idusuario: message.author.id},
                    {

                        mensajes: userTurno.mensajes + 1

                    })

                update.save()
   
                console.log('Mensajes de Staff de Turno Actualizado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
   
                console.log('========================= ACTUALIZACIÓN DE STAFF DE TURNO =========================');
   
            }

        } catch (error) {

            console.log('Error al Registrar Mensajes de Staff de Turno: '+ error)
      
        }

    }

    autorespuesta = await autoSchema.findOne({trigger: message.content.toLowerCase()})

    if(autorespuesta){

        message.channel.send(autorespuesta.response).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

    if (message.content === 'Hola' || message.content === 'hola' || message.content === 'Holas' || message.content === 'holas'){
          
        message.channel.send('Hola '+message.author.username+', cómo va tu día?').catch((e) => console.log('Error al enviar mensaje: '+e))
  
    }
    if (message.content === 'ola' || message.content === 'Ola' || message.content === 'olas' || message.content === 'Olas'){
  
        message.channel.send('del mar 🌊').catch((e) => console.log('Error al enviar mensaje: '+e))
  
    }
    if (message.content === 'Buen día' || message.content === 'buen día' || message.content === 'Buen dia' || message.content === 'buen dia'){
          
        message.channel.send('Buen día precios@ ❤').catch((e) => console.log('Error al enviar mensaje: '+e))
          
    }
    if (message.content === 'Buenos días' || message.content === 'buenos días' || message.content === 'Buenos dias' || message.content === 'buenos dias'){
          
        message.channel.send('Buenos días precios@ ❤').catch((e) => console.log('Error al enviar mensaje: '+e))
      
    }
    if (message.content === 'Buenas tardes' || message.content === 'buenas tardes'){
          
        message.channel.send('Buenas tardes precios@ ❤').catch((e) => console.log('Error al enviar mensaje: '+e))
          
    }
    if (message.content === 'Buenas noches' || message.content === 'buenas noches'){
          
        message.channel.send('Buenas noches precios@ ❤').catch((e) => console.log('Error al enviar mensaje: '+e))
          
    }
    if (message.content === 'Buenas' || message.content === 'Wenas' || message.content === 'buenas' || message.content === 'wenas'){
            
        message.channel.send('Las tienes <a:perreom:930719549131735040>').catch((e) => console.log('Error al enviar mensaje: '+e))
  
    }
    if (message.content === 'wlc' || message.content === 'Wlc' || message.content === 'welcome' || message.content === 'Welcome'){
          
        message.react(`<a:pasito:877116925291946094>`).catch((e) => console.log('Error al reaccionar: '+e))
        message.react(`<a:cerveza:880635824021065738>`).catch((e) => console.log('Error al reaccionar: '+e))
          
    }
  
    let img = '753435606410985573'
  
    const bSi = new Discord.MessageButton()
        .setCustomId("accept")
        .setLabel("SI")
        .setStyle("SUCCESS")
  
    const bNo = new Discord.MessageButton()
        .setCustomId("deny")
        .setLabel("NO")
        .setStyle("DANGER")
    
    /*if (message.content === 'malta' || message.content === 'Malta' || message.content === 'MALTA' || message.content === 'MAlta' || message.content === 'maltazar' || message.content === 'Maltazar' || message.content === 'MALTAZAR' || message.content === 'MAltazar' || message.content === 'maltazard' || message.content === 'Maltazard' || message.content === 'MALTAZARD' || message.content === 'MAltazard')
    {
    
        message.channel.send({

            content: message.author.toString() + "¿Deseas contactar a Malta?",
            components: [
  
                new Discord.MessageActionRow().addComponents([bSi,bNo])

            ]

        }).then(async m => {
            
            let filter = int => int.isButton() && int.user.id == message.author.id 
             
            const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 300000 });
            
            collector.on("collect", async int => {
                
              int.deferUpdate();
                
              if (int.customId === "accept") {
                  
                m.edit({
                  content: `<@${img}> Te buscan por aquí <:yonofui:931433119859503194>`,
                  components: []
                });
         
              } else if (int.customId === "deny") {
                  
                m.edit({
                  content: "Gracias, si necesitas algo, no dudes en contactarme. <:tierno:931433334960160799>",
                  components: []
                });
                
              }
            });
        
            collector.on("end", (collected, reason) => {
                
              if(collected.size < 1) return m.edit({
                content: "**¡No confirmaste a tiempo!** <:enojado:931434000751394867>",
                components: []
              });

              console.log('Razón del término de colección de Malta: '+reason)
                
            });
              
        });
    }*/
    
    /*let reven = new RegExp(`^<@!?${'710588969557164113'}>( |)$`);
    
    if (message.content.match(reven))
    {
    
        message.channel.send(`𝑬𝒍 𝒖́𝒍𝒕𝒊𝒎𝒐 𝒇𝒊𝒆𝒍 𝒒𝒖𝒆 𝒒𝒖𝒆𝒅𝒂 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒎𝒖𝒏𝒅𝒐 <a:FuegoRojo:882761255381790750>`)
    
    }*/
    
    /*let mencionado = message.guild.members.resolve(message.mentions.users.first())

    if(mencionado)
    {

        if (mencionado.id === '753435606410985573'){
        
            message.channel.send(`¿Qué necesitas de mi dueño? <a:ositovino:880306728867078165>`)
    
        } else if (mencionado.id === '683501310527668228'){

            message.channel.send('Tan al pendiente estás que tienes que hacerme ping? <a:ayajasisi:890684634369777724>')
            
        }

    }*/

    let malta = new RegExp(`^<@!?${'753435606410985573'}>( |)$`)

    if (message.content.match(malta))
    {
    
        message.channel.send(`¿Qué necesitas de mi dueño? <a:ositovino:880306728867078165>`).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }

    let insp = new RegExp(`^<@!?${'683501310527668228'}>( |)$`)

    if (message.content.match(insp))
    {
    
        message.channel.send(`Tan al pendiente estás que tienes que hacerme ping? <a:ayajasisi:890684634369777724>`).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }
  
    let ian = new RegExp(`^<@!?${'603344396351438889'}>( |)$`);
    
    if (message.content.match(ian))
    {
          
        message.channel.send(`<a:megaphone:932192877449191424> Alo? Tierra llamando al **argentino con más flow** <a:darkcrown2:886466286773739530>, Ian en camino bebé <a:bmirusboyrunfast:880411644893724672>`).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }
  
    let ana = new RegExp(`^<@!?${'883633609498570762'}>( |)$`);
    
    if (message.content.match(ana))
    {
            
        message.channel.send(`<:emoji_233:890722279074451506> Días,tardes,noches,madrugadas <:mmsi:925934342016995379> porque Buena está la persona que me acaba de mencionar <a:Zuii:890684724673150996> <a:Ytodomedavuelta:890721775699259422>`).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }
  
    let nia = new RegExp(`^<@!?${'743960732542042203'}>( |)$`);
    
    if (message.content.match(nia))
    {
          
        message.channel.send(`¿¡𝑸𝒖𝒆 𝒏𝒆𝒄𝒆𝒔𝒊𝒅𝒂𝒅 𝒅𝒆 𝒑𝒊𝒏𝒈𝒆𝒂𝒂𝒂𝒂𝒓!? <:gatoNojao:930403164266565642>`).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }
    
    if (message.content === 'piropo' || message.content === 'Piropo')
    {
    
        var piropo = [
            'El amor será ciego, pero hay que ver lo mucho que alegras la vista.','Con esos ojos mirándome, ya no me hace falta la luz del sol.',
            'Por la luna daría un beso, daría todo por el sol, pero por la luz de tu mirada, doy mi vida y corazón.','Si yo fuera un avión y tú un aeropuerto, me la pasaría aterrizando por tu hermoso cuerpo.',
            'Me gusta el café, pero prefiero tener-té.','No eres google, pero tienes todo lo que yo busco.',
            'Mis ganas de ti no se quitan, se acumulan.','Cuando te multen por exceso de belleza, yo pagaré tu fianza.',
            'Si cada gota de agua sobre tu cuerpo es un beso, entonces quiero convertirme en aguacero.','Estás como para invitarte a dormir, y no dormir.',
            'Si tu cuerpo fuera cárcel y tus brazos cadenas, ese sería el lugar perfecto para cumplir condena.','Qué bonitos ojos tienes, tan redondos como el sol, se parecen a los ceros que me pone el profesor.',
            'Eres como la chancha de mi mamá, te veo venir y se me acelera el corazón.','Si lo bonito fuera pecado, tú no tendrías el perdón de Dios.',
            'Ni en clase de matemáticas me perdía tanto como en tu mirada.','Quisiera olvidarte, pero sin el olvi.',
            'Se te ha caído el papel que te envuelve, bombón.','Me gustas más que dormir hasta tarde.',
            '¿Me haces un favor? Sal de mis sueños y entra en mi realidad.','Ni en el mejor libro de recetas se encuentra semejante bombón.',
            '¿Están lloviendo estrellas o solo tú caíste del cielo?','Mi amor, quién fuera cemento para sostener ese monumento.',
            'Si tuviera que regalarte algo, te regalaría un espejo, porque después de este mundo, lo más bonito es tu reflejo.','No me gusta atarme, pero por ti, yo me encadeno.',
            'Eres tan dulce que solo con mirarte engordo.','Si los besos transmiten gérmenes, yo contigo sí empiezo una epidemia.',
            '¿De que panadería te escapaste bizcochito?','Y Dios dijo: «Hágase lo más hermoso del universo» y nació la hermosura que está leyendo esto.',
            'Quien fuera mago para echarte un polvo y desaparecer.','Quisiera ser hamburguesa y que me llenes de mayonesa.',
            'Tienes la sonrisa que quiero darle a mis hijos.','Dios te guarde y me dé la llave.',
            'Ningún «Escribiendo…» me pone tan feliz como el tuyo.','Tú eres Coca Cola y yo un hielito, ¡no me toques que me derrito!',
            '¿Tienes algo que hacer? Podemos hacer turismo por mi cuarto.','Eres como el chocolate, te me antojas a cada ratito.',
            'Perdí mi número de teléfono, ¿me das el tuyo?','Tu amor me ha contagiado, como un virus imposible de curar.',
            'Acabo de perder tres besos bajo tu camiseta, ¿me ayudas a buscarlos?','Que bonito sería despertarme a mitad de noche y verte ahí, a mi lado.',
            'Si solo con ver tu nombre me haces suspirar, imagínate cuando te veo.','Quisiera ser pensamiento y estar dentro de ti, y así saber el momento en que te acuerdas de mi.',
            'Te quiero, pero no sé en qué posición, ¿me ayudas a elegir?','¿Crees en el amor a primera vista o tengo que darme otra vuelta y volver a pasar?',
            '¿Quién te crees para gustarme tanto?','La distancia y el tiempo no saben la falta que le haces a mi corazón.',
            'Eres la canción que hace sonar mi guitarra.','No pretendo decir algo bonito, lo que te digo es muy sincero: el cariño que siento es infinito y mi amor por ti es verdadero.',
            'Si ser bella fuese delito, te condenarían de por vida.','Si Cristóbal Colón te viese, diría; «Santa María, pero qué Pinta tiene esa Niña».',
            'Quisiera ser hormiguita para subir por tu balcón y decirte al oído; guapa, bonita, bombón.','Cómo me gustaría ser tu secador de pelo… para que todos los días me agarres del mango.',
            'A lo mejor mi hogar no es un palacio, pero me gustaría que tú fueras mi princesa.','La belleza de una rosa no tiene comparación con la dulzura de tu rostros y la hermosura de tu corazón.',
            'Aprovecha que estoy en rebajas guapa y te dejo dos besos por el precio de uno.','¿Estás preparada para subir a la Luna? Porque tengo el cohete preparado.',
            'Si un día olvido lo hermosa que eres, ayúdame a recordarlo con la luz de tu sonrisa y el sabor de tus labios.','Tú con tantas curvas y yo sin frenos.',
            'No es el whisky ni la cerveza, eres tú quien se me ha subido a la cabeza.','Me encanta la soltería, pero por ti me lo pensaría.'
        ]
    
        let rpiropo = piropo[Math.floor(Math.random()*piropo.length)]
    
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(rpiropo)
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
  
    }
    
    
    if (message.content === 'chiste' || message.content === 'Chiste')
    {
    
        var chiste = [
            '- ¿Tienes WiFi?\n- Sí\n- ¿Y cuál es la clave?\n- Tener dinero y pagarlo.',
            'En una entrevista de trabajo:\n- ¿Nivel de inglés?\n- Alto\n- Bien. Traduzca *mirar*.\n- Look.\n- Perfecto. Úselo en una frase.\n- *Luke*, yo soy tu padre.\n- Contratado.',
            '¿Cuál es el café más peligroso del mundo?\nEl ex-preso',
            '- Mamá, mamá, los spaghetti se están pegando.\n- Déjalos que se maten',
            '- Soy Rosa.\n- Ah, perdóname, es que soy daltónico.',
            '- Oye, ¿cuál es tu plato favorito y por qué?\n- Pues el hondo, porque cabe más comida…',
            '¿Qué pasa si tiras un pato al agua?.\nNada.',
            '- Ayer llamé a la policía porque unos ladrones robaron en mi casa y se llevaron hasta los vasos.\n- ¿Y los detuvo?\n-Sí, sí, los de tubo también.',
            '¿Cómo te llamas?\n- Lancelot.\n- Pues atrápalot…',
            '- Papá, ¿qué está más lejos, Córdoba o la Luna?.\n - Pero vamos a ver, ¿tú ves desde aquí Córdoba?',
            'Mi ordenador me gana al ajedrez, pero yo le gano boxeando.',
            'General: Soldado, ice la bandera\n Soldado: Pues le quedó muy bonita',
            '- A las 10 te pito y bajas.\n- ¿Te has comprado un coche?\n- No, un pito.',
            '¿Cuál es el coche favorito de un fotógrafo?\nEl Ford Focus',
            'Oye, ¿cuánto te costó esa terapia que hiciste para dejar de pensar en comida todo el rato?\n- Pimientos euros.',
            'Pero mira que te he dicho diez mil millones de veces que no exageres…',
            '¿Te gusta el rock progresivo?\n- Cada vez más.',
            '- Buf, me ha caído mal el estofado.\n- ¡Pues no le hables, hombre!',
            '- A mí me gustaría vivir en una isla desierta.\n- A mí también.',
            'Errar es humano, pero lo es todavía más echarle las culpas a otro.',
            'Pues sí, el viaje a la India me cambió la vida.\n- ¿Más langosta, señor?\n- Pero ponle curry.',
            'Suena el teléfono:\n- ¿Hola?\n- Hola.\n- ¿Es aquí donde lavan ropa?\n- No.\n- Pues sí que son guarros.',
            'Llaman a la puerta y es un técnico del ayuntamiento.\n- Perdone, pero vamos a proceder al derribo del edificio contiguo.\n- ¿Conmigo?'
        ]
    
        let rchiste = chiste[Math.floor(Math.random()*chiste.length)]
    
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(rchiste)
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }

    //? REMINDERS NEKOTINA

    /*var canal =  [

        '870195067338506271',
        '880336724662825040',
        '881432157602611230',
        '917258698202677258',
        '880260537659850792',
        '935391521480527922',
        '880295833252265994',
        '848755526347128872',
        '880317466557952000',
        '840421355736530985',
        '882258445334626344',
        '882258853767577621',
        '887820617632583772',
        '896865094250684466',
        '935454536678649856',
        '880319348496039946'

    ]

    if (message.content.toLowerCase() === 'mine'){

        if(canal.some(id => message.channel.id === id)) return

        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://c.tenor.com/AMnlFqJnKhwAAAAd/se-va-a-minar-minar.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de ir a la mina<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `3 minutos` usar el comando `mine`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 180000);

    }

    if (message.content.toLowerCase() === 'hmine'){

        if(canal.some(id => message.channel.id === id)) return

        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://c.tenor.com/AMnlFqJnKhwAAAAd/se-va-a-minar-minar.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de ir a la mina, antes que se acabe el Haste<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `1 minuto y 20 segundos` usar el comando `mine`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 80000);

    }

    if (message.content.toLowerCase() === 'fish'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://www.gifsanimados.org/data/media/157/pesca-imagen-animada-0057.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de ir a la pesca<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `3 minutos` usar el comando `fish`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 180000);

    }

    if (message.content.toLowerCase() === 'hfish'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://www.gifsanimados.org/data/media/157/pesca-imagen-animada-0057.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de ir a la pesca, antes que se acabe el Haste<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `1 minuto y 20 segundos` usar el comando `fish`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 80000);

    }

    if (message.content.toLowerCase() === 'pet'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://c.tenor.com/AMnlFqJnKhwAAAAd/se-va-a-minar-minar.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Tu mascota ya está lista para regresar<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:Dancing_Duck:930402083625111613> Le deseo un buen viaje a tu `pet` y que te traiga algo muy bueno!\n<a:flech:931432469935312937> Te recordaré en `30 minutos`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 1800000);

    }

    if (message.content.toLowerCase() === 'hpet'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://c.tenor.com/AMnlFqJnKhwAAAAd/se-va-a-minar-minar.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Tu mascota ya está lista para regresar<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:Dancing_Duck:930402083625111613> Le deseo un buen viaje a tu `pet` y que te traiga algo muy bueno, antes que se acabe el Haste!\n<a:flech:931432469935312937> Te recordaré en `15 minutos`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 900000);

    }

    if (message.content.toLowerCase() === 'work'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://i.giphy.com/media/7E8tiGcPf1G78dMXRf/giphy.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de ir a trabajar<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `1 hora` usar el comando `work`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 3600000);

    }

    if (message.content.toLowerCase() === 'wf'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://c.tenor.com/rvnbqOmEEXIAAAAC/cute-loli-waifu.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Ya puedes volver a votar por tu waifu favorita<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `6 horas` volver a votar por tu `waifu`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 21600000);

    }

    if (message.content.toLowerCase() === 'hb'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('https://i.gifer.com/8WlW.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Ya puedes volver a votar por tu husbando favorito<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `6 horas` volver a votar por tu `husbando`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 21600000);

    }

    if (message.content.toLowerCase() === 'rep'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('http://3.bp.blogspot.com/-gU7DGjh_SSQ/VgMc-zPIeKI/AAAAAAAA2R8/ZjnSgT77tZw/s1600/hotel-27.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Ya puedes volver a dar rep<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `6 horas` usar el comando `rep`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 21600000);

    }

    if (message.content.toLowerCase() === 'farm'){

        if(canal.some(id => message.channel.id === id)) return
        
        function reminder() {
    
            message.reply({embeds: [
    
              new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setThumbnail('http://olegif.com/bin/gifs/00/49/46.gif')
              .setColor('RANDOM')
              .setDescription('<a:flech:931432469935312937> | Es hora de farmear<a:exclama2:880930071731392512>')
        
            ]})
    
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Nekotina', 'https://images-ext-2.discordapp.net/external/vTbUglOfnbYgQ8gotBCEus02Q7Gn467NmguBx51ntu8/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429457053791158281/01a5bf4c4e4d0521ccee216003abd8dc.png?width=500&height=500')
        .setTitle('<a:tiempogif:931434689481285662> Recordatorio activado para: *`'+message.author.username+'`*')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('<a:flech:931432469935312937> Te recordaré dentro de `6 minutos` usar los comandos de farmeo: `mine` y `fish`.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

        setTimeout(reminder, 360000);

    }*/

    
    let bot = new RegExp(`^<@!?${'904290001196556369'}>( |)$`);
    
    if (message.content.match(bot))
    {
    
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.username+'#'+message.author.discriminator, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription('Hola! **'+ message.author.username +'** Mi Prefix es: `_` Puedes ver mis comandos disponibles usando: `_help`. Para enviar un reporte usa: `_report` y para una sugerencia: `_suggestion`.')
        .setColor('RANDOM')
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    }

    var mencionbot = message.content.startsWith('<@'+client.user.id+'>') || message.content.startsWith('midgard') || message.content.startsWith('mid') || message.content.startsWith('mg')
    //console.log(mencionbot+' mencion: '+client.user.id)

    if(!message.content.startsWith(prefix) && !mencionbot) return; 
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const prueba = message.content.split(' ')

    if(!command) return
    
    try {
        
        userbl = await blSchema.findOne({idusuario: message.author.id})

        if(userbl)
        {

            console.log('Usuario en Lista Negra ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
            
            const e = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.username+'#'+message.author.discriminator, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | ¡Estás prohibido de usar estos comandos!\n\n**Razón:**\n`'+userbl.reason+'`\n\nContacta con el equipo de desarrolladores para más información.!')
          
            return message.channel.send({embeds: [e]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    } catch (error) {

        console.log('Error al buscar (comando) en la Tabla BL: '+ error)

    }

    let cmd = client.commands.get(command) ||
              client.commands.get(prueba[1]) ||
              client.commands.find((a) => a.aliases && a.aliases.includes(command) || a.aliases.includes(prueba[1])); // Obtiene el comando de la colección client.commandos
  
    if(!cmd){

        let similares = []

        client.commands.map((comando) => {

            similares.push(comando.name)

        })

        const matches = Similar.findBestMatch(command, similares);

        similares = [];

        matches.ratings.map((rating) => {
            
            rating.rating > 0.5 ? similares.push(rating.target) : false;
                  
        });

        const e = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.username+'#'+message.author.discriminator, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | El comando **${command}** no existe!\n\n> Sugerencias: ${similares.map(s => `**${s}**`).join(' - ') || 'No tengo sugerencias'}`)
        
        return message.channel.send({embeds: [e]})
        .then(m => setTimeout(() => m.delete(), 15000))
        .catch((e) => console.log('Error al enviar mensaje: '+e))

    } else{

        try {

            cmd.execute(client, message, args, Discord)

        } catch (error) {

            console.log('Error al ejecutar comando: '+error)

        }
    
        //* Registro de Usuarios

        let userData;

        try {

            userData = await userModel.findOne({idusuario: message.author.id})

            if(!userData){

                console.log('========================= REGISTRO DE USUARIO =========================');
        
                let user = await userModel.create({

                    idusuario: message.author.id,
                    username: message.author.username,
    
                })
    
                user.save();
                console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)
   
                console.log('========================= REGISTRO DE USUARIO =========================');
   
            } else {

                //<-- UPDATE EXPERIENCIA/NIVELES -->
            
                console.log('========================= UPDATE EXPERIENCIA DE USUARIO =========================');
   
                let curLevel = Math.floor(0.1 * Math.sqrt(userData.exp + 1));

                if(curLevel > userData.nivel) {

                    let update = await userModel.findOneAndUpdate({idusuario: message.author.id},
                        {

                            exp: userData.exp + 1,
                            nivel: curLevel,
                            banco: userData.banco + (curLevel*1000),
                            total: userData.dinero + userData.banco + (curLevel*1000)

                        })

                    update.save()

                    console.log('Usuario: '+message.channel.id+' ha subido al nivel: '+curLevel)
      
                }

                if(userData.vip === true) {

                    let update = await userModel.findOneAndUpdate({idusuario: message.author.id},
                        {
    
                            exp: userData.exp + 2
                            
                        })
    
                    update.save()

                } else if (userData.vip === false){

                    let update = await userModel.findOneAndUpdate({idusuario: message.author.id},
                        {
    
                            exp: userData.exp + 1
    
                        })
    
                    update.save()

                }

            }
   
        } catch (error) {

            console.log('Error al Registrar Usuario: '+ error)
    
        }
  
        //* Registro de Usuarios

    }
    
}