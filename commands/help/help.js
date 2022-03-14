const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'help',
    aliases: ['h','ayuda','comandos','commands'],
    description: '❗ Menú de ayuda con la lista de los comandos del bot.',
  
    async execute(client, message, args, Discord) {

        //let desc = client.commands.find((d) => d.description)

        const helpprincipal = new Discord.MessageEmbed()
        .setTitle('Bienvenido al apartado de Ayuda 💌')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setDescription('Bienvenid@ a la Lista de Comandos y funciones de **MidgardBot**, te invitamos a unirte a nuestro [servidor](https://discord.gg/CM9yAmXPfC) de soporte.\n\nPara ver los comandos, debes clickear al botón respectivo:\n\n> 📌 • Comandos de Información\n> 💡 • Comandos de Utilidad\n> 🔒 • Comandos de Moderación\n> 💰 • Comandos de Economía\n> 🤣 • Comandos de Diversión\n> 😎 • Comandos de Reacción\n> 🥂 • Comandos Exclusivos (Cafetería - Bar - Disco)\n> 🔥 • Comandos NSFW\n\n<a:flech:931432469935312937> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setColor('RANDOM')
        .setThumbnail('https://c.tenor.com/hE0T8D0GpXsAAAAC/joinblink-blink.gif')

        const helpinfo = new Discord.MessageEmbed()
        .setTitle('📌 • Comandos De Información')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://mimeti.co/wp-content/uploads/2015/01/01-gif-traduction-localise.gif')
        .setColor('RANDOM')
        .setDescription('> **ping**\n> Comprueba la latencia del bot y de tus mensajes.\n\n> **stats**\n> Muestra la info y estado del bot.\n\n> **help | h**\n> Menú de ayuda con los comandos del bot\n\n> **server**\n> Muestra información de un servidor determinado.\n\n> **report**\n> Reportar un bug del bot.\n\n> **suggestion**\n> Enviar una sugerencia para mejorar el bot.\n\n')

        const helputil = new Discord.MessageEmbed()
        .setTitle('💡 • Comandos de Utilidad')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://jonmgomes.com/wp-content/uploads/2020/03/Liquid-Lightbulb-Animation-V2-800x600-1.gif')
        .setColor('RANDOM')
        .setDescription('> **user**\n> Muestra información sobre un usuario mencionado.\n\n> **avatar**\n> Muestra el avatar de un usuario.\n\n> **banner**\n> Muestra el banner de un usuario.\n\n> **welcome | wlc**\n> Muestra un embed de bienvenida.\n> Uso:\n> `' +prefix +'welcome <@user>`\n> `' +prefix +'wlc <@user>`\n\n> **remindme | rm**\n> Establece un recordatorio.\n> Uso:\n> `' +prefix +'remindme <tiempo en s,m,h> <recordatorio>`\n\n> **snipe**\n> Recupera el último mensaje eliminado.\n\n> **math**\n> Realiza una operación matemática básica.\n\n> **jumbo**\n> Ver en grande un emoji.\n\n> **poll**\n> Crea una encuenta.\n> Uso:\n> `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]...`\n\n> **conteo**\n> Realiza un conteo regresivo.\n> Uso:\n> `' +prefix +'conteo <número>`\n\n')
  
        const helpmod = new Discord.MessageEmbed()
        .setTitle('🔒 • Comandos de Moderación')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://elblogdelauz.files.wordpress.com/2018/10/gif-seguridad.gif')
        .setColor('RANDOM')
        .setDescription('> **role**\n> Muestra información de un rol mencionado.\n> Uso:\n> `' +prefix +'role <nombre/@rol>`\n\n> **roleid**\n> Muestra información de un rol por id.\n> Uso:\n> `' +prefix +'roleid <id>`\n\n> **lock**\n> Bloquea un canal del servidor.\n> Uso:\n> `' +prefix +'lock <#canal>`\n\n> **unlock**\n> Desbloquea un canal del servidor.\n> Uso:\n> `' +prefix +'unlock <#canal>`\n\n> **clear**\n> Elimina mensajes de un canal.\n> Uso:\n> `' +prefix +'clear <cantidad>`\n\n')
    
        //> **addrol**\n> Agrega un rol a un usuario del servidor.\n> Uso:\n> `' +prefix +'addrol <@user> <rol>`\n\n> **removerol**\n> Remueve un rol a un usuario del servidor.\n> Uso:\n> `' +prefix +'removerol <@user> <rol>`\n\n> **kick**\n> Expulsa a un miembro mencionado.\n> Uso:\n> `' +prefix +'kick <@user>`\n\n> **ban**\n> Banea a un miembro mencionado.\n> Uso:\n> `' +prefix +'ban <@user>`

        const helpeco = new Discord.MessageEmbed()
        .setTitle('💰 • Comandos de Economía')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/finazas-economia-quieres-ser-un-john-law-1.gif')
        .setColor('RANDOM')
        .setDescription('> **perfil**\n> Muestra tu perfil o el de un usuario.\n\n> **top**\n> Muestra el top de Economía y Stats.\n> Uso:\n> `' +prefix +'top`\n> `' +prefix +'top <cash | xp | rep | pat | hug | sape>`\n\n> **shop**\n> Muestra la tienda del Bot en el servidor.`\n\n> **buy**\n> Compra un item de la tienda.\n> Uso:\n> `' +prefix +'buy <item>`\n\n> **bal | balance**\n> Mira tu balance o el de un usuario en el servidor.\n\n> **work | w**\n> Trabajar para obtener coins.\n\n> **crime**\n> Ejecuta un crimen.\n\n> **rob**\n> Roba a un miembro mencionado.\n> Uso:\n> `' +prefix +'rob <@user>`\n\n> **dep**\n> Deposita tu dinero en el banco.\n> Uso:\n> `' +prefix +'dep <cantidad | all>`\n\n> **with**\n> Retira tu dinero del banco.\n> Uso:\n> `' +prefix +'with <cantidad | all>`\n\n> **daily**\n> Reclama tu recompensa diaria.\n\n> **cock-fight | cf**\n> Apuesta en las peleas de pollos.\n> Uso:\n> `' +prefix +'cf <cantidad | all>`\n\n> **slot | slots**\n> Apuesta en el tragamonedas.\n> Uso:\n> `' +prefix +'slot <cantidad>`\n\n')
  
        const helpdiv = new Discord.MessageEmbed()
        .setTitle('🤣 • Comandos de Diversión')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://i.gifer.com/HqGV.gif')
        .setColor('RANDOM')
        .setDescription('> **say**\n> Hace que el bot diga un mensaje.\n\n> **8ball**\n> El bot responderá a tus preguntas.\n\n> **dado**\n> Lanza un dado al azar.\n\n> **roll**\n> Saca un número al azar.\n\n> **impostor**\n> Averigua quién es el impostor de este mundo.\n\n> **pokemon**\n> Un juego divertido para adivinar el pokemón.\n\n> **ship**\n> Mide tu nivel de amor con un usuario mencionado.\n> Uso:\n> `' +prefix +'ship <@user>`\n\n> **meme**\n> Envía memes al azar.\n\n> **ttt**\n> Clásico Tic Tac Toe.\n> Uso:\n> `' +prefix +'ttt <@user>`\n\n> **coinflip**\n> Lanza una moneda al aire.\n\n> **connect4**\n> Juega 4 en raya contra alguien.\n\n> **footballmatch**\n> ¿Qué tan bueno eres en penales?.\n\n> **rps**\n> Piedra, papel o tijera... ¿qué elijes?.\n\n> **snake**\n> ¿Recuerdas este clásico juego?.\n\n> **fast**\n> ¿Qué tan rápido eres?.\n\n> **match**\n> Forma las parejas.\n\n> **choose**\n> ¿Qué prefieres?.\n\n> **infiel**\n> Descubre tu % de infidelidad.\n\n> **berenjena**\n> Descubre cuánto te mide 😈\n\n> **carta**\n> Envía una carta a un usuario con el mensaje que quieras.\n> Para más información ejecuta:\n> `' +prefix +'carta`\n\n> **rae**\n> Busca el significado de cualquier palabra.\n\n> **morse**\n> Convierte cualquier texto en código morse o viceversa.\n\n')
  
        const helpcbd = new Discord.MessageEmbed()
        .setTitle('• Comandos Exclusivos •')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://i.pinimg.com/originals/14/d6/dc/14d6dc0f242386738df2b7f067a9c593.gif')
        .setColor('RANDOM')
        .setDescription('**Cafetería** ☕\n> **cafe**\n> **agua**\n> **te**\n> **jugo**\n> **tacos**\n> **chocolate**\n> **galletas**\n> **helado**\n> **hamburguesa**\n> **pizza**\n\n**Bar** 🥂\n> **cocacola**\n> **redbull**\n> **cerveza**\n> **vino**\n> **tequila**\n> **ron**\n> **coctel**\n> **cigarro**\n> **porro**\n> **huca**\n\n**Disco** 💃\n> **perreo**\n> **bachata**\n> **salsa**\n> **cumbia**\n> **colegiala**\n\n')
  
        const helprea = new Discord.MessageEmbed()
        .setTitle('😎 • Comandos de Reacción')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://i.pinimg.com/originals/54/ce/5a/54ce5ae304bd82e54b7d45f639693213.gif')
        .setColor('RANDOM')
        .setDescription('> **hi**\n> Saluda a alguien o a todos.\n\n> **hug**\n> Abraza a alguien o a ti mismo.\n\n> **kiss**\n> Besa a un usuario.\n\n> **happy**\n> Mood Feliz.\n\n> **bored**\n> Mood Aburrido.\n\n> **sleep**\n> ¿Ya tienes sueño?\n\n> **dance**\n> Baila solo o acompañado.\n\n> **blush**\n> Sonrojad@ de nuevo?.\n\n> **confused**\n> Confundido Potter?\n\n> **lick**\n> Dale una lamida a alguien.\n\n> **cuddle**\n> Acurrúcate en alguien.\n\n> **feed**\n> Dale de comer a alguien.\n\n> **pat**\n> Acaricia a alguien.\n\n> **rep**\n> Da un punto de carisma.\n\n> **sad**\n> Modo Sad.\n\n> **cry**\n> Modo Sad 2.0.\n\n> **clorox**\n> ¿Se te antoja?\n\n> **suicide**\n> Hacer la automorision.\n\n> **sape**\n> Dale un sape a alguien.\n\n> **bite**\n> Muerde a alguien.\n\n> **poke**\n> Molesta a alguien.\n\n> **punch**\n> Tira un golpe a alguien.\n\n> **kickbut**\n> Dale una patada a alguien.\n\n> **slap**\n> Abofetea a alguien.\n\n> **kill**\n> Mata a un usario.\n\n> **marry**\n> Cásate con un usario.\n\n> **divorce**\n> Divórciate de un usario.')

        const helpnsfw = new Discord.MessageEmbed()
        .setTitle('🔞 • Comandos NSFW')
        .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true }) })
        .setFooter({ text: message.author.username+'#'+message.author.discriminator, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setThumbnail('https://c.tenor.com/E0DqqabbUn0AAAAC/nsfw.gif')
        .setColor('RANDOM')
        .setDescription('> **||tetas||**\n> **||pussy||**\n> **||culo||**\n> **||dick||**\n> **||kuni||**\n> **||suck||**\n> **||suckb||**\n> **||sboobs||**\n> **||fuck||**\n> **||anal||**\n> **||cum||**\n> **||porno||**\n> **||hd||**\n> **||gonewild||**\n')
    
        const btns_options1 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton()
            .setCustomId("inf")
            .setLabel("📌 Información")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("util")
            .setLabel("💡 Utilidad")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("mod")
            .setLabel("🔒 Moderación")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("eco")
            .setLabel("💰 Economía")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("m2")
            .setLabel("📋 Más Opciones")
            .setStyle("PRIMARY"),
      
        ])
    
        const btns_options2 = new Discord.MessageActionRow().addComponents([

            new Discord.MessageButton()
            .setCustomId("mp")
            .setLabel("🌎 Inicio")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("div")
            .setLabel("🤣 Diversión")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("rea")
            .setLabel("😎 Reacción")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("cbd")
            .setLabel("🥂 CBD")
            .setStyle("PRIMARY"),
        
            new Discord.MessageButton()
            .setCustomId("nsfw")
            .setLabel("🔥 NSFW")
            .setStyle("PRIMARY"),
      
        ])

        message.reply({ allowedMentions: { repliedUser: false}, 
            
            embeds: [helpprincipal],
            components: [btns_options1]
          
        }).then(async m => {
            
            let filter = int => int.isButton() && int.user.id == message.author.id 
           
            const collector = m.createMessageComponentCollector({ filter });
            
            collector.on("collect", async int => {
              
                int.deferUpdate();
           
                if (int.customId === "mp") {
                
                    m.edit({
                  
                        embeds: [helpprincipal],
                        components: [btns_options1]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "inf") {
                
                    m.edit({
                  
                        embeds: [helpinfo],
                        components: [btns_options1]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "util") {
                
                    m.edit({
                  
                        embeds: [helputil],
                        components: [btns_options1]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "mod") {
                
                    m.edit({
                  
                        embeds: [helpmod],
                        components: [btns_options1]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "eco") {
                
                    m.edit({
                  
                        embeds: [helpeco],
                        components: [btns_options1]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "m2") {
                
                    m.edit({
                  
                        components: [btns_options2]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "div") {
                
                    m.edit({
                  
                        embeds: [helpdiv],
                        components: [btns_options2]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "rea") {
                
                    m.edit({
                  
                        embeds: [helprea],
                        components: [btns_options2]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "cbd") {
                
                    m.edit({
                  
                        embeds: [helpcbd],
                        components: [btns_options2]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } else if (int.customId === "nsfw") {
                
                    m.edit({
                  
                        embeds: [helpnsfw],
                        components: [btns_options2]
                
                    }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
                } 
      
            });
      
            collector.on("end", (collected, reason) => {
              
                if(collected.size < 1) return m.edit({
                
                    embeds: [helpprincipal],
                    components: []
              
                }).catch((e) => console.log('Error al enviar mensaje: '+e))

                console.log('El collect del help finalizó por: '+reason)
              
            });
          
        }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}