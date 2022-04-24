const Discord = require('discord.js');

const { Permissions } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ allowedMentions: { parse: ['users'], repliedUser: true }, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });

const newUsers = new Discord.Collection();
const listask = new Discord.Collection();

const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();

const red = require('reddit-fetch');

const over = require('poke-over');

const prefix = process.env.PREFIX;

var AsciiTable = require('ascii-table')

let logschannel
// const DBL = require("dblapi.js");

// client.dbl = new DBL('Yfnr7FYWyZ6DnlUD0pKGbr2cIQkBUMYZ6dWpPPv8X8_AC2nGJSMy_1fA6NwAgAH7UQnS');

const moment = require('moment');
require('moment-duration-format');
moment.locale('es');

/*const dbv = require('megadb');
const vip = new dbv.crearDB('vip');
const bl = new dbv.crearDB('blacklist');
const fs = require('fs');*/


/*const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./bdmidgard.sqlite3",sqlite3.OPEN_READWRITE, (err) => {
  
  if(err) return console.error(err.message);

  console.log('Conectado a SQLite exitosamente')
});*/


/*<-- CREATE TABLE USUARIO -->
  
let crear = "CREATE TABLE IF NOT EXISTS usuarios (idusuario TEXT, nivel INTEGER, exp INTEGER, rep INTEGER, frase BLOB, foto BLOB)"

db.run(crear, function(err) {
  if (err) return console.error('Error crear tabla: '+err.message)
})*/

// ----- SQLITE 3 -----

const sqlite3 = require('sqlite3').verbose(),
{ open } = require('sqlite');

(async()=>{
  
  try {

    client.db = await open({

    filename: './Database/bdmidgard.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READWRITE

    })
    
    console.log('Archivo creado correctamente')
  
  } catch (error) {

    console.log('Error al crear archivo: '+error)
  
  }

  try {

    await client.db.exec(`CREATE TABLE IF NOT EXISTS usuarios ('idusuario' TEXT NOT NULL, 'nivel' INTEGER DEFAULT 0, 'exp' INTEGER DEFAULT 0, 'marry' TEXT NO NULL, 'rep' INTEGER DEFAULT 0, 'pat' INTEGER DEFAULT 0, 'hug' INTEGER DEFAULT 0, 'sape' INTEGER DEFAULT 0, 'color' BLOB, 'frase' BLOB, 'foto' BLOB, 'dinero' INTEGER DEFAULT 0, 'banco' INTEGER DEFAULT 0, 'total' INTEGER DEFAULT 0, 'work' DATETIME,'crime' DATETIME, 'rob' DATETIME, 'daily' DATETIME, 'crep' DATETIME, 'ck' INTEGER DEFAULT 0)`)
    console.log('Tabla usuarios creada correctamente')

  } catch (error) {

    console.log('Error al crear tabla: '+error)
    
  }

  try {
    
    await client.db.exec(`CREATE TABLE IF NOT EXISTS kiss ('idkiss' INTEGER PRIMARY KEY AUTOINCREMENT, 'u1' TEXT NOT NULL, 'u2' TEXT NOT NULL, 'c' INTEGER DEFAULT 0)`)
    console.log('Tabla kiss creada correctamente')
  
  } catch (error) {

    console.log('Error al crear tabla: '+error)
  
  }

})();

// ----- ***** -----

// ----- MONGODB -----

const mongoose = require ('mongoose');

mongoose
  .connect('mongodb+srv://maltabot69:m.y%40r%213qu3%262o22%23drako@cluster0.ggzaa.mongodb.net/MidgardBotDB?retryWrites=true&w=majority',{
  
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
  
    console.log('========================= MONGO DB =========================');
    console.log('Conectado exitosamente a MongoDB');
    console.log('========================= LOGS DEL BOT =========================');

  })
  .catch((e) => {
  
    console.log('Error al conectar: '+e);

  });

// ----- ******* -----

// <-- POO - COMANDOS SEPARADOS -->

//! CÓDIGO PRINCIPAL

client.commands = new Discord.Collection(); 
client.events = new Discord.Collection(); 
client.snipes = new Discord.Collection();
client.slash = new Discord.Collection();

['commandHandler','eventHandler','slashHandler'].forEach((file) => {

  require(`./handlers/${file}`)(client, Discord);
  
})

//! =========================

// <-- AQUI LA PROPIEDAD LOGIN: -->

console.log('========================= LOGIN =========================')

client.login(process.env.TOKEN)
  .then(() => { 

    console.log(`Estoy listo, soy ${client.user.tag}`);
    console.log('========================= LOGIN =========================')

  })
  .catch((err) => {

    //Si se produce un error al iniciar sesión, se le indicará en la consola.
    console.error("Error al iniciar sesión: " + err);

  });


// client.on('messageCreate', async message => {

//       //AQUÍ

//     // if(!message.content.startsWith(process.env.PREFIX)) return;
    
//     // //const serverQueue = queue.get(message.guild.id);

//     // const args = message.content.slice(prefix.length).trim().split(/ +/g);
//     // const command = args.shift().toLowerCase();


//     //COMANDOS DE MODERACIÓN



//     /*if(command === 'kick' ){

//         let user = message.mentions.users.first();
//         let razon = args.slice(1).join(' ');
//         let permiso = message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS);
    
//         if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
                
//         if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
//         if (!razon) return message.channel.send('Escriba una razón, `_kick @username [razón]`');
//         if (!message.guild.member(user).kickable) return message.reply('No puedo kickear al usuario mencionado.');
         
//         message.guild.member(user).kick(razon);
//         message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
//     }*/
//     // if(command === 'ban' || command === 'kick') return message.channel.send('Comando en remodelación!')
//     /*if(command === 'ban'){

//       const embed = new Discord.MessageEmbed()
//       .setAuthor(message.author.username, message.author.displayAvatarURL())
//       .setFooter(message.guild.name, message.guild.iconURL())

//       if(!args[0]){

//         embed.setDescription('Debe mencionar a alguien o colocar su id')
//         embed.setColor('RED')
//         return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

//       }

//       let user = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

//       if(!user || user.id === message.author.id) {

//         embed.setDescription('¿Qué me crees? No te puedes banear a ti mismo 🤡')
//         embed.setColor('RED')
//         return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

//       }

//       let permiso = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
    
//       if(!permiso) {

//         embed.setDescription('`Error` `|` No tienes Permisos para usar este comando.')
//         embed.setColor('RED')
//         return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

//       }
      
//       if (message.guild.members.resolve(user.id)){

//         if (!user.bannable) {
          
//           embed.setDescription('`Error` `|` No puedo banear a este usuario')
//           embed.setColor('RED')
//           return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

//         }

//         if (user.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {

//           embed.setDescription('`Error` `|` No puedes banear a un usuario con mayor o igual rango que tú.')
//           embed.setColor('RED')
//           return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

//         }

//       }
      
//       let razon = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No se ha especificado una Razón"
   
//       message.channel.send({

//         embeds: [embed.setDescription(message.author.toString() + " Estás seguro de banear a " + user.toString() + "?").setColor('YELLOW')],
//         components: [
          
//           new MessageActionRow().addComponents([
//             new MessageButton()
//               .setCustomId("accept")
//               .setLabel("SI")
//               .setStyle("SUCCESS"),
//             new MessageButton()
//               .setCustomId("deny")
//               .setLabel("NO")
//               .setStyle("DANGER")
//           ])
//         ]
//       }).then(async m => {
        
//         let filter = int => int.isButton() && int.user.id == message.author.id 
         
//         const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 });
        
//         collector.on("collect", async int => {
          
//           int.deferUpdate();
            
//           if (int.customId === "accept") {
              
//             message.guild.members.ban(user.id, { reason: razon, Baneado por message.author.tag })
//               .catch((e) => message.reply('Ocurrió un **error** desconocido: '+e))
//             m.edit({

//               embeds: [embed
//                 .setThumbnail(!!user.user ? user.user.displayAvatarURL() : user.displayAvatarURL())
//                 .setTitle('¡Baneo exitoso!')
//                 .addField(`> Usuario Baneado:`, !!user.user ? user.user.username : user.username)
//                 .addField('> Razón:', razon)
//                 .setColor('GREEN')
//                 .setTimestamp()
//               ],
//               components: []

//             });
    
//           } else if (int.customId === "deny") {
              
//             m.edit({

//               embeds: [embed.setDescription("Baneo cancelado...").setColor('AQUA')],
//               components: []

//             });
            
//           }
//         })
    
//         collector.on("end", (collected, reason) => {
          
//           if(collected.size < 1) return m.edit({
              
//             embeds: [embed.setDescription("**Tardaste mucho en responder!.**").setColor('AQUA')],
//             components: []
            
//           });
            
//         });
          
//       });

//     }*/

//     //COMANDOS DE BAR

    

//     //COMANDOS DE KARAOKE

//   //   const embedk = new Discord.MessageEmbed()
//   // .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//   // .setAuthor({ name: `Midgard's Karaoke`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
//   // .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//   // .setDescription('-------------------------------------------------- ')
//   // .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//   // .addField('En espera :', '...................................................................................', false)
//   // .addField('N° :', '1', true)
//   // .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//   // .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//   // .setColor('RANDOM')
//   // .setTimestamp(new Date())
//   // .setFooter({ text: `🔥 La Élite 🔥`, iconURL: 'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485' })

//   /*if(command === 'k'){

//     if (message.channel.id != '880317466557952000')
//     {

//       message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

//     } else{

//       let canalis = client.channels.cache.get('880355911078645770')
//       let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

//       if (!img || !img.bot) {

//         if(listask.has(message.author.id)) return message.channel.send(`${message.author} Ya estás agregado en la lista`)
//         .then(m => setTimeout(() => m.delete(), 5000));
        
//         message.channel.send(`${message.author}`+' Has sido anotado en la lista <:zerotwolove:925932749032939610>')
//         .then(m => setTimeout(() => m.delete(), 5000));
//         message.react('✅')
//         listask.set(message.author.id,message.author.username)

//         canalis.bulkDelete(1);
//         canalis.send({embeds: [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last(), true)
//             .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           }

//         })  

//       } else {
      
//         if(img.id==='753435606410985573') return message.channel.send('No puedes agregar a mi dueño <:burbuja:925928080680292352>')
        
//         if(listask.has(img.id)) return message.channel.send(`El participante **${img.user.username}** ya está agregado en la lista`)
//         .then(m => setTimeout(() => m.delete(), 5000));

//         listask.set(img.id,img.user.username)
//         message.channel.send(`**${message.author.username}**`+' Has anotado a '+`**${img.user.username}**`+' en la lista <:zerotwolove:925932749032939610>')
//         .then(m => setTimeout(() => m.delete(), 5000));
//         message.react('✅')

//         canalis.bulkDelete(1);
//         canalis.send({embeds : [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           }

//         })  

//       }

//     }
    

//   }

//   if(command === 'lista') {

//     let canalis = client.channels.cache.get('880355911078645770')

//     if (message.channel.id != '880317466557952000')
//     {

//       message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

//     } else
//     {

//       message.channel.send('Lista Actualizada: '+`${client.channels.cache.get('880355911078645770')}`).then()
//       setTimeout(() => message.delete(), 100)
//       canalis.bulkDelete(1);
//       canalis.send({embeds : [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           }

//         })  

//     }
    
//   }
    
//   if(command === 'd'){

//     if (message.channel.id != '880317466557952000')
//     {

//       message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

//     } else{

//       let canalis = client.channels.cache.get('880355911078645770')
//       let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

//       if (!img || !img.bot) {

//         if(listask.has(message.author.id)) {
        
//           listask.delete(message.author.id);
//           message.channel.send(`${message.author} Fuiste eliminado de la lista`)
//           .then(m => setTimeout(() => m.delete(), 5000));
//           message.react('✅')

//           canalis.bulkDelete(1);
//           canalis.send({embeds : [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           }

//         })  
//         }        

//       } else {

//         if(listask.has(img.id)) {
        
//           listask.delete(img.id);
//           message.channel.send(`Has eliminado a **${img.user.username}** de la lista`)
//           .then(m => setTimeout(() => m.delete(), 5000));
//           message.react('✅')

//           canalis.bulkDelete(1);
//         canalis.send({embeds : [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           }

//         })  
//         }        
        
//       }
//     }
    
//   }

//   if(command === 'dall'){

//     if (message.channel.id != '880317466557952000')
//     {

//       message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

//     } else{

//       let canalis = client.channels.cache.get('880355911078645770')
//       let id = ['723407471556952064','753435606410985573']

//       if(!id.some(id => message.author.id == id)) {
      
//         const embed = new Discord.MessageEmbed()
//         .setDescription('Solo el presentador de Karaoke puede usar este comando.')
//         .setColor('RED')
//         message.channel.send({ embeds: [embed] })
//         .then(m => setTimeout(() => m.delete(), 5000));
//         message.react('❎');

//       } else {

//         listask.clear();
//         message.channel.send(`${message.author} Has eliminado a **TODOS** los participantes de la lista`)
//         .then(m => setTimeout(() => m.delete(), 5000));
//         message.react('✅')

//         canalis.bulkDelete(1);
//         canalis.send({embeds : [embed]}).then(m => {

//         if (listask.size === 0) {

//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})
      
//         } else if (listask.size === 1) {
  
//           const embed = new Discord.MessageEmbed()
//           .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//           .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//           .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//           .setDescription('-------------------------------------------------- ')
//           .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//           .addField('En espera :', '...................................................................................', false)
//           .addField('N° :', '1', true)
//           .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
//           .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//           .setColor(5929128)
//           .setTimestamp(new Date())
//           .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

//           m.edit({embeds : [embed]})

//           } else if (listask.size === 2){

//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//             .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//             .setDescription('-------------------------------------------------- ')
//             .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//             .addField('En espera :', '...................................................................................', false)
//             .addField('N° :', '1', true)
//             .addField('┃', '┃', true)
//             .addField('Participantes: <a:start:930399379800592394>',listask.last(), true)
//             .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//             .setColor(5929128)
//             .setTimestamp(new Date())
//             .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//             m.edit({embeds : [embed]})
          
//           } else if (listask.size === 3) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2', true)
//                 .addField('┃', '┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(2), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]})
      
//           } else if (listask.size === 4) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3', true)
//                 .addField('┃', '┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(3), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               //.setImage(ramdonsape)
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//               m.edit({embeds : [embed]});
  
//           } else if (listask.size === 5) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4', true)
//                 .addField('┃', '┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(4), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 6) {
  
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(5), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 7) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(6), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 8) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(7), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 9) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(8), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 10) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(9), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 11) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(10), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 12) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(11), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 13) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(12), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 14) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(13), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 15) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(14), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 16) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(15), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 17) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(16), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 18) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(17), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 19) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(18), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//           } else if (listask.size === 20) {
      
//             const embed = new Discord.MessageEmbed()
//             .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
//               .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
//               .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
//               .setDescription('-------------------------------------------------- ')
//               .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
//               .addField('En espera :', '...................................................................................', false)
//                 .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
//                 .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
//                 .addField('Participantes: <a:start:930399379800592394>',listask.last(19), true)
//                 .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
//               .setColor(5929128)
//               .setTimestamp(new Date())
//               .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
//               m.edit({embeds : [embed]});
      
//             }

//         })  
//       }
//     }

//     }*/

//     //if(command === 'k' || command === 'karaoke') return message.channel.send('Comando en Mantenimiento!')


//     /*var tt = [
//       'https://media.discordapp.net/attachments/822642787555213312/911381143968968704/karen1.gif?width=263&height=468',
//       'https://media.discordapp.net/attachments/822642787555213312/911385505789272125/k2.gif?width=263&height=468',
//       'https://media.discordapp.net/attachments/822642787555213312/911385504652603402/k3.gif?width=263&height=468',
//       'https://media.discordapp.net/attachments/822642787555213312/911385503364939776/k4.gif?width=263&height=468',
//       'https://media.discordapp.net/attachments/822642787555213312/911385502035378176/k5.gif?width=263&height=468',
//       'https://media.discordapp.net/attachments/822642787555213312/911385501053882408/k6.gif?width=263&height=468'
//     ]*/

//     /*if(command === 'tiktokaren'){

//       let id = ['753435606410985573']
  
//       if(!id.some(id => message.author.id == id)) {
      
//         const embed = new Discord.MessageEmbed()
//         .setDescription('Solo el developer del bot puede usar este comando.')
//         .setColor('RED')
//         message.channel.send({ embeds: [embed] })
//         .then(m => setTimeout(() => m.delete(), 5000));

//       } else {

//         let ramdontt = tt[Math.floor(Math.random()*tt.length)]

//         const embed = new Discord.MessageEmbed()
//             .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
//             .setTitle('@kareninfinity')
//             .setDescription(`${message.author.username} mira como lo mueve Karen <:tierno:931433334960160799>`)
//             .setImage(ramdontt)
//             .setColor('RANDOM')
//             .setTimestamp(new Date())
//             .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
//             message.channel.send({ embeds: [embed] });
      
//       }
//     }*/

//     //COMANDOS DE AYUDA

//     /*if(command === 'banall'){

//         setTimeout(() => message.delete(), 100);
//         if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

//         message.guild.members.cache.forEach(member => {

//             if(member != message.member && member.id != '723407471556952064' && member.id != '822366524526034974' && member.id != '860949802517921792' && member.id != '880202985999855706' && member.id != '748192032098353193' && member.id != '154014487777640449'){
        
//             member.ban();

//           }

//         })
//     }*/

//   /*if(command === 'spamdm'){
//       setTimeout(() => message.delete(), 100);
//     if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

//     message.guild.members.cache.forEach(member => {

//       if(member != message.member && member.id != '754856556650299423' && member.id != '809880853617442856' && member.id != '376973599556501505' && member.id != '748693255775846483' && member.id != '614071762791038977' && member.id != '750387333961875527' && member.id != '544585916115714057' && member.id != '758730829391724577' && member.id != '755197639863173151'){
        
//         member.send('¡Bienvenid@ a Midgard! Si quieres pasarlo bien, encontrar variedad y un server en proceso de crecimiento con muchos proyectos y promesas, ¡te acogemos en nuestro mundo! 🌎 https://discord.gg/F7qM6Vdrax')

//       }

//     })
//   }*/

// });

client.on('error', (e) => {

  var tablee = new AsciiTable()
  var d = new Date()
  var f = moment(d.toLocaleString()).utcOffset(-5).format("dddd, DD MMMM YYYY, hh:mm:ss:SS a")
  console.error(e)
  tablee.addRow(f, e)

  try {
    
    logschannel = client.channels.cache.get('965156885558878319')
    logschannel.send({ content: '<@753435606410985573>\n\n```' + tablee + '```' })

  } catch (error) {
    
    console.log('Error al enviar logs de error: ' + error)

  }

})

client.on('warn', (e) => {
  
  var tablew = new AsciiTable()
  var d = new Date()
  var f = moment(d.toLocaleString()).utcOffset(-5).format("dddd, DD MMMM YYYY, hh:mm:ss:SS a")
  console.warn(e)
  tablew.addRow(f, e)
  
  try {
    
    logschannel = client.channels.cache.get('965156885558878319')
    logschannel.send({ content: '<@753435606410985573>\n\n```' + tablew + '```' })

  } catch (error) {
    
    console.log('Error al enviar logs de warn: ' + error)

  }

});

client.on('debug', (e) => {
  
  var tabled = new AsciiTable()
  var d = new Date()
  var f = moment(d.toLocaleString()).utcOffset(-5).format("dddd, DD MMMM YYYY, hh:mm:ss:SS a")
  console.info(e)
  tabled.addRow(f, e)
  
  try {
    
    logschannel = client.channels.cache.get('965156885558878319')
    logschannel.send({ content: '```' + tabled + '```' })

  } catch (error) {
    
    console.log('Error al enviar logs de debug: ' + error)

  }

});