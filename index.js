const Discord = require('discord.js');
const client = new Discord.Client();

const newUsers = new Discord.Collection();
client.snipes = new Map();

let prefix = process.env.PREFIX;

client.on('ready', () => {

    //client.user.setActivity('bot en heroku', {type: 'WATCHING'});
    client.user.setPresence( {
        status: 'online',
        activity: {
            name: "💻 | Malta's Bot",
            type: "PLAYING"
        }
    });
    console.log('Listo!');

});

client.on("guildMemberAdd", (member) => {
//
    const guild = member.guild;
    newUsers.set(member.id, member.user);

    console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${guild.name}.`);
    
    //var canal = client.channels.get('840421191982252082'); 
    //canal.send(`Hola ${member.user}, bienvenid@ nos alegra que formes parte de nosotros.`);
    
    // Send the message to a designated channel on a server:
    const channel = guild.channels.cache.find(ch => ch.id === '779566489429737472');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;

    if (newUsers.size > 1000) {

      const userlist = newUsers.map(u => u.toString()).join(" ");
      channel.send(`¡Bienvenid@ Terrícola! ${userlist}, a este nuestro **Universo**. <:ShyLove:880410907635748924> Les invito a pasar por <#855582327514202132> y <#785685918270488656> Y si tienen una queja, duda o sugerencia, pasen por <#815654349912801280>. Cualquier duda o pregunta aquí estará todo el equipo de Staff a su disposición. <a:pasito:877116925291946094> Pásenla increíble, lindo día, tarde o noche. <a:abdul_dance:880930576683630662>`);
      newUsers.clear();

    } else{
      
      channel.send(`¡Bienvenid@ Terrícola! ${member.user}, a este nuestro **Universo**. <:ShyLove:880410907635748924>. Espero que te lo pases genial en este server libre de toxicidad, con muchos eventos programados, premios y más sorpresas!!! <a:Sara:880304101215334401> Recuerda pasar por <#777623227321155614> y <#880268322921414657> Y si tienes alguna queja, duda o sugerencia, pasa por <#880402803825188874>. Cualquier incoveniente aquí estará todo el equipo de Staff a su disposición. <a:dc_party1:881033439367815239>`);

    }
    
});

client.on("guildMemberRemove", (member) => {
    if(newUsers.has(member.id)) newUsers.delete(member.id);
  });

const imgdelete = new Discord.MessageEmbed() 

client.on("messageDelete", (message) => {

    client.snipes.set(message.channel.id, {
        content: message.content,
        delete: message.author,
        canal: message.channel
    });

    let sv = client.guilds.cache.get("851924635930329098")
    let channel = sv.channels.cache.get("880280265216389140")

    const embed = new Discord.MessageEmbed()
    .setAuthor("MaltaBot", client.user.avatarURL())
    .setTitle("📢 | Mensajes Borrados")
    .addField("Canal: ", `---> <#${message.channel.id}>`)
    .addField("Autor: ", `---> ${message.author}`)
    .addField("Mensaje: ", `---> ${message.content}`)
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
    
    channel.send({ embeds: [embed] });
    //channel.send("📢 | Mensajes Borrados\n``` \n===> Canal:\n"+`${message.channel.name}`+" | "+ message.channel.id +"\n\n===> Autor:\n"+`${message.author.username}`+" | "+ message.author.id +"\n\n===> Mensaje:\n"+message.content+"\n\n```")

    /*if(message.attachments.size > 0){

      let Attachs = (message.attachments).array()

      //imgdelete.setImage(message.attachments)n

      Attachs.forEach(m => {//esto es por si hay más de una imagen

        imgdelete.setImage(m.proxyURL)
        //canal.send({file: [m.proxyURL]})//enviamos la imagen para enviar la imagen en un embed
    
    //.setImage(m.proxyURL)
  
    //canal.send(embed)enviamos el embed
      
      })
    }*/
  
});

client.on("message", message => {

    if (message.channel.type === "dm") {
  
      let sv = client.guilds.cache.get("777620055344545842")
      let channel = sv.channels.cache.get("874943743185285150")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje directo")
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    }
  
    if(message.channel.id==='880290686107275304')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880267684950999050")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else if(message.channel.id==='880292291443556383')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280405993996339")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else if(message.channel.id==='840161683732693033')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280308732272640")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else if(message.channel.id==='880531543465021570')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280346208395305")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else if(message.channel.id==='870195067338506271')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280535304372234")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else if(message.channel.id==='880384504240422972')
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280557051858974")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `<#${message.channel.id}>`)
      .addField("Autor: ", `${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send(embed);
  
    } else
    {
  
      let sv = client.guilds.cache.get("851924635930329098")
      let channel = sv.channels.cache.get("880280265216389140")
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor("MaltaBot", client.user.avatarURL())
      .setTitle("📢 | Mensaje Enviado")
      .addField("Canal: ", `---> <#${message.channel.id}>`)
      .addField("Autor: ", `---> ${message.author}`)
      .addField("Mensaje: ", `---> ${message.content}`)
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    }
  
    if (message.author.bot) return;
  
      if (message.content === 'Hola'){
          //Si escribiera Hola, nos contestará con un mensaje personal
          message.channel.send('Hola '+message.author.username+', cómo va tu día?');
        }
        if (message.content === 'hola'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('Hola '+message.author.username+', cómo va tu día?');
        }
        if (message.content === 'ola'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('del mar 🌊');
        }
        if (message.content === 'Ola'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('del mar 🌊');
        }
      
        if (message.content === 'Holas'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('Hola '+message.author.username+', cómo va tu día?');
        }
        if (message.content === 'holas'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('Hola '+message.author.username+', cómo va tu día?');
        }
        if (message.content === 'olas'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('del mar 🌊');
        }
        if (message.content === 'Olas'){
          //Si escribiera Hola, nos contestará con un mensaje personalizado
          message.channel.send('del mar 🌊');
        }
      
        if (message.content === 'Buen día'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
        if (message.content === 'buen día'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
      
        if (message.content === 'Buenos días'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
        if (message.content === 'buenos días'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
        if (message.content === 'Buenos dias'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
        if (message.content === 'buenos dias'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buen día precios@ ❤');
        }
      
        if (message.content === 'Buenas tardes'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buenas tardes precios@ ❤');
        }
        if (message.content === 'buenas tardes'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buenas tardes precios@ ❤');
        }
      
        if (message.content === 'Buenas noches'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buenas noches precios@ ❤');
        }
        if (message.content === 'buenas noches'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Buenas noches precios@ ❤');
        }
      
        if (message.content === 'Buenas'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Las tienes <a:perreo:880634843610902640>');
          //message.react(`<a:pasito:877116925291946094>`)
          //message.react(`<a:perreo:880634843610902640>`)
        }
        if (message.content === 'Wenas'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Las tienes <a:perreo:880634843610902640>');
          //message.react(`<a:pasito:877116925291946094>`)
          //message.react(`<a:perreo:880634843610902640>`)
        }
        if (message.content === 'buenas'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Las tienes <a:perreo:880634843610902640>');
          //message.react(`<a:pasito:877116925291946094>`)
          //message.react(`<a:perreo:880634843610902640>`)
        }
        if (message.content === 'wenas'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.channel.send('Las tienes <a:perreo:880634843610902640>');
          //message.react(`<a:pasito:877116925291946094>`)
          //message.react(`<a:perreo:880634843610902640>`)
        }
        if (message.content === 'wlc'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.react(`<a:pasito:877116925291946094>`)
          message.react(`<a:cerveza:880635824021065738>`)
        }
        if (message.content === 'welcome'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.react(`<a:pasito:877116925291946094>`)
          message.react(`<a:cerveza:880635824021065738>`)
        }
        if (message.content === 'Wlc'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.react(`<a:pasito:877116925291946094>`)
          message.react(`<a:cerveza:880635824021065738>`)
        }
        if (message.content === 'Welcome'){
          //Si escribiera Buenos días, nos contestará con un mensaje personalizado
          message.react(`<a:pasito:877116925291946094>`)
          message.react(`<a:cerveza:880635824021065738>`)
        }
  
        let img = '753435606410985573'
  
        if (message.content === 'malta')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'Malta')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'maltazar')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'Maltazar')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'maltazard')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'Maltazard')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.startTyping();
  
          message.channel.send(`${message.author}, en breves momentos te atenderé`).then(m => m.delete({timeout: 2000}));
          
          setTimeout(() => {
            message.channel.send(`<@${img}> Te buscan por aquí <:yonofui:880916494085681203>`);
            message.channel.stopTyping()
          }, 3000);
  
        }
  
        if (message.content === 'reven'){
  
          message.channel.send('𝑬𝒍 𝒖́𝒍𝒕𝒊𝒎𝒐 𝒇𝒊𝒆𝒍 𝒒𝒖𝒆 𝒒𝒖𝒆𝒅𝒂 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒎𝒖𝒏𝒅𝒐 <a:FuegoRojo:882761255381790750>');
        }
        if (message.content === 'Reven'){
  
          message.channel.send('𝑬𝒍 𝒖́𝒍𝒕𝒊𝒎𝒐 𝒇𝒊𝒆𝒍 𝒒𝒖𝒆 𝒒𝒖𝒆𝒅𝒂 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒎𝒖𝒏𝒅𝒐 <a:FuegoRojo:882761255381790750>');
        }
  
        let reven = new RegExp(`^<@!?${'710588969557164113'}>( |)$`);
  
        if (message.content.match(reven))
        {
  
          message.channel.send(`𝑬𝒍 𝒖́𝒍𝒕𝒊𝒎𝒐 𝒇𝒊𝒆𝒍 𝒒𝒖𝒆 𝒒𝒖𝒆𝒅𝒂 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒎𝒖𝒏𝒅𝒐 <a:FuegoRojo:882761255381790750>`)
  
        }
  
        let malta = new RegExp(`^<@!?${'753435606410985573'}>( |)$`);
  
        if (message.content.match(malta))
        {
          if(bl.tiene(message.author.id)) return;
          message.channel.send(`¿Qué necesitas de mi dueño? <a:ositovino:880306728867078165>`)
  
        }
  
        let sofi = new RegExp(`^<@!?${'723407471556952064'}>( |)$`);
  
        if (message.content.match(sofi))
        {
  
          message.channel.send(`¿Qué necesitas de la chica más hermosa? <:Sofia:877115812362747904>`)
  
        }
  
        let princesa = new RegExp(`^<@!?${'748192032098353193'}>( |)$`);
  
        if (message.content.match(princesa))
        {
  
          message.channel.send(`<a:dc_fuegorosaa:889684389829681202> ¿Qué necesitas de La Princesa del server? <a:dc_fuegorosaa:889684389829681202>`)
  
        }
  
        if (message.content === 'piropo' || message.content === 'Piropo')
        {
  
          var piropo = [
            "El amor será ciego, pero hay que ver lo mucho que alegras la vista.","Con esos ojos mirándome, ya no me hace falta la luz del sol.",
            "Por la luna daría un beso, daría todo por el sol, pero por la luz de tu mirada, doy mi vida y corazón.","Si yo fuera un avión y tú un aeropuerto, me la pasaría aterrizando por tu hermoso cuerpo.",
            "Me gusta el café, pero prefiero tener-té.","No eres google, pero tienes todo lo que yo busco.",
            "Mis ganas de ti no se quitan, se acumulan.","Cuando te multen por exceso de belleza, yo pagaré tu fianza.",
            "Si cada gota de agua sobre tu cuerpo es un beso, entonces quiero convertirme en aguacero.","Estás como para invitarte a dormir, y no dormir.",
            "Si tu cuerpo fuera cárcel y tus brazos cadenas, ese sería el lugar perfecto para cumplir condena.","Qué bonitos ojos tienes, tan redondos como el sol, se parecen a los ceros que me pone el profesor.",
            "Eres como la chancha de mi mamá, te veo venir y se me acelera el corazón.","Si lo bonito fuera pecado, tú no tendrías el perdón de Dios.",
            "Ni en clase de matemáticas me perdía tanto como en tu mirada.","Quisiera olvidarte, pero sin el olvi.",
            "Se te ha caído el papel que te envuelve, bombón.","Me gustas más que dormir hasta tarde.",
            "¿Me haces un favor? Sal de mis sueños y entra en mi realidad.","Ni en el mejor libro de recetas se encuentra semejante bombón.",
            "¿Están lloviendo estrellas o solo tú caíste del cielo?","Mi amor, quién fuera cemento para sostener ese monumento.",
            "Si tuviera que regalarte algo, te regalaría un espejo, porque después de este mundo, lo más bonito es tu reflejo.","No me gusta atarme, pero por ti, yo me encadeno.",
            "Eres tan dulce que solo con mirarte engordo.","Si los besos transmiten gérmenes, yo contigo sí empiezo una epidemia.",
            "¿De que panadería te escapaste bizcochito?","Y Dios dijo: «Hágase lo más hermoso del universo» y nació la hermosura que está leyendo esto.",
            "Quien fuera mago para echarte un polvo y desaparecer.","Quisiera ser hamburguesa y que me llenes de mayonesa.",
            "Tienes la sonrisa que quiero darle a mis hijos.","Dios te guarde y me dé la llave.",
            "Ningún «Escribiendo…» me pone tan feliz como el tuyo.","Tú eres Coca Cola y yo un hielito, ¡no me toques que me derrito!",
            "¿Tienes algo que hacer? Podemos hacer turismo por mi cuarto.","Eres como el chocolate, te me antojas a cada ratito.",
            "Perdí mi número de teléfono, ¿me das el tuyo?","Tu amor me ha contagiado, como un virus imposible de curar.",
            "Acabo de perder tres besos bajo tu camiseta, ¿me ayudas a buscarlos?","Que bonito sería despertarme a mitad de noche y verte ahí, a mi lado.",
            "Si solo con ver tu nombre me haces suspirar, imagínate cuando te veo.","Quisiera ser pensamiento y estar dentro de ti, y así saber el momento en que te acuerdas de mi.",
            "Te quiero, pero no sé en qué posición, ¿me ayudas a elegir?","¿Crees en el amor a primera vista o tengo que darme otra vuelta y volver a pasar?",
            "¿Quién te crees para gustarme tanto?","La distancia y el tiempo no saben la falta que le haces a mi corazón.",
            "Eres la canción que hace sonar mi guitarra.","No pretendo decir algo bonito, lo que te digo es muy sincero: el cariño que siento es infinito y mi amor por ti es verdadero.",
            "Si ser bella fuese delito, te condenarían de por vida.","Si Cristóbal Colón te viese, diría; «Santa María, pero qué Pinta tiene esa Niña».",
            "Quisiera ser hormiguita para subir por tu balcón y decirte al oído; guapa, bonita, bombón.","Cómo me gustaría ser tu secador de pelo… para que todos los días me agarres del mango.",
            "A lo mejor mi hogar no es un palacio, pero me gustaría que tú fueras mi princesa.","La belleza de una rosa no tiene comparación con la dulzura de tu rostros y la hermosura de tu corazón.",
            "Aprovecha que estoy en rebajas guapa y te dejo dos besos por el precio de uno.","¿Estás preparada para subir a la Luna? Porque tengo el cohete preparado.",
            "Si un día olvido lo hermosa que eres, ayúdame a recordarlo con la luz de tu sonrisa y el sabor de tus labios.","Tú con tantas curvas y yo sin frenos.",
            "No es el whisky ni la cerveza, eres tú quien se me ha subido a la cabeza.","Me encanta la soltería, pero por ti me lo pensaría."
          ]
  
          let rpiropo = piropo[Math.floor(Math.random()*piropo.length)]
  
          const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(rpiropo)
          message.channel.send(embed)
        }
  
  
        if (message.content === 'chiste' || message.content === 'Chiste')
        {
  
          var chiste = [
            "- ¿Tienes WiFi?\n- Sí\n- ¿Y cuál es la clave?\n- Tener dinero y pagarlo.",
            "En una entrevista de trabajo:\n- ¿Nivel de inglés?\n- Alto\n- Bien. Traduzca *mirar*.\n- Look.\n- Perfecto. Úselo en una frase.\n- *Luke*, yo soy tu padre.\n- Contratado.",
            "¿Cuál es el café más peligroso del mundo?\nEl ex-preso",
            "- Mamá, mamá, los spaghetti se están pegando.\n- Déjalos que se maten",
            "- Soy Rosa.\n- Ah, perdóname, es que soy daltónico.",
            "- Oye, ¿cuál es tu plato favorito y por qué?\n- Pues el hondo, porque cabe más comida…",
            "¿Qué pasa si tiras un pato al agua?.\nNada.",
            "- Ayer llamé a la policía porque unos ladrones robaron en mi casa y se llevaron hasta los vasos.\n- ¿Y los detuvo?\n-Sí, sí, los de tubo también.",
            "¿Cómo te llamas?\n- Lancelot.\n- Pues atrápalot…",
            "- Papá, ¿qué está más lejos, Córdoba o la Luna?.\n - Pero vamos a ver, ¿tú ves desde aquí Córdoba?",
            "Mi ordenador me gana al ajedrez, pero yo le gano boxeando.",
            "General: Soldado, ice la bandera\n Soldado: Pues le quedó muy bonita",
            "- A las 10 te pito y bajas.\n- ¿Te has comprado un coche?\n- No, un pito.",
            "¿Cuál es el coche favorito de un fotógrafo?\nEl Ford Focus",
            "Oye, ¿cuánto te costó esa terapia que hiciste para dejar de pensar en comida todo el rato?\n- Pimientos euros.",
            "Pero mira que te he dicho diez mil millones de veces que no exageres…",
            "¿Te gusta el rock progresivo?\n- Cada vez más.",
            "- Buf, me ha caído mal el estofado.\n- ¡Pues no le hables, hombre!",
            "- A mí me gustaría vivir en una isla desierta.\n- A mí también.",
            "Errar es humano, pero lo es todavía más echarle las culpas a otro.",
            "Pues sí, el viaje a la India me cambió la vida.\n- ¿Más langosta, señor?\n- Pero ponle curry.",
            "Suena el teléfono:\n- ¿Hola?\n- Hola.\n- ¿Es aquí donde lavan ropa?\n- No.\n- Pues sí que son guarros.",
            "Llaman a la puerta y es un técnico del ayuntamiento.\n- Perdone, pero vamos a proceder al derribo del edificio contiguo.\n- ¿Conmigo?"
          ]
  
          let rchiste = chiste[Math.floor(Math.random()*chiste.length)]
  
          const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(rchiste)
          message.channel.send(embed)
        }
  
  
        let bot = new RegExp(`^<@!?${'856814676692041738'}>( |)$`);
  
        if (message.content.match(bot))
        {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.username+"#"+message.author.discriminator, `${message.author.displayAvatarURL()}`)
          .setDescription("Hola! **"+ message.author.username +"** Mi Prefix es: `_` Puedes ver mis comandos disponibles usando: `_help`. Para enviar un reporte usa: `_report` y para una sugerencia: `_suggestion`.")
          .setColor("RANDOM")
          message.channel.send(embed)
  
        }
  
})

client.on('message', async message => {

    if(!message.content.startsWith(process.env.PREFIX)) return;
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'malta'){

        let id = ['753435606410985573']
  
        if(!id.some(id => message.author.id == id)) {
        
          const embed = new Discord.MessageEmbed()
          .setDescription('Solo el developer del bot puede usar este comando.')
          .setColor("RED")
          message.channel.send(embed)
          .then(m => m.delete({timeout: 5000}));
  
        } else {
  
          var estadobot = message.content.split(' ').slice(1).join(' ')
  
          if(!estadobot){
  
            message.reply('Exactamente... ¿Qué quieres que ponga?').then(m => m.delete({timeout: 5000}));
  
          }else{
  
            client.user.setActivity({name:estadobot, type:"LISTENING"})
            message.reply("Estado cambiado con éxito <a:pasito:877116925291946094>")
  
          }
  
        }
  
      }

    if (command === "ping") {

        let ping = Math.floor(message.client.ws.ping);

         message.channel.send(":ping_pong: Pong!")
          .then(m => {
    
              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          
          });

    }

    if(command === 'say'){

        let texto = args.join(" ");
    
        if(!texto) return message.channel.send(`Escriba un contenido para decir.`);
        message.channel.send(texto);
        message.delete({ timeout: 100 });
        
      }

});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(process.env.TOKEN); 