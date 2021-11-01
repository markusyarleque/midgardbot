const Discord = require('discord.js');
const client = new Discord.Client();

const newUsers = new Discord.Collection();
client.snipes = new Map();

const clientN = require("nekos.life") 
const neko = new clientN()

const dbv = require('megadb');
const db_marry = new dbv.crearDB("marry")
let vip = new dbv.crearDB('vip');
let bl = new dbv.crearDB('blacklist')

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

/*client.on("guildMemberAdd", (member) => {
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
  });*/

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
    
    channel.send(embed);
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
  
  
        let bot = new RegExp(`^<@!?${'904290001196556369'}>( |)$`);
  
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

    if(bl.tiene(message.author.id)) return message.channel.send("Estás prohibido de usar estos comandos, contacto con el equipo de desarrolladores para más información.!");

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


    // COMANDOS DE INFORMACIÓN

    if (command === "ping") {

        let ping = Math.floor(message.client.ws.ping);

         message.channel.send(":ping_pong: Pong!")
          .then(m => {
    
              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          
          });

    }

    if(message.content.startsWith(prefix + 'stats')){

        const embed = new Discord.MessageEmbed()
        .setThumbnail("https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif")
        .setAuthor("MidgardBot", client.user.avatarURL())
        .setTitle("Estadísticas")
        .addField('Desarrollador: ', 'Maltazard#1207')
        .addField('Servidores: ', `${client.guilds.cache.size}`)
        .addField('Usuarios: ', ` ${client.users.cache.size}`)
        .addField('Ram: ', ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField('Lenguaje: ', "JavaScript")
        .addField("Libreria", "Discord.js v12.2.0")
        .setColor("RANDOM")
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send(embed);
        
    }

    //SERVER INFO

    const vl = {
        NONE: 'Ninguno',
        LOW: 'Bajo',
        MEDIUM: 'Medio',
        HIGH: 'Alto',
        VERY_HIGH: 'Muy Alto'
    };

    const regions = {
        brazil: 'Brasil',
        europe: 'Europa',
        hongkong: 'Hong Kong',
        india: 'India',
        japan: 'Japón',
        russia: 'Rusia',
        singapore: 'Singapore',
        southafrica: 'South África',
        sydeny: 'Sydeny',
        'us-central': 'US Central',
        'us-east': 'US East',
        'us-west': 'US West',
        'us-south': 'US South'
    };

    if(command === 'server'){

    var server = message.guild;
    const roles = server.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const members = server.members.cache;
    const channels = server.channels.cache;
    const emojis = server.emojis.cache;
  
    const embed = new Discord.MessageEmbed()
    .setThumbnail(server.iconURL({ dynamic: true }))
    .setAuthor(server.name, "https://media.discordapp.net/attachments/879633476532453386/880906710066294815/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485")
    .addField('ID:', server.id, false)
    .addField('Dueño:', `${server.owner.user.tag} (${server.ownerID})` , true)
    //.addField('Creado el:', server.createdAt, false)
    .addField('Creado el:', moment(server.createdTimestamp).format('LL') + " a las "+moment(server.createdTimestamp).format('LT') + " [" + moment(server.createdTimestamp).fromNow()+" ]", false)
    
    .addField('Miembros:', server.memberCount, true)
    .addField('Region:', regions[server.region], false)
    .addField('Nivel:', `${server.premiumTier}`, true)
    //.addField('Nivel:', server.mfaLevel, false)
    .addField('Mejoras:', server.premiumSubscriptionCount || '0', false)

    .addField('Roles:', roles.length , true)
    .addField('Emojis:', emojis.size , false)
    .addField('Verificación:', vl[server.verificationLevel] , false)

    .addField('Canales de Texto:', channels.filter(channel => channel.type === 'text').size , true)
    .addField('Canales de Voz:', channels.filter(channel => channel.type === 'voice').size , true)
    .setImage(`https://media.discordapp.net/attachments/869426472706785290/880795102933565510/galaxy-purple-planet-wallpaper-for-android-android-live.jpg?width=862&height=533`)
    .setColor("RANDOM")
    
    .setTimestamp(new Date())
    .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL({ dynamic: true }).replace('webp','png')}`);
        
   message.channel.send({ embed });

    }

    let prohibidos = ["ID1", "ID2"];

    if(command === 'report'){

    if(prohibidos.includes(message.author.id)) return message.channel.send("¡Tienes prohibido usar este comando por mal usarlo!");

    let reporte = args.join(' ');
    if(!reporte) return message.channel.send("❎ **Debes agregar un reporte para enviar al desarrollador!**")

    let sv = client.guilds.cache.get("777620055344545842")
    let channel = sv.channels.cache.get("874891049120714752")

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
    .setTitle('<a:alto:860350719172542464> | Reporte')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres reportar este bug? ¡Usar mal el comando causará la prohibición!`)
    .addField("Bug a reportar:", reporte)
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setFooter(`Developer Team - Midgard Club`, `${message.author.displayAvatarURL()}`);
    message.delete({ timeout: 100 });
    message.channel.send(embed).then(m => {

      m.react("✅")
      m.react("❎")
     
      const filtro = (reaction, user) => {
        return ["✅", "❎"].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions(filtro, {max: 1, time: 60000, errors: ["time"]}).catch(() => {

        m.edit("¡No confirmaste a tiempo! <:enojado:882877729266098186>")
        m.reactions.removeAll()

      }).then(coleccionado=> {

        const reaccion = coleccionado.first();

        if(reaccion.emoji.name === "✅") {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor("RANDOM")
          .setDescription("Reporte confirmado con éxito! <a:emoji_266:812426331685519393>")
          .addField("Bug reportado:", reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit(bugco)
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor("RANDOM")
          .addField("Ha llegado el siguiente reporte:", reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send(bugre)
        } else if(reaccion.emoji.name === "❎") {

          m.edit("Reporte cancelado. <:y_:868544745541087293>")
          m.reactions.removeAll()

        }
      })
    })
    }

    if(command === 'suggestion'){

    if(prohibidos.includes(message.author.id)) return message.channel.send("¡Tienes prohibido usar este comando por mal usarlo!");

    let reporte = args.join(' ');
    if(!reporte) return message.channel.send("❎ **Debes agregar una sugerencia para enviar al desarrollador!**")

    let sv = client.guilds.cache.get("777620055344545842")
    let channel = sv.channels.cache.get("874922451040083978")

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
    .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres dar esta sugerencia? ¡Usar mal el comando causará la prohibición!`)
    .addField("Sugerencia:", reporte)
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setFooter(`Developer Team - Midgard Club`, `${message.author.displayAvatarURL()}`);
    message.delete({ timeout: 100 });
    message.channel.send(embed).then(m => {

      m.react("✅")
      m.react("❎")
     
      const filtro = (reaction, user) => {
        return ["✅", "❎"].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions(filtro, {max: 1, time: 60000, errors: ["time"]}).catch(() => {

        m.edit("¡No confirmaste a tiempo! <:enojado:882877729266098186>")
        m.reactions.removeAll()

      }).then(coleccionado=> {

        const reaccion = coleccionado.first();

        if(reaccion.emoji.name === "✅") {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor("RANDOM")
          .setDescription("Sugerencia realizada con éxito! <a:emoji_266:812426331685519393>")
          .addField("Sugerencia:", reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit(bugco)
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor("RANDOM")
          .addField("Ha llegado la siguiente sugerencia:", reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send(bugre)
        } else if(reaccion.emoji.name === "❎") {

          m.edit("Sugerencia cancelada. <:y_:868544745541087293>")
          m.reactions.removeAll()

        }
        })
        })
    }

    //COMANDOS DE UTILIDAD

    if(command === 'user'){

        let userm = message.mentions.users.first()

        if(!userm){
            
            var user = message.author;
          
            const embed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', "https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
            .addField('Estado:', user.presence.status, true)
            .addField('Color:', message.member.displayHexColor, true)
            .addField('Usuario:', user.username+'#'+user.discriminator, true)
            .addField('Apodo:', message.member.nickname ? message.member.nickname : 'No tiene', true)
            .addField('ID:', user.id, true)
    
            .addField('Cuenta Creada', user.createdAt.toLocaleDateString()+', '+user.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true)
            .addField('Roles', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(0x66b3ff)
    
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`, "https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485");
              
           message.channel.send({ embed });

        } else{

            const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', "https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
            .addField('Estado:', userm.presence.status, true)
            .addField('Color:', userm.displayHexColor, true)
            .addField('Usuario:', userm.username+'#'+userm.discriminator, true)
            .addField('Apodo:', userm.nickname ? userm.nickname : 'No tiene', true)
            .addField('ID:', userm.id, true)
    
            .addField('Cuenta Creada', userm.createdAt.toLocaleDateString()+', '+userm.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true )
            .addField('Roles', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(0x66b3ff)
    
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`, "https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485");
              
            message.channel.send({ embed });
        }
        
    }

    if(command === 'avatar'){

        let img = message.mentions.users.first()
        if (!img) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${message.author.username}#${message.author.discriminator}`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .setTitle("Imagen completa")
            .setDescription("[Click aquí]("+`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+")")
            .setImage(`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor(0x66b3ff)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else if (img.avatarURL === null) {
    
            message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${img.username}#${img.discriminator}`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .setTitle("Imagen completa")
            .setDescription("[Click aquí]("+`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+")")
            .setImage(`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor(0x66b3ff)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        }
    
    }

    var welcome = [
        "https://media.discordapp.net/attachments/853500788848853002/873245600936788048/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245604090892348/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245605294645308/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245608775917688/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245613217689650/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245612554993704/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245617277796394/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245617672056902/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245622017359962/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873245621820215326/10.gif"
    ] 
    
    if(command === 'welcome'){
    
        let img = message.mentions.users.first()
        let ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send(`<:yojoo:880315297846947860> Necesitas mencionar a un usuario <a:pasito:877116925291946094>`);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setThumbnail(`${img.displayAvatarURL({ dynamic: true }).replace('webp','png')}`)
            //.setAuthor(`Midgard`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .setTitle(`Bienvenid@ <:cosita:880300168514252811> **${img.username}** <a:pepedance:880928616416968745>`)
            .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
            .setImage(ramdonwelcome)
            .setColor(10773200)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        }
    
    }
    
    if(command === 'wlc'){
    
        let img = message.mentions.users.first()
        let ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send(`<:yojoo:880315297846947860> Necesitas mencionar a un usuario <a:pasito:877116925291946094>`);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setThumbnail(`${img.displayAvatarURL({ dynamic: true }).replace('webp','png')}`)
            //.setAuthor(`Midgard`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            .setTitle(`Bienvenid@ <:cosita:880300168514252811> **${img.username}** <a:pepedance:880928616416968745>`)
            .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
            .setImage(ramdonwelcome)
            .setColor(10773200)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        }
    
    }

    if(command === 'remindme'){

        let obtener = args[0]
        let mensaje = args[1]
    
        if (!obtener) {
          
          message.channel.send("Debes agregar un tiempo: `_remindme tiempo mensaje`")
    
        } else if(!mensaje) {
    
          message.channel.send("Debes agregar un recordatorio: `_remindme tiempo mensaje`")
    
        } else {
    
          function reminder() {
    
            message.reply(' Tengo este recordatorio para ti: ' + mensaje)
    
          }
    
          switch (obtener.slice(-1)){
    
            case 's': {
    
              if (obtener.slice(0, -1) > 60) return message.channel.send('No puede ser mayor de 60 segundos')
    
              var msDelay = obtener.slice(0, -1)*1000
              message.reply('Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' segundos:\n'+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            case 'm': {
    
              if (obtener.slice(0, -1) > 60) return message.channel.send('No puede ser mayor de 60 minutos')
    
              var msDelay = obtener.slice(0, -1)*60000
              message.reply('Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' minutos:\n'+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            case 'h': {
    
              if (obtener.slice(0, -1) > 24) return message.channel.send('No puede ser mayor de 24 horas')
    
              var msDelay = obtener.slice(0, -1)*3600000
              message.reply('Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' horas:\n'+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            default: {
    
              message.channel.send('Lo estas haciendo mal es:\n<1 - 60>s <recordatorio>\n<1 - 60>m <recordatorio>\n<1 -  24>h <recordatorio>\n ____Ejemplo:____\n```1m Recordar ir a sacar un perro```');
              break;
            }
          }
      
        };
    
      }
    
      if(command === 'snipe')
      {
        const channel = message.mentions.channels.first() || message.channel;
        const msg = client.snipes.get(channel.id);
    
        if (!msg)
        {
          message.channel.send("No se ha borrado recientemente ningun mensaje")
              .then(m => m.delete({timeout: 5000}));
        
        } else {
    
          imgdelete.setColor("RANDOM")
          .setAuthor(`${msg.delete.tag}`, msg.delete.displayAvatarURL())
          .setTimestamp(new Date())
          .setDescription(`${msg.content}`)
          message.channel.send(imgdelete);
    
        }
    }

    if(command === 'jumbo'){

        if(!args[0]) return message.reply('Uso incorrecto del comando\nDebe ser: _jumbo <emoji> \n*Si quieres añadirlo al servidor añade --s al final*') // Si no usa args[0]
        
        const emoticon = require('discord.js').Util.parseEmoji(args[0]) // Usaremos el metodo que nos da discord.js para obtener info del emoji
          
        if(emoticon.id == null) return message.reply('Emoji invalido') // Si no es un emoji personalizado o no lo encuentra la id seria null para evitar problemas devolvera
        
        let palta = `https://cdn.discordapp.com/emojis/` + `${emoticon.id}.` + (emoticon.animated ? 'gif' : 'png') // Conseguimos el url 
          
        if(message.content.endsWith('--s')) { // Si termina con --s
        
          if(!message.member.permissions.has('MANAGE_EMOJIS')) return message.reply('No tienes permisos para ejecutar esto') // Si no tiene permisos el usuario
        
          if(!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.reply('No tengo los permisos para ejecutar esto') // Si el bot no tiene permisos
          message.guild.emojis.create(palta, emoticon.name) // Creamos un emoji con la imagen del emoji 
          return message.channel.send('Emoji agregado: ' + emoticon.name) // Mensaje de confirmacioon 
          } // Cerramos condicion
          message.channel.send(palta) // Enviamos el url del emoticon
          /*const embed = new Discord.MessageEmbed()
          .setImage(palta)
            message.channel.send(embed);*/
    }

    if(command === 'conteo'){

        if(!args[0]) return message.channel.send('Pon una cantidad para hacer una cuenta regresiva.').then(m => m.delete({timeout: 5000}));
    
        if(isNaN(args[0])) return  message.channel.send(`**Pon una cantidad, solo puedo contar numeros.**`).then(m => m.delete({timeout: 5000}));
    
        let time = parseInt(args[0])
    
        if(time > 7200) return  message.channel.send(`**No puedo contar mas de 2 horas**`).then(m => m.delete({timeout: 5000}));
    
        async function cuenta()
        {
          let msg = await message.channel.send(String(time))
    
          if(time < 60) {
    
            let count1 = setInterval(async () => {
    
              await msg.edit(time <= 0 ? `${message.author}... Se acabó el tiempo ⌛` : String(time))
              //message.channel.send(`${message.author} La cuenta regresiva ha terminado`)
              time <= 0 ? clearInterval(count1) : time -= 1
    
            }, 2000)
    
    
          } else {
    
            let count2 = setInterval(async () => {
    
              await msg.edit(time <= 0  ? `${message.author}... Se acabó el tiempo ⌛` : String(time))
              //message.channel.send(`${message.author} La cuenta regresiva ha terminado`)
              time <= 0 ? clearInterval(count2) : time -= 2
    
            }, 3000)
            
          }
        }
        cuenta();
    }

    //COMANDOS DE MODERACIÓN

    if(command === 'role'){
        
        if(!args) return message.channel.send('¡Ingrese nombre del rol!');
    
        let role = message.guild.roles.cache.find(n => n.name === args.join(" "));
    
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
        const embed = new Discord.MessageEmbed()
        
          .setAuthor(`Solicitado por: ${message.author.username}`,`${message.author.displayAvatarURL()}`)
          .setDescription("Información sobre el rol mencionado.")
          .addField("Nombre:", `- ${role.name}`) 
          .addField("ID:", `- ${role.id}`) 
          .addField("Miembros con el Rol:", `- ${role.members.size}`)
          .addField("Posición:", `- ${role.rawPosition}`) 
          .addField("HexColor:", `- ${role.hexColor}`)  
          .addField("¿Mencionable?:", `- ${role.mentionable}`)
          .addField("¿Separado?:", `- ${role.hoist}`)
          .addField("¿Gestionado por el sistema?:", `- ${role.managed}`) 
            
          .setColor("RANDOM")
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            
        /*let miembroroles = message.guild.roles.cache.get(role.id).members;
        message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);*/
        message.channel.send(embed)
        
    }
    
    if(command === 'roleid'){
            
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    
        if(!role) return message.channel.send('¡Especifica un rol por mención o por id!');
    
        const embed = new Discord.MessageEmbed()
        
          .setAuthor(`Solicitado por: ${message.author.username}`,`${message.author.displayAvatarURL()}`)
          .setDescription("Información sobre el rol mencionado.")
          .addField("Nombre:", `- ${role.name}`) 
          .addField("ID:", `- ${role.id}`) 
          .addField("Miembros con el Rol:", `- ${role.members.size}`)
          .addField("Posición:", `- ${role.rawPosition}`) 
          .addField("HexColor:", `- ${role.hexColor}`)  
          .addField("¿Mencionable?:", `- ${role.mentionable}`)
          .addField("¿Separado?:", `- ${role.hoist}`)
          .addField("¿Gestionado por el sistema?:", `- ${role.managed}`) 
            
          .setColor("RANDOM")
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            
        /*let miembroroles = message.guild.roles.cache.get(role.id).members;
        message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);*/
        message.channel.send(embed)
        
    }
    
    if(command === 'addrol'){
    
        let miembro = message.mentions.members.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find("name", nombrerol);
        let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
    
        if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `_addrol @username [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.addRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);
    
    }
    
    if(command === 'removerol'){
    
        let miembro = message.mentions.members.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find("name", nombrerol);
        let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
    
        if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `_removerol @miembro [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.removeRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido  correctamente.`);
    
    }

    if(command === 'lock'){

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
    
        var everyrole = message.guild.roles.everyone;
    
        var ch = message.mentions.channels.first();
    
        if(args[0] === 'all') { 
    
          try {
            message.guild.channels.cache.forEach(async(channel) => {
                await channel.updateOverwrite(everyrole, {
                    SEND_MESSAGES: false
                });
            }); 
          } catch(e) {
            console.log(e);
          };
    
          message.channel.send('🔒 Todos los canales del servidor fueron bloqueados')
            .then(m => m.delete({timeout: 5000}));
    
        } else if(ch){
    
          ch.updateOverwrite(everyrole, {
            SEND_MESSAGES: false
          });
    
          message.channel.send(`🔒 El canal <#${ch.id}> fue bloqueado`)
            .then(m => m.delete({timeout: 5000}));
    
        } else{
    
          message.channel.updateOverwrite(everyrole, {
            SEND_MESSAGES: false
          });
    
          message.channel.send('🔒 Este canal fue bloqueado')
            .then(m => m.delete({timeout: 5000}));
        }
    
    }
    
    if(command === 'unlock'){
    
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
    
        var everyrole = message.guild.roles.everyone;
    
        var ch = message.mentions.channels.first();
    
        if(args[0] === 'all') { 
    
          try {
            message.guild.channels.cache.forEach(async(channel) => {
                await channel.updateOverwrite(everyrole, {
                    SEND_MESSAGES: true
                });
            }); 
          } catch(e) {
            console.log(e);
          };
    
          message.channel.send('🔓 Todos los canales del servidor fueron desbloqueados')
            .then(m => m.delete({timeout: 5000}));
    
        } else if(ch){
    
          ch.updateOverwrite(everyrole, {
            SEND_MESSAGES: true
          });
    
          message.channel.send(`🔓 El canal <#${ch.id}> fue desbloqueado`)
            .then(m => m.delete({timeout: 5000}));
    
        } else{
    
          message.channel.updateOverwrite(everyrole, {
            SEND_MESSAGES: true
          });
    
          message.channel.send('🔓 Este canal fue desbloqueado')
            .then(m => m.delete({timeout: 5000}));
        }
    
    }

    if(command === 'clear'){

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        {
          message.channel.send("No Tienes Permisos Para Utilizar Este Comando");
        }else {
    
            message.delete({ timeout: 100 });
            if (!args[0])
    
                return message.channel.send(`Por Favor, especifica una cantidad`)
                .then(m => m.delete({timeout: 5000}));
    
            if (isNaN(args[0]))
    
                return message.channel.send(`Por favor, ingresa un número`)
                .then(m => m.delete({timeout: 5000}));
    
            if (args[0] > 100)
                return message.channel.send(`No puedo eliminar más de 100 mensajes`)
                .then(m => m.delete({timeout: 5000}));
          
            message.channel.bulkDelete(args[0]).then(Message => {
    
            message.channel.send('```'+ args[0] +' mensajes han sido borrados.'+'```')
            .then(msg => msg.delete({ timeout: 2000 }));

            });
        }
    
    }

    if(command === 'kick' ){

        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
        let permiso = message.member.hasPermission("KICK_MEMBERS");
    
        if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
                
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.channel.send('Escriba una razón, `_kick @username [razón]`');
        if (!message.guild.member(user).kickable) return message.reply('No puedo kickear al usuario mencionado.');
         
        message.guild.member(user).kick(razon);
        message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
    }
    
    if(command === 'ban'){
        
        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
        let permiso = message.member.hasPermission("BAN_MEMBERS");
    
        if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
    
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if(!razon) return message.channel.send('Escriba un razón, `_ban @username [razón]`');
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
        
    
        message.guild.member(user).ban(razon);
        message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
    
    }

    //COMANDOS DE DIVERSIÓN

    if(command === 'say'){

        let texto = args.join(" ");
    
        if(!texto) return message.channel.send(`Escriba un contenido para decir.`);
        message.channel.send(texto);
        message.delete({ timeout: 100 });
        
    }

    if(command === '8ball'){

        let texto = args.join(" ");
    
        var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Por supuesto! ","Por supuesto que no", "De ninguna manera", "Probablemente", "Es muy posible"];
        if (!texto) return message.reply(`Escriba una pregunta.`);
        message.channel.send(message.author.username+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');
    
    }

    if(command === 'roll')
    {

        let links = ["https://cdn.discordapp.com/attachments/684757256658747451/794277079243685888/dado-1.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277107537805332/dado-2.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277142800105483/dado-3.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277176592826368/dado-4.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277207619010590/dado-5.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277245157113866/dado-6.png"]

        var dado = links[Math.floor(Math.random() * links.length)]

        const embed = new Discord.MessageEmbed() 
        .setAuthor(`Midgard's Fun`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
        .setTitle(`${message.author.username} ha tirado el dado.`)
        .setDescription("El dado a caído en:")
        .setImage(dado)
        .setColor("RANDOM")
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
        message.channel.send(embed);

    }

    if(command === 'impostor'){

        const mencionado = message.mentions.members.first()
    
        if(!mencionado){
    
          if (`${message.author.id}` === '786453334349447198' )
          {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${message.author.username} Era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${nimpo-1} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
            nimpo = nimpo - 1
    
          } else {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${message.author.username} No era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${nimpo} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
          }
          
        } else{
    
          if (`${mencionado.id}` === '786453334349447198' )
          {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mencionado.user.username} Era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${nimpo-1} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
            
            nimpo = nimpo - 1
    
          } else {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mencionado.user.username} No era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${nimpo} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
          }
    
        }
    }
    
    if(command === 'buscaminas'){
    
    
        //Cadena que da vida al buscaminsa final con los iconos ocultos
        const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
        const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //Valores que puede tomar una casilla
        const bomb = 9; //El valor 9 representa el de la mina
        let bombas = 20; //NUMERO DE BOMBAS - Se puede cambiar y mejorar si se quiere jugar con eso
    
        let row = number[Math.floor(Math.random() * number.length)]; //Inicializa una posicion aleatoria
        let column = number[Math.floor(Math.random() * number.length)]; //Inicializa una posicion aleatoria
    
        var buscaminas=new Array(10); //Crea un array de 10
    
        for (let i = 0; i < 10; i++){
            buscaminas[i]=new Array(10); //Hace que el array de antes sea bidimensional (un tablero)
        }
          
        for (let i = 0; i<10; i++){
            for (let j = 0; j<10 ;j++){
              buscaminas[i][j] = 0;		//Inicializamos el tablero poniendo las casillas a cero
            }
        }
    
        while (bombas != 0) { // Hasta que no hayamos colocado todas la bombas no se sale
            
            while(buscaminas[row][column]==9){ //Cambias las posiciones si en ellas haya una bomba
                row = number[Math.floor(Math.random() * number.length)]; 
                column = number[Math.floor(Math.random() * number.length)];
            }
            //Si encuentra una casilla sin bomba, cambia su valor por el 9 (bomba) y resta una bomba al contador
            bombas = bombas-1;
            buscaminas[row][column] = 9;
            //Esta parte es la mÃ¡s liosa, pero lo que hacen los siguientes pasos es  mirar en que posicion esta la bomba para incrementar el valor de las casillas adyacentes si no son bombas.
          
            let iteri = 3; //Numero de casillas por fila para iterar 
    
            for (let i = 0; i < iteri; i++) {
                  
                let iterj = 3; //Numero de casillas por columna por iterar (Se reinicia por cada fila)
                  
                if (row == 0 && i == 0){
    
                    i++; //Si la casilla estÃ¡ arriba del todo, se le aumenta el valor a la i
    
                }
                  
                if (row == 10 - 1 && i == 0){
    
                    iteri--; //Si la casilla esta bajo del todo, las iteraciones se decrementan
    
                }
                  
                for (let j = 0; j < iterj; j++) {
                      
                    if (column == 0 && j == 0){
    
                    j++; //Si la casilla estÃ¡ a la izquierda del todo, se le aumenta la j
    
                    }
                          
                    if (column == 10 - 1 && j == 0){
    
                    iterj--;//Si la casilla estÃ¡ a la derecha del todo, se decrementan iteraciones
    
                    }
                        
                    if (i != 1 || j != 1){
    
                    //Si no es la casilla inicial
    
                        if (buscaminas[row + i - 1][column - 1 + j] != bomb){
                  
                            //Si no es una bomba
                            buscaminas[row + i - 1][column - 1 + j]++; //Incrementar el valor casilla
              
                        } 
                    }
                        
                }
            }
          
        }
    
        //Finalmente cambiamos los nÃºmeros por los emojis ocultos para crear el juego
        for (let i = 0; i<10; i++){
            
            for (let j = 0; j<10;j++){
    
              buscaminas[i][j] = choices[buscaminas[i][j]];
    
            }
    
        }
    
        message.channel.send(buscaminas);
    }

    if(command === 'ship'){

        let users =  message.mentions.users.first();
    
        if (!users) return message.reply("Menciona a alguien porfavor!")
        if (users === message.author) return message.channel.send("**No puedes hacer eso contigo mismo**");
        if (users === client.user) return message.channel.send("**No puedo calcular eso conmigo!**")
    
        const random = Math.floor(Math.random() * 100);
        let heard = "";
        let image = "";
    
        if(random < 20){
          
          heard=':face_exhaling:';
          image='https://media1.tenor.com/images/786aed6fa64f20409b1cb1ed4177cd20/tenor.gif?itemid=15906189';
    
        } else if(random < 50){
          
          heard=':broken_heart:';
          image='https://media.tenor.com/images/20294fd142a28d99f778db3647d8a576/tenor.gif';
    
        }else if(random < 80){
          
          heard=':sparkling_heart:';
          image='https://i.pinimg.com/originals/34/c9/e3/34c9e30b1a77bcd1aaedbebbdaf107e3.gif';
    
        }else if(random < 101){
          
          heard=':heart:';
          image='https://i.gifer.com/9mZB.gif';
    
        }
    
        let resp = [`El porcetanje de ${message.author.username} & ${users.username} es: `,`Oh vaya, calculo que el amor de ${message.author.username} & ${users.username} es un: `,`${message.author.username} & ${users.username} tienen un: `]
    
        let msg = resp[Math.floor(Math.random() * resp.length)] 
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
        .setTitle(`${msg}`)
        .setDescription(`${heard} ${random} % ${heard}`)
        .setImage(`${image}`)
        .setColor(0xff4d4d)
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
        message.channel.send(embed)
    }

    if(command === 'meme')
    {
        red({
        subreddit: 'SpanishMeme',
        sort: 'hot',
        allowNSFW: false,
        allowModPost: false,
        allowCrossPost: false,
        allowVideo: false
        }).then(post =>
            {
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Midgard's Fun`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
                .setTitle(post.title)
                .setImage(post.url)
                .setColor("RAMDOM")
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
    
                if(!post.url){
                    return message.channel.send("No encontré memes <:POLQUE:856670987499208775>")
                }else{
                    message.channel.send(embed);
                }

            }).catch((e) => message.channel.send("Hubo un error: " + e))
    }

    if(command === 'pokemon')
    {

        over.randomPokemon().then(pokemon => {

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("¿𝚀𝚞𝚒é𝚗 𝚎𝚜 𝚎𝚜𝚎 𝙿𝚘𝚔é𝚖𝚘𝚗?")
        .setDescription("Tienes 15 Segundos para responder ⌛")
        .setImage(pokemon.imageURL)
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
      
        message.channel.send(embed).then(msj => {

            message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] }).then(col => {

                const embed2 = new Discord.MessageEmbed() //el Embed si el autor adivino el Pokemon
                .setColor("GREEN")
                .setTitle("𝐀𝐂𝐄𝐑𝐓𝐀𝐒𝐓𝐄!")
                .setDescription("El Pokemon es **"+pokemon.name+"**")
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
          
                msj.edit(embed2)
        
            }).catch(col => {

                const embed3 = new Discord.MessageEmbed() //Embed de Fallo
                .setColor("RED")
                .setTitle("𝐄𝐑𝐑𝐎𝐑!")
                .setDescription("El Pokemon era **"+pokemon.name+"**")
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
         
                msj.edit(embed3)

            })

        })
        })
    }

    //COMANDOS DE CAFETERÍA

    var cafe = [
        "https://media.discordapp.net/attachments/853500788848853002/873251089703653396/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251090114707476/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251094371909692/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251095122690178/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251098222264360/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251121710395432/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251127439794226/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251134830161971/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251134825980034/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251136134602832/10.gif",
    ]
    
    
    if(command === 'cafe'){
    
        let img = message.mentions.users.first()
        let ramdoncafe = cafe[Math.floor(Math.random()*cafe.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** tomó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var agua = [
        "https://media.discordapp.net/attachments/853500788848853002/873251653703331900/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251656681287681/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251658048602162/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251666764369940/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251666684682321/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251671562649601/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251673533984818/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873252417158922250/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251676289642526/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873251681243107388/10.gif"    
    ]
    
    
    if(command === 'agua'){
    
        let img = message.mentions.users.first()
        let ramdonagua = agua[Math.floor(Math.random()*agua.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está tomando awita.`)
            .setImage(ramdonagua)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        }  else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un poquito de awita.`)
            .setImage(ramdonagua)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var te = [
        "https://media.discordapp.net/attachments/853500788848853002/873253192979341372/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253194308927568/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253202332614686/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253207659409408/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253209660084234/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253212776431697/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253221093740544/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253223014727771/8.gif?width=863&height=484",
        "https://media.discordapp.net/attachments/853500788848853002/873253231088767016/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253257718415380/10.gif"
    ]
    
    if(command === 'te'){
    
        let img = message.mentions.users.first()
        let ramdonte = te[Math.floor(Math.random()*te.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está relajándose con un tesito.`)
            .setImage(ramdonte)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ponte cómodo y relájate, que ${message.author.username} te ha invitado un tesito.`)
            .setImage(ramdonte)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var jugo = [
        "https://media.discordapp.net/attachments/853500788848853002/873253956577529987/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253962646700082/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253969231761508/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253973686124674/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253980665438268/5.gif?width=601&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873253982783557632/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253986621349968/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873253996901572618/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873254004593934346/10.gif"
    ]

    if(command === 'jugo'){
    
        let img = message.mentions.users.first()
        let ramdonjugo = jugo[Math.floor(Math.random()*jugo.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está tomando un delicioso juguito.`)
            .setImage(ramdonjugo)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un juguito.`)
            .setImage(ramdonjugo)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    if(command === 'tacos'){

        let img = message.mentions.users.first()
        let ramdontacos = tacos[Math.floor(Math.random()*tacos.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está comiendo unos tacos.`)
            .setImage(ramdontacos)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un rico taco.`)
            .setImage(ramdontacos)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var chocolate = [
        "https://media.discordapp.net/attachments/853500788848853002/873255248867786842/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255256513974362/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255257520623676/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255260850905099/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255265166823434/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255269952553030/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255276348842095/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255280169852958/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255283193942036/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873255288218738728/10.gif"
    ]
    
    if(command === 'chocolate'){
    
        let img = message.mentions.users.first()
        let ramdonchocolate = chocolate[Math.floor(Math.random()*chocolate.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está comiendo un delicioso chocolate.`)
            .setImage(ramdonchocolate)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un rico chocolate.`)
            .setImage(ramdonchocolate)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var galletas = [
        "https://media.discordapp.net/attachments/853500788848853002/873256019055218728/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256023417303171/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256029528412160/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256030933516298/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256037296259113/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256038139330560/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256047668756570/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256056501968946/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256060956340284/10.gif"
    ]
    
    if(command === 'galletas'){
    
        let img = message.mentions.users.first()
        let ramdongalletas = galletas[Math.floor(Math.random()*galletas.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`A **${message.author.username}** se le antojaron unas galletitas.`)
            .setImage(ramdongalletas)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó unas sabrosas galletitas.`)
            .setImage(ramdongalletas)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var helado = [
        "https://media.discordapp.net/attachments/853500788848853002/873256608992493578/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256611202875412/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256621625720932/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256621726371870/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256631134191616/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256630983209020/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256636247060560/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256637744443443/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873256646833487922/9.gif"
    ]
    
    if(command === 'helado'){
    
        let img = message.mentions.users.first()
        let ramdonhelado = helado[Math.floor(Math.random()*helado.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está comiendo un refrescante helado.`)
            .setImage(ramdonhelado)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un poquito de helado.`)
            .setImage(ramdonhelado)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    var hamburguesa = [
        "https://media.discordapp.net/attachments/853500788848853002/873257289824489542/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257293167341598/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257304760410132/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257304311623810/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257305150464020/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257311379009576/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257314461818891/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257316701577216/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257321256595496/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873257323034988554/10.gif"
    ]

    if(command === 'hamburguesa'){

        let img = message.mentions.users.first()
        let ramdonhamburguesa = hamburguesa[Math.floor(Math.random()*hamburguesa.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está comiendo una sabrosa hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una gran hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var pizza = [
        "https://media.discordapp.net/attachments/853500788848853002/873259191702270013/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259197427499068/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259214884180008/3.gif?width=863&height=521",
        "https://media.discordapp.net/attachments/853500788848853002/873259208945057872/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259216322822174/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259219531468910/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259223440584734/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259227290947674/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259229157416960/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259232428949525/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259243074105384/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259242562396170/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873259247314559057/13.gif"
    ]
    
    if(command === 'pizza'){
    
        let img = message.mentions.users.first()
        let ramdonpizza = pizza[Math.floor(Math.random()*pizza.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está comiendo una riquísima pizza.`)
            .setImage(ramdonpizza)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una sabrosa pizza.`)
            .setImage(ramdonpizza)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    //COMANDOS DE BAR

    var cocacola = [
        "https://media.discordapp.net/attachments/853500788848853002/873260856115363850/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260863904186368/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260873735602236/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260876692590625/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260886180134922/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260894589710417/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260904341463061/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873260912889438228/8.gif?width=401&height=561",
        "https://media.discordapp.net/attachments/853500788848853002/873260933282164796/10.gif"
    ]
    
    if(command === 'cocacola'){
    
        let img = message.mentions.users.first()
        let ramdoncocacola = cocacola[Math.floor(Math.random()*cocacola.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está refrescándose con una Coca Cola.`)
            .setImage(ramdoncocacola)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una Coca Cola... Disfrútala!`)
            .setImage(ramdoncocacola)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var redbull = [
        "https://media.discordapp.net/attachments/853500788848853002/873261607185186816/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261612180594759/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261619923267584/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261626885832724/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261640022360114/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261667469885561/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261673811693690/7.gif?width=562&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873261678781923328/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261688919572520/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873261694267293777/10.gif"
    ]
    
    if(command === 'redbull'){
    
        let img = message.mentions.users.first()
        let ramdonredbull = redbull[Math.floor(Math.random()*redbull.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está energizándose con un Red Bull.`)
            .setImage(ramdonredbull)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una lata de Red Bull.`)
            .setImage(ramdonredbull)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var cerveza = [
        "https://media.discordapp.net/attachments/853500788848853002/873263878727942144/1.gif?width=351&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873263891113705552/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263900689317888/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263903214288896/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263907924496384/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263917449748511/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263919823716352/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263927893586010/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873263932545040405/9.gif"
    ]
    
    if(command === 'cerveza'){
    
        let img = message.mentions.users.first()
        let ramdoncerveza = cerveza[Math.floor(Math.random()*cerveza.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está tomando una cervecita.`)
            .setImage(ramdoncerveza)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`Hey, **${img.username}**, disfruta tu cerveza invitada por ${message.author.username}.`)
            .setImage(ramdoncerveza)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    var vino = [
        "https://media.discordapp.net/attachments/853500788848853002/873264499136794634/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264498146947132/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264505319194644/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264513254842419/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264520636817449/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264526252982282/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264532909342750/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873264547471958086/9.gif"
    ]
    
    if(command === 'vino'){
    
        let img = message.mentions.users.first()
        let ramdonvino = vino[Math.floor(Math.random()*vino.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está disfrutando un rico vino.`)
            .setImage(ramdonvino)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, aquí te traigo una copa de vino invitado por ${message.author.username}.`)
            .setImage(ramdonvino)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var tequila = [
        "https://media.discordapp.net/attachments/853500788848853002/873265180543418428/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265199627534366/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265215976914974/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265224277426296/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265229474177084/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265238122856468/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265247325139034/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265257508900914/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873265268946788462/10.gif"
    ]
    
    if(command === 'tequila'){
    
        let img = message.mentions.users.first()
        let ramdontequila = tequila[Math.floor(Math.random()*tequila.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está disfrutando un tequilita.`)
            .setImage(ramdontequila)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`Hey, **${img.username}**, toma este tequila invitado por ${message.author.username}.`)
            .setImage(ramdontequila)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var ron = [
        "https://media.discordapp.net/attachments/853500788848853002/873266014559809536/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266031114743888/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266053608788028/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266065948438598/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266085435154502/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266090082455582/6.gif?width=562&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873266105542660156/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266116103929866/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266127617261608/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266135775207454/10.gif"
    ]
    
    if(command === 'ron'){
    
        let img = message.mentions.users.first()
        let ramdonron = ron[Math.floor(Math.random()*ron.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está celebrando con un roncito.`)
            .setImage(ramdonron)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, agradécele a ${message.author.username} porque te está invitando un ron.`)
            .setImage(ramdonron)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var coctel = [
        "https://media.discordapp.net/attachments/853500788848853002/873266715746783342/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266726555512912/2.gif?width=404&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873266731467030528/3.gif?width=401&height=561",
        "https://media.discordapp.net/attachments/853500788848853002/873266738651869194/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266745538932796/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266760319647784/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266768460787722/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266776446738502/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873266781815447602/10.gif"
    ]
    
    if(command === 'coctel'){
    
        let img = message.mentions.users.first()
        let ramdoncoctel = coctel[Math.floor(Math.random()*coctel.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está saboreando su delicioso coctel.`)
            .setImage(ramdoncoctel)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, disfruta este coctel que te ha invitado ${message.author.username}.`)
            .setImage(ramdoncoctel)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var porro = [
        "https://media.discordapp.net/attachments/853500788848853002/873270304313597972/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270307308331068/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270321959010374/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270325566115900/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270334768431144/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270338304213012/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873270339344412712/8.gif",
    ]
    
    if(command === 'porro'){
    
        let img = message.mentions.users.first()
        let ramdonporro = porro[Math.floor(Math.random()*porro.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está volando con un porro de mota.`)
            .setImage(ramdonporro)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, disfruta de esta mota que te ha invitado ${message.author.username}.`)
            .setImage(ramdonporro)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };

    }

    var cigarro = [
        "https://media.discordapp.net/attachments/853500788848853002/873272694886531163/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272700343308318/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272705259024434/3.gif?width=374&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873272709335883817/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272723151945759/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272729841852496/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272736225570846/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272746136698950/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873272750955974686/10.gif"
    ]
    
    if(command === 'cigarro'){
    
        let img = message.mentions.users.first()
        let ramdoncigarro = cigarro[Math.floor(Math.random()*cigarro.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está fumando un cigarrito.`)
            .setImage(ramdoncigarro)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`Hey **${img.username}**, ${message.author.username} ha compartido un cigarro contigo.`)
            .setImage(ramdoncigarro)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var huca = [
        "https://media.discordapp.net/attachments/853500788848853002/873273468462989342/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273476625076264/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273480441917470/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273489061191751/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273498175434832/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273507893637130/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273520304586802/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273530479955998/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273544077873213/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273554320359454/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873273559781343242/11.gif"
    ]
    
    if(command === 'huca'){
    
        let img = message.mentions.users.first()
        let ramdonhuca = huca[Math.floor(Math.random()*huca.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`A **${message.author.username}** le apeteció una pipa bien potente.`)
            .setImage(ramdonhuca)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, disfruta de la hookah que te invitó ${message.author.username}.`)
            .setImage(ramdonhuca)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    //COMANDSO DE DISCO

    var perreo = [
        "https://media.discordapp.net/attachments/853500788848853002/873274148300927046/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274158027513866/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274169305997373/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274177619111966/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274193976897596/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274205532213298/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274214302486538/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274228147892264/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274256765644820/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274270090936340/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274285500805190/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274309915848774/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274322964332594/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274336100900916/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274377234427914/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274402081492992/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873274419089395722/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/877026220661944370/19.gif?width=432&height=243",
        "https://media.discordapp.net/attachments/853500788848853002/877026227356074004/20.gif?width=252&height=448",
        "https://media.discordapp.net/attachments/853500788848853002/877026237346885662/21.gif?width=432&height=432",
        "https://media.discordapp.net/attachments/853500788848853002/877026242707202088/22.gif?width=432&height=243",
        "https://media.discordapp.net/attachments/853500788848853002/877026250777051186/23.gif?width=297&height=294",
        "https://media.discordapp.net/attachments/853500788848853002/877026259887079504/24.gif?width=372&height=219",
        "https://media.discordapp.net/attachments/853500788848853002/877026271266230292/25.gif?width=237&height=418",
        "https://media.discordapp.net/attachments/853500788848853002/877026284578959400/26.gif?width=432&height=331",
        "https://media.discordapp.net/attachments/853500788848853002/877026293949034526/27.gif?width=297&height=297",
        "https://media.discordapp.net/attachments/853500788848853002/877026307911843850/28.gif?width=294&height=226",
        "https://media.discordapp.net/attachments/853500788848853002/877026322193457192/29.gif?width=486&height=246",
        "https://media.discordapp.net/attachments/853500788848853002/877026333287407696/30.gif?width=432&height=243"
    ]
    
    if(command === 'perreo'){
    
        let img = message.mentions.users.first()
        let ramdonperreo = perreo[Math.floor(Math.random()*perreo.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está perreando hasta el piso.`)
            .setImage(ramdonperreo)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, ${message.author.username} te está perreando duro contra el muro. <a:perreo:880634843610902640>`)
            .setImage(ramdonperreo)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    var bachata = [
        "https://media.discordapp.net/attachments/853500788848853002/873276689512296558/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276703626121246/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276721560948736/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276739990749314/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276749511819354/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276757724266526/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276769191489596/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276779127775252/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276791282868264/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276794428612668/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276801135300718/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276811637846056/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276819997085736/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873276834622632007/14.gif"
    ]
    
    if(command === 'bachata'){
    
        let img = message.mentions.users.first()
        let ramdonbachata = bachata[Math.floor(Math.random()*bachata.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`Miren a **${message.author.username}** como disfruta esa bachata.`)
            .setImage(ramdonbachata)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}**, está bachateando con ${message.author.username}.`)
            .setImage(ramdonbachata)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var salsa = [
        "https://media.discordapp.net/attachments/853500788848853002/873277547759140884/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277558421090314/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277570261606450/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277582743863326/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277597226790932/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277604340334682/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277631984971836/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277638163193866/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277648464388176/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277659109544016/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873277666562818098/11.gif"
    ]
    
    var salsa2 = [
        "https://media.discordapp.net/attachments/853500788848853002/873278131887296573/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873278143283200091/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873278151998992434/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873278166683238480/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873278181459775558/16.gif"
    ]
    
    if(command === 'salsa'){
    
        let img = message.mentions.users.first()
        let ramdonsalsa = salsa[Math.floor(Math.random()*salsa.length)]
        let ramdonsalsa2 = salsa2[Math.floor(Math.random()*salsa2.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** salsea como los dioses.`)
            .setImage(ramdonsalsa2)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${img.username}** y ${message.author.username} están salseando juntos.`)
            .setImage(ramdonsalsa)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var cumbia = [
        "https://media.discordapp.net/attachments/880918347414380605/883498586841690142/981e0995ba932b34b6fb3db3a7e3904e0d3e778e.gif?width=432&height=332",
        "https://media.discordapp.net/attachments/880918347414380605/883498593829388328/giphy.gif?width=259&height=184",
        "https://media.discordapp.net/attachments/879633476532453386/883512435070337044/mp4_5.gif?width=466&height=466",
        "https://media.discordapp.net/attachments/879633476532453386/883517112965033994/4.gif?width=360&height=202",
        "https://media.discordapp.net/attachments/879633476532453386/883517117809426432/5.gif?width=576&height=306",
        "https://media.discordapp.net/attachments/879633476532453386/883517125283704882/6.gif?width=448&height=205",
        "https://media.discordapp.net/attachments/879633476532453386/883517138776760320/7.gif?width=360&height=202",
        "https://media.discordapp.net/attachments/879633476532453386/883517159593087026/8.gif?width=423&height=243",
        "https://media.discordapp.net/attachments/879633476532453386/883517187598475354/9.gif?width=315&height=315",
        "https://media.discordapp.net/attachments/879633476532453386/883517199636123658/10.gif?width=294&height=226"
    ]
    
    var cumbia2 = [
        "https://media.discordapp.net/attachments/880918347414380605/883498600653525012/dance-happy.gif?width=396&height=226",
        "https://media.discordapp.net/attachments/880918347414380605/883498627484491796/DeadYellowishGrizzlybear-size_restricted.gif?width=391&height=225",
        "https://media.discordapp.net/attachments/880918347414380605/883498640407158794/WellinformedImpressiveIndiancow-max-1mb.gif?width=155&height=270",
        "https://media.discordapp.net/attachments/879633476532453386/883509838653571072/mp4_1.gif?width=314&height=562",
        "https://media.discordapp.net/attachments/879633476532453386/883510318112845834/mp4_2.gif?width=538&height=403",
        "https://media.discordapp.net/attachments/879633476532453386/883511614182129674/mp4_3.gif?width=340&height=561",
        "https://media.discordapp.net/attachments/879633476532453386/883512430402097172/mp4_4.gif?width=220&height=162",
        "https://media.discordapp.net/attachments/879633476532453386/883517074146734112/1.gif?width=396&height=484",
        "https://media.discordapp.net/attachments/879633476532453386/883517086876442664/2.gif?width=396&height=396",
        "https://media.discordapp.net/attachments/879633476532453386/883517102856753162/3.gif?width=432&height=317"
    ]
    
    if(command === 'cumbia'){
    
        let img = message.mentions.users.first()
        let ramdoncumbia = cumbia[Math.floor(Math.random()*cumbia.length)]
        let ramdoncumbia2 = cumbia2[Math.floor(Math.random()*cumbia2.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está bailando un pinche cumbión bien loco.`)
            .setImage(ramdoncumbia2)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`A **${img.username}** y ${message.author.username} les va bien los pasitos de cumbia.`)
            .setImage(ramdoncumbia)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var colegiala = [
        "https://media.discordapp.net/attachments/853500788848853002/873279087056142416/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279098938605568/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279109239808092/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279127359213588/4.gif?width=320&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873279134736994384/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279155377143908/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279168094298162/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279181365051392/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279204341469234/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279231214366790/10.gif?width=381&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873279245722472468/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873279257994989618/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/874073561894125568/13.gif?width=318&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/874073566121959424/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/874073579078160444/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/874073589052219412/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/874073599777062932/17.gif?width=293&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/874073609969221702/18.gif?width=449&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/874073616545906758/19.gif?width=449&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/874073630051557446/20.gif"
    ]
    
    if(command === 'colegiala'){
    
        let img = message.mentions.users.first()
        let ramdoncolegiala = colegiala[Math.floor(Math.random()*colegiala.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** pidió una colegiala y no la quiere compartir. <:jaaa:846566909239099403>`)
            .setImage(ramdoncolegiala)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`Opa! **${img.username}**, mira esta colegiala que ${message.author.username} te trajo. <:uyy:805310624523223041>`)
            .setImage(ramdoncolegiala)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    //COMANDOS DE REACCIÓN

    var hi = [
        "https://media.discordapp.net/attachments/853500788848853002/873248866462466149/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248868052115476/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248872942669904/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248873714421800/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248878453993512/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248880144310373/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248880467271740/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248884011458630/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248889766019072/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248891519262850/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873249148839788564/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873249151649988658/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248910737559613/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248928181661796/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873248934749945886/15.gif"
    ]
    
    if(command === 'hi'){
    
        let img = message.mentions.users.first()
        let ramdonhi = hi[Math.floor(Math.random()*hi.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
          //.setTitle("Imagen completa")
          .setDescription(`**${message.author.username}** está saludando a todos.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
          message.channel.send(embed);
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
          //.setTitle("Imagen completa")
          .setDescription(`**${img.username}**, está saludando a ${message.author.username}.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
          message.channel.send(embed);
    
        };
    
    }

    var hug = [
        "https://media.discordapp.net/attachments/853500788848853002/873282724784386048/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282738441031780/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282749954420816/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282761681678416/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282769642475530/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282778911891526/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282789020143686/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282796213391431/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282801007493120/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873282807412187136/10.gif"
    ]
    
    var hug2 = [
        "https://media.discordapp.net/attachments/853500788848853002/873284896544673814/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284905105235968/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284910025175080/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284913078603776/14.gif?width=749&height=562",
        "https://media.discordapp.net/attachments/853500788848853002/873284925615403088/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284932531789835/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284936424099920/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284942535196682/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284951703953489/19.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873284958205141002/20.gif"
    ]
    
    if(command === 'hug'){
    
        let img = message.mentions.users.first()
        let ramdonhug = hug[Math.floor(Math.random()*hug.length)]
        let ramdonhug2 = hug2[Math.floor(Math.random()*hug2.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** se está abrazando a sí mismo.`)
            .setImage(ramdonhug2)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** está abrazando a **${img.username}**.`)
            .setImage(ramdonhug)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var kiss = [
        "https://media.discordapp.net/attachments/853500788848853002/873303560559951882/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303577492357150/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303601970315334/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303610883190784/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303633855389736/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303652230639646/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303670568124436/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303680571547648/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873303687462797372/10.gif",
        "https://i.pinimg.com/originals/15/a8/43/15a843df655233fd7829efc70932be17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/877364191877533696/11.gif?width=202&height=202",
        "https://media.discordapp.net/attachments/853500788848853002/877364200962408469/12.gif?width=448&height=331",
        "https://media.discordapp.net/attachments/853500788848853002/877364212379299861/13.gif?width=450&height=351",
        "https://media.discordapp.net/attachments/853500788848853002/877364221409644574/14.gif?width=319&height=180",
        "https://media.discordapp.net/attachments/853500788848853002/877364235447984148/15.gif?width=450&height=190",
        "https://media.discordapp.net/attachments/853500788848853002/877364246252494868/16.gif?width=308&height=227",
        "https://media.discordapp.net/attachments/853500788848853002/877364263432372284/17.gif?width=450&height=248",
        "https://media.discordapp.net/attachments/853500788848853002/877364280117325854/18.gif?width=432&height=243",
        "https://media.discordapp.net/attachments/853500788848853002/877364288724017162/19.gif?width=313&height=176",
        "https://media.discordapp.net/attachments/853500788848853002/877364300702949386/20.gif?width=450&height=315"
    ]
    
    if(command === 'kiss'){
    
        let img = message.mentions.users.first()
        let ramdonkiss = kiss[Math.floor(Math.random()*kiss.length)]
     
        if (!img || img.id===message.author.id) {
    
            message.channel.send("¿Te besarías a ti mism@? <:pepemaje:846893345678950420>");
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** le dió un beso a **${img.username}**.`)
            .setImage(ramdonkiss)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    var sad = [
        "https://media.discordapp.net/attachments/853500788848853002/876010421180563466/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010424993202186/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010430995255296/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010433377632256/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010448334520390/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010484392947722/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010494933233715/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010503179239444/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010512364732426/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010522091331584/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010530333143080/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010537761247232/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010558460145704/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010565389144084/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010575476432936/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010587409227776/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010603364360222/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010619541803018/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010627229949972/19.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876010637044617226/20.gif"
    ]
    
    if(command === 'sad'){
    
        let img = message.mentions.users.first()
        let ramdonsad = sad[Math.floor(Math.random()*sad.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
          //.setTitle("Imagen completa")
          .setDescription(`**${message.author.username}** se puso modo depre.`)
          .setImage(ramdonsad)
          .setColor("RANDOM")
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
          message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** y **${img.username}** andan modo sad.`)
            .setImage(ramdonsad)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var cry = [
        "https://media.discordapp.net/attachments/853500788848853002/876015088862122025/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015121032417310/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015140665958471/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015158143647774/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015162648322088/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015167698255933/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015171091464192/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015174434308106/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015173297635348/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015176174936085/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015177315803156/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015179710754856/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015188405518377/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015184878133298/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015194181103636/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015195774939166/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015199612698634/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015203173662731/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015211444830218/19.gif",
        "https://media.discordapp.net/attachments/853500788848853002/876015215681110056/20.gif"
    ]
    
    if(command === 'cry'){
    
        let img = message.mentions.users.first()
        let ramdoncry = cry[Math.floor(Math.random()*cry.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
          //.setTitle("Imagen completa")
          .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
          .setImage(ramdoncry)
          .setColor("RANDOM")
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
          message.channel.send(embed);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** y **${img.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

    var sape = [
        "https://media.discordapp.net/attachments/853500788848853002/873304385420148816/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304389463457832/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304401702428772/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304419318517760/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304426864070696/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304435005214750/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304443368660992/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304451107127296/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304465741070417/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304477149564959/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304488197386342/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304496304975882/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304508204220446/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304517469429790/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304527573500026/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304539527250001/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304550747025468/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304565611659324/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304575464075264/19.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873304589179420683/20.gif"
    ]
    
    if(command === 'sape'){
    
        let img = message.mentions.users.first()
        let ramdonsape = sape[Math.floor(Math.random()*sape.length)]
      
        if (!img || img.id===message.author.id) {
    
            message.channel.send("¿Te darías un autosape? <:pepemaje:846893345678950420>");
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** le dió un sape a **${img.username}**.`)
            .setImage(ramdonsape)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    var punch = [
        "https://media.discordapp.net/attachments/853500788848853002/873321715109867593/1.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321724203134986/2.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321734525321216/3.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321746290331688/4.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321754003656774/5.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321768885026876/6.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321775038099526/7.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321791907586068/8.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321811515953172/9.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321829765353522/10.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321839814918224/11.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321874237558815/12.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321876708032592/13.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321887307005993/14.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321899856379974/15.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321908211445781/16.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321920362344458/17.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321944374714448/18.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321953853837342/19.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321964360585326/20.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321988746264647/21.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873321997675925624/22.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322022967603240/23.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322039363137586/24.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322050234757240/25.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322061110579220/26.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322076214292551/27.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322091812884500/28.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322108283916298/29.gif",
        "https://media.discordapp.net/attachments/853500788848853002/873322125799338005/30.gif"
    ]
    
    if(command === 'punch'){
    
        let img = message.mentions.users.first()
        let ramdonpunch = punch[Math.floor(Math.random()*punch.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send("¿Te golpearías a ti mismo? <:pepemaje:846893345678950420>");
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** le dió un puñetazo a **${img.username}**.`)
            .setImage(ramdonpunch)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }
    
    if(command === 'slap'){
          
        let img = message.mentions.users.first()
        //let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send("Debes mencionar a alguien!");
    
        } else {
    
          neko.sfw.slap().then(neko => {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** abofeteó a **${img.username}**.`)
            .setImage(neko.url)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
    
          })
            
        }
    
    }
    
    var kill = [
        "https://media.discordapp.net/attachments/879633476532453386/883536186877050890/1.gif?width=448&height=252",
        "https://media.discordapp.net/attachments/879633476532453386/883536204539240459/2.gif?width=448&height=250",
        "https://media.discordapp.net/attachments/879633476532453386/883551478579593306/3.gif?width=461&height=319",
        "https://media.discordapp.net/attachments/879633476532453386/883551490134900737/4.gif?width=432&height=225",
        "https://media.discordapp.net/attachments/879633476532453386/883551495772078080/5.gif?width=448&height=301",
        "https://media.discordapp.net/attachments/879633476532453386/883551507964919848/6.gif?width=378&height=252",
        "https://media.discordapp.net/attachments/879633476532453386/883551517704089620/7.gif?width=450&height=270",
        "https://media.discordapp.net/attachments/879633476532453386/883551529758507009/8.gif?width=450&height=248",
        "https://media.discordapp.net/attachments/879633476532453386/883551545571037244/9.gif?width=450&height=249",
        "https://media.discordapp.net/attachments/879633476532453386/883551557835182170/10.gif?width=315&height=180",
        "https://media.discordapp.net/attachments/879633476532453386/883551576038457354/11.gif?width=364&height=204",
        "https://media.discordapp.net/attachments/879633476532453386/883551582589976696/12.gif?width=220&height=180",
        "https://media.discordapp.net/attachments/879633476532453386/883551600801640478/13.gif?width=288&height=216",
        "https://media.discordapp.net/attachments/879633476532453386/883551612801544212/14.gif?width=432&height=178",
        "https://media.discordapp.net/attachments/879633476532453386/883551622565863484/15.gif?width=360&height=193"
    ]
    
    if(command === 'kill'){
          
        let img = message.mentions.users.first()
        let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send("¿Que alguién lo detenga, por favor? <:panda_sad:796356683277402143>");
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,"https://media.discordapp.net/attachments/879633476532453386/880505945497677824/PicsArt_08-26-07.00.27.jpg?width=862&height=485")
            //.setTitle("Imagen completa")
            .setDescription(`**${message.author.username}** acaba de masacrar a **${img.username}**.`)
            .setImage(ramdonkill)
            .setColor("RANDOM")
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,"https://images-ext-1.discordapp.net/external/LqjSNTRuPDp-S3_PX4vknOlPAi6jU_q8EI7tofjmDVw/%3Fsize%3D128/https/cdn.discordapp.com/icons/777620055344545842/a_aae0a18f3292a0f55425daa36395b79b.gif");
            message.channel.send(embed);
      
        };
    
    }

});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(process.env.TOKEN); 