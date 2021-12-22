const Discord = require('discord.js');
// const client = new Discord.Client();
const { Permissions } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ allowedMentions: { parse: ['users', 'roles'], repliedUser: true }, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES] });

// const { MessageSelectMenu, MessageEmbed } = require('discord.js')

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

const star = require('star-labs')

const moment = require("moment")

const dbv = require('megadb');
// const db_marry = new dbv.crearDB('marry');
const vip = new dbv.crearDB('vip');
const bl = new dbv.crearDB('blacklist');
const fs = require('fs');

/*const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./bd.sqlite");


<-- CREATE TABLE USUARIO -->
  
let crear = "CREATE TABLE IF NOT EXISTS usuarios (idusuario TEXT, nivel INTEGER, exp INTEGER, rep INTEGER, frase BLOB, foto BLOB)"

db.run(crear, function(err) {
  if (err) return console.error('Error crear tabla: '+err.message)
})*/

const sqlite3 = require('sqlite3'),
{ open } = require('sqlite');


(async()=>{
  
  client.db = await open({

    filename:'./DATABASES/bd.db',
    driver: sqlite3.Database

  })

  await client.db.exec(`CREATE TABLE IF NOT EXISTS usuarios ('idusuario' TEXT NOT NULL, 'nivel' INTEGER DEFAULT 0, 'exp' INTEGER DEFAULT 0, 'rep' INTEGER DEFAULT 0, 'frase' BLOB, 'foto' BLOB, 'dinero' INTEGER DEFAULT 0, 'banco' INTEGER DEFAULT 0, 'total' INTEGER DEFAULT 0, 'work' DATETIME, 'rob' DATETIME, 'daily' DATETIME)`)
  
})();


const tresenraya = require('tresenraya');

// const Canvas = require('canvas')

// const marsnpm = require('marsnpm')

// const { joinVoiceChannel } = require('@discordjs/voice');

// const { createAudioPlayer } = require('@discordjs/voice');

// const player = createAudioPlayer();

// const discordTTS = require("discord-tts");

const CARTA_TIEMPO_MIN = 2;
const CARTA_TIEMPO_MAX = 5;
const MENSAJE_AYUDA_CARTA = new Discord.MessageEmbed()
.setDescription('<a:d_Fijao:897243194943737866> Carta - Envia una carta a otro usuario <:abby:880300168514252811>')
.addField('<a:flech:915156906258071554> Uso: ','`carta <tag> <anónimo> <mensaje>`')
.addField('<a:flech:915156906258071554> Argumentos: ','- tag: El tag del usuario / @user\n- anónimo: Enviar anónimamente el mensaje (s = sí, n = no)\n- mensaje: El mensaje que deseas enviar.')
.setColor('RANDOM')
.setFooter('Utiliza con moderación el comando, caso contrario, serás reportado en la lista negra del Bot!', `https://c.tenor.com/Gh9SFp64h8wAAAAC/banned-and-you-are-banned.gif`);

const prefix = process.env.PREFIX;

client.on('ready', () => {
  
  client.user.setPresence({
    status: 'online',
    activities: [{
      name: '.gg/svmidgard',
      type: 'WATCHING',
    }],
  });
  console.log('Listo!');

});

client.on('guildMemberAdd', async member => {

  if(member.bot) return;
  const guild = member.guild;
  newUsers.set(member.id, member.user);

  console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${guild.name}.`);

  const channel = guild.channels.cache.find(ch => ch.id === '779566489429737472');
  
  if (!channel) return;

  /*if (newUsers.size > 1000000) {

    const userlist = newUsers.map(u => u.toString()).join(' ');
    channel.send('¡Bienvenid@s Terrícolas!'+ `${userlist}`+', a este nuevo**Universo**. <:ShyLove:880410907635748924> Les invito a pasar por <#855582327514202132> y <#785685918270488656> Y si tienen una queja, duda o sugerencia, pasen por <#815654349912801280>. Cualquier duda o pregunta aquí estará todo el equipo de Staff a su disposición. <a:pasito:877116925291946094> Pásenla increíble, lindo día, tarde o noche. <a:abdul_dance:880930576683630662>');
    newUsers.clear();

  }*/

  channel.send('¡Bienvenid@ Terrícola!' + `${member.user}` + ', a este nuestro **Universo**. <:ShyLove:880410907635748924>. Espero que te lo pases genial en este server libre de toxicidad, con muchos eventos programados, premios y más sorpresas!!! <a:Sara:880304101215334401> Recuerda pasar por <#777623227321155614> y <#880268322921414657> Y si tienes alguna queja, duda o sugerencia, pasa por <#880402803825188874>. Cualquier incoveniente aquí estará todo el equipo de Staff a su disposición. <a:dc_party1:881033439367815239>');
  
    
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
    .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
    .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
    .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
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
        //canal.send({file: [m.proxyURL]})//enviamos la imagen 
    
    //.setImage(m.proxyURL)
  
    //canal.send({embeds : [embed]})enviamos el embed
      
      })
    }*/
  
});

client.on('messageCreate', async message => {
    
    if (message.channel.type === 'dm') {

      let sv = client.guilds.cache.get('777620055344545842')
      let channel = sv.channels.cache.get('874943743185285150')

      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado al dm por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje directo')
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    }
  
    if(message.channel.id==='880290686107275304')
    {

      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880267684950999050')

      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en alto cargo por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado1')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='880292291443556383')
    {
      
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280405993996339')
  
      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en élite por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado2')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='840161683732693033')
    {

      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280308732272640')
  
      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en staff por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado3')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='909722451745837106')
    {

      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280346208395305')
  
      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en admin por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado4')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='870195067338506271')
    {
      
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280535304372234')
  
      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en chat general por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado5')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else if(message.channel.id==='880384504240422972')
    {
      
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280557051858974')
  
      if(message.content.length>=1000) return channel.send('Mensaje demasiado largo, enviado en chat solteroskis por: '+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado6')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    } else
    {
      
      let sv = client.guilds.cache.get('851924635930329098')
      let channel = sv.channels.cache.get('880280265216389140')
  
      if(message.content.length>=1000) return channel.send(`Mensaje demasiado largo, enviado en <#${message.channel.id}> por: `+message.author)
  
      const embed = new Discord.MessageEmbed()
      .setThumbnail(`https://media2.giphy.com/media/3sbiWejYVIGuX1thyq/giphy.gif`)
      .setAuthor('MaltaBot', client.user.avatarURL())
      .setTitle('📢 | Mensaje Enviado7')
      .addField('Canal: ', `<a:flech:915156906258071554> <#${message.channel.id}>`)
      .addField('Autor: ', `<a:flech:915156906258071554> ${message.author}`)
      .addField('Mensaje: ', message.content ? message.content: 'Ningún mensaje registrado')
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`Id: ${message.author.id}`, `${message.author.displayAvatarURL()}`)
      
      channel.send({ embeds: [embed] });
  
    }
  
    if (message.author.bot) return;
  
      if (message.content === 'Hola'){
        
          message.channel.send('Hola '+message.author.username+', cómo va tu día?');
        }
        if (message.content === 'hola'){
          //Si escribiera Hola, nos contestará con un mensaje 
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
          //
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
          //Si escribiera Buenos días, nos contestará con un men
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
          //Si escribiera Buenos días, nos contestará con un mensaje perso
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
  
        if (message.content === 'malta' || message.content === 'Malta' || message.content === 'MALTA' || message.content === 'MAlta' || message.content === 'maltazar' || message.content === 'Maltazar' || message.content === 'MALTAZAR' || message.content === 'MAltazar' || message.content === 'maltazard' || message.content === 'Maltazard' || message.content === 'MALTAZARD' || message.content === 'MAltazard')
        {
          if(bl.tiene(message.author.id)) return;
  
          message.channel.send({
            content: message.author.toString() + "¿Deseas contactar a Malta?",
            components: [
              /* Botones para aceptar y rechazar el juego */
              new MessageActionRow().addComponents([
                new MessageButton()
                  .setCustomId("accept")
                  .setLabel("SI")
                  .setStyle("SUCCESS"),
                new MessageButton()
                  .setCustomId("deny")
                  .setLabel("NO")
                  .setStyle("DANGER")
              ])
            ]
          }).then(async m => {
          
            /* Creamos un collector de componentes para detectar lainteracción con los botones */
            
            let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
           
            const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 /* Tiempo para que el miembro interatue con los botones */ });
            
            
            collector.on("collect", async int => {
              
              /* Cuando el miembro mencionado de click en un boton */
              
              int.deferUpdate();
              
              /* Si dio click en el boton aceptar ... */
              
              if (int.customId === "accept") {
                
                m.edit({
                  content: `<@${img}> Te buscan por aquí <:yonofui:920215733387018280>`,
                  components: []
                });
      
                
              } else if (int.customId === "deny") {
                
                 // Editamos el mensaje y quitamos los botones.
                m.edit({
                  content: "Gracias, si necesitas algo, no dudes en contactarme. <:tierno:881618338759966800>",
                  components: []
                });
              
              }
            });
      
            collector.on("end", colected => {
              /* Si no dio click en ningun boton durante los 60s ...*/
              
              if(colected.size < 1) return m.edit({
                content: "**¡No confirmaste a tiempo!** <:enojado:882877729266098186>",
                components: []
              });
              
            });
            
          });
        }
  
        if (message.content === 'reven'){
  
          message.channel.send('𝐷𝑖𝑓𝑖́𝑐𝑖𝑙 𝑑𝑒𝑠𝑖𝑐𝑖𝑜́𝑛,𝑗𝑢𝑔𝑎𝑟 𝑐𝑜𝑛 𝑙𝑎 𝑝𝑒𝑙𝑜𝑡𝑎?\n𝑜 𝑐𝑜𝑛 𝑡𝑢 𝑐𝑜𝑟𝑎𝑧𝑜́𝑛 <a:sabroso:880695816497541180> ');
        }
        if (message.content === 'Reven'){
  
          message.channel.send('𝐷𝑖𝑓𝑖́𝑐𝑖𝑙 𝑑𝑒𝑠𝑖𝑐𝑖𝑜́𝑛,𝑗𝑢𝑔𝑎𝑟 𝑐𝑜𝑛 𝑙𝑎 𝑝𝑒𝑙𝑜𝑡𝑎?\n𝑜 𝑐𝑜𝑛 𝑡𝑢 𝑐𝑜𝑟𝑎𝑧𝑜́𝑛 <a:sabroso:880695816497541180> ');
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

        let ian = new RegExp(`^<@!?${'603344396351438889'}>( |)$`);
  
        if (message.content.match(ian))
        {
          if(bl.tiene(message.author.id)) return;
          message.channel.send(`<a:megaphone:912163796737486908> Alo? Tierra llamando al **argentino con más flow** <a:darkcrown2:886466286773739530>, Ian en camino bebé <a:bmirusboyrunfast:880411644893724672>`)
  
        }

        let ana = new RegExp(`^<@!?${'883633609498570762'}>( |)$`);
  
        if (message.content.match(ana))
        {
          if(bl.tiene(message.author.id)) return;
          message.channel.send(`<:emoji_233:890722279074451506> Días,tardes,noches,madrugadas <:mmsi:890721733991104583> porque Buena está la persona que me acaba de mencionar <a:Zuii:890684724673150996> <a:Ytodomedavuelta:890721775699259422>`)
  
        }

        let scarlett = new RegExp(`^<@!?${'754792358104793158'}>( |)$`);
  
        if (message.content.match(scarlett))
        {
          if(bl.tiene(message.author.id)) return;
          message.channel.send(`Que necesidad de etiquetar <:nojao:891551822387486721>`)
  
        }
  
        /*let princesa = new RegExp(`^<@!?${'748192032098353193'}>( |)$`);
  
        if (message.content.match(princesa))
        {
  
          message.channel.send(`<a:dc_fuegorosaa:889684389829681202> ¿Qué necesitas de La Princesa del server? <a:dc_fuegorosaa:889684389829681202>`)
  
        }*/
  
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

    if(!message.content.startsWith(process.env.PREFIX)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(bl.tiene(message.author.id)) return message.channel.send('Estás prohibido de usar estos comandos, contacta con el equipo de desarrolladores para más información.!');

    //<-- INSERT USUARIO -->

    let id = message.author.id
    //let i = message.author.displayAvatarURL({ dynamic: true }).replace('webp','png')
    let i = 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif'
    let f = 'No hay frase agregada'
    let sentencia = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ${id}`)

    /*db.get(sentencia, (err, filas) => {
      if (err) return console.error('Error 0: '+err.message)*/

    if (!sentencia){

      await client.db.run(`INSERT INTO usuarios (idusuario, nivel, exp, rep, frase, foto, dinero, banco, total) VALUES (?,?,?,?,?,?,?,?,?)`, id,'0','1','0',f,i,'0','0','0')
      
      //let insert = `INSERT INTO usuarios(idusuario, nivel, exp, rep, frase, foto) VALUES(${id}, 0, 1, 0, "${f}", "${i}")`

      /*db.run(insert, function(err) {
       if (err) return console.error('Error 1: '+insert+" ---- "+err.message)
      });*/

    } else {

      //<-- UPDATE EXPERIENCIA/NIVELES -->

      let curLevel = Math.floor(0.1 * Math.sqrt(sentencia.exp + 1));

      if(curLevel > sentencia.nivel) {

        await client.db.run(`UPDATE usuarios SET exp = ${sentencia.exp + 1}, nivel = ${curLevel}, banco = ${sentencia.banco+100}, total = ${sentencia.dinero+sentencia.banco+100} WHERE idusuario = ${id}`)

        //let update = `UPDATE usuarios SET exp = ${filas.exp + 1}, nivel = ${curLevel} WHERE idusuario = ${id}`;

         /*db.run(update, function(err) {      
          if (err) return console.error('Error 2: '+err.message)
        message.channel.send('Felicidades!!! Subiste de nivel, '+ message.author.tag)

         });*/

      }

      await client.db.run(`UPDATE usuarios SET exp = ${sentencia.exp + 1}, dinero = ${sentencia.dinero + 10}, total = ${sentencia.dinero+sentencia.banco+10} WHERE idusuario = ${id}`)

      //let update = `UPDATE usuarios SET exp = ${filas.exp + 1} WHERE idusuario = ${id}`;
      
      /*db.run(update, function(err) {      
      if (err) return console.error('Error 3: '+err.message)
      })*/

    }

    //BASE DE DATOS

    //<-- SELECT USUARIO -->

    if(command === "perfil"){

      let img = message.mentions.users.first()

      if(!img){

        let select = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ id + "'")

        //let select = `SELECT * FROM usuarios WHERE idusuario = ${id}`;

        let obtener = args[0]

        if(!obtener){
        
          /*db.get(select, (err, filas) => {

            if (err) return console.error(err.message)*/
          
          if (!select) return message.channel.send('No hay perfil registrado para ese usuario.')
     
            let embed = new Discord.MessageEmbed()
              .setAuthor('Perfil de ' + message.author.username, message.author.displayAvatarURL())
              .setThumbnail(select.foto ? select.foto : 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif')
              .addField('<a:start:880922179280207934> Nivel', '<a:flech:915156906258071554> '+select.nivel, true)
              .addField('<a:d_Fijao:897243194943737866> XP', '<a:flech:915156906258071554> '+select.exp, true)
              .addField('<a:CorazonMulticolor:880315280759345163> Carisma', '<a:flech:915156906258071554> '+select.rep, false)
              //.addField('<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>','<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>',false)
              .addField('<a:megaphone:912163796737486908> Frase', '<a:flech:915156906258071554> '+select.frase, true)
              .addField('<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>','<a:Dinero:880594188792635422> **Economía**',false)
              .addField(`**Total:**`, '<a:money:901702063908606004>  '+select.total, true)
              .setColor("RANDOM")
              .setFooter(`Midgard's VIP`,client.user.avatarURL())
            message.channel.send({ embeds: [embed] });
      
          
        } else {

          switch (obtener.slice(-2)){
            
            case '-i': {

              i = args[1] ? args[1]:'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif';
              console.log("Foto : "+ i)

              /*db.get(select, (err, filas) => {

                if (err) return console.error(err.message)*/
              if (!select) return message.channel.send('No hay perfil registrado para el usuario!')
              
              await client.db.run(`UPDATE usuarios SET foto = "${i}" WHERE idusuario = ${id}`)

              //let update = `UPDATE usuarios SET foto = "${i}" WHERE idusuario = ${id}`;
    
                /*db.run(update, function(err) {      
                  if (err) return console.error("Error actualizar "+update+" --- "+err.message)*/

              message.channel.send('<a:Dancing_Duck:894716883033538630> | Acabas de actualizar tu foto de perfil!');
     
              break
            }

            case '-f': {

              f = args.slice(1).join(' ');
              console.log("Frase : "+ f)

              /*db.get(select, (err, filas) => {

                if (err) return console.error(err.message)*/
              if (!select) return message.channel.send('No hay perfil registrado para el usuario!')
              
              await client.db.run(`UPDATE usuarios SET frase = "${f}" WHERE idusuario = ${id}`)

              //let update = `UPDATE usuarios SET frase = "${f}" WHERE idusuario = ${id}`;
    
                /*db.run(update, function(err) {      
                  if (err) return console.error("Error actualizar "+update+" --- "+err.message)*/

              message.channel.send('<a:Dancing_Duck:894716883033538630> | Acabas de actualizar tu frase de perfil!');

              break
            }

            default: {

              message.channel.send('<a:Verify2:880315278347616329> | Para actualizar Frase, agrega **-f** antes del texto. Para actualizar Foto, agrega **-i** antes del link');
              break;
            }
          }
        }
      

      } else{
        
        idm=img.id;
        let select = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ idm + "'")
        //let select = `SELECT * FROM usuarios WHERE idusuario = ${idm}`;
          
        /*db.get(select, (err, filas) => {

          if (err) return console.error(err.message)*/

        if (!select) return message.channel.send('No hay perfil registrado para ese usuario.')
 
        let embed = new Discord.MessageEmbed()
          .setAuthor('Perfil de ' + img.username, img.displayAvatarURL())
          .setThumbnail(select.foto ? select.foto : 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif')
          .addField('<a:start:880922179280207934> Nivel', '<a:flech:915156906258071554> '+select.nivel, true)
          .addField('<a:d_Fijao:897243194943737866> XP', '<a:flech:915156906258071554> '+select.exp, true)
          .addField('<a:CorazonMulticolor:880315280759345163> Carisma', '<a:flech:915156906258071554> '+select.rep, false)
            //.addField('<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>','<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>',false)
          .addField('<a:megaphone:912163796737486908> Frase', '<a:flech:915156906258071554> '+select.frase, true)
          .addField('<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>','<a:Dinero:880594188792635422> **Economía**',false)
          .addField(`**Total:**`, '<a:money:901702063908606004>  '+select.total, true)
          .setColor("RANDOM")
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
        message.channel.send({ embeds: [embed] });
  
      }

    }

    //<-- DELETE USUARIO -->

    if(command === "eliminar"){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      let miembro = message.mentions.users.first();
      if(!miembro) return message.channel.send('Debe mencionar a un usuario a eliminar.')

      let remover = await client.db.get(`DELETE FROM usuarios WHERE idusuario = ${miembro.id}`)

      //let remover = ``;

      /*db.run(remover, function(err) {
        if (err) return console.error(err.message)*/

      message.channel.send(miembro.username +', fue eliminado correctamente.');
 
    }

    //<-- SELECT LISTA TOP USUARIOS -->

    if(command === "top"){

      var server = message.guild;

      if(!args[0]){

        let lista = await client.db.all(`SELECT idusuario, total FROM usuarios ORDER BY total DESC LIMIT 10`)

        let embed = new Discord.MessageEmbed()

        let datos = [];

        let c = 1

        for(let ls of lista){

          let usuario = client.users.resolve(ls.idusuario)
          datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:901702063908606004> **'+ls.total+'**')
          c = c + 1
        }
 
        embed.setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true }))
        embed.setDescription(datos.join('\n\n'))   	
        embed.setColor("RANDOM")
        embed.setFooter(`MidgardBot`,client.user.avatarURL())
        message.channel.send({ embeds: [embed] });

      } else {

        if(args[0].toLowerCase() === 'xp'){

          let lista = await client.db.all(`SELECT idusuario, nivel, exp FROM usuarios ORDER BY exp DESC LIMIT 10`)

          //let lista = `SELECT idusuario, nivel, exp FROM usuarios ORDER BY exp DESC LIMIT 10`

          let embed = new Discord.MessageEmbed()
 
          /*db.all(lista, (err, filas) => {
          if (err) return console.error(err.message)*/

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flech:915156906258071554> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
            c = c + 1
          }

          /*lista.map(ls => {
          if(client.users.cache.get(ls.idusuario)){
            datos.push('__' + client.users.cache.get(ls.idusuario).tag + '__ <a:flech:915156906258071554> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
          }
          });*/
 
          embed.setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`Midgard's VIP`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        } else if(args[0].toLowerCase() === 'cash'){
        
          let lista = await client.db.all(`SELECT idusuario, dinero FROM usuarios ORDER BY dinero DESC LIMIT 10`)

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:901702063908606004> **'+ls.dinero+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        } 

      }

    }

    // COMANDOS DE ECONOMÍA

    //<-- COMANDO BALANCE -->

    if(command === 'bal' || command === 'balance'){

      let img = message.mentions.users.first()
      
      if(!img){

        let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ message.author.id + "'")

        if(!buscarUsuario){
        
          await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, message.author.id)
  
          buscarUsuario = {id: message.author.id, dinero: 0, banco: 0, total: 0}
  
          console.log('Balance de : '+message.author.id+' - '+buscarUsuario)
  
        }
  
        const e = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`Balance`)
          .addField(`**Dinero:**`, '<a:money:901702063908606004>  '+buscarUsuario.dinero, true)
          .addField(`**Banco:**`, '<a:money:901702063908606004>  '+buscarUsuario.banco, true)
          .addField(`**Total:**`, '<a:money:901702063908606004>  '+buscarUsuario.total, true)
          .setTimestamp(new Date())
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
  
        message.channel.send({embeds: [e]})
        console.log('Balance de : '+message.author.id+' - '+'dinero: '+buscarUsuario.dinero+', banco: '+buscarUsuario.banco+', total: '+buscarUsuario.total)
  
      } else {

        let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ img.id + "'")

        if(!buscarUsuario){
        
          await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, img.id)
  
          buscarUsuario = {id: img.id, dinero: 0, banco: 0, total: 0}
  
          console.log('Balance de : '+img.id+' - '+buscarUsuario)
  
        }
  
        const e = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(img.tag, img.displayAvatarURL({dynamic: true}))
          .setTitle(`Balance`)
          .addField(`**Dinero:**`, '<a:money:901702063908606004>  '+buscarUsuario.dinero, true)
          .addField(`**Banco:**`, '<a:money:901702063908606004>  '+buscarUsuario.banco, true)
          .addField(`**Total:**`, '<a:money:901702063908606004>  '+buscarUsuario.total, true)
          .setTimestamp(new Date())
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
  
        message.channel.send({embeds: [e]})
        console.log('Balance de : '+img.id+' - '+'dinero: '+buscarUsuario.dinero+', banco: '+buscarUsuario.banco+', total: '+buscarUsuario.total)
  
      }
    
    }

    //<-- COMANDO WORK -->

    var w = [
      'Gracias por ayudarme a programar, aquí tienes tu recompensa: <a:money:901702063908606004> ',
      'Felicidades por tu trabajo, te mereces esto: <a:money:901702063908606004> ',
      'Excelente trabajo crack, aquí tienes: <a:money:901702063908606004> ',
      'Por cuidar del server todo el día, te has ganado: <a:money:901702063908606004> ',
      'Gracias por usar mis comandos, aquí tienes buen terrícola: <a:money:901702063908606004> ',
      'Sin hacer nada, ya ganaste: <a:money:901702063908606004> '
    ]
    
    if(command === 'work' || command === 'w'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)
      
      let r = Math.floor(Math.random() * (200 - 10) + 10)
      
      let ramdonw = w[Math.floor(Math.random()*w.length)]

      if(buscarUsuario){

        if(buscarUsuario.work > Date.now()) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:922403546492702720> | Puedes volver a trabajar en : '+((buscarUsuario.work - Date.now())/1000)+' segundos')
          
          ]}
        )

        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, work=? WHERE idusuario=?`, r, r, (Date.now()+(1000*60)), message.author.id)

      } else {

        await client.db.run('INSERT INTO usuarios (idusuario, dinero, banco, total, work) VALUES (?, ?, ?, ?, ?)', message.author.id, r, 0, r, (Date.now()+(1000*60)))

      }

      const e = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('GREEN')
      .setDescription(ramdonw + r)

      message.channel.send({embeds: [e]})

    }

    if(command === 'rob'){

      let usuario = message.mentions.users.first()

      if(!usuario)return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | Necesitas mencionar a alguien!`)
      ]})

      if(usuario.id === message.author.id)return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No te puedes robar a ti mismo!`)
      ]})

      if(usuario.bot)return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No tienes el poder suficiente para robarle a los bots!`)
      ]})

      let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, message.author.id)
      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, usuario.id)

      if(!usuario1){

        await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, message.author.id)
        usuario1 = {idusuario: message.author.id, dinero: 0, banco: 0, total: 0}

      } else if(!usuario2){

        await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, usuario.id)
        usuario2 = {idusuario: usuario.id, dinero: 0, banco: 0, total: 0}
      }

      if(usuario2.dinero === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | ¿Cómo te atreves a robarle a los pobres?`)
      
      ]})

      let ganarob = usuario2.dinero === 0 ? 0 : Math.floor((10 * usuario2.dinero)/100)
      let pierderob = usuario1.dinero === 0 ? Math.floor((10 * 200) / 100) : Math.floor((10 * usuario1.dinero) / 100)
      let chance = Math.floor(Math.random()*10)

      if(chance < 3){
        
        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-? WHERE idusuario=?`, ganarob, ganarob, usuario.id)
        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, rob=? WHERE idusuario=?`, ganarob, ganarob, (Date.now()+(1000*60)), message.author.id)

        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(`<a:Verify1:880315279391985744> | Le has robado <a:money:901702063908606004> `+ ganarob + ' a ' + usuario.toString())
        .setTimestamp()
        message.channel.send({embeds: [e]})
    
      } else {

        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, rob=? WHERE idusuario=?`, pierderob, pierderob, (Date.now()+(1000*60)), message.author.id)

        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | Qué malo eres robando, acabas de ser capturado y perdiste <a:money:901702063908606004> `+ pierderob)
        .setTimestamp()
        message.channel.send({embeds: [e]})
    
      }

    }

    if(command === 'dep'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)

      if(!buscarUsuario){

        await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, message.author.id)
        buscarUsuario = {dinero: 0, banco: 0, total: 0}

      }

      if(!args[0]) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | Ingresa un monto a depositar!`)

      ]})

      else if(buscarUsuario.dinero === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No tienes dinero para depositar!`)

      ]})

      else if(buscarUsuario.dinero < parseInt(args[0])) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No tienes ese monto para depositar. Actualmente tienes <a:money:901702063908606004> `+ buscarUsuario.dinero)

      ]})

      if(args[0].toLowerCase() === 'all'){

        await client.db.run(`UPDATE usuarios SET dinero=0, banco=banco + ? WHERE idusuario=?`, buscarUsuario.dinero, message.author.id)
        
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:880315279391985744> | Has depositado <a:money:901702063908606004> `+ buscarUsuario.dinero+ ' al banco')
          .setTimestamp()
        
        message.channel.send({embeds: [e]})

      } else {

        if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:880315278347616329> | Ingresa un número válido a depositar!`)

          ]})

        let numero = parseInt(args[0])
  
        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, banco=banco+? WHERE idusuario=?`, numero, numero, message.author.id)
  
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:880315279391985744> | Has depositado <a:money:901702063908606004> `+ numero + ' al banco')
          .setTimestamp()
          
        message.channel.send({embeds: [e]})

      }

    }

    if(command === 'with'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)

      if(!buscarUsuario){

        await client.db.run(`INSERT INTO usuarios (idusuario) VALUES (?)`, message.author.id)
        buscarUsuario = {dinero: 0, banco: 0, total: 0}

      }

      if(!args[0]) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | Ingresa un monto para retirar!`)

      ]})

      else if(buscarUsuario.banco === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No tienes dinero para retirar!`)

      ]})

      else if(buscarUsuario.banco < parseInt(args[0])) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:880315278347616329> | No tienes ese monto para retirar. Actualmente tienes en tu banco <a:money:901702063908606004> `+ buscarUsuario.banco)

      ]})

      if(args[0].toLowerCase() === 'all'){

        await client.db.run(`UPDATE usuarios SET dinero=dinero + ?, banco=0 WHERE idusuario=?`, buscarUsuario.banco, message.author.id)
        
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:880315279391985744> | Has retirado <a:money:901702063908606004> `+ buscarUsuario.banco+ ' del banco')
          .setTimestamp()
        
        message.channel.send({embeds: [e]})

      } else {

        if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:880315278347616329> | Ingresa un número válido para retirar!`)

          ]})

        let numero = parseInt(args[0])
  
        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, banco=banco-? WHERE idusuario=?`, numero, numero, message.author.id)
  
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:880315279391985744> | Has retirado <a:money:901702063908606004> `+ numero + ' del banco')
          .setTimestamp()
          
        message.channel.send({embeds: [e]})

      }

    }

    if(command === 'daily'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)

      let numero = 1000

      if(message.member.roles.cache.find(r => r.id === '886772939549184052')){

        numero = numero + 1000

      } else {

        numero = numero + 0

      }

      if(!buscarUsuario){

        await client.db.run(`INSERT INTO usuarios (idusuario, daily, dinero, total) VALUES (?, ?, ?, ?)`, message.author.id, (Date.now() + (24 * (60 * (1000 * 60)))), numero, numero)
        
        buscarUsuario = {dinero: numero, banco: 0, total: numero, daily: (Date.now() + (24 * (60 * (1000 * 60))))}

      } else {

        if(buscarUsuario.daily > Date.now()) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:922403546492702720> | Ya has reclamado tu recompensa hoy! Recuerda que si apoyas al servidor votando en **Top.gg** podrás ganar el doble de coins. [Click aquí para votar](https://top.gg/servers/777620055344545842/vote)')
          
        ], components: [
            
          new MessageActionRow()
          .addComponents(

            new MessageButton()
        
            .setLabel('VOTAR') 
            .setStyle('LINK') 
            .setURL('https://top.gg/servers/777620055344545842/vote') 

          )

        ]})

        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, daily=? WHERE idusuario=?`, numero, numero, (Date.now() + (24 * (60 * (1000 * 60)))),message.author.id)

      }

      function reminder() {
    
        message.author.send('<a:exclama2:880930071731392512> | Tu último voto por el server **Midgard** fue hace 12 horas. ¡Ya puedes volver a votar para recibir recompensas! No te olvides de usar el comando `_daily` para canjear tus coins extras. https://top.gg/servers/777620055344545842/vote')

      }

      const server = message.guild

      const e = new Discord.MessageEmbed()
      .setAuthor(server.name, server.iconURL({ dynamic: true }))
      .setTitle('Recompensa Diaria 💵')
      .setColor('RANDOM')
      .setDescription(`Felicidades **${message.author.username}**! Has recibido <a:money:901702063908606004> **` + numero + `** como recompensa diaria.\n¡Muchas gracias por usar mis comandos!`)
      .setTimestamp()
      .setFooter(`MidgardBot`,client.user.avatarURL())
      
      message.channel.send({embeds: [e], components: [

        new MessageActionRow()
        .addComponents(

          new MessageButton()

          .setCustomId('primary')
					.setLabel('Recuérdame')
					.setStyle('PRIMARY')
          .setEmoji('⏰')

        )
      ]}).then(async m => {
      
        let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
       
        const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
        
        collector.on("collect", async int => {
          
          int.deferUpdate();
       
          if (int.customId === "primary") {
            
            var msDelay = 12*3600000
            await message.reply({ content: '<a:reloj:915171222961135646> | Acabas de establecer un recordatorio en 12 horas para votar nuevamente. No olvides de activar los mensajes directos!', ephemeral: true});
            setTimeout(reminder, msDelay);
  
          }
  
        });
  
        collector.on("end", colected => {
          
          if(colected.size < 1) return
          
        });
        
      })

    }

    // COMANDOS DE PROGRAMADO

    if(command === 'malta'){

        let id = ['753435606410985573']
  
        if(!id.some(id => message.author.id == id)) {
        
          const embed = new Discord.MessageEmbed()
          .setDescription('Solo el developer del bot puede usar este comando.')
          .setColor('RED')
          message.channel.send({ embeds: [embed] })
          .then(m => setTimeout(() => m.delete(), 5000));
  
        } else {
  
          var estadobot = message.content.split(' ').slice(1).join(' ')
  
          if(!estadobot){
  
            message.reply('Exactamente... ¿Qué quieres que ponga?').then(m => setTimeout(() => m.delete(), 5000));
  
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
        .addField('Libreria', 'Discord.js v13.3.0')
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
    
    const nivel = {
      NONE: 'Ninguno',
      TIER_1: '1',
      TIER_2: '2',
      TIER_3: '3',
    };

    if(command === 'server'){

    var server = message.guild;
    const roles = server.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const members = server.members.cache;
    const channels = server.channels.cache;
    const emojis = server.emojis.cache;
  
    const embed = new Discord.MessageEmbed()
    .setThumbnail(server.iconURL({ dynamic: true }))
    .setAuthor(server.name, client.user.avatarURL())
    .addField('ID:', server.id, false)
    .addField('Dueño:', `${(await server.fetchOwner()).user.tag} (${(await server.fetchOwner()).id})` , true)
    //.addField('Creado el:', server.createdAt, false)
    .addField('Creado el:', moment(server.createdTimestamp).format('LL') + ' a las '+moment(server.createdTimestamp).format('LT') + ' [' + moment(server.createdTimestamp).fromNow()+' ]', false)
    
    .addField('Miembros:', '<a:flech:915156906258071554> '+server.memberCount, true)
    .addField('Region:', '<a:flech:915156906258071554> '+regions[server.region], false)
    .addField('Nivel:', '<a:flech:915156906258071554> '+nivel[server.premiumTier], true)
    //.addField('Nivel:', server.mfaLevel, false)
    .addField('Mejoras:', '<a:flech:915156906258071554> '+server.premiumSubscriptionCount || '0', false)

    .addField('Roles:', '<a:flech:915156906258071554> '+roles.length , true)
    .addField('Emojis:', '<a:flech:915156906258071554> '+emojis.size , false)
    .addField('Verificación:', '<a:flech:915156906258071554>' +vl[server.verificationLevel] , false)

    .addField('Canales de Texto:', '<a:flech:915156906258071554> '+channels.filter(channel => channel.type === 'GUILD_TEXT').size , true)
    .addField('Canales de Voz:', '<a:flech:915156906258071554> '+channels.filter(channel => channel.type === 'GUILD_VOICE').size , true)
    .setImage(server.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png'))
    .setColor('RANDOM')
    
    .setTimestamp(new Date())
    .setFooter(message.author.username+'#'+message.author.discriminator, `${message.author.displayAvatarURL({ dynamic: true }).replace('webp','png')}`);
        
   message.channel.send({ embeds: [embed] });

    }

    let prohibidos = ['ID1', 'ID2'];

    const embedercancel = new Discord.MessageEmbed()
    .setDescription('Reporte cancelado. <:aisaMexicana:880315292381773856>')
    .setColor('RANDOM')

    const embedescancel = new Discord.MessageEmbed()
    .setDescription('Sugerencia cancelada. <:aisaMexicana:880315292381773856>')
    .setColor('RANDOM')

    const embednoconf = new Discord.MessageEmbed()
    .setDescription('¡No confirmaste a tiempo! <:enojado:882877729266098186>')
    .setColor('RANDOM')

    if(command === 'report'){

    if(prohibidos.includes(message.author.id)) return message.channel.send('¡Tienes prohibido usar este comando por mal usarlo!');

    let reporte = args.join(' ');
    if(!reporte) return message.channel.send('❎ **Debes agregar un reporte para enviar al desarrollador!**')

    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874891049120714752')

    let usera = message.author;

    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
    .setTitle('<a:alerta:915361125510545438> | Reporte')
    .setDescription(`**${usera.username}** ¿Estás segur@ que quieres reportar este bug? ¡Usar mal el comando causará la prohibición!`)
    .addField('Bug a reportar:', reporte)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(`Developer Team - Midgard Club`, `${message.author.displayAvatarURL()}`);
    setTimeout(() => message.delete(), 100);
    message.channel.send({ embeds: [embed] }).then(m => {

      m.react('✅').then(() => m.react('❎'));
     
      const filter = (reaction, user) => {
        return ['✅', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions({filter, max: 1, time: 60000, errors: ['time']}).catch(() => {

        m.edit({ embeds: [embednoconf]})
        m.reactions.removeAll()

      }).then(collected=> {

        const reaccion = collected.first();

        if(reaccion.emoji.name === '✅') {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .setDescription('Reporte confirmado con éxito! <a:clap:881331231021756437>')
          .addField('Bug reportado:', '<a:flech:915156906258071554> '+reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit({ embeds: [bugco]})
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://assets.sutori.com/user-uploads/image/bc331db1-aa9d-4684-b73e-8a1fcb7d751b/aa64184f325ce5cc6abe613d51383870.gif`)
          .setTitle('📧 | Reporte')
          .setColor('RANDOM')
          .addField('Ha llegado el siguiente reporte:', '<a:flech:915156906258071554> '+reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send({ embeds: [bugre]})
        } else if(reaccion.emoji.name === '❎') {

          m.edit({embeds : [embedercancel]})
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
    setTimeout(() => message.delete(), 100);
    message.channel.send({ embeds: [embed] }).then(m => {

      m.react('✅').then(() => m.react('❎'));
      
      const filter = (reaction, user) => {
        return ['✅', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      m.awaitReactions({filter, max: 1, time: 60000, errors: ['time']}).catch(() => {

        m.edit({ embeds: [embednoconf]})
        m.reactions.removeAll()

      }).then(collected=> {

        const reaccion = collected.first();

        if(reaccion.emoji.name === '✅') {

          let bugco = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor('RANDOM')
          .setDescription('Sugerencia realizada con éxito! <a:clap:881331231021756437>')
          .addField('Sugerencia:', '<a:flech:915156906258071554> '+reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          m.edit({ embeds: [bugco]})
          m.reactions.removeAll()

          let bugre = new Discord.MessageEmbed()
          .setThumbnail(`https://media.giphy.com/media/Jzw7qUU2ZMw7DYpQV8/giphy.gif`)
          .setTitle('<a:corazonBlack_FD:880526799736557679> | Sugerencia')
          .setColor('RANDOM')
          .addField('Ha llegado la siguiente sugerencia:', '<a:flech:915156906258071554> '+reporte)
          .setTimestamp(new Date())
          .setFooter(`Por: ${usera.id}`, `${message.author.displayAvatarURL()}`);
    
          channel.send({ embeds: [bugre]})
        } else if(reaccion.emoji.name === '❎') {

          m.edit({embeds : [embedescancel]})
          m.reactions.removeAll()

        }
        })
        })
    }

    if(command === 'vote'){

      const embed = new Discord.MessageEmbed()
      .setAuthor(`Midgard's Staff`,client.user.avatarURL())
      .setThumbnail('https://logos-marcas.com/wp-content/uploads/2020/12/Discord-Logo.png')
      .setTitle('Vota por Nuestro Servidor <a:elmo_timido:894721783066918953>')
      .setDescription(`Estaremos eternamente agradecidos que votes por Midgard! <:abby:880300168514252811>`)
      .addField('Top.gg','[Click aquí para votar](https://top.gg/servers/777620055344545842/vote)\n\n',false)
      //.addField('\u200B','<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>')
      .addField('Recompensas por tu voto <a:CorazonMulticolor:880315280759345163>','Recibirás un Rol muy especial que te diferenciará de los demás:\n\n <a:dc_zFlecha3:880315279903703060> <@&886772939549184052> \n\nAdemás, este rol te dará una cierta cantidad de coins de nuestro casino cada cierto tiempo... \n\nDescúbrelo!!! <:tierno:881618338759966800>',true)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`🌎┃「Midgard」• Muchas gracias por tu voto!`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      
      const row = new MessageActionRow()
      .addComponents(

        new MessageButton()
        
        .setLabel('VOTAR') //Lo que quieran que aparezca en el boton
        //.setEmoji('?') //Puede ser cualquier emoji, si le han puesto el label aparecera al lado izquierdo del texto, si no le pusieron el label aparecera en medio del boton
        .setStyle('LINK') //Ponemos el estilo del botón, los estilos los puedes encontra
        .setURL('https://top.gg/servers/777620055344545842/vote') 

      );
      // message.channel.send({embeds : [embed], components : [{ 'type': 2, 'components': [row] }]});
      message.channel.send({embeds : [embed], components: [row] });
      // message.channel.send({ content: 'Pong!', components: [ { components : [row], type: 1}] })
    }

    //COMANDOS DE UTILIDAD

    if(command === 'user'){

        let userm = message.mentions.users.first()

        if(!userm){
            
            var user = message.author;
          
            const embed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', client.user.avatarURL())
            //.addField('Jugando a', user.presence.game != null ? user.presence.game.name : 'Nada', true)
            //.addField('Estado:', user.presence.status, true)
            .addField('Color:', message.member.displayHexColor, true)
            .addField('Usuario:', user.username+'#'+user.discriminator, true)
            .addField('Apodo:', message.member.nickname ? message.member.nickname : 'No tiene', true)
            .addField('ID:', user.id, true)
    
            .addField('Cuenta Creada', user.createdAt.toLocaleDateString()+', '+user.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true)
            .addField('Roles', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(0x66b3ff)
    
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
           message.channel.send({ embeds: [embed] });

        } else{

            const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.displayAvatarURL({ dynamic: true }).replace('webp','png'))
            .setAuthor('Información del Usuario', client.user.avatarURL())
            //.addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : 'Nada', true)
            //.addField('Estado:', userm.presence.status, true)
            .addField('Color:', userm.hexAccentColor ? userm.hexAccentColor : 'No tiene', true)
            .addField('Usuario:', userm.username+'#'+userm.discriminator, true)
            .addField('Apodo:', userm.nickname ? userm.nickname : 'No tiene', true)
            .addField('ID:', userm.id, true)
    
            .addField('Cuenta Creada', userm.createdAt.toLocaleDateString()+', '+userm.createdAt.toLocaleTimeString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toLocaleDateString()+', '+message.member.joinedAt.toLocaleTimeString(), true )
            .addField('Roles', message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
            .setColor('RANDOM')
    
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             
            message.channel.send({ embeds: [embed] });
        }
        
    }

    if(command === 'avatar'){

        let img = message.mentions.users.first()
        if (!img) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${message.author.username}#${message.author.discriminator}`,client.user.avatarURL())
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
            .setAuthor(`Avatar de ${img.username}#${img.discriminator}`,client.user.avatarURL())
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
            //.setAuthor('Midgarddd', https://images-ext-2.discordapp.net/external/18X-qDE3JIOunpBItNM1A9YQsvqOq3-EkOwvsNgn76k/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/904290001196556369/e7854088a43de999fb373b4599c5a6d3.png')
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
            //.setAuthor(`Midgard`,client.user.avatarURL())
            .setTitle(`Bienvenid@ <:cosita:880300168514252811> **${img.username}** <a:pepedance:880928616416968745>`)
            .setDescription(`<a:exclama2:880930071731392512> Gracias por unirte!!! <a:sc_ositobailin:880930467774365707> Espero que lo disfrutes. <a:abdul_dance:880930576683630662>`)
            .setImage(ramdonwelcome)
            .setColor(10773200)
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        }
    
    }

    if(command === 'remindme' || command === 'rm'){

        let obtener = args[0]
        let mensaje = args[1]
    
        if (!obtener) {
          
          message.channel.send('Debes agregar un tiempo: `_remindme tiempo mensaje`')
    
        } else if(!mensaje) {
    
          message.channel.send('Debes agregar un recordatorio: `_remindme tiempo mensaje`')
    
        } else {
    
          function reminder() {
    
            message.reply('<a:exclama2:880930071731392512> | Tengo este recordatorio para ti: ' + mensaje)
    
          }
    
          switch (obtener.slice(-1)){
    
            case 's': {
    
              if (obtener.slice(0, -1) > 60) return message.channel.send('No puede ser mayor de 60 segundos')
    
              var msDelay = obtener.slice(0, -1)*1000
              message.channel.send('<a:reloj:915171222961135646> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' segundos:\n<a:flech:915156906258071554> '+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            case 'm': {
    
              if (obtener.slice(0, -1) > 60) return message.channel.send('No puede ser mayor de 60 minutos')
    
              var msDelay = obtener.slice(0, -1)*60000
              message.channel.send('<a:reloj:915171222961135646> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' minutos:\n<a:flech:915156906258071554> '+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            case 'h': {
    
              if (obtener.slice(0, -1) > 24) return message.channel.send('No puede ser mayor de 24 horas')
    
              var msDelay = obtener.slice(0, -1)*3600000
              message.channel.send('<a:reloj:915171222961135646> | Acabas de establecer un recordatorio en ' + obtener.slice(0, -1) + ' horas:\n<a:flech:915156906258071554> '+mensaje);
              setTimeout(reminder, msDelay);
              break
            }
    
            default: {
    
              message.channel.send('Lo estás haciendo mal, es:\n<1 - 60>s <recordatorio>\n<1 - 60>m <recordatorio>\n<1 -  24>h <recordatorio>\n ____Ejemplo:____\n```1m Recordar ir a sacar un perro```');
              break;
            }
          }
      
        };
    
      }
    
      if(command === 'snipe')
      {

        const conf = message.guild.channels.cache.find(ch => ch.id === '881432157602611230');

        const channel = message.mentions.channels.first() || message.channel;

        if(channel===conf)
        {
          return message.channel.send("Así te quería atrapar puerco! <:yojoo:880315297846947860> No puedes hacer eso aquí <:burbuja:877115812362747904>")
          .then(m => setTimeout(() => m.delete(), 10000));
        } else
        {
          
        const msg = client.snipes.get(channel.id);
    
        if (!msg)
        {
          message.channel.send('No se ha borrado recientemente ningun mensaje!')
              .then(m => setTimeout(() => m.delete(), 5000));
        
        } else {
    
          imgdelete.setColor('RANDOM')
          .setAuthor(`${msg.delete.tag}`, msg.delete.displayAvatarURL())
          .setTimestamp(new Date())
          .setDescription(`${msg.content}`)
          message.channel.send({embeds: [imgdelete]});
    
        }
      }
    }

    if(command === 'jumbo'){

        if(!args[0]) return message.reply('Uso incorrecto del comando\nDebe ser: _jumbo <emoji> \n*Si quieres añadirlo al servidor añade --s al final*') // Si no usa args[0]
        
        const emoticon = require('discord.js').Util.parseEmoji(args[0]) // Usaremos el metodo que nos da discord.js para obtener info del emoji
          
        if(emoticon.id == null) return message.reply('Emoji invalido') // Si no es un emoji personalizado o no lo encuentra la id seria null para evitar problemas devolvera
        
        let palta = `https://cdn.discordapp.com/emojis/` + `${emoticon.id}.` + (emoticon.animated ? 'gif' : 'png') // Conseguimos el url 
          
        if(message.content.endsWith('--s')) { // Si termina con --s
        
          if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply('No tienes permisos para ejecutar esto') // Si no tiene permisos el usuario
        
          if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply('No tengo los permisos para ejecutar esto') // Si el bot no tiene permisos
          message.guild.emojis.create(palta, emoticon.name) // Creamos un emoji con la imagen del emoji 
          return message.channel.send('Emoji agregado: ' + emoticon.name) // Mensaje de confirmacioon 
          } // Cerramos condicion
          message.channel.send(palta) // Enviamos el url del emoticon
          /*const embed = new Discord.MessageEmbed()
          .setImage(palta)
          message.channel.send({ embeds: [embed] });*/
    }

    if(command === 'conteo'){

        if(!args[0]) return message.channel.send('Pon una cantidad para hacer una cuenta regresiva.').then(m => setTimeout(() => m.delete(), 5000));
    
        if(isNaN(args[0])) return  message.channel.send(`**Pon una cantidad, solo puedo contar numeros.**`).then(m => setTimeout(() => m.delete(), 5000));
    
        let time = parseInt(args[0])
    
        if(time > 7200) return  message.channel.send(`**No puedo contar más de 2 horas**`).then(m => setTimeout(() => m.delete(), 5000));
    
       
          let msg = await message.channel.send(String(time))
    
          if(time < 60) {
    
            let count1 = setInterval(async () => {
    
              await msg.edit(time <= 0 ? `${message.author}... Se acabó el tiempo ⌛` : String(time))
              // message.channel.send(`${message.author} La cuenta regresiva ha terminado!`)
              time <= 0 ? clearInterval(count1) : time -= 2
    
            }, 2000)
    

          } else {
    
            let count2 = setInterval(async () => {
    
              await msg.edit(time <= 0  ? `... Se acabó el tiempo ⌛` : String(time))
              time <= 0 ? clearInterval(count2) : time -= 3
    
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

    if (!split[2]) return message.reply('<a:alerta:915361125510545438> `|` Uso: `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]... `');

    if (split[3]) embed.addField('<a:tres:854651172525834270> **' + split[3] + '**', '..........');
    if (split[4]) embed.addField('<a:cuatro:854651171465854976> **' + split[4] + '**', '..........');
    if (split[5]) embed.addField('<a:cinco:854651171850158123> **' + split[5] + '**', '..........');
    if (split[6]) embed.addField('<a:seis:854651172597268480> **' + split[6] + '**', '..........');
    if (split[7]) embed.addField('<a:siete:854651171066740736> **' + split[7] + '**', '..........');
    if (split[8]) embed.addField('<a:ocho:854651172512989194> **' + split[8] + '**', '..........');
    if (split[9]) embed.addField('<a:nueve:854651170638790676> **' + split[9] + '**', '..........');

    if (split[10]) return message.reply('<a:alerta:915361125510545438> `|` Demasiadas opciones');

    setTimeout(() => message.delete(), 100);

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

      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply('No puedes usar este comando si no eres mod/admin.');

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

    /*if(command === 'tts'){

      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      })
      // const voiceChannel = message.member.voice.channel;
      const decir = args.join(' ')

      if(!connection) return message.channel.send('**<a:No:769884924995829800> | Entra a un canal de voz y vuelve a intentarlo.**')
      if(!decir) return message.channel.send('**<a:No:769884924995829800> | ¿Que quieres que diga?**')
    
      
        const stream = discordTTS.getVoiceStream(decir); // Hacemos una const para conectar con discord-tts y dentro ponemos >decir>(los argumentos que se escucharan) 

        const dispatcher = player.play(stream);// Hacemos la conexion y lo reproducimos
        dispatcher.on("finish",()=>connection.leave())// Cuando finalize el tts el bot saldra automaticamente del canal
      

    }*/

    //COMANDOS DE MODERACIÓN

    const boolean = {
      true: 'Si',
      false: 'No',
    };

    if(command === 'role'){
        
        if(!args) return message.channel.send('¡Ingrese nombre del rol!');
    
        let role = message.guild.roles.cache.find(n => n.name === args.join(' '));
    
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
        const embed = new Discord.MessageEmbed()
        
          .setAuthor(`Solicitado por: ${message.author.username}`,`${message.author.displayAvatarURL()}`)
          .setDescription('Información sobre el rol mencionado.')
          .addField('Nombre:', `<a:flech:915156906258071554> ${role.name}`) 
          .addField('ID:', `<a:flech:915156906258071554> ${role.id}`) 
          .addField('Miembros con el Rol:', `<a:flech:915156906258071554> ${role.members.size}`)
          .addField('Posición:', `<a:flech:915156906258071554> ${role.rawPosition}`) 
          .addField('HexColor:', `<a:flech:915156906258071554> ${role.hexColor}`)  
          .addField('¿Mencionable?:', `<a:flech:915156906258071554> `+boolean[role.mentionable])
          .addField('¿Separado?:', `<a:flech:915156906258071554> `+boolean[role.hoist])
          .addField('¿Gestionado por el sistema?:', `<a:flech:915156906258071554> `+boolean[role.managed]) 
            
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
          .addField('Nombre:', `<a:flech:915156906258071554> ${role.name}`) 
          .addField('ID:', `<a:flech:915156906258071554> ${role.id}`) 
          .addField('Miembros con el Rol:', `<a:flech:915156906258071554> ${role.members.size}`)
          .addField('Posición:', `<a:flech:915156906258071554> ${role.rawPosition}`) 
          .addField('HexColor:', `<a:flech:915156906258071554> ${role.hexColor}`)  
          .addField('¿Mencionable?:', `<a:flech:915156906258071554> `+boolean[role.mentionable])
          .addField('¿Separado?:', `<a:flech:915156906258071554> `+boolean[role.hoist])
          .addField('¿Gestionado por el sistema?:', `<a:flech:915156906258071554> `+boolean[role.managed]) 
            
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
        let perms = message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES_OR_PERMISSIONS);
    
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
        let perms = message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES_OR_PERMISSIONS);
    
        if(!perms) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `_removerol @miembro [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.removeRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido  correctamente.`);
    
    }

    if(command === 'lock'){

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    
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
            .then(m => setTimeout(() => m.delete(), 5000));
    
        } else if(ch){
    
          ch.updateOverwrite(everyrole, {
            SEND_MESSAGES: false
          });
    
          message.channel.send(`🔒 El canal <#${ch.id}> fue bloqueado`)
            .then(m => setTimeout(() => m.delete(), 5000));
    
        } else{
    
          message.channel.updateOverwrite(everyrole, {
            SEND_MESSAGES: false
          });
    
          message.channel.send('🔒 Este canal fue bloqueado')
            .then(m => setTimeout(() => m.delete(), 5000));
        }
    
    }
    
    if(command === 'unlock'){
    
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    
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
            .then(m => setTimeout(() => m.delete(), 5000));
    
        } else if(ch){
    
          ch.updateOverwrite(everyrole, {
            SEND_MESSAGES: true
          });
    
          message.channel.send(`🔓 El canal <#${ch.id}> fue desbloqueado`)
            .then(m => setTimeout(() => m.delete(), 5000));
    
        } else{
    
          message.channel.updateOverwrite(everyrole, {
            SEND_MESSAGES: true
          });
    
          message.channel.send('🔓 Este canal fue desbloqueado')
            .then(m => setTimeout(() => m.delete(), 5000));
        }
    
    }

    if(command === 'clear'){

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
        {
          message.channel.send('No Tienes Permisos Para Utilizar Este Comando');
        }else {
    
            setTimeout(() => message.delete(), 100);
            if (!args[0])
    
                return message.channel.send(`Por Favor, especifica una cantidad`)
                .then(m => setTimeout(() => m.delete(), 5000));
    
            if (isNaN(args[0]))
    
                return message.channel.send(`Por favor, ingresa un número`)
                .then(m => setTimeout(() => m.delete(), 5000));
    
            if (args[0] > 100)
                return message.channel.send(`No puedo eliminar más de 100 mensajes`)
                .then(m => setTimeout(() => m.delete(), 5000));
          
            message.channel.bulkDelete(args[0]).then(Message => {
    
            message.channel.send('```'+ args[0] +' mensajes han sido borrados.'+'```')
            .then(msg => msg.delete({ timeout: 2000 }));

            });
        }
    
    }

    if(command === 'kick' ){

        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
        let permiso = message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
                
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.channel.send('Escriba una razón, `_kick @username [razón]`');
        if (!message.guild.member(user).kickable) return message.reply('No puedo kickear al usuario mencionado.');
         
        message.guild.member(user).kick(razon);
        message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
    }
    
    if(command === 'ban'){
        
        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ') ? args.slice(1).join(' ') : "Razon sin especificar";
        let permiso = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
    
        if (message.mentions.users.size < 1) {

          let idm = args.join(" ")
          if(!idm) return message.reply('Debe mencionar a alguien o colocar su id').catch(console.error);

          let id = await client.users.fetch(idm)

          if (!message.guild.members.resolve(id.id)){

            if (message.member.roles.highest.comparePositionTo(id.roles.highest) <= 0) {
              return message.channel.send('No puedes banear a un usuario con mayor o igual rango que tú.')
            }
            if (!id.bannable) {
              return message.channel.send('No puedo banear a este usuario')
            }

          }

          message.channel.send({
          content: message.author.toString() + " Estás seguro de banear a " + id.toString() + "?",
          components: [
            /* Botones para aceptar y rechazar el juego */
            new MessageActionRow().addComponents([
              new MessageButton()
                .setCustomId("accept")
                .setLabel("SI")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("deny")
                .setLabel("NO")
                .setStyle("DANGER")
            ])
          ]
          }).then(async m => {
        
          /* Creamos un collector de componentes para detectar lainteracción con los botones */
          
          let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
         
          const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 /* Tiempo para que el miembro interatue con los botones */ });
          
          
          collector.on("collect", async int => {
            
            /* Cuando el miembro mencionado de click en un boton */
            
            int.deferUpdate();
            
            /* Si dio click en el boton aceptar ... */
            
            if (int.customId === "accept") {
              
              /* Creamos una nueva partida con los jugadores y lo guardamos en una constante llamada "game", el id es para detectar si ya esta en una partida */
              message.guild.members.ban(id.id, { reason: 'razon' });
              m.edit({
                content: `**${id.username}**, fue baneado del servidor, razón: ${razon}.`,
                components: []
              });
    
              
            } else if (int.customId === "deny") {
              
              /* Si el juego fue rechazado ... */
              
              // Editamos el mensaje y quitamos los botones.
              m.edit({
                content: "Baneo cancelado...",
                components: []
              });
            
            }
          });
    
          collector.on("end", colected => {
            /* Si no dio click en ningun boton durante los 60s ...*/
            
            if(colected.size < 1) return m.edit({
              content: "**Tardaste mucho en responder!.**",
              components: []
            });
            
          });
          
          });

        } else {
       
          if (!message.guild.members.resolve(user.id)){

            if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
              return message.channel.send('No puedes banear a un usuario con mayor o igual rango que tú.')
            }
            if (!user.bannable) {
              return message.channel.send('No puedo banear a este usuario')
            }

          }

          message.channel.send({
          content: message.author.toString() + " Estás seguro de banear a " + user.toString() + "?",
          components: [
            /* Botones para aceptar y rechazar el juego */
            new MessageActionRow().addComponents([
              new MessageButton()
                .setCustomId("accept")
                .setLabel("SI")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("deny")
                .setLabel("NO")
                .setStyle("DANGER")
            ])
          ]
          }).then(async m => {
        
          /* Creamos un collector de componentes para detectar lainteracción con los botones */
          
          let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
         
          const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 /* Tiempo para que el miembro interatue con los botones */ });
          
          
          collector.on("collect", async int => {
            
            /* Cuando el miembro mencionado de click en un boton */
            
            int.deferUpdate();
            
            /* Si dio click en el boton aceptar ... */
            
            if (int.customId === "accept") {
              
              /* Creamos una nueva partida con los jugadores y lo guardamos en una constante llamada "game", el id es para detectar si ya esta en una partida */
              message.guild.members.ban(user.id, { reason: 'razon' });
              m.edit({
                content: `**${user.username}**, fue baneado del servidor, razón: ${razon}.`,
                components: []
              });
    
              
            } else if (int.customId === "deny") {
              
              /* Si el juego fue rechazado ... */
              
              // Editamos el mensaje y quitamos los botones.
              m.edit({
                content: "Baneo cancelado...",
                components: []
              });
            
            }
          });
    
          collector.on("end", colected => {
            /* Si no dio click en ningun boton durante los 60s ...*/
            
            if(colected.size < 1) return m.edit({
              content: "**Tardaste mucho en responder!.**",
              components: []
            });
            
          });
          
          });
        }
    }

    //COMANDOS DE DIVERSIÓN

    if(command === 'say'){

        let texto = args.join(' ');
    
        if(!texto) return message.channel.send(`Escriba un contenido para decir.`);
        message.channel.send(texto);
        setTimeout(() => message.delete(), 100);
        
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
        .setAuthor(`Midgard's Fun`,client.user.avatarURL())
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
        
        /*let random = [
          "No era el impostor",
          "Era el impostor"
        ]*/
        let impost = [
          '715007589464801411',
          '544585916115714057',
          '580032343117660160',
          '904598921240772609',
          '373994470078808064',
          '888857460599848990',
          '270418848979615754',
          '776817746041241650',
          '412347553141751808',
          '626771394063237138'
        ]

        if(!mencionado){

          if(!args[0]){

            if (!impost.some(id => message.author.id == id))
            {
    
              return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${message.author.username} No eres el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
            } else {
    
              return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${message.author.username} Sí eras el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)

            }

          } else {

            let mid = await client.users.fetch(args[0])

            if (!impost.some(id => mid.id == id))
            {
    
              return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mid.username} No era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
            } else {
    
              return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mid.username} Sí era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
            }
          }
          
        } else{
    
          if (!impost.some(id => mencionado.id == id))
          {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mencionado.user.username} No es el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length-1} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
          } else {
    
            return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　ﾟ　。  ${mencionado.user.username} Sí era el impostor  •　 。　.
    
    　　'　　ﾟ   •   　 ${impost.length-1} Impostores restantes 　 　　。  .
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`)
    
          }
    
        }
    }
    
    /*if(command === 'buscaminas'){
    
    
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
    
                    j++; //Si la casilla esta la izquierda del todo, se le aumenta 
    
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
    }*/

    if(command === 'ship'){

        let users =  message.mentions.users.first();
    
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

        if (!users) {
          
          const rand = message.guild.members.cache.random();

          let resp = [`El porcetanje de ${message.author.username} & ${rand.user.username} es: `,`Oh vaya, calculo que el amor de ${message.author.username} & ${rand.user.username} es un: `,`${message.author.username} & ${rand.user.username} tienen un: `]

          let msg = resp[Math.floor(Math.random() * resp.length)] 

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`${msg}`)
          .setDescription(`${heard} ${random} % ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })

        }
    
        else {

          let resp = [`El porcetanje de ${message.author.username} & ${users.username} es: `,`Oh vaya, calculo que el amor de ${message.author.username} & ${users.username} es un: `,`${message.author.username} & ${users.username} tienen un: `]
    
          let msg = resp[Math.floor(Math.random() * resp.length)] 
          
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`${msg}`)
          .setDescription(`${heard} ${random} % ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })

        }
        
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
                .setAuthor(`Midgard's Fun`,client.user.avatarURL())
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

    if(command === 'ttt')
    {

      if (tresenraya.partidas.map(x => x).some(x => message.author.id) && args[0] ?.toLowerCase() !== "stop") return message.reply("Ya estás en una partida!").then(m => {
        setTimeout(() => m.delete(), 10000)
      });

      let member = message.guild.members.resolve(message.mentions.members.first() || client.users.cache.get(args[0]));

      /* Verificamos los argumentos */
    
      if (!member) return message.reply("Para jugar debes mencionar a alguien.") //Si el no mencionó a alguien retornamos 
    
      if (member.id === message.author.id) return message.reply("Según las reglas del juego no puedes competir contigo mismo U.U"); //Si se mencionó el mismo retornamos.
    
      if (member.user.bot) return message.reply("No puedes competir contra un bot") //Si el mencionado es un bot retornamos.

      message.channel.send({
        content: member.toString() + " Acepta jugar **Tres en raya** contra " + message.author.toString() + "?",
        components: [
          /* Botones para aceptar y rechazar el juego */
          new MessageActionRow().addComponents([
            new MessageButton()
              .setCustomId("accept")
              .setLabel("SI")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("deny")
              .setLabel("NO")
              .setStyle("DANGER")
          ])
        ]
      }).then(async m => {
      
        /* Creamos un collector de componentes para detectar lainteracción con los botones */
        
        let filter = int => int.isButton() && int.user.id == member.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
       
        const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 /* Tiempo para que el miembro interatue con los botones */ });
        
        
        collector.on("collect", async int => {
          
          /* Cuando el miembro mencionado de click en un boton */
          
          int.deferUpdate();
          
          /* Si dio click en el boton aceptar ... */
          
          if (int.customId === "accept") {
            
            /* Creamos una nueva partida con los jugadores y lo guardamos en una constante llamada "game", el id es para detectar si ya esta en una partida */
            
            const game = new tresenraya.partida({
              jugadores: [message.author.id, member.id],
              id: message.author.id
            });
            
            //Enviamos un mensaje cuando empieze el juego y lo guardamos en una variable.
            
            let msg = await m.edit({
              content: "**TicTacToe** - Turno de " + client.users.cache.get(game.turno.jugador).username + "[" + game.turno.ficha + "]",
              components: []
            });
            
            jugarTicTacToe(game, msg); //Iniciamos el juego con la función que vamos a crear mas adelante, le daremos la variable game del juego y la variable msg del mensaje.
            
            if (game.finalizado) return collector.stop(); //Si la partida ya finalizo detenemos el collector, creo que no es necesario pero lo hago por seguridad xd
            
            
          } else if (int.customId === "deny") {
            
            /* Si el juego fue rechazado ... */
            
            // Editamos el mensaje y quitamos los botones.
            m.edit({
              content: "El juego ha sido rechazado...",
              components: []
            });
          
          }
        });
  
        collector.on("end", colected => {
          /* Si no dio click en ningun boton durante los 60s ...*/
          
          if(colected.size < 1) return m.edit({
            content: "**El jugador tardó en responder la solicitud. Juego terminado.**",
            components: []
          });
          
        });
        
      });
      
      /* Ahora se viene lo mejor */
      
      /* Vamos a crear un Objeto, este objeto es muy importante, este será el tablero que se representara con botones de esta manera: 
      
      [ a1 ] [ a2 ] [ a3 ]
      [ b1 ] [ b2 ] [ b3 ]
      [ c1 ] [ c2 ] [ c3 ]
      
      Por defecto todos tendran el emoji ➖, el color Secundario y la posición, por ejemplo a1 es la posición 1, c3 es la posición 9.
    */
  
  
      let btns_skelet = {
        a1: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 1
        },
        a2: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 2
        },
        a3: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 3
        },
        b1: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 4
        },
        b2: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 5
        },
        b3: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 6
        },
        c1: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 7
        },
        c2: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 8
        },
        c3: {
          style: "SECONDARY",
          label: "➖",
          disabled: false,
          number: 9
        }
      }
      
      /* Perfecto */
      /* Ahora crearemos la función del juego, esta sera llamada  "jugarTicTacToe" y requerira de 2 parametros, el juego y el mensaje (que ya se lo dimos en la linea 76).*/
  
      async function jugarTicTacToe(game, msg) {
        
        /* Crearemos los botones a partir del esqueleto que hicimos ahora */
        
        let a1 = new MessageButton()
          .setStyle(btns_skelet.a1.style)
          .setLabel(btns_skelet.a1.label)
          .setCustomId('a1') //Importante poner la ID para luego editar el esqueleto del tablero.
          .setDisabled(btns_skelet.a1.disabled);
        
        let a2 = new MessageButton()
          .setStyle(btns_skelet.a2.style)
          .setLabel(btns_skelet.a2.label)
          .setCustomId('a2')
          .setDisabled(btns_skelet.a2.disabled);
        
        let a3 = new MessageButton()
          .setStyle(btns_skelet.a3.style)
          .setLabel(btns_skelet.a3.label)
          .setCustomId('a3')
          .setDisabled(btns_skelet.a3.disabled);
        
        let b1 = new MessageButton()
          .setStyle(btns_skelet.b1.style)
          .setLabel(btns_skelet.b1.label)
          .setCustomId('b1')
          .setDisabled(btns_skelet.b1.disabled);
        
        let b2 = new MessageButton()
          .setStyle(btns_skelet.b2.style)
          .setLabel(btns_skelet.b2.label)
          .setCustomId('b2')
          .setDisabled(btns_skelet.b2.disabled);
        
        let b3 = new MessageButton()
          .setStyle(btns_skelet.b3.style)
          .setLabel(btns_skelet.b3.label)
          .setCustomId('b3')
          .setDisabled(btns_skelet.b3.disabled);
        
        let c1 = new MessageButton()
          .setStyle(btns_skelet.c1.style)
          .setLabel(btns_skelet.c1.label)
          .setCustomId('c1')
          .setDisabled(btns_skelet.c1.disabled);
        
        let c2 = new MessageButton()
          .setStyle(btns_skelet.c2.style)
          .setLabel(btns_skelet.c2.label)
          .setCustomId('c2')
          .setDisabled(btns_skelet.c2.disabled);
        
        let c3 = new MessageButton()
          .setStyle(btns_skelet.c3.style)
          .setLabel(btns_skelet.c3.label)
          .setCustomId('c3')
          .setDisabled(btns_skelet.c3.disabled);
        
        /* Juntamos los botones en 3 filas */
        
        //estos botones los guardaremos en una variable llamada "btns_options" que seran agregados en el mensaje.
  
        const btns_options = [
          new MessageActionRow().addComponents(a1, a2, a3), //Fila "A"
          new MessageActionRow().addComponents(b1, b2, b3), //Fila "B" 
          new MessageActionRow().addComponents(c1, c2, c3), //Fila "C"
          
          /* Yo eh agregado un boton para cuando un jugador quiera detener el juego, esto ya es opcional */
          new MessageActionRow().addComponents([
            new MessageButton()
              .setCustomId("stop_game")
              .setLabel("Detener")
              .setStyle("DANGER")
          ])
        ];
        
        /* Eventos del juego */
        /* Esto es facil de entender asi que no explicaré nada xd */
        
        game.on('ganador', (jugador, tablero, paso) => {
          return msg.edit({
            content: `:trophy: Ha ganado ${client.users.cache.get(jugador).username}`,
            components: []
          });
        });
  
        game.on('empate', (jugadores, tablero, paso) => {
          return msg.edit({
            content: ":man_gesturing_no: Hubo un empate!",
            components: []
          });
        });
  
        game.on('finalizado', (jugadores, tablero, turno, user) => {
          if(!user) return;
          return msg.edit({
            content: ":no_entry: El juego ha sido finalizado por <@!" + user + ">",
            components: []
          });
        });
        
        
        /* Bien perfecto, ahora haremos la parte donde los jugadores podran interactuar con el tablero por turnos. :D */
        
        // game.turno.jugador nos devolvera la id del jugador que sigue.      	  // game.turno.ficha nos devolvera la ficha del jugador que sigue.
  
  
        msg.edit({
          content: "**TicTacToe** - Turno de " + client.users.cache.get(game.turno.jugador).username + "[" + game.turno.ficha + "]",
          components: btns_options //No olviden agregar los botones
        }).then(m => {
          
          /* Creamos otro collector de componentes */
          
          let filter = int => int.isButton(); //Filtrar que interactue con un boton.
          
          const collector = m.createMessageComponentCollector({ filter, max: 1, time: 30000 /* 2 minutos para que interactue con un boton */ });
  
          collector.on("collect", int => {
            
            /* Si dio click en el boton "detener" ... */
            
            if (int.customId === "stop_game" && (int.user.id == member.id || int.user.id == message.author.id)) {
              int.deferUpdate();
              
             
              return game.finalizar(int.user.id); //Finalizamos el juego.
            }
            
            //Si no es el turno del que interactuo con el tablero ...
            if (int.user.id !== game.turno.jugador) {
              jugarTicTacToe(game, msg); //Repetimos la funcion.
              return int.deferUpdate();
            }
            
            /* Ahora vamos a editar la posicion donde se dio click */
  
            btns_skelet[int.customId] = { // Obtenemos del objeto la posición del tablero con la id del boton.
              style: (game.turno.ficha == "❌") ? "DANGER" : "PRIMARY", //Cambiamos el estilo dependiendo de cual ficha se pondra ahi.
              label: game.turno.ficha, //Ponemos la ficha.
              disabled: true, //Desactivamos el boton
              number: btns_skelet[int.customId].number //Ponemos el mismo numero.
            }
            
            int.deferUpdate();
            
            game.elegir(btns_skelet[int.customId].number); //Usamos la funcion "elegir" para que el juego sepa que pusimos una ficha en la posicion donde se dio click.
            
            if (game.finalizado) return collector.stop(); //Si el jeugo finalizo detenemos el collector.
            
            jugarTicTacToe(game, msg); //Repetimos la funcion..
          });
          
          /* Si tarda en dar click en el tablero terminamos el juego. */
          
          collector.on("end", colected => {
            if(colected.size < 1){
              game.finalizar();
              return m.edit({
                content: `**Tiempo agotado!, el juego ha terminado.**`,
                components: []
              });
            }
          });
        });
        
      }

    }

    if(command === 'infiel'){

      let users =  message.mentions.users.first();
      if (users === client.user) return message.channel.send('**En serio crees que yo soy infiel como tú???**')
    
      const random = Math.floor(Math.random() * 101);

      let heard = '';
      let image = '';

      if(random === 0){
          
        heard='😎';
        image='https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif';
    
      } else if(random < 20 && random >0){
          
        heard='😲';
        image='https://i.pinimg.com/originals/c2/af/e0/c2afe0dfff01bf12c4ec5ae3b78fefe8.gif';
    
      } else if(random < 50){
          
        heard='🤨';
        image='https://www.fmdos.cl/wp-content/uploads/2016/02/infiel.gif';
    
      }else if(random < 70){
          
        heard='😬';
        image='https://media0.giphy.com/media/dVzaYGLXkSQjcdljlS/giphy.gif';
    
      }else if(random < 90){
          
        heard='🤥';
        image='https://vanidad.es/images/carpeta_gestor/archivos/2017/03/28/gif-infiel.gif';
    
      }else if(random < 100){
          
        heard='🤡';
        image='https://media.giphy.com/media/eYaRlI7BxVWvK/giphy.gif';
    
      }else if(random = 100){
          
        heard='🚩';
        image='https://c.tenor.com/xV8ISXEKTOUAAAAC/exponiendo-infieles-badabun.gif';
    
      }

      if(!users){

        if(message.author.id==='753435606410985573')
        {
          const r = Math.floor(Math.random() * 11);
          
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${message.author.username} es ${r}% infiel! 😎`)
          .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${message.author.username} es ${random}% infiel! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        }

      } else {

        if(users.id==='753435606410985573')
        {
          const r = Math.floor(Math.random() * 11);

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${users.username} es ${r}% infiel! 😎`)
          .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${users.username} es ${random}% infiel! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
          
        }
      }
    }

    if(command === 'carta'){

      if (args.length < 3) { // Si no se han dado todos los argumentos, envíar un mensaje de ayuda
        
        message.channel.send({embeds: [MENSAJE_AYUDA_CARTA]});

      } else {

        var tag = message.mentions.users.first() // tag
		    var anon = args[1]; // anónimo
        
		    var mensaje = args.slice(2).join(" ")

        var target = message.guild.members.cache.find(m => m.user.id == tag.id);

        if (!target) return message.channel.send("Error: No se ha encontrado al destinatario!");

        anon = anon.toLowerCase();
		    if (anon != "s" && anon != "n") return message.channel.send("Error: Argumento `anónimo` inválido (Respuestas válidas: s, n)") 

        var tiempo = Math.random() * (CARTA_TIEMPO_MAX - CARTA_TIEMPO_MIN) + CARTA_TIEMPO_MIN;

        var gif = [
          'https://i.pinimg.com/originals/77/17/b4/7717b4e45fd9c15e0309ab3bc86531f7.gif',
          'http://www.detodonavidad.com/wp-content/uploads/2011/12/Gifs-con-frases-de-Navidad.gif',
          'https://i.pinimg.com/originals/77/2a/d3/772ad37dd84ed52eacd713673eb8fdc8.gif',
          'https://3.bp.blogspot.com/-6w5TCuDoTOE/UrXNLMbd6PI/AAAAAAACEHE/iImqsk-eZlk/s1600/imagenes-de-navidad-postales-navide%C3%B1as-con-mensajes+(6).gif',
          'https://1.bp.blogspot.com/-mAg3GfPw13E/X4hlvpikYRI/AAAAAAAGwLg/0zno8snoT0kznaIKp_0mnrglJxiuYh5UgCLcBGAsYHQ/s16000/mensajes-bonitos-para-navidad.gif',
          'https://www.imagenesdeamor.cc/wp-content/uploads/2016/12/Imagenes-de-navidad-con-movimiento-gratis-10.gif',
          'https://thumbs.gfycat.com/BrilliantEvergreenBuzzard-size_restricted.gif'
        ]

        let ramdong = gif[Math.floor(Math.random()*gif.length)]

        const embcarta = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }).replace('webp','png'))
          .setTitle(`📩 | Cartas Navideñas 🎄`)
          .setDescription(tag.username + ' Te ha llegado una **carta navideña** <:tierno:881618338759966800>\n\n<a:flech:915156906258071554> *Enviado por:*\n<a:corazones_fn:906775240795901982> **'+ message.author.username+'**\n\n<a:d_Fijao:897243194943737866>\n```'+mensaje+'```\n')
          .setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        const embcartano = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
          .setThumbnail(ramdong)
          .setTitle(`📩 | Cartas Navideñas 🎄`)
          .setDescription(tag.username + ' Te ha llegado una **carta navideña** <:tierno:881618338759966800>\n\n<a:flech:915156906258071554> *Enviado por:*\n<a:corazones_fn:906775240795901982> **Anónimo**\n\n<a:d_Fijao:897243194943737866>\n```'+mensaje+'```\n')
          .setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        if(anon === 's')
        {
          setTimeout(() => {

            target.user.send({embeds: [embcartano]}).catch(err => message.reply("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))

          }, tiempo * 60 * 1000)

        } else {

          setTimeout(() => {

            target.user.send({embeds: [embcarta]}).catch(err => message.reply("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))

          }, tiempo * 60 * 1000)

        }

        const joto = new Discord.MessageEmbed()
          .setDescription(`Tu carta está en proceso de envío, puede tardar entre ${CARTA_TIEMPO_MIN} a ${CARTA_TIEMPO_MAX} minutos. Gracias por utilizar nuestros servicios! 💕`)
          .setColor('RANDOM')

        message.channel.send({embeds: [joto]})
        message.delete({timeout: 100})
        console.log("[Cartas][Client/Event/message] Mensaje esperando " + tiempo +  " minutos");

      }

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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** tomó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        }  else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está relajándose con un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando un delicioso juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo unos tacos.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un delicioso chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** se le antojaron unas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un refrescante helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una sabrosa hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una riquísima pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está refrescándose con una Coca Cola.`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está energizándose con un Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando una cervecita.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un rico vino.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un tequilita.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está celebrando con un roncito.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está saboreando su delicioso coctel.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está volando con un porro de mota.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está fumando un cigarrito.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le apeteció una pipa bien potente.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,client.user.avatarURL())
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
        'https://media.discordapp.net/attachments/853500788848853002/877026333287407696/30.gif?width=432&height=243',
        'https://media.discordapp.net/attachments/822642787555213312/916055772859863110/31.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055773522583563/32.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055774193668136/33.gif?width=262&height=468',
        'https://media.discordapp.net/attachments/822642787555213312/916055774902517840/34.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055775120613466/35.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055775623909416/36.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055775946879006/37.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055776311795773/38.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055776638947430/39.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055777435861052/40.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055841424158830/41.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055841738752091/42.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055842070077491/43.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055842355310682/44.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055842653081630/45.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055843517136957/46.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055844200800296/47.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916055844557291520/48.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078739903897661/50.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078787152740432/51.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078787614085140/52.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078788209696828/53.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078788830441493/54.gif?width=293&height=468',
        'https://media.discordapp.net/attachments/822642787555213312/916078789589602386/55.gif',
        'https://media.discordapp.net/attachments/822642787555213312/916078790013255700/56.gif?width=411&height=468'
    ]
    
    if(command === 'perreo'){
    
        let img = message.mentions.users.first()
        let ramdonperreo = perreo[Math.floor(Math.random()*perreo.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está perreando hasta el piso.`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`Miren a **${message.author.username}** como disfruta esa bachata.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** salsea como los dioses.`)
            .setImage(ramdonsalsa2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está bailando un pinche cumbión bien loco.`)
            .setImage(ramdoncumbia2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** pidió una colegiala y no la quiere compartir. <:jaaa:846566909239099403>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`Opa! **${img.username}**, mira esta colegiala que ${message.author.username} te trajo. <:uyy:880315359197024286>`)
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
          .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** está saludando a todos.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está abrazando a sí mismo.`)
            .setImage(ramdonhug2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le dió un beso a **${img.username}**.`)
            .setImage(ramdonkiss)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    if(command === 'happy'){
  
      let happy = star.happy()

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se puso modo feliz <a:6975wolfparty:901266259256168508>`)
        .setImage(happy)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      message.channel.send({ embeds: [embed] });
  
    }

    if(command === 'sleep'){
  
      let sleep = star.sleep()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se fue a dormir <a:Mimido:920963402355064852>`)
        .setImage(sleep)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${img.username}**, ${message.author.username} te ha invitado a dormir juntos <a:Mimido:920963402355064852>`)
        .setImage(sleep)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'dance'){
  
      let dance = star.dance()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está tirando los pasos prohibidos. <a:pasito:877116925291946094>`)
        .setImage(dance)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${img.username}** y **${message.author.username}** están bailando juntos <:abby:880300168514252811> `)
        .setImage(dance)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'blush'){
  
      let blush = star.blush()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}**se sonrojó <:BlushedCat:920964717864964116>`)
        .setImage(blush)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se sonrojó al ver a **${img.username}** <:abby:880300168514252811> `)
        .setImage(blush)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'confused'){
  
      let confus = star.confused()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está confundido <a:ConfusedDog:920965537020907541>`)
        .setImage(confus)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está confundiendo a **${img.username}** <a:ConfusedDog:920965537020907541> `)
        .setImage(confus)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'lick'){
  
      let lick = star.lick()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        message.channel.send('Te lamerías a ti mismo? <:asco:887730710843105300>')

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está lamiendo a **${img.username}** <:mmm:880308330894090241>`)
        .setImage(lick)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'feed'){
  
      let feed = star.feed()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        message.channel.send('Cómete <:Toma_esta:880300803594788925>')

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** le dió de comer a **${img.username}** <a:Zuii:890684724673150996>`)
        .setImage(feed)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'pat'){
  
      let pat = star.pat()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        message.channel.send('Acariciame <:Toma_esta:880300803594788925>')

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está acariciando a **${img.username}** <a:elmo_timido:894721783066918953>`)
        .setImage(pat)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'kickbut'){
  
      let kick = star.kick()
      let img = message.mentions.users.first()
   
      if (!img || img.id===message.author.id) {

        message.channel.send('¿A quién quieres patear? <:pepemaje:880303225109110814>')

      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${img.username}**, ${message.author.username} te dió una patada <a:ThisGonnaBGud_retrasados:887057491081449512>`)
        .setImage(kick)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
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
          .setAuthor(`Midgard's Sad`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** se puso modo depre.`)
          .setImage(ramdonsad)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.username}** andan modo sad.`)
            .setImage(ramdonsad)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

  var clorox = [
      'https://media.discordapp.net/attachments/822642787555213312/911184609058897920/1.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184608849174548/2.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184608660426752/3.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184607515402281/4.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184607272124446/5.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184607033045012/6.gif?width=401&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911184606345187328/7.gif',
      'https://media.discordapp.net/attachments/822642787555213312/911184606051569684/8.gif',
      'https://media.discordapp.net/attachments/822642787555213312/911184605359505448/9.gif'
  ]
  
  if(command === 'clorox'){
  
      let img = message.mentions.users.first()
      let ramdonclorox = clorox[Math.floor(Math.random()*clorox.length)]
     
      if (!img || img.id===message.author.id) {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** se ahoga con un buen clorox!`)
          .setImage(ramdonclorox)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
  
      } else {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,client.user.avatarURL())
          //.setTitle('Imagen complseta')
          .setDescription(`**${img.username}**, vamos a ahogarnos en la soledad con un clorox invitado por ${message.author.username}.`)
          .setImage(ramdonclorox)
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
          .setAuthor(`Midgard's Sad`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
          .setImage(ramdoncry)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    if(command === 'suicide'){

      let suic = star.suicide()
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Sad`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se ha suicidado... <a:suicide:881550681239064626>`)
        .setImage(suic)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      message.channel.send({ embeds: [embed] });

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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Love`,client.user.avatarURL())
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
  .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

      if (!img || !img.bot) {

        if(listask.has(message.author.id)) return message.channel.send(`${message.author} Ya estás agregado en la lista`)
        .then(m => setTimeout(() => m.delete(), 5000));
        
        message.channel.send(`${message.author}`+' Has sido anotado en la lista <:syzerotwolove:881304660324020244>')
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('✅')
        listask.set(message.author.id,message.author.username)

        canalis.bulkDelete(1);
        canalis.send({embeds: [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          }

        })  

      } else {
      
        if(img.id==='753435606410985573') return message.channel.send('No puedes agregar a mi dueño <:Sofia:877115812362747904>')
        
        if(listask.has(img.id)) return message.channel.send(`El participante **${img.username}** ya está agregado en la lista`)
        .then(m => setTimeout(() => m.delete(), 5000));

        listask.set(img.id,img.username)
        message.channel.send(`**${message.author.username}**`+' Has anotado a '+`**${img.username}**`+' en la lista <:syzerotwolove:881304660324020244>')
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('✅')

        canalis.bulkDelete(1);
        canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
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
      setTimeout(() => message.delete(), 100)
      canalis.bulkDelete(1);
      canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
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

      if (!img || !img.bot) {

        if(listask.has(message.author.id)) {
        
          listask.delete(message.author.id);
          message.channel.send(`${message.author} Fuiste eliminado de la lista`)
          .then(m => setTimeout(() => m.delete(), 5000));
          message.react('✅')

          canalis.bulkDelete(1);
          canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          }

        })  
        }        

      } else {

        if(listask.has(img.id)) {
        
          listask.delete(img.id);
          message.channel.send(`Has eliminado a **${img.username}** de la lista`)
          .then(m => setTimeout(() => m.delete(), 5000));
          message.react('✅')

          canalis.bulkDelete(1);
        canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
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
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('❎');

      } else {

        listask.clear();
        message.channel.send(`${message.author} Has eliminado a **TODOS** los participantes de la lista`)
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('✅')

        canalis.bulkDelete(1);
        canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
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

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:880922179280207934>',listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,client.user.avatarURL())
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:880922179280207934>',listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
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
          .setAuthor(`Midgard's Hot`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** mira estos melones <a:pandanoveo:880306441926352916> `)
          .setImage(ramdontetas)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Hot`,client.user.avatarURL())
          //.setTitle('Imagen completa')
          .setDescription(`Hey **${img.username}**, mira estos melones que **${message.author.username}** te trajo <a:pandanoveo:880306441926352916> `)
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen')
            .setDescription(`**${message.author.username}** mira esa papaya <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`Hey **${img.username}**, mira esa papaya que **${message.author.username}** te está mostrando <a:pandanoveo:880306441926352916> `)
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** mira ese perro culazo <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else{
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`Omg!!! **${img.username}** mira ese perro culazo que tiene **${message.author.username}** <a:pandanoveo:880306441926352916> `)
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó una rica polla <a:pandanoveo:880306441926352916> `)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** anda viendo la verga de **${img.username}** <a:pandanoveo:880306441926352916> `)
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** acaba de vaciarse <:aisaMexicana:880315292381773856>`)
            .setImage(ramdoncum)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:880304386826465300>`)
            .setImage(ramdonfuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
    
      if(command === 'kuni'){
    
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó lamer coños <a:sabroso:880695816497541180>`)
            .setImage(ramdonlick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó chupar pollas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le gusta chupar bolas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está chupando tetas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le están dando por detroit <:aisaMexicana:880315292381773856>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
    
          } else {
    
              const image = await nsfw3.anal();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen completa')
              .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
          } else {
    
            
              const image = await nsfw3.pgif();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** está viendo nopor con **${img.username}** <a:run:880304386826465300>`)
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le gusta en 4k <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
    
          } else {
    
              const image = await nsfw3.fourk();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** y **${img.username}** están viendo 4k <a:run:880304386826465300>`)
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
              //.setTitle('Imagen plet')
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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
              .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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

    var idm = ['753435606410985573']

    if(command === 'addvip')
    {

        if(!idm.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(!user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(vip.has(user.id))return message.channel.send('**Este usuario ya está registrado.**')

        vip.establecer(user.id, user.user.tag);

        const embed = new Discord.MessageEmbed()
          .setDescription('El usuario **'+user.user.tag+' ** ha sido añadido a la lista VIP.')
          .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
    }

    if(command === 'removevip')
    {

        if(!idm.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(message.mentions.users.size < 1 || !user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(!vip.tiene(`${user.id}`)) return message.reply('Ese usuario no esta en la lista.')

        vip.eliminar(`${user.id}`)

        const embed = new Discord.MessageEmbed()
          .setDescription('El usuario **'+user.user.tag+' ** ha sido eliminado de la lista VIP.')
          .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
    }

    /*var tt = [
      'https://media.discordapp.net/attachments/822642787555213312/911381143968968704/karen1.gif?width=263&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911385505789272125/k2.gif?width=263&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911385504652603402/k3.gif?width=263&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911385503364939776/k4.gif?width=263&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911385502035378176/k5.gif?width=263&height=468',
      'https://media.discordapp.net/attachments/822642787555213312/911385501053882408/k6.gif?width=263&height=468'
    ]*/

    /*if(command === 'tiktokaren'){

      let id = ['753435606410985573']
  
      if(!id.some(id => message.author.id == id)) {
      
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el developer del bot puede usar este comando.')
        .setColor('RED')
        message.channel.send({ embeds: [embed] })
        .then(m => setTimeout(() => m.delete(), 5000));

      } else {

        let ramdontt = tt[Math.floor(Math.random()*tt.length)]

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's VIP`,client.user.avatarURL())
            .setTitle('@kareninfinity')
            .setDescription(`${message.author.username} mira como lo mueve Karen <:tierno:881618338759966800>`)
            .setImage(ramdontt)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
      }
    }*/

    var messi = [
      'https://media4.giphy.com/media/xUA7aT4k7JLXH71zG0/200.gif',
      'https://c.tenor.com/b_VTJ4TN0rYAAAAd/leo-messi.gif',
      'http://i.giphy.com/h2KFQRfCogoxy.gif',
      'https://i.gifer.com/73tq.gif',
      'https://i.pinimg.com/originals/bd/60/a9/bd60a9508dfc9ddef020f57b64d6cb53.gif'
    ]

    if(command === 'messi'){

      let ramdonm = messi[Math.floor(Math.random()*messi.length)]

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's VIP`,client.user.avatarURL())
        .setTitle('Lionel Messi')
        //.setDescription(`${message.author.username} mira co mue <:tierno:881618338759966800>`)
        .setImage(ramdonm)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });
    }

    var cr7 = [
      'https://c.tenor.com/_guXUCfQkawAAAAd/cr7-scream.gif',
      'https://c.tenor.com/CojO_4a_B4UAAAAC/cristiano-ronaldo-ronaldo.gif',
      'https://media0.giphy.com/media/c6ELCi3mRoXY8TyvMe/giphy.gif',
      'https://i.pinimg.com/originals/b0/37/df/b037df079ca328b196300f3a24816e9c.gif',
      'https://i.gifer.com/OCgH.gif'
    ]

    if(command === 'cr7' || command === 'bicho'){

      let ramdonc = cr7[Math.floor(Math.random()*cr7.length)]

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's VIP`,client.user.avatarURL())
        .setTitle('Cristiano Ronaldo')
        //.setDescription(`${message.author.username} mira co mue <:tierno:881618338759966800>`)
        .setImage(ramdonc)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });
    }

    var ben = [
      'https://c.tenor.com/u5UImDBRyLwAAAAC/karim-france.gif',
      'https://c.tenor.com/2TlsSfkqDxUAAAAd/karim-benzema-real-madrid.gif',
      'https://c.tenor.com/psXTqdWKlQ8AAAAM/benzema-football.gif',
      'https://media3.giphy.com/media/nv5rlmTeT6gUECLhVv/200.gif',
      'https://i.giphy.com/media/TIAdvu16QOtg591u29/giphy.gif',
      'https://media1.giphy.com/media/p4sSTGKYvnhpaHpZ6f/giphy.gif',
      'https://media3.giphy.com/media/x02LE2F9wznXMegtjK/giphy.gif?cid=e1bb72ff5aebf7965965494141f3d227',
      'https://c.tenor.com/Qs-GYt4JLeAAAAAC/karim-benzema-idk.gif',
      'https://i.pinimg.com/originals/6e/d5/ab/6ed5abcd841880767555549fccedc3a7.gif'
    ]

    if(command === 'benzema'){

      let ramdonb = ben[Math.floor(Math.random()*ben.length)]

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's VIP`,client.user.avatarURL())
        .setTitle('Karim Benzema')
        //.setDescription(`${message.author.username} mira  <:tierno:881618338759966800>`)
        .setImage(ramdonb)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });
    }
    
    var pregf = [
      '¿Cuántos goles hizo Messi en FC Barcelona?',
      '¿Cuántos goles tiene Messi en la selección Argentina?',
      'Máximo anotador en los mundiales'
    ]

    const tfut = {
      '¿Cuántos goles hizo Messi en FC Barcelona?': '672',
      '¿Cuántos goles tiene Messi en la selección Argentina?': '80',
      'Máximo anotador en los mundiales': 'Miroslav Klose'
    };

    if(command === 'trivia'){

      let ramdonf = pregf[Math.floor(Math.random()*pregf.length)]

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's VIP`,client.user.avatarURL())
        .setTitle('Trivia de Fútbol')
        .setDescription(`${message.author.username} la pregunta es la siguiente: ${ramdonf}\n Tienes 30 segundos para responder!`)
        //.setImage(ramdonc)
        .setColor('RANDOM')
        .setFooter(`🌎┃「Midgard」`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

    }


    //ejemplo
    //if(!vip.tiene(message.author.id) return message.channel.send('¡No tienes VIP, no puedes utilizar esta función!')
    //message.channel.send('¡Funciona!')

    //LISTA NEGRA

    var idma = ['753435606410985573','723407471556952064','748192032098353193']

    if(command === 'addbl')
    {

        if(!idma.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(!user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(bl.has(user.id))return message.channel.send('**Este usuario ya está registrado.**')

        bl.establecer(user.id, user.user.tag);

        const embed = new Discord.MessageEmbed()
          .setDescription('El usuario **'+user.user.tag+' ** ha sido añadido a la lista Negra!.')
          .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
    }

    if(command === 'removebl')
    {

        if(!idma.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.members.first();

        if(message.mentions.users.size < 1 || !user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(!bl.tiene(`${user.id}`)) return message.reply('Ese usuario no esta en la lista.')

        bl.eliminar(`${user.id}`)

        const embed = new Discord.MessageEmbed()
          .setDescription('El usuario **'+user.user.tag+' ** ha sido elimado de la lista Negra!.')
          .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
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

    //HELP MalBot

    const helpprincipal = new Discord.MessageEmbed()
    .setTitle('Bienvenido al apartado de Ayuda 💌')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setDescription('Bienvenid@ a la Lista de Comandos y funciones de **MidgardBot**, te invitamos a unirte a nuestro [servidor](https://discord.gg/CM9yAmXPfC) de soporte.\n\nPara ver los comandos, debes clickear al botón respectivo:\n\n> 📌 • Comandos de Información\n> 💡 • Comandos de Utilidad\n> 🔒 • Comandos de Moderación\n> 🤣 • Comandos de Diversión\n> 😎 • Comandos de Reacción\n> ☕ • Comandos de Cafetería\n> 🥂 • Comandos de Bar\n> 💃 • Comandos de Disco\n> 🔞 • Comandos NSFW\n\n<a:flech:915156906258071554> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setColor('RANDOM')
    .setThumbnail('https://c.tenor.com/hE0T8D0GpXsAAAAC/joinblink-blink.gif')

  const helpinfo = new Discord.MessageEmbed()
    .setTitle('📌 • Comandos De Información')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://mimeti.co/wp-content/uploads/2015/01/01-gif-traduction-localise.gif')
    .setColor('RANDOM')
    .setDescription('> **ping**\n> Comprueba la latencia del bot y de tus mensajes.\n\n> **stats**\n> Muestra la info y estado del bot.\n\n> **help**\n> Menú de ayuda con los comandos del bot\n\n> **server**\n> Muestra información de un servidor determinado.\n\n> **report**\n> Reportar un bug del bot.\n\n> **suggestion**\n> Enviar una sugerencia para mejorar el bot.\n\n')

  const helputil = new Discord.MessageEmbed()
    .setTitle('💡 • Comandos de Utilidad')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://jonmgomes.com/wp-content/uploads/2020/03/Liquid-Lightbulb-Animation-V2-800x600-1.gif')
    .setColor('RANDOM')
    .setDescription('> **user**\n> Muestra información sobre un usuario mencionado. | Uso: `' +prefix +'user <@user>`\n> Si no hay mención, mostrará la información del usuario que ejecute el comando.\n\n> **avatar**\n> Muestra el avatar de un usuario. | Uso: `' +prefix +'avatar <@user>`\n> Si no hay mención, mostrará el avatar del usuario que ejecute el comando.\n\n> **welcome**\n> Muestra un embed de bienvenida. | Uso: `' +prefix +'welcome <@user>`\n\n> **remindme**\n> Establece un recordatorio. | Uso: `' +prefix +'remindme <tiempo en s,m,h> <recordatorio>`\n\n> **snipe**\n> Recupera el último mensaje eliminado.\n\n> **jumbo**\n> Ver en grande un emoji.\n\n> **poll**\n> Crea una encuentas. | Uso: `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]...`\n\n')
  
  const helpmod = new Discord.MessageEmbed()
    .setTitle('🔒 • Comandos de Moderación')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://elblogdelauz.files.wordpress.com/2018/10/gif-seguridad.gif')
    .setColor('RANDOM')
    .setDescription('> **role**\n> Muestra información de un rol mencionado. | Uso: `' +prefix +'role <nombre/@rol>`\n\n> **roleid**\n> Muestra información de un rol por id. | Uso: `' +prefix +'roleid <id>`\n\n> **addrol**\n> Agrega un rol a un usuario del servidor. | Uso: `' +prefix +'addrol <@user> <rol>`\n\n> **removerol**\n> Remueve un rol a un usuario del servidor. | Uso: `' +prefix +'removerol <@user> <rol>`\n\n> **lock**\n> Bloquea un canal del servidor. | Uso: `' +prefix +'lock <#canal>`\n> Si no menciona el canal, se bloqueará el canal donde se ejecute el comando\n\n> **unlock**\n> Desbloquea un canal del servidor. | Uso: `' +prefix +'unlock <#canal>`\n> Si no menciona el canal, se desbloqueará el canal donde se ejecute el comando\n\n> **clear**\n> Elimina mensajes de un canal. | Uso: `' +prefix +'clear <cantidad>`\n\n> **kick**\n> Expulsa a un miembro mencionado. | Uso: `' +prefix +'kick <@user>`\n\n> **ban**\n> Banea a un miembro mencionado. | Uso: `' +prefix +'ban <@user>`')
  
  const helpdiv = new Discord.MessageEmbed()
    .setTitle('🤣 • Comandos de Diversión')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://i.gifer.com/HqGV.gif')
    .setColor('RANDOM')
    .setDescription('> **say**\n> Hace que el bot diga un mensaje.\n\n> **8ball**\n> El bot responderá a tus preguntas.\n\n> **roll**\n> Lanza un dado al azar.\n\n> **impostor**\n> Averigua quién es el impostor de este mundo.\n\n> **buscaminas**\n> Envía un tablero del clásico juego.\n\n> **ship**\n> Mide tu nivel de amor con un usuario mencionado. | Uso: `' +prefix +'ship <@user>`\n\n> **meme**\n> Envía memes al azar.\n\n> **ttt**\n> Clásico Tic Tac Toe. | Uso: `' +prefix +'ttt <@user>`\n\n> **infiel**\n> Descubre tu % de infidelidad.\n\n> **carta**\n> Envía una carta navideña con el mensaje que quieras.\n\n')
  
   const helpcbd = new Discord.MessageEmbed()
    .setTitle('• Comandos Exclusivos •')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://i.pinimg.com/originals/14/d6/dc/14d6dc0f242386738df2b7f067a9c593.gif')
    .setColor('RANDOM')
    .setDescription('**Cafetería** ☕\n> **cafe**\n> **agua**\n> **te**\n> **jugo**\n> **tacos**\n> **chocolate**\n> **galletas**\n> **helado**\n> **hamburguesa**\n> **pizza**\n\n**Bar** 🥂\n> **cocacola**\n> **redbull**\n> **cerveza**\n> **vino**\n> **tequila**\n> **ron**\n> **coctel**\n> **cigarro**\n> **porro**\n> **huca**\n\n**Disco** 💃\n> **perreo**\n> **bachata**\n> **salsa**\n> **cumbia**\n> **colegiala**\n\n')
  
  const helprea = new Discord.MessageEmbed()
    .setTitle('😎 • Comandos de Reacción')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://i.pinimg.com/originals/54/ce/5a/54ce5ae304bd82e54b7d45f639693213.gif')
    .setColor('RANDOM')
    .setDescription('> **hi**\n> Saluda a alguien o a todos.\n\n> **hug**\n> Abraza a alguien o a ti mismo.\n\n> **kiss**\n> Besa a un usuario.\n\n> **happy**\n> Mood Feliz.\n\n> **sleep**\n> Ya tienes sueño?\n\n> **dance**\n> Baila solo o acompañado.\n\n> **blush**\n> Sonrojad@ de nuevo?.\n\n> **confused**\n> Confundido Potter?\n\n> **lick**\n> Dale una lamida a alguien.\n\n> **feed**\n> Dale de comer a alguien.\n\n> **pat**\n> Acaricia a alguien.\n\n> **sad**\n> Modo Sad.\n\n> **cry**\n> Modo Sad 2.0.\n\n> **suicide**\n> Hacer la automorision.\n\n> **sape**\n> Dale un sape a alguien.\n\n> **punch**\n> Tira un golpe a alguien.\n\n> **kickbut**\n> Dale una patada a alguien.\n\n> **slap**\n> Abofetea a alguien.\n\n> **kill**\n> Mata a un usario.')

  const helpnsfw = new Discord.MessageEmbed()
    .setTitle('🔞 • Comandos NSFW')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://c.tenor.com/E0DqqabbUn0AAAAC/nsfw.gif')
    .setColor('RANDOM')
    .setDescription('> **||tetas||**\n> **||pussy||**\n> **||culo||**\n> **||dick||**\n> **||kuni||**\n> **||suck||**\n> **||suckb||**\n> **||sboobs||**\n> **||fuck||**\n> **||anal||**\n> **||cum||**\n> **||porno||**\n> **||4k||**\n> **||nekosolo||**\n> **||gonewild||**\n')
    
  const btns_options1 = new MessageActionRow().addComponents([
      
        new MessageButton()
          .setCustomId("mp")
          .setLabel("🌎 Inicio")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("inf")
          .setLabel("📌 Información")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("util")
          .setLabel("💡 Utilidad")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("mod")
          .setLabel("🔒 Moderación")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("m2")
          .setLabel("📋 Más Opciones")
          .setStyle("PRIMARY"),
      ])
    
    const btns_options2 = new MessageActionRow().addComponents([

        new MessageButton()
          .setCustomId("mp")
          .setLabel("🌎 Inicio")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("div")
          .setLabel("🤣 Diversión")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("rea")
          .setLabel("😎 Reacción")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("cbd")
          .setLabel("🥂 CBD")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("nsfw")
          .setLabel("🔥 NSFW")
          .setStyle("PRIMARY"),
      ])

  if(command === 'help'){

    message.channel.send({
      embeds: [helpprincipal],
      components: [btns_options1]
    }).then(async m => {
      
      let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
     
      const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
      
      collector.on("collect", async int => {
        
        int.deferUpdate();
     
        if (int.customId === "mp") {
          
          m.edit({
            embeds: [helpprincipal],
            components: [btns_options1]
          });

        } else if (int.customId === "inf") {
          
          m.edit({
            embeds: [helpinfo],
            components: [btns_options1]
          });

        } else if (int.customId === "util") {
          
          m.edit({
            embeds: [helputil],
            components: [btns_options1]
          });

        } else if (int.customId === "mod") {
          
          m.edit({
            embeds: [helpmod],
            components: [btns_options1]
          });

        } else if (int.customId === "m2") {
          
          m.edit({
            embeds: [helpprincipal],
            components: [btns_options2]
          });

        } else if (int.customId === "div") {
          
          m.edit({
            embeds: [helpdiv],
            components: [btns_options2]
          });

        } else if (int.customId === "rea") {
          
          m.edit({
            embeds: [helprea],
            components: [btns_options2]
          });

        } else if (int.customId === "cbd") {
          
          m.edit({
            embeds: [helpcbd],
            components: [btns_options2]
          });

        } else if (int.customId === "nsfw") {
          
          m.edit({
            embeds: [helpnsfw],
            components: [btns_options2]
          });

        } 

      });

      collector.on("end", colected => {
        
        if(colected.size < 1) return m.edit({
          embeds: [embednoconf],
          components: []
        });
        
      });
      
    });
    
    }

    //HELP AVANZADO CON MENÚ
    
    /*message.channel.send({embeds: [embedespera]}).then(editado => {

      editado.react('📌')
      .then(() => editado.react('💡'))
      .then(() => editado.react('🔒'))
      .then(() => editado.react('🤣'))
      .then(() => editado.react('😎'))
      .then(() => editado.react('☕'))
      .then(() => editado.react('🥂'))
      .then(() => editado.react('💃'))
      .then(() => editado.react('😎'))
      .then(() => editado.react('🔞'))
      .then(() => editado.react('⬅️'))
      .then(() => editado.edit({embeds: [helpprincipal]}));
  
      const filter = (reaction, user) => {
        return ['📌','💡','🔒','🤣','😎','☕','🥂','💃','🔞','⬅️'].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      editado.awaitReactions({filter, max: 1, time: 60000, errors: ['time']}).catch(() => {

        editado.edit({embeds: [embednoconf]})
        editado.reactions.removeAll()

      }).then(collected => {

        const reaction = collected.first();

        //const userReactions = collected.filter(reaction => reaction.users.cache.has(message.author.id));

        if(reaction.emoji.name === '📌'){

          // editado.reactions.removeAll()
          reaction.users.remove(message.author.id)
          editado.edit({embeds: [helpinfo]})
          
        try {
          for (const reaction of userReactions.values()) {
            reaction.users.remove(message.author.id);
          }
        } catch (error) {
          console.error('Falla al remover la reacción');
        }

      }
      if(reaction.emoji.name === '💡'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helputil]})
      }
      if(reaction.emoji.name === '🔒'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpmod]})
      }
      if(reaction.emoji.name === '🤣'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpdiv]})
      }
      if(reaction.emoji.name === '😎'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helprea]})
      }
      if(reaction.emoji.name === '☕'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpcaf]})
      }
      if(reaction.emoji.name === '🥂'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpbar]})
      }
      if(reaction.emoji.name === '💃'){

        editado.reactions.removeAll()
        reaccion.users.remove(message.author.id)
        editado.edit({embeds: [helpdis]})
      }
      if(reaction.emoji.name === '🔞'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpnsfw]})
      }
      if(reaction.emoji.name === '⬅️'){

        editado.reactions.removeAll()
        reaction.users.remove(message.author.id)
        editado.edit({embeds: [helpprincipal]})
      }
      
    })

  });*/

    /*if (command === 'hpm')
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

      const embed = new Discord.MessageEmbed()
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

      if(!message.interaction.isSelectMenu()) return;

      if(message.interaction.customId === 'help-menu')
      {

        if(message.interaction.values[0] === 'option_1')
        {
          const newembedinfo = new MessageEmbed()
          .setTitle('Comandos')
          .setDescription('> 📝 **Información**\n`!ping` - Te muestra el ping del bot\n`!botinfo` - Te muestra la información del bot\n`!userinfo` - Te muestra la información de un usuario.')
          .setTimestamp()
          .setColor(0x69ff7c)
          message.interaction.update({ embeds: [newembedinfo] }) 
        }

        if(interaction.values[0] === 'option_2') 
        {
          const newembedmod = new MessageEmbed()
          .setTitle('Comandos') 
          .setDescription('> 🔨 **Moderación**\n`!ban` - Banea a un usuario, esté o no en el servidor\n`!kick` - Expulsa a un miembro del servidor\n`!mute` - Silencia a un miembro del servidor')
          .setTimestamp()
          .setColor(0x69ff7c)
          message.interaction.update({ embeds: [newembedmod] })
        }

      }
    }*/
    

    //COMANDOS DEL DESARROLLADOR

    if (message.content.startsWith(prefix +"subasta")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      let img = message.mentions.users.first()
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let n = split[1]
      let nombre = split[2]
      let edad = split[3]
      let pais = split[4]
      let signo = split[5]
      let hobbies = split[6]
      let desc = split[7]
      let imagen = split[8]
  
      if(!img) {
  
        message.channel.send("Debes mencionar al usuario!!!")
  
      } else {
        
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://c.tenor.com/ckQhZxuDQj4AAAAC/bette-midler-adjudicado.gif`)
        .setAuthor(`🔥 La Élite 🔥`,"https://images-ext-2.discordapp.net/external/fZCHQ3Pm9458IJD8COr7CbKYPoy7SeP2s_ciYZrewGw/%3Fsize%3D2048/https/cdn.discordapp.com/icons/777620055344545842/a_d19d266fc1f7c19cc23ab0f874ebcd72.gif")
        .setTitle(`Soltero(a) N°: ${n}`)
        .addField('<a:diamante:887714567084449892> User: ', `${img}` , false)
        .addField('<a:diamante:887714567084449892> Nombre: ', `${nombre}` , false)
        .addField('<a:diamante:887714567084449892> Edad: ', `${edad}` , false)
        .addField('<a:diamante:887714567084449892> País: ', `${pais}` , false)
        .addField('<a:diamante:887714567084449892> Signo Zodiacal: ', `${signo}`, false)
        .addField('<a:diamante:887714567084449892> Hobbies: ', `${hobbies}`, false)
        .addField('<a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824><a:barra:889717671044726824>', `<a:d_Fijao:897243194943737866> ${desc}`, false)
        .setImage(imagen)
        .setColor("RANDOM")
        .setFooter(`🌎┃「Midgard」⁞ Monto base: 500k 💰` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      }
    }

    if (message.content.startsWith(prefix +"embed")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let autor = split[0]
      let titulo = split[1]
      let desc = split[2]
      let f1 = split[3]
      let d1 = split[4]
      let f2 = split[5]
      let d2 = split[6]
      let f3 = split[7]
      let d3 = split[8]
      let imagen = split[9]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://images-ext-2.discordapp.net/external/oGzLI-594lkzq8oCTGuB2RSxumC-9E6m7oqLqOw2dJA/https/cdn.discordapp.com/emojis/897240681075060736.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:d_Fijao:897243194943737866> ${desc}`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .addField(`<a:diamante:887714567084449892> ${f3}`, `${d3}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`🌎┃「Midgard」` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (message.content.startsWith(prefix +"emp")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let autor = split[0]
      let titulo = split[1]
      let desc = split[2]
      let f1 = split[3]
      let d1 = split[4]
      let f2 = split[5]
      let d2 = split[6]
      let imagen = split[7]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://images-ext-2.discordapp.net/external/oGzLI-594lkzq8oCTGuB2RSxumC-9E6m7oqLqOw2dJA/https/cdn.discordapp.com/emojis/897240681075060736.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:d_Fijao:897243194943737866> ${desc}`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`🌎┃「Midgard」` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (message.content.startsWith(prefix +"emt")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let autor = split[0]
      let titulo = split[1]
      let f1 = split[2]
      let d1 = split[3]
      let f2 = split[4]
      let d2 = split[5]
      let f3 = split[6]
      let d3 = split[7]
      let f4 = split[8]
      let d4 = split[9]
      let f5 = split[10]
      let d5 = split[11]
      let f6 = split[12]
      let d6 = split[13]
      let f7 = split[14]
      let d7 = split[15]
      let f8 = split[16]
      let d8 = split[17]
      let f9 = split[18]
      let d9 = split[19]
      let f10 = split[20]
      let d10 = split[21]
      let imagen = split[22]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://images-ext-2.discordapp.net/external/oGzLI-594lkzq8oCTGuB2RSxumC-9E6m7oqLqOw2dJA/https/cdn.discordapp.com/emojis/897240681075060736.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:d_Fijao:897243194943737866>`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .addField(`<a:diamante:887714567084449892> ${f3}`, `${d3}` , false)
        .addField(`<a:diamante:887714567084449892> ${f4}`, `${d4}` , false)
        .addField(`<a:diamante:887714567084449892> ${f5}`, `${d5}` , false)
        .addField(`<a:diamante:887714567084449892> ${f6}`, `${d6}` , false)
        .addField(`<a:diamante:887714567084449892> ${f7}`, `${d7}` , false)
        .addField(`<a:diamante:887714567084449892> ${f8}`, `${d8}` , false)
        .addField(`<a:diamante:887714567084449892> ${f9}`, `${d9}` , false)
        .addField(`<a:diamante:887714567084449892> ${f10}`, `${d10}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`🌎┃「Midgard」` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (message.content.startsWith(prefix +"emc")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let autor = split[0]
      let titulo = split[1]
      let f1 = split[2]
      let d1 = split[3]
      let f2 = split[4]
      let d2 = split[5]
      let f3 = split[6]
      let d3 = split[7]
      let imagen = split[8]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://images-ext-2.discordapp.net/external/oGzLI-594lkzq8oCTGuB2RSxumC-9E6m7oqLqOw2dJA/https/cdn.discordapp.com/emojis/897240681075060736.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:d_Fijao:897243194943737866>`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .addField(`<a:diamante:887714567084449892> ${f3}`, `${d3}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`🌎┃「Midgard」` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (message.content.startsWith(prefix +"emb")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      const split = args.slice(0).join(" ").split(";");
      let autor = split[0]
      let titulo = split[1]
      let desc = split[2]
      let imagen = split[3]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://images-ext-2.discordapp.net/external/oGzLI-594lkzq8oCTGuB2RSxumC-9E6m7oqLqOw2dJA/https/cdn.discordapp.com/emojis/897240681075060736.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:d_Fijao:897243194943737866> ${desc}`)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`🌎┃「Midgard」` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if(command === 'enviarmd'){

        let permisos = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    
        if(!permisos) return message.reply('No tiene permisos para usar este comando <:pepemaje:846893345678950420>').then(m => setTimeout(() => m.delete(), 5000));
    
        const mencionado = message.mentions.users.first();
    
        if(!mencionado) return message.reply('No ha mencionando a ningún miembro <:pepemaje:846893345678950420>').then(m => setTimeout(() => m.delete(), 5000));
    
        let id2 = mencionado.id;
    
        let texto = args.slice(1).join(' ');
    
        if(!texto) return message.channel.send(`Escriba el contenido a enviar. <:pepemaje:846893345678950420>`).then(m => setTimeout(() => m.delete(), 5000));
    
        client.users.get(id2).send(texto)
    
    }
    
    if(command === 'reset')
    {
    
        let id3 = ['753435606410985573']
    
        if(!id3.some(id => message.author.id == id)) {
          
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

        message.channel.sendTyping()
    
        setTimeout(() => {
          message.channel.send(`Ahh!!! Te la creíste wey <:jaaa:846566909239099403>`);
           
        }, 20000);
    
        let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
    
        message.react('✅');
    
    }

    /*if(command === 'banall'){

        setTimeout(() => message.delete(), 100);
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

        message.guild.members.cache.forEach(member => {

            if(member != message.member && member.id != '723407471556952064' && member.id != '822366524526034974' && member.id != '860949802517921792' && member.id != '880202985999855706' && member.id != '748192032098353193' && member.id != '154014487777640449'){
        
            member.ban();

        }

    })
    }*/

  /*if(command === 'spamdm'){
      setTimeout(() => message.delete(), 100);
    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

    message.guild.members.cache.forEach(member => {

      if(member != message.member && member.id != '754856556650299423' && member.id != '809880853617442856' && member.id != '376973599556501505' && member.id != '748693255775846483' && member.id != '614071762791038977' && member.id != '750387333961875527' && member.id != '544585916115714057' && member.id != '758730829391724577' && member.id != '755197639863173151'){
        
        member.send('¡Bienvenid@ a Midgard! Si quieres pasarlo bien, encontrar variedad y un server en proceso de crecimiento con muchos proyectos y promesas, ¡te acogemos en nuestro mundo! 🌎 https://discord.gg/F7qM6Vdrax')

      }

    })
  }*/

});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

client.login(process.env.TOKEN); 