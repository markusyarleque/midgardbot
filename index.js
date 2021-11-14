const Discord = require('discord.js');
// const client = new Discord.Client();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { MessageSelectMenu, MessageEmbed } = require('discord.js')

const { MessageActionRow, MessageButton } = require('discord.js');

const newUsers = new Discord.Collection();
const listask = new Discord.Collection();
client.snipes = new Map();

const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();

const red = require('reddit-fetch');

const over = require('poke-over');

const clientN = require('nekos.life');
const neko = new clientN();

const dbv = require('megadb');
// const db_marry = new dbv.crearDB('marry');
const vip = new dbv.crearDB('vip');
const bl = new dbv.crearDB('blacklist');
// const fs = require('fs');

// const Canvas = require('canvas')

// const marsnpm = require('marsnpm')

const prefix = process.env.PREFIX;

client.on('ready', () => {
  // client.user.setActivity('bot en heroku', {type: 'WATCHING'});
  client.user.setPresence({
    status: 'online',
    activity: {
      name: '💻 | Malta Bot',
      type: 'PLAYING',
    },
  });
  console.log('Listo!');

});

client.on('guildMemberAdd', (member) => {

  const guild = member.guild;
  newUsers.set(member.id, member.user);

  console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${guild.name}.`);

  // var canal = client.channels.get('840421191982252082'); 
  // canal.send(`Hola ${member.user}, bienvenid@ nos alegra que formes parte de nosotros.`);

  // Send the message to a designated channel on a server:
  const channel = guild.channels.cache.find(ch => ch.id === '779566489429737472');
  
  if (!channel) return;

  if (newUsers.size > 1000000) {

    const userlist = newUsers.map(u => u.toString()).join(' ');
    channel.send(`¡Bienvenid@ Terrícola! ${userlist}, a este nuestro **Universo**. <:ShyLove:880410907635748924> Les invito a pasar por <#855582327514202132> y <#785685918270488656> Y si tienen una queja, duda o sugerencia, pasen por <#815654349912801280>. Cualquier duda o pregunta aquí estará todo el equipo de Staff a su disposición. <a:pasito:877116925291946094> Pásenla increíble, lindo día, tarde o noche. <a:abdul_dance:880930576683630662>`);
    newUsers.clear();

    }
  else{
      
    channel.send(`¡Bienvenid@ Terrícola! ${member.user}, a este nuestro **Universo**. <:ShyLove:880410907635748924>. Espero que te lo pases genial en este server libre de toxicidad, con muchos eventos programados, premios y más sorpresas!!! <a:Sara:880304101215334401> Recuerda pasar por <#777623227321155614> y <#880268322921414657> Y si tienes alguna queja, duda o sugerencia, pasa por <#880402803825188874>. Cualquier incoveniente aquí estará todo el equipo de Staff a su disposición. <a:dc_party1:881033439367815239>`);

  }
    
});

client.on('guildMemberRemove', (member) => {
    if(newUsers.has(member.id)) newUsers.delete(member.id);
  });

const imgdelete = new Discord.MessageEmbed() 

client.on('messageDelete', (message) => {

    client.snipes.set(message.channel.id, {
        content: message.content,
        delete: message.author,
        canal: message.channel
    });

    let sv = client.guilds.cache.get('851924635930329098')
    let channel = sv.channels.cache.get('880280265216389140')

    const embed = new Discord.MessageEmbed()
    .setAuthor('MaltaBot', client.user.avatarURL())
    .setTitle('📢 | Mensajes Borrados')
    .addField('Canal: ', `---> <#${message.channel.id}>`)
    .addField('Autor: ', `---> ${message.author}`)
    .addField('Mensaje: ', `---> ${message.content}`)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
    
    channel.send({ embeds: [embed] });
    //channel.send('📢 | Mensajes Borrados\n``` \n===> Canal:\n'+`${message.channel.name}`+' | '+ message.channel.id +'\n\n===> Autor:\n'+`${message.author.username}`+' | '+ message.author.id +'\n\n===> Mensaje:\n'+message.content+'\n\n```')

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

client.on('messageCreate', message => {

    if (message.channel.type === 'dm') {
  
      let sv = client.guilds.cache.get('777620055344545842')
      let channel = sv.channels.cache.get('874943743185285150')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje directo')
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    }
  
    if(message.channel.id==='880290686107275304')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880267684950999050')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='880292291443556383')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280405993996339')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='840161683732693033')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280308732272640')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='880531543465021570')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280346208395305')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='870195067338506271')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280535304372234')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='880384504240422972')
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280557051858974')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else
    {
  
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280265216389140')
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado')
      .addField('Canal: ', `---> <#${message.channel.id}>`)
      .addField('Autor: ', `---> ${message.author}`)
      .addField('Mensaje: ', `---> ${message.content}`)
      .setColor('RANDOM')
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
        message.channel.send({ embeds: [embed] })
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
          message.channel.send({ embeds: [embed] })
        }
  
  
        let bot = new RegExp(`^<@!?${'904290001196556369'}>( |)$`);
  
        if (message.content.match(bot))
        {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.username+'#'+message.author.discriminator, `${message.author.displayAvatarURL()}`)
          .setDescription('Hola! **'+ message.author.username +'** Mi Prefix es: `_` Puedes ver mis comandos disponibles usando: `_help`. Para enviar un reporte usa: `_report` y para una sugerencia: `_suggestion`.')
          .setColor('RANDOM')
          message.channel.send({ embeds: [embed] })
  
        }
  
})

client.on('messageCreate', async message => {

    if(!message.content.startsWith(process.env.PREFIX)) return;
    if (message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(bl.tiene(message.author.id)) return message.channel.send('Estás prohibido de usar estos comandos, contacta con el equipo de desarrolladores para más información.!');

    if(command === 'malta'){

        let id = ['753435606410985573']
  
        if(!id.some(id => message.author.id == id)) {
        
          const embed = new Discord.MessageEmbed()
          .setDescription('Solo el developer del bot puede usar este comando.')
          .setColor('RED')
          message.channel.send({ embeds: [embed] })
          .then(m => m.delete({timeout: 5000}));
  
        } else {
  
          var estadobot = message.content.split(' ').slice(1).join(' ')
  
          if(!estadobot){
  
            message.reply('Exactamente... ¿Qué quieres que ponga?').then(m => m.delete({timeout: 5000}));
  
          }else{
  
            client.user.setActivity({name:estadobot, type:'LISTENING'})
            message.reply('Estado cambiado con éxito <a:pasito:877116925291946094>')
  
          }
  
        }
  
      }


    // COMANDOS DE INFORMACIÓN

    if (command === 'ping') {

        let ping = Math.floor(message.client.ws.ping);

         message.channel.send(':ping_pong: Pong!')
          .then(m => {
    
              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          
          });

    }

    if(message.content.startsWith(prefix + 'stats')){

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
        .setAuthor('MidgardBot', client.user.avatarURL())
        .setTitle('Estadísticas')
        .addField('Desarrollador: ', 'Maltazard#1207')
        .addField('Servidores: ', `${client.guilds.cache.size}`)
        .addField('Usuarios: ', ` ${client.users.cache.size}`)
        .addField('Ram: ', ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField('Lenguaje: ', 'JavaScript')
        .addField('Libreria', 'Discord.js v12.2.0')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({ embeds: [embed] });
        
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
    .setAuthor(server.name, 'https://media.discordapp.net/attachments/879633476532453386/880906710066294815/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485')
    .addField('ID:', server.id, false)
    .addField('Dueño:', `${server.owner.user.tag} (${server.ownerID})` , true)
    //.addField('Creado el:', server.createdAt, false)
    .addField('Creado el:', moment(server.createdTimestamp).format('LL') + ' a las '+moment(server.createdTimestamp).format('LT') + ' [' + moment(server.createdTimestamp).fromNow()+' ]', false)
    
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
    .setColor('RANDOM')
    
    .setTimestamp(new Date())
    .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL({ dynamic: true }).replace('webp','png')}`);
        
   message.channel.send({ embed });

    }

    let prohibidos = ['ID1', 'ID2'];

    if(command === 'report'){

    if(prohibidos.includes(message.author.id)) return message.channel.send('¡Tienes prohibido usar este comando por mal usarlo!');

    let reporte = args.join(' ');
    if(!reporte) return message.channel.send('❎ **Debes agregar un reporte para enviar al desarrollador!**')

    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874891049120714752')

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
    .setTitle('<a:alto:860350719172542464> | Reporte')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres reportar este bug? ¡Usar mal el comando causará la prohibición!`)
    .addField('Bug a reportar:', reporte)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Developer Team - Midgard Club`, `${message.author.displayAvatarURL()}`);
    message.delete({ timeout: 100 });
    message.channel.send({ embeds: [embed] }).then(m => {

      m.react('✅')
      m.react('❎')
     
      const filtro = (reaction, user) => {
        return ['✅', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions(filtro, {max: 1, time: 60000, errors: ['time']}).catch(() => {

        m.edit('¡No confirmaste a tiempo! <:enojado:882877729266098186>')
        m.reactions.removeAll()

      }).then(coleccionado=> {

        const reaccion = coleccionado.first();

        if(reaccion.emoji.name === '✅') {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .setDescription('Reporte confirmado con éxito! <a:emoji_266:812426331685519393>')
          .addField('Bug reportado:', reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit(bugco)
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .addField('Ha llegado el siguiente reporte:', reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send(bugre)
        } else if(reaccion.emoji.name === '❎') {

          m.edit('Reporte cancelado. <:y_:868544745541087293>')
          m.reactions.removeAll()

        }
      })
    })
    }

    if(command === 'suggestion'){

    if(prohibidos.includes(message.author.id)) return message.channel.send('¡Tienes prohibido usar este comando por mal usarlo!');

    let reporte = args.join(' ');
    if(!reporte) return message.channel.send('❎ **Debes agregar una sugerencia para enviar al desarrollador!**')

    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874922451040083978')

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
    .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres dar esta sugerencia? ¡Usar mal el comando causará la prohibición!`)
    .addField('Sugerencia:', reporte)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Developer Team - Midgard Club`, `${message.author.displayAvatarURL()}`);
    message.delete({ timeout: 100 });
    message.channel.send({ embeds: [embed] }).then(m => {

      m.react('✅')
      m.react('❎')
     
      const filtro = (reaction, user) => {
        return ['✅', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions(filtro, {max: 1, time: 60000, errors: ['time']}).catch(() => {

        m.edit('¡No confirmaste a tiempo! <:enojado:882877729266098186>')
        m.reactions.removeAll()

      }).then(coleccionado=> {

        const reaccion = coleccionado.first();

        if(reaccion.emoji.name === '✅') {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor('RANDOM')
          .setDescription('Sugerencia realizada con éxito! <a:emoji_266:812426331685519393>')
          .addField('Sugerencia:', reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit(bugco)
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor('RANDOM')
          .addField('Ha llegado la siguiente sugerencia:', reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send(bugre)
        } else if(reaccion.emoji.name === '❎') {

          m.edit('Sugerencia cancelada. <:y_:868544745541087293>')
          m.reactions.removeAll()

        }
        })
        })
    }

    if(command === 'vote'){

      const embed = new Discord.MessageEmbed()
      .setAuthor(`Midgard's Staff`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
      .setThumbnail('https://logos-marcas.com/wp-content/uploads/2020/12/Discord-Logo.png')
      .setTitle('Vota por Nuestro Servidor <a:elmo_timido:894721783066918953>')
      .setDescription(`Estaremos eternamente agradecidos que votes por Midgard! <:abby:880300168514252811>`)
      .addField('Top.gg','[Click aquí para votar](https://top.gg/servers/777620055344545842/vote)\n\n',false)
      //.addField('\u200B','<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>')
      .addField('Recompensas por tu voto <a:CorazonMulticolor:880315280759345163>','Recibirás un Rol muy especial que te diferenciará de los demás:\n\n <a:dc_zFlecha3:880315279903703060> <@&886772939549184052> \n\nAdemás, este rol te dará una cierta cantidad de coins de nuestro casino cada cierto tiempo... \n\nDescúbrelo!!! <:tierno:881618338759966800>',true)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`🌎┃「Midgard」• Muchas gracias por tu voto!`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      
      const row = new MessageActionRow()
      .addComponents(

        new MessageButton()
        
        .setLabel('VOTAR') //Lo que quieran que aparezca en el boton
        //.setEmoji('?') //Puede ser cualquier emoji, si le han puesto el label aparecera al lado izquierdo del texto, si no le pusieron el label aparecera en medio del boton
        .setStyle('Link') //Ponemos el estilo del botón, los estilos los puedes encontra
        .setURL('https://top.gg/servers/777620055344545842/vote') 

      )
      message.channel.send({embeds : [embed], components : [{ 'type': 1, 'components': [row] }]});

    }

    //COMANDOS DE UTILIDAD

    if(command === 'user'){

        let userm = message.mentions.users.first()

        if(!userm){
            
            var user = message.author;
          
            const embed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', 'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .addField('Jugando a', user.presence.game != null ? user.presence.game.name : 'Nada', true)
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
            .setFooter(`🌎┃「Midgard」`, 'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              
           message.channel.send({ embed });

        } else{

            const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', 'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : 'Nada', true)
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
            .setFooter(`🌎┃「Midgard」`, 'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              
            message.channel.send({ embed });
        }
        
    }

    if(command === 'avatar'){

        let img = message.mentions.users.first()
        if (!img) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${message.author.username}#${message.author.discriminator}`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Imagen completa')
            .setDescription('[Click aquí]('+`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
            .setImage(`${message.author.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor(0x66b3ff)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.avatarURL === null) {
    
            message.channel.sendMessage('El usuario ('+ img.username +') no tiene avatar!');
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${img.username}#${img.discriminator}`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Imagen completa')
            .setDescription('[Click aquí]('+`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`+')')
            .setImage(`${img.displayAvatarURL({ dynamic: true , size: 2048 }).replace('webp','png')}`)
            .setColor(0x66b3ff)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        }
    
    }

    var welcome = [
        'https://media.discordapp.net/attachments/853500788848853002/873245600936788048/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245604090892348/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245605294645308/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245608775917688/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245613217689650/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245612554993704/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245617277796394/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245617672056902/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245622017359962/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873245621820215326/10.gif'
    ] 
    
    if(command === 'welcome'){
    
        let img = message.mentions.users.first()
        let ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send(`<:yojoo:880315297846947860> Necesitas mencionar a un usuario <a:pasito:877116925291946094>`);
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setThumbnail(`${img.displayAvatarURL({ dynamic: true }).replace('webp','png')}`)
            //.setAuthor(`Midgard`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle(`Bienvenid@ <:cosita:880300168514252811> **${img.username}** <a:pepedance:880928616416968745>`)
            .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
            .setImage(ramdonwelcome)
            .setColor(10773200)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
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
            //.setAuthor(`Midgard`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle(`Bienvenid@ <:cosita:880300168514252811> **${img.username}** <a:pepedance:880928616416968745>`)
            .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
            .setImage(ramdonwelcome)
            .setColor(10773200)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        }
    
    }

    if(command === 'remindme'){

        let obtener = args[0]
        let mensaje = args[1]
    
        if (!obtener) {
          
          message.channel.send('Debes agregar un tiempo: `_remindme tiempo mensaje`')
    
        } else if(!mensaje) {
    
          message.channel.send('Debes agregar un recordatorio: `_remindme tiempo mensaje`')
    
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
          message.channel.send('No se ha borrado recientemente ningun mensaje')
              .then(m => m.delete({timeout: 5000}));
        
        } else {
    
          imgdelete.setColor('RANDOM')
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
            message.channel.send({ embeds: [embed] });*/
    }

    if(command === 'conteo'){

        if(!args[0]) return message.channel.send('Pon una cantidad para hacer una cuenta regresiva.').then(m => m.delete({timeout: 5000}));
    
        if(isNaN(args[0])) return  message.channel.send(`**Pon una cantidad, solo puedo contar numeros.**`).then(m => m.delete({timeout: 5000}));
    
        let time = parseInt(args[0])
    
        if(time > 7200) return  message.channel.send(`**No puedo contar mas de 2 horas**`).then(m => m.delete({timeout: 5000}));
    
       
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

    if(command === 'poll')
  {
    const split = args.slice(1).join(' ').split('-');

    if(!split[0]) return message.channel.send('Ingrese una pregunta')

    if(!split[1]) return message.channel.send('Necesitas ingresar al menos 2 opciones')

    if(!split[2]) return message.channel.send('Necesitas ingresar al menos 2 opciones')

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`Encuesta realizada por: ${message.author}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle('**' + split[0] + '**')
    .addField('<a:uno:854651170713632808> **' + split[1] + '**', '..........')
    .addField('<a:dos:854651170780872746> **' + split[2] + '**', '..........')
    .setTimestamp(new Date())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

    if (!split[2]) return message.reply('<a:alto:860350719172542464> `|` Uso: `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]... `');

    if (split[3]) embed.addField('<a:tres:854651172525834270> **' + split[3] + '**', '..........');
    if (split[4]) embed.addField('<a:cuatro:854651171465854976> **' + split[4] + '**', '..........');
    if (split[5]) embed.addField('<a:cinco:854651171850158123> **' + split[5] + '**', '..........');
    if (split[6]) embed.addField('<a:seis:854651172597268480> **' + split[6] + '**', '..........');
    if (split[7]) embed.addField('<a:siete:854651171066740736> **' + split[7] + '**', '..........');
    if (split[8]) embed.addField('<a:ocho:854651172512989194> **' + split[8] + '**', '..........');
    if (split[9]) embed.addField('<a:nueve:854651170638790676> **' + split[9] + '**', '..........');

    if (split[10]) return message.reply('<a:alto:860350719172542464> `|` Demasiadas opciones');

    message.delete({timeout: 100});

    if (!split[3]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');

      });
    } else if (!split[4]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');

      });
    } else if (!split[5]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');

      });
    } else if (!split[6]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');
        message.react('<a:cinco:854651171850158123>');

      });
    } else if (!split[7]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');
        message.react('<a:cinco:854651171850158123>');
        message.react('<a:seis:854651172597268480>');

      });
    } else if (!split[8]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');
        message.react('<a:cinco:854651171850158123>');
        message.react('<a:seis:854651172597268480>');
        message.react('<a:siete:854651171066740736>');

      });
    } else if (!split[9]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');
        message.react('<a:cinco:854651171850158123>');
        message.react('<a:seis:854651172597268480>');
        message.react('<a:siete:854651171066740736>');
        message.react('<a:ocho:854651172512989194>');

      });
    } else if (!split[10]){

      message.channel.send({ embeds: [embed] }).then(async function(message) {

        message.react('<a:uno:854651170713632808>');
        message.react('<a:dos:854651170780872746>');
        message.react('<a:tres:854651172525834270>');
        message.react('<a:cuatro:854651171465854976>');
        message.react('<a:cinco:854651171850158123>');
        message.react('<a:seis:854651172597268480>');
        message.react('<a:siete:854651171066740736>');
        message.react('<a:ocho:854651172512989194>');
        message.react('<a:nueve:854651170638790676>');

      });
    }

  }

  if (command === 'votacion'){

    const acuerdo = '✅';
    const desacuerdo = '❎';

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('No puedes usar este comando si no eres mod/admin.');

      let canal;
      let tiempo;
      let votar;

      if (message.mentions.channels.size > 0 && args[0].startsWith('<#')) {
        canal = message.guild.channels.get(message.mentions.channels.first().id);
        tiempo = args[1];
        votar = args.splice(2, args.length);
      } else {
        canal = message.channel;
        tiempo = args[0];
        votar = args.splice(1, args.length);
      }

      if (tiempo == '' && votar == '') return message.reply('¡No puedo desplegar un voto sin parametros! Uso: _votacion (#canal) [tiempo en segundos] [tema]');
      if (votar == '') return message.reply('¡No puedo desplegar un voto sin parametros! Uso: _votacion (#canal) [tiempo en segundos] [tema]');

      if (isNaN(tiempo)) {
        
        votar = tiempo + ' ' + votar.join(' ');
        tiempo = 60000;

      } else {

        votar = votar.join(' ');
        tiempo = parseInt(tiempo) * 1000;

      }

      if (tiempo < 5000 || tiempo > 180000) {
        message.reply('Por favor, elija un tiempo apropiado para la votación (no menos de 5 segundos y no más de tres minutos)');
        return;
      }

     
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Iniciado/a por: ${message.author}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(votar)
      .setDescription('¡Vota ahora!')
      .setTimestamp(new Date())
      .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

      let msg = await canal.send({
        embed: embed
      });
      await msg.react(acuerdo);
      await msg.react(desacuerdo);

      const reacciones = await msg.awaitReactions(reaction => reaction.emoji.name === acuerdo || reaction.emoji.name === desacuerdo, {
        time: tiempo
      });

      var no = reacciones.get(desacuerdo);
      var yes = reacciones.get(acuerdo);

      if (no == undefined) {
        var no = 1;
      } else {
        var no = reacciones.get(desacuerdo).count;
      }
        if (yes == undefined) {
            var yes = 1;
        } else {
            var yes = reacciones.get(acuerdo).count;
        }

        var total = yes > no ? 'Positivo.' : 'Negativo.';
        if (yes == no) total = 'Empate.';

        const embed2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Iniciado/a por: ${message.author}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${votar.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}`)
        .setDescription('**----------------------------------------**\n' +
                'Votos totales (Sí): ' + `${yes - 1}\n` +
                'Votos totales (No): ' + `${no - 1}\n` +
                '**----------------------------------------**', true)
        .addField('Resultado:',`${total}\n`+'**----------------------------------------**', true)
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        await msg.edit('¡Votacion terminada!', {
          embed: embed2
        });

    }

    //COMANDOS DE MODERACIÓN

    if(command === 'role'){
        
        if(!args) return message.channel.send('¡Ingrese nombre del rol!');
    
        let role = message.guild.roles.cache.find(n => n.name === args.join(' '));
    
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
        const embed = new Discord.MessageEmbed()
        
          .setAuthor(`Solicitado por: ${message.author.username}`,`${message.author.displayAvatarURL()}`)
          .setDescription('Información sobre el rol mencionado.')
          .addField('Nombre:', `- ${role.name}`) 
          .addField('ID:', `- ${role.id}`) 
          .addField('Miembros con el Rol:', `- ${role.members.size}`)
          .addField('Posición:', `- ${role.rawPosition}`) 
          .addField('HexColor:', `- ${role.hexColor}`)  
          .addField('¿Mencionable?:', `- ${role.mentionable}`)
          .addField('¿Separado?:', `- ${role.hoist}`)
          .addField('¿Gestionado por el sistema?:', `- ${role.managed}`) 
            
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
        /*let miembroroles = message.guild.roles.cache.get(role.id).members;
        message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);*/
        message.channel.send({ embeds: [embed] })
        
    }
    
    if(command === 'roleid'){
            
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    
        if(!role) return message.channel.send('¡Especifica un rol por mención o por id!');
    
        const embed = new Discord.MessageEmbed()
        
          .setAuthor(`Solicitado por: ${message.author.username}`,`${message.author.displayAvatarURL()}`)
          .setDescription('Información sobre el rol mencionado.')
          .addField('Nombre:', `- ${role.name}`) 
          .addField('ID:', `- ${role.id}`) 
          .addField('Miembros con el Rol:', `- ${role.members.size}`)
          .addField('Posición:', `- ${role.rawPosition}`) 
          .addField('HexColor:', `- ${role.hexColor}`)  
          .addField('¿Mencionable?:', `- ${role.mentionable}`)
          .addField('¿Separado?:', `- ${role.hoist}`)
          .addField('¿Gestionado por el sistema?:', `- ${role.managed}`) 
            
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
        /*let miembroroles = message.guild.roles.cache.get(role.id).members;
        message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);*/
        message.channel.send({ embeds: [embed] })
        
    }
    
    if(command === 'addrol'){
    
        let miembro = message.mentions.members.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find('name', nombrerol);
        let perms = message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
    
        if(!perms) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `_addrol @username [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.addRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);
    
    }
    
    if(command === 'removerol'){
    
        let miembro = message.mentions.members.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find('name', nombrerol);
        let perms = message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
    
        if(!perms) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
         
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

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send('No Tienes Permisos Para Utilizar Este Comando');
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
        let permiso = message.member.hasPermission('KICK_MEMBERS');
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
                
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.channel.send('Escriba una razón, `_kick @username [razón]`');
        if (!message.guild.member(user).kickable) return message.reply('No puedo kickear al usuario mencionado.');
         
        message.guild.member(user).kick(razon);
        message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
    }
    
    if(command === 'ban'){
        
        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
        let permiso = message.member.hasPermission('BAN_MEMBERS');
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
    
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if(!razon) return message.channel.send('Escriba un razón, `_ban @username [razón]`');
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
        
    
        message.guild.member(user).ban({ reason: 'razon' });
        message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
    
    }

    //COMANDOS DE DIVERSIÓN

    if(command === 'say'){

        let texto = args.join(' ');
    
        if(!texto) return message.channel.send(`Escriba un contenido para decir.`);
        message.channel.send(texto);
        message.delete({ timeout: 100 });
        
    }

    if(command === '8ball'){

        let texto = args.join(' ');
    
        var rpts = ['Sí', 'No', '¿Por qué?', 'Por favor', 'Tal vez', 'No sé', 'Definitivamente?', ' ¡Claro! ',' Por supuesto! ','Por supuesto que no', 'De ninguna manera', 'Probablemente', 'Es muy posible'];
        if (!texto) return message.reply(`Escriba una pregunta.`);
        message.channel.send(message.author.username+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');
    
    }

    if(command === 'roll')
    {

        let links = ['https://cdn.discordapp.com/attachments/684757256658747451/794277079243685888/dado-1.png', 'https://cdn.discordapp.com/attachments/684757256658747451/794277107537805332/dado-2.png', 'https://cdn.discordapp.com/attachments/684757256658747451/794277142800105483/dado-3.png', 'https://cdn.discordapp.com/attachments/684757256658747451/794277176592826368/dado-4.png', 'https://cdn.discordapp.com/attachments/684757256658747451/794277207619010590/dado-5.png', 'https://cdn.discordapp.com/attachments/684757256658747451/794277245157113866/dado-6.png']

        var dado = links[Math.floor(Math.random() * links.length)]

        const embed = new Discord.MessageEmbed() 
        .setAuthor(`Midgard's Fun`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
        .setTitle(`${message.author.username} ha tirado el dado.`)
        .setDescription('El dado a caído en:')
        .setImage(dado)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

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
        const choices = ['||:zero:||', '||:one:||', '||:two:||', '||:three:||', '||:four:||', '||:five:||', '||:six:||', '||:seven:||', '||:eight:||','||:bomb:||'];
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
    
        if (!users) return message.reply('Menciona a alguien porfavor!')
        if (users === message.author) return message.channel.send('**No puedes hacer eso contigo mismo**');
        if (users === client.user) return message.channel.send('**No puedo calcular eso conmigo!**')
    
        const random = Math.floor(Math.random() * 100);
        let heard = '';
        let image = '';
    
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
        .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
        .setTitle(`${msg}`)
        .setDescription(`${heard} ${random} % ${heard}`)
        .setImage(`${image}`)
        .setColor(0xff4d4d)
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] })
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
                .setAuthor(`Midgard's Fun`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
                .setTitle(post.title)
                .setImage(post.url)
                .setColor('RAMDOM')
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
    
                if(!post.url){
                    return message.channel.send('No encontré memes <:POLQUE:856670987499208775>')
                }else{
                    message.channel.send({ embeds: [embed] });
                }

            }).catch((e) => message.channel.send('Hubo un error: ' + e))
    }

    if(command === 'pokemon')
    {

        over.randomPokemon().then(pokemon => {

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('¿𝚀𝚞𝚒é𝚗 𝚎𝚜 𝚎𝚜𝚎 𝙿𝚘𝚔é𝚖𝚘𝚗?')
        .setDescription('Tienes 15 Segundos para responder ⌛')
        .setImage(pokemon.imageURL)
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      
        message.channel.send({ embeds: [embed] }).then(msj => {

            message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] }).then(col => {

                const embed2 = new Discord.MessageEmbed() //el Embed si el autor adivino el Pokemon
                .setColor('GREEN')
                .setTitle('𝐀𝐂𝐄𝐑𝐓𝐀𝐒𝐓𝐄!')
                .setDescription('El Pokemon es **'+pokemon.name+'**')
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          
                msj.edit(embed2)
        
            }).catch(col => {

                const embed3 = new Discord.MessageEmbed() //Embed de Fallo
                .setColor('RED')
                .setTitle('𝐄𝐑𝐑𝐎𝐑!')
                .setDescription('El Pokemon era **'+pokemon.name+'**')
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
         
                msj.edit(embed3)

            })

        })
        })
    }

    //COMANDOS DE CAFETERÍA

    var cafe = [
        'https://media.discordapp.net/attachments/853500788848853002/873251089703653396/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251090114707476/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251094371909692/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251095122690178/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251098222264360/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251121710395432/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251127439794226/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251134830161971/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251134825980034/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251136134602832/10.gif',
    ]
    
    
    if(command === 'cafe'){
    
        let img = message.mentions.users.first()
        let ramdoncafe = cafe[Math.floor(Math.random()*cafe.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** tomó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var agua = [
        'https://media.discordapp.net/attachments/853500788848853002/873251653703331900/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251656681287681/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251658048602162/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251666764369940/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251666684682321/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251671562649601/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251673533984818/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873252417158922250/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251676289642526/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873251681243107388/10.gif'    
    ]
    
    
    if(command === 'agua'){
    
        let img = message.mentions.users.first()
        let ramdonagua = agua[Math.floor(Math.random()*agua.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        }  else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un poquito de awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var te = [
        'https://media.discordapp.net/attachments/853500788848853002/873253192979341372/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253194308927568/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253202332614686/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253207659409408/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253209660084234/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253212776431697/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253221093740544/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253223014727771/8.gif?width=863&height=484',
        'https://media.discordapp.net/attachments/853500788848853002/873253231088767016/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253257718415380/10.gif'
    ]
    
    if(command === 'te'){
    
        let img = message.mentions.users.first()
        let ramdonte = te[Math.floor(Math.random()*te.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está relajándose con un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ponte cómodo y relájate, que ${message.author.username} te ha invitado un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var jugo = [
        'https://media.discordapp.net/attachments/853500788848853002/873253956577529987/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253962646700082/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253969231761508/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253973686124674/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253980665438268/5.gif?width=601&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873253982783557632/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253986621349968/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873253996901572618/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873254004593934346/10.gif'
    ]

    if(command === 'jugo'){
    
        let img = message.mentions.users.first()
        let ramdonjugo = jugo[Math.floor(Math.random()*jugo.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando un delicioso juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    if(command === 'tacos'){

        let img = message.mentions.users.first()
        let ramdontacos = tacos[Math.floor(Math.random()*tacos.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo unos tacos.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un rico taco.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var chocolate = [
        'https://media.discordapp.net/attachments/853500788848853002/873255248867786842/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255256513974362/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255257520623676/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255260850905099/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255265166823434/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255269952553030/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255276348842095/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255280169852958/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255283193942036/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873255288218738728/10.gif'
    ]
    
    if(command === 'chocolate'){
    
        let img = message.mentions.users.first()
        let ramdonchocolate = chocolate[Math.floor(Math.random()*chocolate.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un delicioso chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un rico chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var galletas = [
        'https://media.discordapp.net/attachments/853500788848853002/873256019055218728/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256023417303171/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256029528412160/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256030933516298/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256037296259113/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256038139330560/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256047668756570/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256056501968946/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256060956340284/10.gif'
    ]
    
    if(command === 'galletas'){
    
        let img = message.mentions.users.first()
        let ramdongalletas = galletas[Math.floor(Math.random()*galletas.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** se le antojaron unas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó unas sabrosas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var helado = [
        'https://media.discordapp.net/attachments/853500788848853002/873256608992493578/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256611202875412/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256621625720932/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256621726371870/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256631134191616/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256630983209020/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256636247060560/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256637744443443/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873256646833487922/9.gif'
    ]
    
    if(command === 'helado'){
    
        let img = message.mentions.users.first()
        let ramdonhelado = helado[Math.floor(Math.random()*helado.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un refrescante helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó un poquito de helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    var hamburguesa = [
        'https://media.discordapp.net/attachments/853500788848853002/873257289824489542/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257293167341598/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257304760410132/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257304311623810/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257305150464020/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257311379009576/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257314461818891/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257316701577216/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257321256595496/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873257323034988554/10.gif'
    ]

    if(command === 'hamburguesa'){

        let img = message.mentions.users.first()
        let ramdonhamburguesa = hamburguesa[Math.floor(Math.random()*hamburguesa.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una sabrosa hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una gran hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var pizza = [
        'https://media.discordapp.net/attachments/853500788848853002/873259191702270013/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259197427499068/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259214884180008/3.gif?width=863&height=521',
        'https://media.discordapp.net/attachments/853500788848853002/873259208945057872/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259216322822174/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259219531468910/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259223440584734/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259227290947674/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259229157416960/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259232428949525/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259243074105384/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259242562396170/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873259247314559057/13.gif'
    ]
    
    if(command === 'pizza'){
    
        let img = message.mentions.users.first()
        let ramdonpizza = pizza[Math.floor(Math.random()*pizza.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una riquísima pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una sabrosa pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    //COMANDOS DE BAR

    var cocacola = [
        'https://media.discordapp.net/attachments/853500788848853002/873260856115363850/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260863904186368/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260873735602236/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260876692590625/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260886180134922/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260894589710417/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260904341463061/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873260912889438228/8.gif?width=401&height=561',
        'https://media.discordapp.net/attachments/853500788848853002/873260933282164796/10.gif'
    ]
    
    if(command === 'cocacola'){
    
        let img = message.mentions.users.first()
        let ramdoncocacola = cocacola[Math.floor(Math.random()*cocacola.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está refrescándose con una Coca Cola.`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una Coca Cola... Disfrútala!`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var redbull = [
        'https://media.discordapp.net/attachments/853500788848853002/873261607185186816/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261612180594759/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261619923267584/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261626885832724/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261640022360114/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261667469885561/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261673811693690/7.gif?width=562&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873261678781923328/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261688919572520/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873261694267293777/10.gif'
    ]
    
    if(command === 'redbull'){
    
        let img = message.mentions.users.first()
        let ramdonredbull = redbull[Math.floor(Math.random()*redbull.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está energizándose con un Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te invitó una lata de Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var cerveza = [
        'https://media.discordapp.net/attachments/853500788848853002/873263878727942144/1.gif?width=351&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873263891113705552/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263900689317888/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263903214288896/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263907924496384/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263917449748511/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263919823716352/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263927893586010/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873263932545040405/9.gif'
    ]
    
    if(command === 'cerveza'){
    
        let img = message.mentions.users.first()
        let ramdoncerveza = cerveza[Math.floor(Math.random()*cerveza.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando una cervecita.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Hey, **${img.username}**, disfruta tu cerveza invitada por ${message.author.username}.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    var vino = [
        'https://media.discordapp.net/attachments/853500788848853002/873264499136794634/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264498146947132/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264505319194644/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264513254842419/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264520636817449/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264526252982282/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264532909342750/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873264547471958086/9.gif'
    ]
    
    if(command === 'vino'){
    
        let img = message.mentions.users.first()
        let ramdonvino = vino[Math.floor(Math.random()*vino.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un rico vino.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, aquí te traigo una copa de vino invitado por ${message.author.username}.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var tequila = [
        'https://media.discordapp.net/attachments/853500788848853002/873265180543418428/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265199627534366/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265215976914974/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265224277426296/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265229474177084/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265238122856468/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265247325139034/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265257508900914/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873265268946788462/10.gif'
    ]
    
    if(command === 'tequila'){
    
        let img = message.mentions.users.first()
        let ramdontequila = tequila[Math.floor(Math.random()*tequila.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un tequilita.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Hey, **${img.username}**, toma este tequila invitado por ${message.author.username}.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var ron = [
        'https://media.discordapp.net/attachments/853500788848853002/873266014559809536/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266031114743888/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266053608788028/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266065948438598/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266085435154502/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266090082455582/6.gif?width=562&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873266105542660156/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266116103929866/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266127617261608/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266135775207454/10.gif'
    ]
    
    if(command === 'ron'){
    
        let img = message.mentions.users.first()
        let ramdonron = ron[Math.floor(Math.random()*ron.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está celebrando con un roncito.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, agradécele a ${message.author.username} porque te está invitando un ron.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var coctel = [
        'https://media.discordapp.net/attachments/853500788848853002/873266715746783342/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266726555512912/2.gif?width=404&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873266731467030528/3.gif?width=401&height=561',
        'https://media.discordapp.net/attachments/853500788848853002/873266738651869194/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266745538932796/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266760319647784/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266768460787722/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266776446738502/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873266781815447602/10.gif'
    ]
    
    if(command === 'coctel'){
    
        let img = message.mentions.users.first()
        let ramdoncoctel = coctel[Math.floor(Math.random()*coctel.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está saboreando su delicioso coctel.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, disfruta este coctel que te ha invitado ${message.author.username}.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var porro = [
        'https://media.discordapp.net/attachments/853500788848853002/873270304313597972/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270307308331068/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270321959010374/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270325566115900/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270334768431144/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270338304213012/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873270339344412712/8.gif',
    ]
    
    if(command === 'porro'){
    
        let img = message.mentions.users.first()
        let ramdonporro = porro[Math.floor(Math.random()*porro.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está volando con un porro de mota.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, disfruta de esta mota que te ha invitado ${message.author.username}.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };

    }

    var cigarro = [
        'https://media.discordapp.net/attachments/853500788848853002/873272694886531163/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272700343308318/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272705259024434/3.gif?width=374&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873272709335883817/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272723151945759/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272729841852496/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272736225570846/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272746136698950/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873272750955974686/10.gif'
    ]
    
    if(command === 'cigarro'){
    
        let img = message.mentions.users.first()
        let ramdoncigarro = cigarro[Math.floor(Math.random()*cigarro.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está fumando un cigarrito.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Hey **${img.username}**, ${message.author.username} ha compartido un cigarro contigo.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var huca = [
        'https://media.discordapp.net/attachments/853500788848853002/873273468462989342/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273476625076264/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273480441917470/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273489061191751/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273498175434832/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273507893637130/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273520304586802/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273530479955998/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273544077873213/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273554320359454/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873273559781343242/11.gif'
    ]
    
    if(command === 'huca'){
    
        let img = message.mentions.users.first()
        let ramdonhuca = huca[Math.floor(Math.random()*huca.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le apeteció una pipa bien potente.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, disfruta de la hookah que te invitó ${message.author.username}.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    //COMANDSO DE DISCO

    var perreo = [
        'https://media.discordapp.net/attachments/853500788848853002/873274148300927046/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274158027513866/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274169305997373/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274177619111966/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274193976897596/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274205532213298/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274214302486538/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274228147892264/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274256765644820/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274270090936340/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274285500805190/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274309915848774/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274322964332594/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274336100900916/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274377234427914/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274402081492992/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873274419089395722/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/877026220661944370/19.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/877026227356074004/20.gif?width=252&height=448',
        'https://media.discordapp.net/attachments/853500788848853002/877026237346885662/21.gif?width=432&height=432',
        'https://media.discordapp.net/attachments/853500788848853002/877026242707202088/22.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/877026250777051186/23.gif?width=297&height=294',
        'https://media.discordapp.net/attachments/853500788848853002/877026259887079504/24.gif?width=372&height=219',
        'https://media.discordapp.net/attachments/853500788848853002/877026271266230292/25.gif?width=237&height=418',
        'https://media.discordapp.net/attachments/853500788848853002/877026284578959400/26.gif?width=432&height=331',
        'https://media.discordapp.net/attachments/853500788848853002/877026293949034526/27.gif?width=297&height=297',
        'https://media.discordapp.net/attachments/853500788848853002/877026307911843850/28.gif?width=294&height=226',
        'https://media.discordapp.net/attachments/853500788848853002/877026322193457192/29.gif?width=486&height=246',
        'https://media.discordapp.net/attachments/853500788848853002/877026333287407696/30.gif?width=432&height=243'
    ]
    
    if(command === 'perreo'){
    
        let img = message.mentions.users.first()
        let ramdonperreo = perreo[Math.floor(Math.random()*perreo.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está perreando hasta el piso.`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, ${message.author.username} te está perreando duro contra el muro. <a:perreo:880634843610902640>`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    var bachata = [
        'https://media.discordapp.net/attachments/853500788848853002/873276689512296558/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276703626121246/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276721560948736/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276739990749314/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276749511819354/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276757724266526/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276769191489596/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276779127775252/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276791282868264/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276794428612668/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276801135300718/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276811637846056/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276819997085736/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873276834622632007/14.gif'
    ]
    
    if(command === 'bachata'){
    
        let img = message.mentions.users.first()
        let ramdonbachata = bachata[Math.floor(Math.random()*bachata.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Miren a **${message.author.username}** como disfruta esa bachata.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, está bachateando con ${message.author.username}.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var salsa = [
        'https://media.discordapp.net/attachments/853500788848853002/873277547759140884/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277558421090314/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277570261606450/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277582743863326/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277597226790932/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277604340334682/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277631984971836/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277638163193866/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277648464388176/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277659109544016/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873277666562818098/11.gif'
    ]
    
    var salsa2 = [
        'https://media.discordapp.net/attachments/853500788848853002/873278131887296573/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873278143283200091/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873278151998992434/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873278166683238480/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873278181459775558/16.gif'
    ]
    
    if(command === 'salsa'){
    
        let img = message.mentions.users.first()
        let ramdonsalsa = salsa[Math.floor(Math.random()*salsa.length)]
        let ramdonsalsa2 = salsa2[Math.floor(Math.random()*salsa2.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** salsea como los dioses.`)
            .setImage(ramdonsalsa2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}** y ${message.author.username} están salseando juntos.`)
            .setImage(ramdonsalsa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var cumbia = [
        'https://media.discordapp.net/attachments/880918347414380605/883498586841690142/981e0995ba932b34b6fb3db3a7e3904e0d3e778e.gif?width=432&height=332',
        'https://media.discordapp.net/attachments/880918347414380605/883498593829388328/giphy.gif?width=259&height=184',
        'https://media.discordapp.net/attachments/879633476532453386/883512435070337044/mp4_5.gif?width=466&height=466',
        'https://media.discordapp.net/attachments/879633476532453386/883517112965033994/4.gif?width=360&height=202',
        'https://media.discordapp.net/attachments/879633476532453386/883517117809426432/5.gif?width=576&height=306',
        'https://media.discordapp.net/attachments/879633476532453386/883517125283704882/6.gif?width=448&height=205',
        'https://media.discordapp.net/attachments/879633476532453386/883517138776760320/7.gif?width=360&height=202',
        'https://media.discordapp.net/attachments/879633476532453386/883517159593087026/8.gif?width=423&height=243',
        'https://media.discordapp.net/attachments/879633476532453386/883517187598475354/9.gif?width=315&height=315',
        'https://media.discordapp.net/attachments/879633476532453386/883517199636123658/10.gif?width=294&height=226'
    ]
    
    var cumbia2 = [
        'https://media.discordapp.net/attachments/880918347414380605/883498600653525012/dance-happy.gif?width=396&height=226',
        'https://media.discordapp.net/attachments/880918347414380605/883498627484491796/DeadYellowishGrizzlybear-size_restricted.gif?width=391&height=225',
        'https://media.discordapp.net/attachments/880918347414380605/883498640407158794/WellinformedImpressiveIndiancow-max-1mb.gif?width=155&height=270',
        'https://media.discordapp.net/attachments/879633476532453386/883509838653571072/mp4_1.gif?width=314&height=562',
        'https://media.discordapp.net/attachments/879633476532453386/883510318112845834/mp4_2.gif?width=538&height=403',
        'https://media.discordapp.net/attachments/879633476532453386/883511614182129674/mp4_3.gif?width=340&height=561',
        'https://media.discordapp.net/attachments/879633476532453386/883512430402097172/mp4_4.gif?width=220&height=162',
        'https://media.discordapp.net/attachments/879633476532453386/883517074146734112/1.gif?width=396&height=484',
        'https://media.discordapp.net/attachments/879633476532453386/883517086876442664/2.gif?width=396&height=396',
        'https://media.discordapp.net/attachments/879633476532453386/883517102856753162/3.gif?width=432&height=317'
    ]
    
    if(command === 'cumbia'){
    
        let img = message.mentions.users.first()
        let ramdoncumbia = cumbia[Math.floor(Math.random()*cumbia.length)]
        let ramdoncumbia2 = cumbia2[Math.floor(Math.random()*cumbia2.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está bailando un pinche cumbión bien loco.`)
            .setImage(ramdoncumbia2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${img.username}** y ${message.author.username} les va bien los pasitos de cumbia.`)
            .setImage(ramdoncumbia)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var colegiala = [
        'https://media.discordapp.net/attachments/853500788848853002/873279087056142416/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279098938605568/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279109239808092/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279127359213588/4.gif?width=320&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873279134736994384/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279155377143908/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279168094298162/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279181365051392/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279204341469234/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279231214366790/10.gif?width=381&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873279245722472468/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873279257994989618/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874073561894125568/13.gif?width=318&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/874073566121959424/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874073579078160444/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874073589052219412/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874073599777062932/17.gif?width=293&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/874073609969221702/18.gif?width=449&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/874073616545906758/19.gif?width=449&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/874073630051557446/20.gif'
    ]
    
    if(command === 'colegiala'){
    
        let img = message.mentions.users.first()
        let ramdoncolegiala = colegiala[Math.floor(Math.random()*colegiala.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** pidió una colegiala y no la quiere compartir. <:jaaa:846566909239099403>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Opa! **${img.username}**, mira esta colegiala que ${message.author.username} te trajo. <:uyy:805310624523223041>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    //COMANDOS DE REACCIÓN

    var hi = [
        'https://media.discordapp.net/attachments/853500788848853002/873248866462466149/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248868052115476/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248872942669904/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248873714421800/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248878453993512/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248880144310373/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248880467271740/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248884011458630/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248889766019072/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248891519262850/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873249148839788564/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873249151649988658/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248910737559613/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248928181661796/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873248934749945886/15.gif'
    ]
    
    if(command === 'hi'){
    
        let img = message.mentions.users.first()
        let ramdonhi = hi[Math.floor(Math.random()*hi.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** está saludando a todos.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`**${img.username}**, está saludando a ${message.author.username}.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        };
    
    }

    var hug = [
        'https://media.discordapp.net/attachments/853500788848853002/873282724784386048/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282738441031780/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282749954420816/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282761681678416/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282769642475530/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282778911891526/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282789020143686/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282796213391431/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282801007493120/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873282807412187136/10.gif'
    ]
    
    var hug2 = [
        'https://media.discordapp.net/attachments/853500788848853002/873284896544673814/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284905105235968/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284910025175080/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284913078603776/14.gif?width=749&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873284925615403088/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284932531789835/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284936424099920/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284942535196682/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284951703953489/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873284958205141002/20.gif'
    ]
    
    if(command === 'hug'){
    
        let img = message.mentions.users.first()
        let ramdonhug = hug[Math.floor(Math.random()*hug.length)]
        let ramdonhug2 = hug2[Math.floor(Math.random()*hug2.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está abrazando a sí mismo.`)
            .setImage(ramdonhug2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está abrazando a **${img.username}**.`)
            .setImage(ramdonhug)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var kiss = [
        'https://media.discordapp.net/attachments/853500788848853002/873303560559951882/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303577492357150/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303601970315334/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303610883190784/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303633855389736/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303652230639646/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303670568124436/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303680571547648/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873303687462797372/10.gif',
        'https://i.pinimg.com/originals/15/a8/43/15a843df655233fd7829efc70932be17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/877364191877533696/11.gif?width=202&height=202',
        'https://media.discordapp.net/attachments/853500788848853002/877364200962408469/12.gif?width=448&height=331',
        'https://media.discordapp.net/attachments/853500788848853002/877364212379299861/13.gif?width=450&height=351',
        'https://media.discordapp.net/attachments/853500788848853002/877364221409644574/14.gif?width=319&height=180',
        'https://media.discordapp.net/attachments/853500788848853002/877364235447984148/15.gif?width=450&height=190',
        'https://media.discordapp.net/attachments/853500788848853002/877364246252494868/16.gif?width=308&height=227',
        'https://media.discordapp.net/attachments/853500788848853002/877364263432372284/17.gif?width=450&height=248',
        'https://media.discordapp.net/attachments/853500788848853002/877364280117325854/18.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/877364288724017162/19.gif?width=313&height=176',
        'https://media.discordapp.net/attachments/853500788848853002/877364300702949386/20.gif?width=450&height=315'
    ]
    
    if(command === 'kiss'){
    
        let img = message.mentions.users.first()
        let ramdonkiss = kiss[Math.floor(Math.random()*kiss.length)]
     
        if (!img || img.id===message.author.id) {
    
            message.channel.send('¿Te besarías a ti mism@? <:pepemaje:846893345678950420>');
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le dió un beso a **${img.username}**.`)
            .setImage(ramdonkiss)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    var sad = [
        'https://media.discordapp.net/attachments/853500788848853002/876010421180563466/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010424993202186/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010430995255296/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010433377632256/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010448334520390/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010484392947722/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010494933233715/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010503179239444/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010512364732426/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010522091331584/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010530333143080/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010537761247232/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010558460145704/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010565389144084/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010575476432936/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010587409227776/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010603364360222/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010619541803018/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010627229949972/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876010637044617226/20.gif'
    ]
    
    if(command === 'sad'){
    
        let img = message.mentions.users.first()
        let ramdonsad = sad[Math.floor(Math.random()*sad.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** se puso modo depre.`)
          .setImage(ramdonsad)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.username}** andan modo sad.`)
            .setImage(ramdonsad)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var cry = [
        'https://media.discordapp.net/attachments/853500788848853002/876015088862122025/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015121032417310/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015140665958471/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015158143647774/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015162648322088/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015167698255933/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015171091464192/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015174434308106/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015173297635348/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015176174936085/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015177315803156/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015179710754856/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015188405518377/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015184878133298/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015194181103636/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015195774939166/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015199612698634/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015203173662731/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015211444830218/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876015215681110056/20.gif'
    ]
    
    if(command === 'cry'){
    
        let img = message.mentions.users.first()
        let ramdoncry = cry[Math.floor(Math.random()*cry.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
          .setImage(ramdoncry)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    var sape = [
        'https://media.discordapp.net/attachments/853500788848853002/873304385420148816/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304389463457832/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304401702428772/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304419318517760/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304426864070696/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304435005214750/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304443368660992/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304451107127296/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304465741070417/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304477149564959/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304488197386342/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304496304975882/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304508204220446/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304517469429790/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304527573500026/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304539527250001/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304550747025468/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304565611659324/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304575464075264/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873304589179420683/20.gif'
    ]
    
    if(command === 'sape'){
    
        let img = message.mentions.users.first()
        let ramdonsape = sape[Math.floor(Math.random()*sape.length)]
      
        if (!img || img.id===message.author.id) {
    
            message.channel.send('¿Te darías un autosape? <:pepemaje:846893345678950420>');
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le dió un sape a **${img.username}**.`)
            .setImage(ramdonsape)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    var punch = [
        'https://media.discordapp.net/attachments/853500788848853002/873321715109867593/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321724203134986/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321734525321216/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321746290331688/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321754003656774/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321768885026876/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321775038099526/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321791907586068/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321811515953172/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321829765353522/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321839814918224/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321874237558815/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321876708032592/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321887307005993/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321899856379974/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321908211445781/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321920362344458/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321944374714448/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321953853837342/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321964360585326/20.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321988746264647/21.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873321997675925624/22.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322022967603240/23.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322039363137586/24.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322050234757240/25.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322061110579220/26.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322076214292551/27.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322091812884500/28.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322108283916298/29.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873322125799338005/30.gif'
    ]
    
    if(command === 'punch'){
    
        let img = message.mentions.users.first()
        let ramdonpunch = punch[Math.floor(Math.random()*punch.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send('¿Te golpearías a ti mismo? <:pepemaje:846893345678950420>');
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le dió un puñetazo a **${img.username}**.`)
            .setImage(ramdonpunch)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    if(command === 'slap'){
          
        let img = message.mentions.users.first()
        //let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send('Debes mencionar a alguien!');
    
        } else {
    
          neko.sfw.slap().then(neko => {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** abofeteó a **${img.username}**.`)
            .setImage(neko.url)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          })
            
        }
    
    }
    
    var kill = [
        'https://media.discordapp.net/attachments/879633476532453386/883536186877050890/1.gif?width=448&height=252',
        'https://media.discordapp.net/attachments/879633476532453386/883536204539240459/2.gif?width=448&height=250',
        'https://media.discordapp.net/attachments/879633476532453386/883551478579593306/3.gif?width=461&height=319',
        'https://media.discordapp.net/attachments/879633476532453386/883551490134900737/4.gif?width=432&height=225',
        'https://media.discordapp.net/attachments/879633476532453386/883551495772078080/5.gif?width=448&height=301',
        'https://media.discordapp.net/attachments/879633476532453386/883551507964919848/6.gif?width=378&height=252',
        'https://media.discordapp.net/attachments/879633476532453386/883551517704089620/7.gif?width=450&height=270',
        'https://media.discordapp.net/attachments/879633476532453386/883551529758507009/8.gif?width=450&height=248',
        'https://media.discordapp.net/attachments/879633476532453386/883551545571037244/9.gif?width=450&height=249',
        'https://media.discordapp.net/attachments/879633476532453386/883551557835182170/10.gif?width=315&height=180',
        'https://media.discordapp.net/attachments/879633476532453386/883551576038457354/11.gif?width=364&height=204',
        'https://media.discordapp.net/attachments/879633476532453386/883551582589976696/12.gif?width=220&height=180',
        'https://media.discordapp.net/attachments/879633476532453386/883551600801640478/13.gif?width=288&height=216',
        'https://media.discordapp.net/attachments/879633476532453386/883551612801544212/14.gif?width=432&height=178',
        'https://media.discordapp.net/attachments/879633476532453386/883551622565863484/15.gif?width=360&height=193'
    ]
    
    if(command === 'kill'){
          
        let img = message.mentions.users.first()
        let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
            message.channel.send('¿Que alguién lo detenga, por favor? <:panda_sad:796356683277402143>');
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** acaba de masacrar a **${img.username}**.`)
            .setImage(ramdonkill)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }


    //COMANDOS DE KARAOKE

    const embed = new Discord.MessageEmbed()
  .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
  .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
  .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
  .setDescription('-------------------------------------------------- ')
  .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
  .addField('En espera :', '...................................................................................', false)
  .addField('N° :', '1', true)
  .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
  .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
  .setColor(5929128)
  .setTimestamp(new Date())
  .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

  if(command === 'k'){

    if (message.channel.id != '880317466557952000')
    {

      message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

    } else{

      let canalis = client.channels.cache.get('880355911078645770')
      let img = message.mentions.users.first()

      if (!img) {

        if(listask.has(message.author.id)) return message.channel.send(`${message.author} Ya estás agregado en la lista`)
        .then(m => m.delete({timeout: 5000}));
        
        message.channel.send(`${message.author}`+' Has sido anotado en la lista <:syzerotwolove:881304660324020244>')
        .then(m => m.delete({timeout: 5000}));
        message.react('✅')
        listask.set(message.author.id,message.author.username)

        canalis.bulkDelete(1);
        canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          }

        })  

      } else {
      
        if(img.id==='753435606410985573') return message.channel.send('No puedes agregar a mi dueño <:Sofia:877115812362747904>')
        
        if(listask.has(img.id)) return message.channel.send(`El participante **${img.username}** ya está agregado en la lista`)
        .then(m => m.delete({timeout: 5000}));

        listask.set(img.id,img.username)
        message.channel.send(`**${message.author.username}**`+' Has anotado a '+`**${img.username}**`+' en la lista <:syzerotwolove:881304660324020244>')
        .then(m => m.delete({timeout: 5000}));
        message.react('✅')

        canalis.bulkDelete(1);
        canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          }

        })  

      }

    }
    

  }

  if(command === 'lista') {

    let canalis = client.channels.cache.get('880355911078645770')

    if (message.channel.id != '880317466557952000')
    {

      message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

    } else
    {

      message.channel.send('Lista Actualizada: '+`${client.channels.cache.get('880355911078645770')}`).then()
      message.delete({timeout: 100})
      canalis.bulkDelete(1);
      canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          }

        })  

    }
    
  }
    
  if(command === 'd'){

    if (message.channel.id != '880317466557952000')
    {

      message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

    } else{

      let canalis = client.channels.cache.get('880355911078645770')
      let img = message.mentions.users.first()

      if (!img) {

        if(listask.has(message.author.id)) {
        
          listask.delete(message.author.id);
          message.channel.send(`${message.author} Fuiste eliminado de la lista`)
          .then(m => m.delete({timeout: 5000}));
          message.react('✅')

          canalis.bulkDelete(1);
          canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          }

        })  
        }        

      } else {

        if(listask.has(img.id)) {
        
          listask.delete(img.id);
          message.channel.send(`Has eliminado a **${img.username}** de la lista`)
          .then(m => m.delete({timeout: 5000}));
          message.react('✅')

          canalis.bulkDelete(1);
        canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          }

        })  
        }        
        
      }
    }
    
  }

  if(command === 'dall'){

    if (message.channel.id != '880317466557952000')
    {

      message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

    } else{

      let canalis = client.channels.cache.get('880355911078645770')
      let id = ['723407471556952064','753435606410985573']

      if(!id.some(id => message.author.id == id)) {
      
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el presentador de Karaoke puede usar este comando.')
        .setColor('RED')
        message.channel.send({ embeds: [embed] })
        .then(m => m.delete({timeout: 5000}));
        message.react('❎');

      } else {

        listask.clear();
        message.channel.send(`${message.author} Has eliminado a **TODOS** los participantes de la lista`)
        .then(m => m.delete({timeout: 5000}));
        message.react('✅')

        canalis.bulkDelete(1);
        canalis.send(embed).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:880922179280207934>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit(embed)

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>', listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit(embed)
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed)
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit(embed);
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>', listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit(embed);
      
            }

        })  
      }
    }

    }

    //COMANDOS NSFW

    var tetas = [
        'https://media.discordapp.net/attachments/853500788848853002/873742099470749696/1.gif?width=319&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742106026442792/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742111554547722/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742114566053928/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742117812441088/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742121033670657/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742123546050590/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742126620500018/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742125676785665/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742127765532752/10.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873744098589302784/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744101793755146/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744108634636288/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744110798905444/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744118927482900/15.gif?width=323&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742152063135774/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742159751315526/17.gif?width=281&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742156387475476/18.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742161043148820/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742161894584370/20.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742168806809630/22.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742173437308968/23.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742178009116672/24.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742181649747978/25.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873744423832408134/26.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744434158776320/27.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744440953544734/28.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744453289000990/29.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873744461300121631/30.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742202176675850/31.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742204827500544/32.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742205796360192/33.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742207717347328/34.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742212238815282/35.gif?width=312&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742211613863986/36.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742216655421511/37.gif?width=309&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742217259405312/38.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873742217414606858/39.gif?width=309&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873742218379292712/40.gif'
      ]
    
      if(command === 'tetas'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdontetas = tetas[Math.floor(Math.random()*tetas.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** mira estos melones <a:pandanoveo:830321011508641832>`)
          .setImage(ramdontetas)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
          //.setTitle('Imagen completa')
          .setDescription(`Hey **${img.username}**, mira estos melones que **${message.author.username}** te trajo <a:pandanoveo:830321011508641832>`)
          .setImage(ramdontetas)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
        }
        }   
      }
    
      var pussy = [
        'https://media.discordapp.net/attachments/853500788848853002/873855783970963476/1.gif?width=863&height=485',
        'https://media.discordapp.net/attachments/853500788848853002/873855793898872852/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855813557579807/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855833899941898/4.gif?width=863&height=485',
        'https://media.discordapp.net/attachments/853500788848853002/873855841156083722/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855854959554570/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855898647420959/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855905266012180/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855924295569428/9.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873855934160584725/10.gif?width=315&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873855954385510400/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855972471345162/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873855982646747146/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856008907284500/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856026661769247/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856032164679700/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856047180312576/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856051726917662/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856063932338216/20.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856076188110858/21.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856087667929118/22.gif?width=586&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873856098820562944/23.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856113362227230/24.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856132471468052/25.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856145842896896/26.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856165556158504/27.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856178789154816/28.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856195633496094/29.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856229225685032/30.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856240927801344/31.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856261085626388/32.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856287291605002/33.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856309374627870/34.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856320141422622/35.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856335375106058/36.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856350248136704/37.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856368791146566/38.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873856380912697344/39.gif'
      ]
    
      if(command === 'pussy'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonpussy = pussy[Math.floor(Math.random()*pussy.length)]
    
          if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** mira esa papaya <a:pandanoveo:830321011508641832>`)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Hey **${img.username}**, mira esa papaya que **${message.author.username}** te está mostrando <a:pandanoveo:830321011508641832>`)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
          }
    
        }   
    
      }
    
      var culo = [
        'https://media.discordapp.net/attachments/853500788848853002/873866479802654780/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866484596756520/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866491156656138/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866516423122944/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866524258086942/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866527668064266/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866541832241192/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866544327831562/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866554801000468/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866560673046549/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866567685926962/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866582156255252/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866588791635998/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866592474255420/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866599789129738/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866610211962930/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866617791074354/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866636166307850/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866644089368586/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866655074222110/20.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866667640381470/21.gif?width=316&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866670106636338/22.gif?width=507&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866678700736512/23.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866686586052608/24.gif?width=316&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866696019038208/25.gif', 
        'https://media.discordapp.net/attachments/853500788848853002/873866707830198272/26.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866715853881384/27.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866723143602206/28.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866732513689600/29.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866744916234240/30.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866759655014460/31.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866771155787816/32.gif?width=582&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866778688774204/33.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866796984311839/34.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866804181729340/35.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866814378094692/36.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866822028517416/37.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866822183714816/38.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866836956028939/39.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866843310415902/40.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866852328173588/41.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866856077856768/42.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866869944242216/43.gif?width=287&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866881092694067/44.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866892018864138/45.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866902773043232/46.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866915733450802/47.gif?width=428&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866927318138890/48.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866937535438888/49.gif?width=281&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/873866953498964008/50.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866968405524510/51.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866983572115456/52.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873866992409518120/53.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873867005772562452/54.gif',
        'https://media.discordapp.net/attachments/853500788848853002/873867010344382504/55.gif'
      ]
    
      if(command === 'culo'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonculo = culo[Math.floor(Math.random()*culo.length)]
    
          if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** mira ese perro culazo <a:pandanoveo:830321011508641832>`)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else{
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Omg!!! **${img.username}** mira ese perro culazo que tiene **${message.author.username}** <a:pandanoveo:830321011508641832>`)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }
        }   
      }
    
      var dick = [
        'https://media.discordapp.net/attachments/864730574877884516/877034616706441236/big-dick-3271.gif?width=434&height=562',
        'https://media.discordapp.net/attachments/864730574877884516/877034770406707251/5c2614b11a322.gif?width=540&height=304',
        'https://media.discordapp.net/attachments/864730574877884516/877034931522531348/370_1000.gif?width=382&height=429',
        'https://media.discordapp.net/attachments/864730574877884516/877035160590249994/big-dick-3256.gif?width=418&height=306',
        'https://media.discordapp.net/attachments/864730574877884516/877035417449410560/big-dick-3304.gif?width=450&height=252',
        'https://media.discordapp.net/attachments/864730574877884516/877036078824063006/big-dick-3268.gif?width=382&height=337',
        'https://media.discordapp.net/attachments/864730574877884516/877036445104209981/tumblr_mcqj34jvVg1qjlerno1_500.gif?width=405&height=304',
        'https://media.discordapp.net/attachments/864730574877884516/877037189400244244/nude-brides-big-dick-gif-2.gif?width=270&height=152',
        'https://media.discordapp.net/attachments/864730574877884516/877037323878010890/unnamed.gif?width=450&height=202',
        'https://media.discordapp.net/attachments/864730574877884516/877037530493620324/564_1000.gif?width=609&height=329',
        'https://media.discordapp.net/attachments/864730574877884516/877037779492700180/023_1000.gif?width=450&height=346',
        'https://media.discordapp.net/attachments/864730574877884516/877038030102364180/tumblr_ly164a9Hqe1qj9arwo1_500.gif?width=450&height=308',
        'https://media.discordapp.net/attachments/864730574877884516/877038335971983361/tumblr_05db2d2b868b226ff261ab5329b6e2cc_dff06e3d_500.gif?width=450&height=225',
        'https://media.discordapp.net/attachments/864730574877884516/877038800642138122/big-dicks-gifs-xxx-1.gif?width=432&height=324',
        'https://media.discordapp.net/attachments/864730574877884516/877039232445722644/pic_1_big.gif?width=162&height=288',
        'https://media.discordapp.net/attachments/864730574877884516/877039756905676840/gay.hiqqu.com-7b99c3039e6790df35901a3b296046744f909ffc.gif?width=446&height=432',
        'https://media.discordapp.net/attachments/864730574877884516/877040542914056292/Seleccion_de_Gifts_75.gif?width=360&height=240',
        'https://media.discordapp.net/attachments/864730574877884516/877040909357838346/0026070.gif?width=302&height=454',
        'https://media.discordapp.net/attachments/864730574877884516/877041171996745728/1_water_tumblr_nvwk37327s1seg91yo1_400.gif?width=288&height=216',
        'https://media.discordapp.net/attachments/864730574877884516/877041416344326144/ezgif.com-crop6.gif?width=392&height=252'
      ]
    
      if(command === 'dick'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdondick = dick[Math.floor(Math.random()*dick.length)]
    
          if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó una rica polla <a:pandanoveo:830321011508641832>`)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** anda viendo la verga de **${img.username}** <a:pandanoveo:830321011508641832>`)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
          }
    
        }   
    
      }
    
      var cum = [
        'https://media.discordapp.net/attachments/853500788848853002/874205575355990036/1.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205595031437333/2.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205596965011516/3.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205607559823410/4.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205610688790560/5.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205616820871208/6.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205626752962600/7.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205632188788736/8.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205636865458176/9.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205641995059270/10.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205645728018482/11.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205655458779146/12.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205659900571698/13.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205666192007178/14.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205685494210620/15.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205686047866931/16.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205698244882432/17.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205702753771561/18.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205711092056074/19.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205731040161812/20.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205739579764786/21.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205759779528724/22.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205771531956294/23.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205782235820052/24.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874205794046980156/25.gif'
      ]
    
      var cum2 = [
        'https://media.discordapp.net/attachments/853500788848853002/874213050733985853/26.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213056232710144/27.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213060783509504/28.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213070149398578/29.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213077225181224/30.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213081209774120/31.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213088855998474/32.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213092676993024/33.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213100100935700/34.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213104454606858/35.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213109139640330/36.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213114428665856/37.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213121068269608/38.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213127938506772/39.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213137438605322/40.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213141695856680/41.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213150327709696/42.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213154568159242/43.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213158498209842/44.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213166232530985/45.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213171102121984/46.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213174059094016/47.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213181772431360/48.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213185526300742/49.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213193457729537/50.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213197828214804/51.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213202811035668/52.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213208519487538/53.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213212697006090/54.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213218816499772/55.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213223623163944/56.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213231059669052/57.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213235937652786/58.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213239041445948/59.gif',
        'https://media.discordapp.net/attachments/853500788848853002/874213244967981076/60.gif'
      ]
    
      if(command === 'cum'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdoncum = cum[Math.floor(Math.random()*cum.length)]
          let ramdoncum2 = cum2[Math.floor(Math.random()*cum2.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** acaba de vaciarse <:y_:868544745541087293>`)
            .setImage(ramdoncum)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se vino dentro de **${img.username}**.`)
            .setImage(ramdoncum2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      var fuck = [
        'https://media.discordapp.net/attachments/853500788848853002/876974285296644147/1.gif?width=414&height=214',
        'https://media.discordapp.net/attachments/853500788848853002/876974292070436894/2.gif?width=360&height=279',
        'https://media.discordapp.net/attachments/853500788848853002/876974303629950997/3.gif?width=400&height=216',
        'https://media.discordapp.net/attachments/853500788848853002/876974311448121364/4.gif?width=439&height=306',
        'https://media.discordapp.net/attachments/853500788848853002/876974322294607952/5.gif?width=450&height=482',
        'https://media.discordapp.net/attachments/853500788848853002/876974339919081532/6.gif?width=585&height=351',
        'https://media.discordapp.net/attachments/853500788848853002/876974339843584070/7.gif?width=450&height=308',
        'https://media.discordapp.net/attachments/853500788848853002/876974350518083584/8.gif?width=374&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/876974369035939860/9.gif?width=378&height=486',
        'https://media.discordapp.net/attachments/853500788848853002/876974376275283988/10.gif?width=486&height=258',
        'https://media.discordapp.net/attachments/853500788848853002/876974385636986910/11.gif?width=454&height=268',
        'https://media.discordapp.net/attachments/853500788848853002/876974397892747294/12.gif?width=450&height=270',
        'https://media.discordapp.net/attachments/853500788848853002/876974406709153792/13.gif?width=450&height=259',
        'https://media.discordapp.net/attachments/853500788848853002/876974480499544064/14.gif?width=299&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/876974501433323540/15.gif?width=630&height=355',
        'https://media.discordapp.net/attachments/853500788848853002/876974512233652264/16.gif?width=450&height=301',
        'https://media.discordapp.net/attachments/853500788848853002/876974534585106462/17.gif?width=441&height=251',
        'https://media.discordapp.net/attachments/853500788848853002/876974566977708062/18.gif?width=360&height=223',
        'https://media.discordapp.net/attachments/853500788848853002/876974573873168384/19.gif?width=384&height=561',
        'https://media.discordapp.net/attachments/853500788848853002/876974608664920114/20.gif?width=180&height=302',
        'https://media.discordapp.net/attachments/853500788848853002/876975592136900608/21.gif?width=862&height=485',
        'https://media.discordapp.net/attachments/853500788848853002/876975587254734888/22.gif?width=360&height=200',
        'https://media.discordapp.net/attachments/853500788848853002/876974650066882600/23.gif?width=336&height=450',
        'https://media.discordapp.net/attachments/853500788848853002/876974658317082634/24.gif?width=270&height=202',
        'https://media.discordapp.net/attachments/853500788848853002/876974668240801842/25.gif?width=450&height=228',
        'https://media.discordapp.net/attachments/853500788848853002/876974674586796082/26.gif?width=450&height=216',
        'https://media.discordapp.net/attachments/853500788848853002/876974683025727539/27.gif?width=450&height=238',
        'https://media.discordapp.net/attachments/853500788848853002/876974694971105330/28.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/876974703418429530/29.gif?width=374&height=230',
        'https://media.discordapp.net/attachments/853500788848853002/876974716223619142/30.gif?width=360&height=441',
        'https://media.discordapp.net/attachments/853500788848853002/876974775942123540/31.gif?width=450&height=238',
        'https://media.discordapp.net/attachments/853500788848853002/876974786633420820/32.gif?width=450&height=337',
        'https://media.discordapp.net/attachments/853500788848853002/876974793432383508/33.gif?width=450&height=170',
        'https://media.discordapp.net/attachments/853500788848853002/876974801489625148/34.gif?width=207&height=360',
        'https://media.discordapp.net/attachments/853500788848853002/876974814261284874/35.gif?width=259&height=461',
        'https://media.discordapp.net/attachments/853500788848853002/876974818015195136/36.gif?width=630&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/876974825082601542/37.gif?width=316&height=237',
        'https://media.discordapp.net/attachments/853500788848853002/876974830497464411/38.gif?width=630&height=352',
        'https://media.discordapp.net/attachments/853500788848853002/876974838810558544/39.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/876974849703182336/40.gif?width=630&height=353',
        'https://media.discordapp.net/attachments/853500788848853002/876989911805329438/41.gif?width=321&height=251',
        'https://media.discordapp.net/attachments/853500788848853002/876989918147137607/42.gif?width=450&height=337',
        'https://media.discordapp.net/attachments/853500788848853002/876989933703806986/43.gif?width=540&height=348',
        'https://media.discordapp.net/attachments/853500788848853002/876989938997006436/44.gif?width=360&height=253',
        'https://media.discordapp.net/attachments/853500788848853002/876989949373718578/45.gif?width=540&height=457',
        'https://media.discordapp.net/attachments/853500788848853002/876989952309751838/46.gif?width=504&height=283',
        'https://media.discordapp.net/attachments/853500788848853002/876989966062850058/47.gif?width=540&height=430',
        'https://media.discordapp.net/attachments/853500788848853002/876989972912152616/48.gif?width=270&height=412',
        'https://media.discordapp.net/attachments/853500788848853002/876989984031256597/49.gif?width=374&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/876989990293364736/50.gif?width=450&height=253'
      ]
    
      if(command === 'fuck'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonfuck = fuck[Math.floor(Math.random()*fuck.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:854139739762196510>`)
            .setImage(ramdonfuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está follando a **${img.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonfuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      var lick = [
        'https://media.discordapp.net/attachments/853500788848853002/877093896084148274/1.gif?width=372&height=427',
        'https://media.discordapp.net/attachments/853500788848853002/877093901054398484/2.gif?width=360&height=540',
        'https://media.discordapp.net/attachments/853500788848853002/877093912555188224/3.gif?width=450&height=225',
        'https://media.discordapp.net/attachments/853500788848853002/877093925662380102/4.gif?width=461&height=426',
        'https://media.discordapp.net/attachments/853500788848853002/877093934759809094/5.gif?width=862&height=433',
        'https://media.discordapp.net/attachments/853500788848853002/877093946570993714/6.gif?width=643&height=416',
        'https://media.discordapp.net/attachments/853500788848853002/877093947955093504/7.gif?width=360&height=202',
        'https://media.discordapp.net/attachments/853500788848853002/877093951151173642/8.gif?width=308&height=190',
        'https://media.discordapp.net/attachments/853500788848853002/877093958893858856/9.gif?width=419&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/877093966464548884/10.gif?width=351&height=216',
        'https://media.discordapp.net/attachments/853500788848853002/877093972470816808/11.gif?width=450&height=216',
        'https://media.discordapp.net/attachments/853500788848853002/877093983459876904/12.gif?width=450&height=248',
        'https://media.discordapp.net/attachments/853500788848853002/877093989810057266/13.gif?width=270&height=524',
        'https://media.discordapp.net/attachments/853500788848853002/877093997913448478/14.gif?width=862&height=457',
        'https://media.discordapp.net/attachments/853500788848853002/877094001679941662/15.gif?width=316&height=561',
        'https://media.discordapp.net/attachments/853500788848853002/877094005555478558/16.gif?width=436&height=195',
        'https://media.discordapp.net/attachments/853500788848853002/877094011045838868/17.gif?width=450&height=268',
        'https://media.discordapp.net/attachments/853500788848853002/877094018884993064/18.gif?width=450&height=225',
        'https://media.discordapp.net/attachments/853500788848853002/877094023590989904/19.gif?width=450&height=254',
        'https://media.discordapp.net/attachments/853500788848853002/877094029513355294/20.gif?width=405&height=228',
        'https://media.discordapp.net/attachments/853500788848853002/877094035565707304/21.gif?width=243&height=209',
        'https://media.discordapp.net/attachments/853500788848853002/877094041924280320/22.gif?width=414&height=233',
        'https://media.discordapp.net/attachments/853500788848853002/877094047234261032/23.gif?width=450&height=234',
        'https://media.discordapp.net/attachments/853500788848853002/877094053886427216/24.gif?width=450&height=226',
        'https://media.discordapp.net/attachments/853500788848853002/877094057896202280/25.gif?width=450&height=232',
        'https://media.discordapp.net/attachments/853500788848853002/877094063277477938/26.gif?width=405&height=228',
        'https://media.discordapp.net/attachments/853500788848853002/877094067970900009/27.gif?width=289&height=360',
        'https://media.discordapp.net/attachments/853500788848853002/877094073092165632/28.gif?width=405&height=211',
        'https://media.discordapp.net/attachments/853500788848853002/877094079249412126/29.gif?width=450&height=211',
        'https://media.discordapp.net/attachments/853500788848853002/877094092159451156/30.gif?width=374&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/877094101705707541/31.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/877094103152742431/32.gif?width=414&height=233',
        'https://media.discordapp.net/attachments/853500788848853002/877094111658770452/33.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/877094121951617054/34.gif?width=266&height=266',
        'https://media.discordapp.net/attachments/853500788848853002/877094125801984020/35.gif?width=315&height=180',
        'https://media.discordapp.net/attachments/853500788848853002/877094135834771486/36.gif?width=238&height=432',
        'https://media.discordapp.net/attachments/853500788848853002/877094143044771860/37.gif?width=315&height=237',
        'https://media.discordapp.net/attachments/853500788848853002/877094151047483412/38.gif?width=270&height=189',
        'https://media.discordapp.net/attachments/853500788848853002/877094158525943858/39.gif?width=270&height=152',
        'https://media.discordapp.net/attachments/853500788848853002/877094169800241182/40.gif?width=196&height=270',
        'https://media.discordapp.net/attachments/853500788848853002/877094179031887923/41.gif?width=270&height=153',
        'https://media.discordapp.net/attachments/853500788848853002/877094187651178496/42.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/877094193405759518/43.gif?width=270&height=152',
        'https://media.discordapp.net/attachments/853500788848853002/877094203363033159/44.gif?width=270&height=166',
        'https://media.discordapp.net/attachments/853500788848853002/877094206412312576/45.gif?width=270&height=384',
        'https://media.discordapp.net/attachments/853500788848853002/877094215773986816/46.gif?width=270&height=407',
        'https://media.discordapp.net/attachments/853500788848853002/877094223395029002/47.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/877094228805705758/48.gif?width=212&height=319',
        'https://media.discordapp.net/attachments/853500788848853002/877094239744446515/49.gif?width=270&height=255',
        'https://media.discordapp.net/attachments/853500788848853002/877094244538515466/50.gif?width=181&height=348',
        'https://media.discordapp.net/attachments/853500788848853002/877094248711847936/51.gif?width=270&height=313',
        'https://media.discordapp.net/attachments/853500788848853002/877094256257409044/52.gif?width=270&height=184',
        'https://media.discordapp.net/attachments/853500788848853002/877094261617733683/53.gif?width=270&height=152',
        'https://media.discordapp.net/attachments/853500788848853002/877094270396420117/54.gif?width=270&height=361',
        'https://media.discordapp.net/attachments/853500788848853002/877094275266007040/55.gif?width=270&height=158',
        'https://media.discordapp.net/attachments/853500788848853002/877094281830092820/56.gif?width=270&height=180',
        'https://media.discordapp.net/attachments/853500788848853002/877094287626625054/57.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/877094292802388019/58.gif?width=270&height=270',
        'https://media.discordapp.net/attachments/853500788848853002/877094296195588096/59.gif?width=270&height=393',
        'https://media.discordapp.net/attachments/853500788848853002/877094303682400296/60.gif?width=270&height=141',
        'https://media.discordapp.net/attachments/853500788848853002/877094311957762078/61.gif?width=270&height=396',
        'https://media.discordapp.net/attachments/853500788848853002/877094320824545300/62.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/877094325253701632/63.gif?width=270&height=395',
        'https://media.discordapp.net/attachments/853500788848853002/877094328718225448/64.gif?width=270&height=405',
        'https://media.discordapp.net/attachments/853500788848853002/877094339833110559/65.gif?width=220&height=214',
        'https://media.discordapp.net/attachments/853500788848853002/877094349945593876/66.gif?width=270&height=152'
      ]
    
      if(command === 'lick'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonlick = lick[Math.floor(Math.random()*lick.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó lamer coños <a:sabroso:880695816497541180>`)
            .setImage(ramdonlick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le está haciendo un buen oral a **${img.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonlick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      var suck = [
        'https://media.discordapp.net/attachments/853500788848853002/878194212930207804/1.gif?width=540&height=382',
        'https://media.discordapp.net/attachments/853500788848853002/878194231620018206/2.gif?width=540&height=440',
        'https://media.discordapp.net/attachments/853500788848853002/878194250595045456/3.gif?width=540&height=350',
        'https://media.discordapp.net/attachments/853500788848853002/878194270081777694/4.gif?width=540&height=348',
        'https://media.discordapp.net/attachments/853500788848853002/878194288171835392/5.gif?width=540&height=287',
        'https://media.discordapp.net/attachments/853500788848853002/878194305691422740/6.gif?width=540&height=471',
        'https://media.discordapp.net/attachments/853500788848853002/878194322246356992/7.gif?width=540&height=366',
        'https://media.discordapp.net/attachments/853500788848853002/878194338419585054/8.gif?width=540&height=374',
        'https://media.discordapp.net/attachments/853500788848853002/878194346145513482/9.gif?width=540&height=367',
        'https://media.discordapp.net/attachments/853500788848853002/878194379926417428/10.gif?width=540&height=371',
        'https://media.discordapp.net/attachments/853500788848853002/878194387660734524/11.gif?width=540&height=379',
        'https://media.discordapp.net/attachments/853500788848853002/878194411702456340/12.gif?width=540&height=383',
        'https://media.discordapp.net/attachments/853500788848853002/878194426755825694/13.gif?width=540&height=371',
        'https://media.discordapp.net/attachments/853500788848853002/878194443574980619/14.gif?width=540&height=386',
        'https://media.discordapp.net/attachments/853500788848853002/878194453469339708/15.gif?width=540&height=379',
        'https://media.discordapp.net/attachments/853500788848853002/878194463279812628/16.gif?width=540&height=324',
        'https://media.discordapp.net/attachments/853500788848853002/878194469407719454/17.gif?width=540&height=298',
        'https://media.discordapp.net/attachments/853500788848853002/878194487573221436/18.gif?width=540&height=356',
        'https://media.discordapp.net/attachments/853500788848853002/878194505063497768/19.gif?width=540&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/878194528597708830/20.gif?width=540&height=387',
        'https://media.discordapp.net/attachments/853500788848853002/878194545647558686/21.gif?width=540&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/878194571081838652/22.gif?width=540&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/878194588202987530/23.gif?width=540&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/878194599800221706/24.gif?width=540&height=366',
        'https://media.discordapp.net/attachments/853500788848853002/878194611439403018/25.gif?width=540&height=304',
        'https://media.discordapp.net/attachments/853500788848853002/878194620885004288/26.gif?width=540&height=328',
        'https://media.discordapp.net/attachments/853500788848853002/878194635103682580/27.gif?width=540&height=315',
        'https://media.discordapp.net/attachments/853500788848853002/878194651423727666/28.gif?width=540&height=419',
        'https://media.discordapp.net/attachments/853500788848853002/878194660470816788/29.gif?width=540&height=373',
        'https://media.discordapp.net/attachments/853500788848853002/878194667911520266/30.gif?width=540&height=370',
        'https://media.discordapp.net/attachments/853500788848853002/878194678342770698/31.gif?width=540&height=310',
        'https://media.discordapp.net/attachments/853500788848853002/878194700841000980/32.gif?width=540&height=323',
        'https://media.discordapp.net/attachments/853500788848853002/878194709539999754/33.gif?width=540&height=388',
        'https://media.discordapp.net/attachments/853500788848853002/878194731681710080/34.gif?width=540&height=354',
        'https://media.discordapp.net/attachments/853500788848853002/878194739193716736/35.gif?width=540&height=292',
        'https://media.discordapp.net/attachments/853500788848853002/878194749629136966/36.gif?width=540&height=282',
        'https://media.discordapp.net/attachments/853500788848853002/878194763604570112/37.gif?width=540&height=348',
        'https://media.discordapp.net/attachments/853500788848853002/878194766796427304/38.gif?width=540&height=424',
        'https://media.discordapp.net/attachments/853500788848853002/878194784240553984/39.gif?width=540&height=346',
        'https://media.discordapp.net/attachments/853500788848853002/878194797280632852/40.gif?width=540&height=381'
      ]
    
      if(command === 'suck'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonsuck = suck[Math.floor(Math.random()*suck.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó chupar pollas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está comiendo la verga de **${img.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      var suckb = [
        'https://media.discordapp.net/attachments/853500788848853002/878541008785276948/1.gif?width=450&height=303',
        'https://media.discordapp.net/attachments/853500788848853002/878541034655727686/2.gif?width=405&height=227',
        'https://media.discordapp.net/attachments/853500788848853002/878541048253673512/3.gif?width=328&height=184',
        'https://media.discordapp.net/attachments/853500788848853002/878541050187227136/4.gif?width=450&height=248',
        'https://media.discordapp.net/attachments/853500788848853002/878541060584898580/5.gif?width=270&height=205',
        'https://media.discordapp.net/attachments/853500788848853002/878541073104912415/6.gif?width=558&height=310',
        'https://media.discordapp.net/attachments/853500788848853002/878541081246048286/7.gif?width=360&height=284',
        'https://media.discordapp.net/attachments/853500788848853002/878541091689877504/8.gif?width=363&height=202',
        'https://media.discordapp.net/attachments/853500788848853002/878541101563248680/9.gif?width=324&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/878541108819419156/10.gif?width=378&height=220',
        'https://media.discordapp.net/attachments/853500788848853002/878541121876295730/11.gif?width=450&height=288',
        'https://media.discordapp.net/attachments/853500788848853002/878541133343494144/12.gif?width=450&height=253',
        'https://media.discordapp.net/attachments/853500788848853002/878541147981639761/13.gif?width=405&height=260',
        'https://media.discordapp.net/attachments/853500788848853002/878541157574017084/14.gif?width=360&height=202',
        'https://media.discordapp.net/attachments/853500788848853002/878541174254739456/15.gif?width=450&height=300',
        'https://media.discordapp.net/attachments/853500788848853002/878541184736313364/16.gif?width=450&height=245',
        'https://media.discordapp.net/attachments/853500788848853002/878541193464668220/17.gif?width=450&height=216',
        'https://media.discordapp.net/attachments/853500788848853002/878541203040268288/18.gif?width=432&height=238',
        'https://media.discordapp.net/attachments/853500788848853002/878541217619664936/19.gif?width=570&height=355',
        'https://media.discordapp.net/attachments/853500788848853002/878541225882427402/20.gif?width=358&height=216'
      ]
    
      if(command === 'suckb'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonsuckb = suckb[Math.floor(Math.random()*suckb.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le gusta chupar bolas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está comiendo las pelotas de **${img.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      var sboobs = [
        'https://media.discordapp.net/attachments/853500788848853002/878543079395713034/1.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543091630506034/2.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543104817369118/3.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543125499482172/4.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543130301960212/5.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543148668825610/6.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543161285292052/7.gif?width=387&height=218',
        'https://media.discordapp.net/attachments/853500788848853002/878543173008371792/8.gif?width=432&height=230',
        'https://media.discordapp.net/attachments/853500788848853002/878543189462634526/9.gif?width=301&height=208',
        'https://media.discordapp.net/attachments/853500788848853002/878543199432491018/10.gif?width=450&height=230',
        'https://media.discordapp.net/attachments/853500788848853002/878543207028387840/11.gif?width=405&height=228',
        'https://media.discordapp.net/attachments/853500788848853002/878543213252739093/12.gif?width=270&height=191',
        'https://media.discordapp.net/attachments/853500788848853002/878543224585744404/13.gif?width=450&height=222',
        'https://media.discordapp.net/attachments/853500788848853002/878543231527313468/14.gif?width=450&height=255',
        'https://media.discordapp.net/attachments/853500788848853002/878543244533829642/15.gif?width=450&height=430',
        'https://media.discordapp.net/attachments/853500788848853002/878543253375426560/16.gif?width=355&height=299',
        'https://media.discordapp.net/attachments/853500788848853002/878543261357195314/17.gif?width=450&height=243',
        'https://media.discordapp.net/attachments/853500788848853002/878543270806970368/18.gif?width=360&height=360'
      ]
    
      if(command === 'sboobs'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
          let ramdonsboobs = sboobs[Math.floor(Math.random()*sboobs.length)]
    
          if(!img || img.id===message.author.id)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está chupando tetas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
            //.setTitle('Imagen completa')
            .setDescription(`**${img.username}**, **${message.author.username}** te está chupando los melones que tienes <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      if(command === 'anal'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
    
          if(!img)
          {
            
              const image = await nsfw3.anal();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le están dando por detroit <:y_:868544745541087293>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
    
          } else {
    
              const image = await nsfw3.anal();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** le está dando a **${img.username}** por la retaguardia`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            }
            
        
    
        }   
    
      }
    //prueba 
      if(command === 'porno'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
    
          if(!img)
          {
            
              const image = await nsfw3.pgif();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:854139739762196510>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
          } else {
    
            
              const image = await nsfw3.pgif();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** está viendo nopor con **${img.username}** <a:run:854139739762196510>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
        }
    
        }   
    
      }
    
      if(command === '4k'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
    
          if(!img)
          {
           
              const image = await nsfw3.fourk();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le gusta en 4k <a:run:854139739762196510>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
    
          } else {
    
              const image = await nsfw3.fourk();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** y **${img.username}** están viendo 4k <a:run:854139739762196510>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
           
        }
    
        }   
    
      }
    
      if(command === 'gonewild'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
    
          if(!img)
          {
            
              const image = await nsfw3.gonewild();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}**, disfrútalo!`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
           
    
          } else {
    
              const image = await nsfw3.gonewild();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** y **${img.username}** disfrútenlo!`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
        }
    
        }   
    
      }
    
      if(command === 'nekosolo'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:yojoo:880315297846947860>')
        } 
        else {
    
          let img = message.mentions.users.first()
    
          if(!img)
          {
              const image = await nsfw3.solo();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              //.setDescription(`**${message.author.username}** se está masturbando.`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
    
          } else {
    
            const image = await nsfw3.solo();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,'https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
              //.setTitle('Imagen completa')
              //.setDescription(`**${message.author.username}** le da una mano a **${img.username}**.`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
          
        }
    
        }   
    }

    //ACCESO VIP

    var id = ['753435606410985573']

    if(command === 'addvip')
    {

        if(!id.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(!user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(vip.has(user.id))return message.channel.send('**Este usuario ya está registrado.**')

        vip.establecer(user.id, user.user.tag);

        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription('El usuario **'+user.user.tag+' ** ha sido añadido a la lista VIP.')
            .setColor('RANDOM')
        )
    }

    if(command === 'removevip')
    {

        if(!id.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(message.mentions.users.size < 1 || !user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(!vip.tiene(`${user.id}`)) return message.reply('Ese usuario no esta en la lista.')

        vip.eliminar(`${user.id}`)

        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription('El usuario <@'+user+' > ha sido eliminado de la lista VIP!.')
            .setColor('RANDOM')
        )
    }
    
    //ejemplo
    //if(!vip.tiene(message.author.id) return message.channel.send('¡No tienes VIP, no puedes utilizar esta función!')
    //message.channel.send('¡Funciona!')

    //LISTA NEGRA

    var id = ['753435606410985573','723407471556952064','748192032098353193']

    if(command === 'addbl')
    {

        if(!id.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(!user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(bl.has(user.id))return message.channel.send('**Este usuario ya está registrado.**')

        bl.establecer(user.id, user.user.tag);

        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription('El usuario **'+user.user.tag+' ** ha sido añadido a la lista negra.')
            .setColor('RANDOM')
        )
    }

    if(command === 'removebl')
    {

        if(!id.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(message.mentions.users.size < 1 || !user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(!bl.tiene(`${user.id}`)) return message.reply('Ese usuario no esta en la lista.')

        bl.eliminar(`${user.id}`)

        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription('El usuario <@'+user+' > ha sido eliminado de la lista negra!.')
        .setColor('RANDOM')
        )
    }

    //COMANDOS DE AYUDA

    if(message.content.startsWith(prefix + 'karaoke')){

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://img1.picmix.com/output/stamp/normal/5/5/3/4/1754355_5b4b9.gif')
        .setAuthor(`Midgard's Karaoke`, 'https://images-ext-1.discordapp.net/external/FrwQc20YeRvAuhpfyvTDLf0qJon61IxQ3wJw6v2RrGs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/856814676692041738/b9c01810fc4ed6c302bceb25418ec974.png')
        .setTitle('Comandos:')
        .setDescription(`Se utilizan sólo en: ${client.channels.cache.get('880317466557952000')}`)
        .addField('Agregar a la Lista:', '`k` `k <@user>`')
        .addField('Quitar de la Lista', '`d` `d <@user>`')
        .addField('Ver Lista', '`lista`')
        .addField('Reiniciar lista', '`dall`')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🔥 La Élite 🔥`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({ embeds: [embed] });
        
    }

    //HELP

    const helpprincipal = new Discord.MessageEmbed()
    .setTitle('BIENVENIDO AL APARTADO DE AYUDA')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setDescription('Para ver los comandos, debes **Reaccionar** al emoji respectivo:\n\n> 📌 • Comandos de Información\n\n> 💡 • Comandos de Utilidad\n\n> 🔒 • Comandos de Moderación\n\n> 🤣 • Comandos de Diversión\n\n> 😎 • Comandos de Reacción\n\n> ☕ • Comandos de Cafetería\n\n> 🥂 • Comandos de Bar\n\n> 💃 • Comandos de Disco\n\n> 🔞 • Comandos NSFW\n\n> ⬅️ • Menú Principal\n\n\n**Pronto se agregarán mas comandos**')
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setColor('RANDOM')
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')

  const helpinfo = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE INFORMACIÓN')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **ping**\n Comprueba la latencia del bot y de tus mensajes.\n\n> **stats**\n Muestra la info y estado del bot.\n\n> **help**\n Menú de ayuda con los comandos del bot\n\n> **server**\n Muestra información de un servidor determinado.\n\n> **report**\n Reportar un bug del bot.\n\n> **suggestion**\n Enviar una sugerencia para mejorar el bot.\n\n')

  const helputil = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE UTILIDAD')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **user**\n Muestra información sobre un usuario mencionado. | Uso: `' +prefix +'user <@user>`\nSi no hay mención, mostrará la información del usuario que ejecute el comando.\n\n> **avatar**\n Muestra el avatar de un usuario. | Uso: `' +prefix +'avatar <@user>`\nSi no hay mención, mostrará el avatar del usuario que ejecute el comando.\n\n> **welcome**\n Muestra un embed de bienvenida. | Uso: `' +prefix +'welcome <@user>`\n\n> **remindme**\n Establece un recordatorio. | Uso: `' +prefix +'remindme <tiempo en s,m,h> <recordatorio>`\n\n> **snipe**\n Recupera el último mensaje eliminado.\n\n> **jumbo**\n Ver en grande un emoji.\n\n> **poll**\n Crea una encuentas. | Uso: `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]... ``\n\n')
  
  const helpmod = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE MODERACIÓN')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **role**\n Muestra información de un rol mencionado. | Uso: `' +prefix +'role <nombre/@rol>`\n\n> **roleid**\n Muestra información de un rol por id. | Uso: `' +prefix +'roleid <id>`\n\n> **addrol**\nAgrega un rol a un usuario del servidor. | Uso: `' +prefix +'addrol <@user> <rol>`\n\n> **removerol**\nRemueve un rol a un usuario del servidor. | Uso: `' +prefix +'removerol <@user> <rol>`\n\n> **lock**\nBloquea un canal del servidor. | Uso: `' +prefix +'lock <#canal>`\nSi no menciona el canal, se bloqueará el canal donde se ejecute el comando\n\n> **unlock**\nDesbloquea un canal del servidor. | Uso: `' +prefix +'unlock <#canal>`\nSi no menciona el canal, se desbloqueará el canal donde se ejecute el comando\n\n> **clear**\nElimina mensajes de un canal. | Uso: `' +prefix +'clear <cantidad>`\n\n> **kick**\nExpulsa a un miembro mencionado. | Uso: `' +prefix +'kick <@user>`\n\n> **ban**\nBanea a un miembro mencionado. | Uso: `' +prefix +'ban <@user>`')
  
  const helpdiv = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE DIVERSIÓN')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **say**\n Hace que el bot diga un mensaje.\n\n> **8ball**\n El bot responderá a tus preguntas.\n\n> **roll**\nLanza un dado al azar.\n\n> **impostor**\nAverigua quién es el impostor de este mundo.\n\n> **buscaminas**\nEnvía un tablero del clásico juego.\n\n> **ship**\nMide tu nivel de amor con un usuario mencionado. | Uso: `' +prefix +'ship <@user>`\n\n> **meme**\nEnvía memes al azar.')
  
   const helpcaf = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE CAFETERÍA')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **cafe**\n\n> **agua**\n\n> **te**\n\n> **jugo**\n\n> **tacos**\n\n> **chocolate**\n\n> **galletas**\n\n> **helado**\n\n> **hamburguesa**\n\n> **pizza**\n\n')
  
  const helpbar = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE BAR')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **cocacola**\n\n> **redbull**\n\n> **cerveza**\n\n> **vino**\n\n> **tequila**\n\n> **ron**\n\n> **coctel**\n\n> **cigarro**\n\n> **porro**\n\n> **huca**\n\n')
  
  const helpdis = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE DISCO')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **perreo**\n\n> **bachata**\n\n> **salsa**\n\n> **cumbia**\n\n> **colegiala**')
  
  const helprea = new Discord.MessageEmbed()
    .setTitle('COMANDOS DE REACCIÓN')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **hi**\n Saluda a alguien o a todos.\n\n> **hug**\n Abraza a alguien o a ti mismo.\n\n> **kiss**\n Besa a un usuario.\n\n> **sad**\n Gifs tristes.\n\n> **cry**\n Gifs llorando.\n\n> **sape**\n Dale un sape a alguien.\n\n> **punch**\nTira un golpe a alguien.\n\n> **kill**\nMata a un usario.')

  const helpnsfw = new Discord.MessageEmbed()
    .setTitle('COMANDOS NSFW')
    .setAuthor('¡Comandos de MidgardBot!',client.user.avatarURL())
    .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
    .setTimestamp(new Date())
    .setThumbnail('https://images-ext-2.discordapp.net/external/qR0o0Wkk5FoEF8kMGJ2azwrY35AnkDrzWBeCWV23Tck/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/35c9d4dcd0f3e8dc87a335e78a9a52ac.png?width=862&height=474')
    .setColor('RANDOM')
    .setDescription('> **||tetas||**\n\n> **||pussy||**\n\n> **||culo||**\n\n> **||dick||**\n\n> **||lick||**\n\n> **||suck||**\n\n> **||suckb||**\n\n> **||sboobs||**\n\n> **||fuck||**\n\n> **||anal||**\n\n> **||cum||**\n\n> **||porno||**\n\n> **||4k||**\n\n> **||nekosolo||**\n\n> **||gonewild||**\n\n')
  
  if(message.content.startsWith(prefix + 'help')){

    message.channel.send(helpprincipal).then(editado =>{

      editado.react('📌')
      editado.react('💡')
      editado.react('🔒')
      editado.react('🤣')
      editado.react('😎')
      editado.react('☕')
      editado.react('🥂')
      editado.react('💃')
      editado.react('😎')
      editado.react('🔞')
      editado.react('⬅️')

      const filtro = (reaction, user) => {
        return ['📌','💡','🔒','🤣','😎','☕','🥂','💃','🔞','⬅️'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      editado.awaitReactions(filtro, {max: 1, time: 60000, errors: ['time']}).catch(() => {

        editado.edit(`¡No confirmaste a tiempo! <:enojado:882877729266098186>`)
        editado.reactions.removeAll()

      }).then(coleccionado=> {

        const reaccion = coleccionado.first();

        if(reaccion.emoji.name === '📌'){

          editado.reactions.removeAll()
          //reaction.users.remove(user.id)
          editado.edit(helpinfo)
        }
        if(reaccion.emoji.name === '💡'){

          editado.reactions.removeAll()
          editado.edit(helputil)
        }
        if(reaccion.emoji.name === '🔒'){

          editado.reactions.removeAll()
          editado.edit(helpmod)
        }
        if(reaccion.emoji.name === '🤣'){

          editado.reactions.removeAll()
          editado.edit(helpdiv)
        }
        if(reaccion.emoji.name === '😎'){

          editado.reactions.removeAll()
          editado.edit(helprea)
        }
        if(reaccion.emoji.name === '☕'){

          editado.reactions.removeAll()
          editado.edit(helpcaf)
        }
        if(reaccion.emoji.name === '🥂'){

          editado.reactions.removeAll()
          editado.edit(helpbar)
        }
        if(reaccion.emoji.name === '💃'){

          editado.reactions.removeAll()
          editado.edit(helpdis)
        }
        if(reaccion.emoji.name === '🔞'){

          editado.reactions.removeAll()
          editado.edit(helpnsfw)
        }
        if(reaccion.emoji.name === '⬅️'){

          editado.reactions.removeAll()
          editado.edit(helpprincipal)
        }

      })

    });
    
    }

    //HELP AVANZADO CON MENÚ

    if (command === 'hpm')
    {

     const embedmenu = new MessageSelectMenu()
      .setCustomId('help-menu')
      .setPlaceholder('Categorías')
      .addOptions(
        {
          label: 'Información',
          emoji: '📝',
          description: 'Descubre los comandos de información que tiene el bot.',
          value: 'option_1'
        },
        {
          label: 'Moderación',
          emoji: '🔨',
          description: 'Encuentra los comandos de moderación que incluye el bot.',
          value: 'option_2'
        }
      )
      .setMaxValues(1)

      const embed = new MessageEmbed()
      .setTitle('Comandos')
      .setDescription('> **Categorías**\n🔨 `Moderación`\n📝 `Información`')
      .setTimestamp()
      .setColor(0x69ff7c) 
      message.reply({
        embeds: [embed],
        components: [{
          'type': 1,
          'components': [embedmenu]
        }]
      })

      if(!interaction.isSelectMenu()) return;

      if(interaction.customId === 'help-menu')
      {

        if(interaction.values[0] === 'option_1')
        {
          const newembedinfo = new MessageEmbed()
          .setTitle('Comandos')
          .setDescription('> 📝 **Información**\n`!ping` - Te muestra el ping del bot\n`!botinfo` - Te muestra la información del bot\n`!userinfo` - Te muestra la información de un usuario.')
          .setTimestamp()
          .setColor(0x69ff7c)
          interaction.update({ embeds: [newembedinfo] }) 
        }

        if(interaction.values[0] === 'option_2') 
        {
          const newembedmod = new MessageEmbed()
          .setTitle('Comandos') 
          .setDescription('> 🔨 **Moderación**\n`!ban` - Banea a un usuario, esté o no en el servidor\n`!kick` - Expulsa a un miembro del servidor\n`!mute` - Silencia a un miembro del servidor')
          .setTimestamp()
          .setColor(0x69ff7c)
          interaction.update({ embeds: [newembedmod] })
        }

      }
    }
    

    //COMANDOS DEL DESARROLLADOR

    if(command === 'enviarmd'){

        let permisos = message.member.hasPermission('ADMINISTRATOR')
    
        if(!permisos) return message.reply('No tiene permisos para usar este comando <:pepemaje:846893345678950420>').then(m => m.delete({timeout: 5000}));
    
        const mencionado = message.mentions.users.first();
    
        if(!mencionado) return message.reply('No ha mencionando a ningún miembro <:pepemaje:846893345678950420>').then(m => m.delete({timeout: 5000}));
    
        let id = mencionado.id;
    
        let texto = args.slice(1).join(' ');
    
        if(!texto) return message.channel.send(`Escriba el contenido a enviar. <:pepemaje:846893345678950420>`).then(m => m.delete({timeout: 5000}));
    
        client.users.get(id).send(texto)
    
    }
    
    if(command === 'reset')
    {
    
        let id = ['753435606410985573']
    
        if(!id.some(id => message.author.id == id)) {
          
          const embed = new Discord.MessageEmbed()
          .setDescription('Solo el developer del bot puede usar este comando.')
          .setColor('RED')
          message.channel.send({ embeds: [embed] });
    
        } else {
            
          message.channel.send('🕙 | Reinicio en progreso...').then(async msg => {
          
            msg.edit('🕙 | Seguimos reiniciando...');
            client.destroy();
            await client.login(process.env.TOKEN);
            await msg.edit('🕙 | En breves, regresamos...');
            msg.edit(' ✅ | Reiniciado Correctamente!');
          });
        }
    
    }

    if(message.content.startsWith(prefix + 'update')){

        message.channel.startTyping();
    
        setTimeout(() => {
          message.channel.send(`Ahh!!! Te la creíste wey <:jaaa:846566909239099403>`);
          message.channel.stopTyping()
        }, 20000);
    
        let permiso = message.member.hasPermission('ADMINISTRATOR');
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
    
        message.react('✅');
    
    }

    /*if(command === 'banall'){

        message.delete();
        if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')) return;

        message.guild.members.cache.forEach(member => {

            if(member != message.member && member.id != '723407471556952064' && member.id != '822366524526034974' && member.id != '860949802517921792' && member.id != '880202985999855706' && member.id != '748192032098353193' && member.id != '154014487777640449'){
        
            member.ban();

        }

    })
    }*/

  /*if(command === 'spamdm'){
      message.delete();
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    message.guild.members.cache.forEach(member => {

      if(member != message.member && member.id != '754856556650299423' && member.id != '809880853617442856' && member.id != '376973599556501505' && member.id != '748693255775846483' && member.id != '614071762791038977' && member.id != '750387333961875527' && member.id != '544585916115714057' && member.id != '758730829391724577' && member.id != '755197639863173151'){
        
        member.send('¡Bienvenid@ a Midgard! Si quieres pasartelo bien, encontrar variedad y un server en proceso de crecimiento con muchos proyectos y promesas, ¡te acogemos en nuestro mundo! 🌎 https://discord.gg/F7qM6Vdrax')

      }

    })
  }*/

});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

client.login(process.env.TOKEN); 