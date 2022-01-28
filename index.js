const Discord = require('discord.js');

const { Permissions } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ allowedMentions: { parse: ['users'], repliedUser: true }, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES] });

const newUsers = new Discord.Collection();
const listask = new Discord.Collection();
 
client.snipes = new Discord.Collection()

const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();

const red = require('reddit-fetch');

const over = require('poke-over');


const prefix = process.env.PREFIX;
const { MessageActionRow, MessageButton } = require('discord.js');
const dbv = require('megadb');
const bl = new dbv.crearDB('blacklist');

/*const moment = require('moment');
require('moment-duration-format');*/

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

['commandHandler','eventHandler'].forEach((file) => {

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


client.on('messageCreate', async message => {

      //AQUÍ

    if(!message.content.startsWith(process.env.PREFIX)) return;
    
    //const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


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

    if(command === 'poll'){

    const split = args.slice(1).join(' ').split('-');

    if(!split[0]) return message.channel.send({embeds: [
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('RED')
      .setDescription('<a:alerta:932374957206421614> `|` Ingrese una pregunta!\n\n Uso: `' +prefix +'poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    ]})

    if(!split[1]) return message.channel.send({embeds: [
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('RED')
      .setDescription('<a:alerta:932374957206421614> `|` Necesitas ingresar al menos 2 opciones!\n\n Uso: `' +prefix +'poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    ]})

    if(!split[2]) return message.channel.send({embeds: [
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('RED')
      .setDescription('<a:alerta:932374957206421614> `|` Necesitas ingresar al menos 2 opciones!\n\n Uso: `' +prefix +'poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    ]})

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`Encuesta realizada por: <@${message.author.id}>`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle('**' + split[0] + '**')
    .addField('<a:uno:932368116749594674> **' + split[1] + '**', '..........')
    .addField('<a:dos:932368203458445362> **' + split[2] + '**', '..........')
    .setTimestamp(new Date())
    .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

    if (!split[2]) return message.channel.send({embeds: [
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('RED')
      .setDescription('<a:alerta:932374957206421614> `|` Uso: `' +prefix +'poll - pregunta - opción1 - opción2 - opción3 [opcional]... `')
    ]})

    if (split[3]) embed.addField('<a:tres:932368254335340614> **' + split[3] + '**', '..........');
    if (split[4]) embed.addField('<a:cuatro:932368291249397780> **' + split[4] + '**', '..........');
    if (split[5]) embed.addField('<a:cinco:932368321578426449> **' + split[5] + '**', '..........');
    if (split[6]) embed.addField('<a:seis:932368350187757671> **' + split[6] + '**', '..........');
    if (split[7]) embed.addField('<a:siete:932368376909693008> **' + split[7] + '**', '..........');
    if (split[8]) embed.addField('<a:ocho:932368405372223528> **' + split[8] + '**', '..........');
    if (split[9]) embed.addField('<a:nueve:932368436774981642> **' + split[9] + '**', '..........');

    if (split[10]) return message.channel.send({embeds: [
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor('RED')
      .setDescription('<a:alerta:932374957206421614> `|` Demasiadas opciones!')
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

  /*if (command === 'votacion'){

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

      if (tiempo === '' && votar === '') return message.reply('¡No puedo desplegar un voto sin parametros! Uso: _votacion (#canal) [tiempo en segundos] [tema]');
      if (votar === '') return message.reply('¡No puedo desplegar un voto sin parametros! Uso: _votacion (#canal) [tiempo en segundos] [tema]');

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
      .setAuthor(`Iniciado/a por: <@${message.author.id}>`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(votar)
      .setDescription('¡Vota ahora!')
      .setTimestamp(new Date())
      .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

      let msg = await canal.send({
        embeds: embed
      });
      await msg.react(acuerdo);
      await msg.react(desacuerdo);

      const reacciones = await msg.awaitReactions(reaction => reaction.emoji.name === acuerdo || reaction.emoji.name === desacuerdo, {
        time: tiempo
      });

      var no = reacciones.get(desacuerdo);
      var yes = reacciones.get(acuerdo);

      if (no === undefined) {
        var no = 1;
      } else {
        var no = reacciones.get(desacuerdo).count;
      }
        if (yes === undefined) {
            var yes = 1;
        } else {
            var yes = reacciones.get(acuerdo).count;
        }

        var total = yes > no ? 'Positivo.' : 'Negativo.';
        if (yes === no) total = 'Empate.';

        const embed2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Iniciado/a por: ${message.author}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${votar.replace(/([^\W_]+[^\s-]*) *//*g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}`)
        .setDescription('**----------------------------------------**\n' +
                'Votos totales (Sí): ' + `${yes - 1}\n` +
                'Votos totales (No): ' + `${no - 1}\n` +
                '**----------------------------------------**', true)
        .addField('Resultado:',`${total}\n`+'**----------------------------------------**', true)
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        await msg.edit('¡Votacion terminada!', {
          embed: embed2
        });

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
          .addField('Nombre:', `<a:flech:931432469935312937> ${role.name}`) 
          .addField('ID:', `<a:flech:931432469935312937> ${role.id}`) 
          .addField('Miembros con el Rol:', `<a:flech:931432469935312937> ${role.members.size}`)
          .addField('Posición:', `<a:flech:931432469935312937> ${role.rawPosition}`) 
          .addField('HexColor:', `<a:flech:931432469935312937> ${role.hexColor}`)  
          .addField('¿Mencionable?:', `<a:flech:931432469935312937> `+boolean[role.mentionable])
          .addField('¿Separado?:', `<a:flech:931432469935312937> `+boolean[role.hoist])
          .addField('¿Gestionado por el sistema?:', `<a:flech:931432469935312937> `+boolean[role.managed]) 
            
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
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
          .addField('Nombre:', `<a:flech:931432469935312937> ${role.name}`) 
          .addField('ID:', `<a:flech:931432469935312937> ${role.id}`) 
          .addField('Miembros con el Rol:', `<a:flech:931432469935312937> ${role.members.size}`)
          .addField('Posición:', `<a:flech:931432469935312937> ${role.rawPosition}`) 
          .addField('HexColor:', `<a:flech:931432469935312937> ${role.hexColor}`)  
          .addField('¿Mencionable?:', `<a:flech:931432469935312937> `+boolean[role.mentionable])
          .addField('¿Separado?:', `<a:flech:931432469935312937> `+boolean[role.hoist])
          .addField('¿Gestionado por el sistema?:', `<a:flech:931432469935312937> `+boolean[role.managed]) 
            
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
        /*let miembroroles = message.guild.roles.cache.get(role.id).members;
        message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);*/
        message.channel.send({ embeds: [embed] })
        
    }
    
    /*if(command === 'addrol'){
    
        let miembro = message.mentions.users.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find(n => n.name === nombrerol);
        let perms = message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES_OR_PERMISSIONS);
    
        if(!perms) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `_addrol @username [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.addRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);
    
    }
    
    if(command === 'removerol'){
    
        let miembro = message.mentions.users.first();
        let nombrerol = args.slice(1).join(' ');
    
        let role = message.guild.roles.cache.find(n => n.name === nombrerol);
        let perms = message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES_OR_PERMISSIONS);
    
        if(!perms) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `_removerol @miembro [rol]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.removeRole(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido  correctamente.`);
    
    }*/

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
    
            setTimeout(() => message.delete());
            
            if (!args[0]) return message.channel.send(`Por Favor, especifica una cantidad`)
                .then(m => setTimeout(() => m.delete(), 5000));
    
            if (isNaN(args[0])) return message.channel.send(`Por favor, ingresa un número`)
                .then(m => setTimeout(() => m.delete(), 5000));
    
            if (args[0] > 100) return message.channel.send(`No puedo eliminar más de 100 mensajes`)
                .then(m => setTimeout(() => m.delete(), 5000));

            if (args[0] < 1)
                    return message.channel.send(`Ingresa un número mayor a 0`)
                    .then(m => setTimeout(() => m.delete(), 5000));
          
            await message.channel.messages.fetch({ limit: args[0] }).then(
              (messages) => {

                message.channel.bulkDelete(messages)

              }
            );

            message.channel.send('```'+ args[0] +' mensajes han sido borrados.'+'```')
            .then(msg => setTimeout(() => msg.delete(), 5000));

        }
    
    }

    /*if(command === 'kick' ){

        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
        let permiso = message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS);
    
        if(!permiso) return message.channel.send('`Error` `|` No tienes Permisos para usar este comando.');
                
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.channel.send('Escriba una razón, `_kick @username [razón]`');
        if (!message.guild.member(user).kickable) return message.reply('No puedo kickear al usuario mencionado.');
         
        message.guild.member(user).kick(razon);
        message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
    }*/
    if(command === 'ban' || command === 'kick') return message.channel.send('Comando en remodelación!')
    /*if(command === 'ban'){

      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setFooter(message.guild.name, message.guild.iconURL())

      if(!args[0]){

        embed.setDescription('Debe mencionar a alguien o colocar su id')
        embed.setColor('RED')
        return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

      }

      let user = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if(!user || user.id === message.author.id) {

        embed.setDescription('¿Qué me crees? No te puedes banear a ti mismo 🤡')
        embed.setColor('RED')
        return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

      }

      let permiso = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
    
      if(!permiso) {

        embed.setDescription('`Error` `|` No tienes Permisos para usar este comando.')
        embed.setColor('RED')
        return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

      }
      
      if (message.guild.members.resolve(user.id)){

        if (!user.bannable) {
          
          embed.setDescription('`Error` `|` No puedo banear a este usuario')
          embed.setColor('RED')
          return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

        }

        if (user.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {

          embed.setDescription('`Error` `|` No puedes banear a un usuario con mayor o igual rango que tú.')
          embed.setColor('RED')
          return message.channel.send({embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))

        }

      }
      
      let razon = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No se ha especificado una Razón"
   
      message.channel.send({

        embeds: [embed.setDescription(message.author.toString() + " Estás seguro de banear a " + user.toString() + "?").setColor('YELLOW')],
        components: [
          
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
        
        let filter = int => int.isButton() && int.user.id == message.author.id 
         
        const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 30000 });
        
        collector.on("collect", async int => {
          
          int.deferUpdate();
            
          if (int.customId === "accept") {
              
            message.guild.members.ban(user.id, { reason: razon, Baneado por message.author.tag })
              .catch((e) => message.reply('Ocurrió un **error** desconocido: '+e))
            m.edit({

              embeds: [embed
                .setThumbnail(!!user.user ? user.user.displayAvatarURL() : user.displayAvatarURL())
                .setTitle('¡Baneo exitoso!')
                .addField(`> Usuario Baneado:`, !!user.user ? user.user.username : user.username)
                .addField('> Razón:', razon)
                .setColor('GREEN')
                .setTimestamp()
              ],
              components: []

            });
    
          } else if (int.customId === "deny") {
              
            m.edit({

              embeds: [embed.setDescription("Baneo cancelado...").setColor('AQUA')],
              components: []

            });
            
          }
        })
    
        collector.on("end", (collected, reason) => {
          
          if(collected.size < 1) return m.edit({
              
            embeds: [embed.setDescription("**Tardaste mucho en responder!.**").setColor('AQUA')],
            components: []
            
          });
            
        });
          
      });

    }*/

    //COMANDOS DE DIVERSIÓN
    
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


    //COMANDOS DE CAFETERÍA

    
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonjugo = jugo[Math.floor(Math.random()*jugo.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando un delicioso juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman juguito! <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    if(command === 'tacos'){

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdontacos = tacos[Math.floor(Math.random()*tacos.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo unos tacos.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Se me antoja... pero <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un rico taco.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonchocolate = chocolate[Math.floor(Math.random()*chocolate.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un delicioso chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Nos encanta el chocolate! Pero... <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un rico chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdongalletas = galletas[Math.floor(Math.random()*galletas.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** se le antojaron unas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no comen galletas! <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó unas sabrosas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
    if(command === 'helado' || command === 'nieve'){
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhelado = helado[Math.floor(Math.random()*helado.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo un refrescante helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Hace mucho frío! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un poquito de helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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

    if(command === 'hamburguesa' || command === 'burger'){

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhamburguesa = hamburguesa[Math.floor(Math.random()*hamburguesa.length)]
     
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una sabrosa hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no comen carne! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una gran hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonpizza = pizza[Math.floor(Math.random()*pizza.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está comiendo una riquísima pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | La pizza nos causa indigestión! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una sabrosa pizza.`)
            .setImage(ramdonpizza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncocacola = cocacola[Math.floor(Math.random()*cocacola.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está refrescándose con una Coca Cola.`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | La cocacola daña nuestros circuitos! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una Coca Cola... Disfrútala!`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonredbull = redbull[Math.floor(Math.random()*redbull.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está energizándose con un Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Con o sin redbull podemos estar despiertos toda la noche! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una lata de Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncerveza = cerveza[Math.floor(Math.random()*cerveza.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando una cervecita.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman cerveza, no nos causa nada pero igual! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Hey, **${img.user.username}**, disfruta tu cerveza invitada por ${message.author.username}.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonvino = vino[Math.floor(Math.random()*vino.length)]
        
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un rico vino.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Eso si estaría cool! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, aquí te traigo una copa de vino invitado por ${message.author.username}.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdontequila = tequila[Math.floor(Math.random()*tequila.length)]
         
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está disfrutando un tequilita.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Delicioso, pero... <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Hey, **${img.user.username}**, toma este tequila invitado por ${message.author.username}.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonron = ron[Math.floor(Math.random()*ron.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está celebrando con un roncito.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman ron! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, agradécele a ${message.author.username} porque te está invitando un ron.`)
            .setImage(ramdonron)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncoctel = coctel[Math.floor(Math.random()*coctel.length)]
         
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está saboreando su delicioso coctel.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Se ve delicioso! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, disfruta este coctel que te ha invitado ${message.author.username}.`)
            .setImage(ramdoncoctel)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonporro = porro[Math.floor(Math.random()*porro.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está volando con un porro de mota.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no necesitan porro! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, disfruta de esta mota que te ha invitado ${message.author.username}.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncigarro = cigarro[Math.floor(Math.random()*cigarro.length)]
         
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está fumando un cigarrito.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no fuman! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Hey **${img.user.username}**, ${message.author.username} ha compartido un cigarro contigo.`)
            .setImage(ramdoncigarro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhuca = huca[Math.floor(Math.random()*huca.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le apeteció una pipa bien potente.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿Huca? ¿Qué es eso? <:nogarsias:932172183453712415>`)
          ]})
        
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Bar`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, disfruta de la hookah que te invitó ${message.author.username}.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonperreo = perreo[Math.floor(Math.random()*perreo.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está perreando hasta el piso.`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no vamos a fiestas! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te está perreando duro contra el muro. <a:perreom:930719549131735040>`)
            .setImage(ramdonperreo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonbachata = bachata[Math.floor(Math.random()*bachata.length)]
       
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Miren a **${message.author.username}** como disfruta esa bachata.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿Quieres ver como bailo? <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, está bachateando con ${message.author.username}.`)
            .setImage(ramdonbachata)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonsalsa = salsa[Math.floor(Math.random()*salsa.length)]
        let ramdonsalsa2 = salsa2[Math.floor(Math.random()*salsa2.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** salsea como los dioses.`)
            .setImage(ramdonsalsa2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Yo si salseo como los dioses! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}** y ${message.author.username} están salseando juntos.`)
            .setImage(ramdonsalsa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncumbia = cumbia[Math.floor(Math.random()*cumbia.length)]
        let ramdoncumbia2 = cumbia2[Math.floor(Math.random()*cumbia2.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está bailando un pinche cumbión bien loco.`)
            .setImage(ramdoncumbia2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Soy un bot, no bailo! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${img.user.username}** y ${message.author.username} les va bien los pasitos de cumbia.`)
            .setImage(ramdoncumbia)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
        'https://media.discordapp.net/attachments/853500788848853002/874073630051557446/20.gif',
        'https://pornocolegialas.org/wp-content/uploads/2017/03/Gifs-de-Colegialas-encueradas-jovencitas-ardientes-12.gif',
        'https://c.tenor.com/7kVk6UGlzQgAAAAC/twerk-twerking.gif',
        'https://c.tenor.com/URGzSpjvC8EAAAAd/twerk-twerking.gif',
        'http://www.gifspx.com/gifs-animados-x/gspx_gfis-de-rubia-con-coletas-y-grandes-tetas-quiere-comertela.gif',
        'https://c.tenor.com/GQyuoR5g9PoAAAAd/twerk-twerking.gif',
        'https://nenastetonas.com/wp-content/uploads/2016/07/tumblr_o5c1n2mSdS1tobld4o2_400.gif',
        'https://c.tenor.com/pbkNo-XY6rEAAAAM/sofia-gomez.gif',
        'https://c.tenor.com/FL3tKO2fKNAAAAAd/tiktok-pigtails.gif',
        'https://c.tenor.com/cPX0dpKPyb8AAAAM/tiktok.gif',
        'https://c.tenor.com/KXhx7sQ5GLAAAAAM/tiktok.gif',
        'https://culosonline.com/wp-content/uploads/2021/07/Naughty-4-019.gif',
        'https://i.imgbox.com/wp6weOKl.gif',
        'https://pornocolegialas.org/wp-content/uploads/2017/03/Gifs-de-Colegialas-encueradas-jovencitas-ardientes-2.gif',
        'https://cdn.sex.com/images/pinporn/2018/04/01/19313693.gif?width=620',
        'https://cdn.sex.com/images/pinporn/2021/10/07/26023884.gif?width=620',
        'https://j.gifs.com/KkwRo2.gif',
        'https://culosonline.com/wp-content/uploads/2021/07/Naughty-4-019.gif',
        'https://vayagifporno.com/wp-content/uploads/2021/05/Gifs-calientes-Remy-LaCroix.gif'
    ]
    
    if(command === 'colegiala'){
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncolegiala = colegiala[Math.floor(Math.random()*colegiala.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** pidió una colegiala y no la quiere compartir. <:gaaa:925926944254611487>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Rico, pero <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Opa! **${img.user.username}**, mira esta colegiala que ${message.author.username} te trajo. <:uyy:880315359197024286>`)
            .setImage(ramdoncolegiala)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    //COMANDOS DE REACCIÓN
    

    

    if(command === 'marry'){

      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
      let ramdonp = propuest[Math.floor(Math.random()*propuest.length)]
      let ramdona = acepta[Math.floor(Math.random()*acepta.length)]
      let ramdonr = rechaza[Math.floor(Math.random()*rechaza.length)]
      let ramdonpl = plantado[Math.floor(Math.random()*plantado.length)]

      if (!img || img.id===message.author.id) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¿Te casarías contigo mismo? <:burbujita:930399322183458867>`)
      ]})

      if (img.user.bot) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No puedes casarte con un bot! <:pepemaje:932177727589589013>`)
      ]})

      let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, message.author.id)
      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, img.id)

      if(!usuario1){
 
        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, message.author.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario1 = {idusuario: message.author.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }

      if(!usuario2){
 
        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario2 = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }

      if(usuario1.marry !== 'Soltero(a)' ){

        let id = await client.users.fetch(usuario1.marry)
        
        if(id.id === img.id) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<:GatoLove:925929538863628318> | Que lindo(a) eres! Ya estás casado(a) con **`+img.user.username+'** <:yonofui:931433119859503194>')
        ]})

        else return message.reply({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes contraer matrimonio porque estás casado(a) con **`+id.username+'#'+id.discriminator+'**!!!')
        ]})

      }else {

        if(usuario2.marry !== 'Soltero(a)') return message.reply({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes contraer matrimonio porque <@${img.id}> ya está casado(a)!!!`)
        ]})

      }
   
      message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle('💟 Propuesta de Matrimonio 💍')
          .setDescription(img.toString() + "¿Deseas casarte con "+message.author.toString()+" ?")
          .setImage(ramdonp)
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
        ],
        components: [
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
      
        let filter = int => int.isButton() && int.user.id == img.id 
       
        const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000 });
        
        collector.on("collect", async int => {
          
          int.deferUpdate();
          
          if (int.customId === "accept") {
            
            m.edit({embeds: [
              new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
              .setTitle('👰 Noche de Boda 🤵')
              .setDescription('💖 Felicidades!!! '+img.toString() + " y "+message.author.toString()+". Ahora están casados 🔥.")
              .setImage(ramdona)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
            ], components: []
            });
            
            await client.db.run(`UPDATE usuarios SET marry=? WHERE idusuario=?`, img.id, message.author.id)
            await client.db.run(`UPDATE usuarios SET marry=? WHERE idusuario=?`, message.author.id, img.id)
            
          } else if (int.customId === "deny") {
            
            m.edit({embeds: [
              new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
              .setTitle('💔 Propuesta Rechazada 💔')
              .setDescription(img.toString() + " ha rechazado la propuesta de "+message.author.toString()+" <:yonofui:931433119859503194>")
              .setImage(ramdonr)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
            ],
              components: []
            });
          
          }
        });
  
        collector.on("end", (collected, reason) => {
          
          if(collected < 1) return m.edit({embeds: [
            new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            .setTitle('⌛ Propuesta sin Respuesta 💔')
            .setDescription(img.toString() + " no ha respondido la propuesta de "+message.author.toString()+" <:yonofui:931433119859503194>")
            .setImage(ramdonpl)
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
          ],components: []
          });
          
        });
        
      });

    }

    var divorce = [
      'https://c.tenor.com/2ik7IJDoQrQAAAAC/divorce.gif',
      'https://c.tenor.com/Cx_Ds0yy8CcAAAAC/divorce-kim.gif',
      'https://media4.giphy.com/media/l1KcP7rHsbSlIeAw0/giphy.gif',
      'https://media1.giphy.com/media/YWm8PxAIcJ6sgLF7nj/giphy.gif',
      'https://i2.wp.com/expatpanda.com/wp-content/uploads/2018/11/tenor-1.gif?fit=320%2C320&ssl=1'
    ]

    if(command === 'divorce'){

      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
      let ramdond = divorce[Math.floor(Math.random()*divorce.length)]
      let ramdona = acepta[Math.floor(Math.random()*acepta.length)]
      
      if (!img || img.id===message.author.id) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¿Divorciarte de ti mismo? <:procesando:932177969017925632>`)
      ]})

      if (img.user.bot) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¿Divorciarte de un bot? <:procesando:932177969017925632>`)
      ]})

      let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, message.author.id)
      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, img.id)

      if(!usuario1){
 
        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, message.author.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario1 = {idusuario: message.author.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }

      if(!usuario2){
 
        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario2 = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }

      if(usuario1.marry !== 'Soltero(a)' ){
        
        if(usuario1.marry === img.id) {

          message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            .setTitle('💔 Propuesta de Divorcio 💔')
            .setDescription(message.author.toString()+' ¿Estás seguro de querer divorciarte de '+img.toString()+" ?")
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
          ],
          components: [
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
        
          let filter = int => int.isButton() && int.user.id == message.author.id 
         
          const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000 });
          
          collector.on("collect", async int => {
            
            int.deferUpdate();
            
            if (int.customId === "accept") {
              
              m.edit({embeds: [
                new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
                .setTitle('🖤 Divorcio Completado 🤵')
                .setDescription('💥 Felicidades!!! '+message.author.toString() + " Te has divorciado correctamente de "+img.toString()+" 🔥")
                .setImage(ramdond)
                .setTimestamp(new Date())
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
              ], components: []
              });
              
              await client.db.run(`UPDATE usuarios SET marry=? WHERE idusuario=?`, 'Soltero(a)', message.author.id)
              await client.db.run(`UPDATE usuarios SET marry=? WHERE idusuario=?`, 'Soltero(a)', img.id)
              
            } else if (int.customId === "deny") {
              
              m.edit({embeds: [
                new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
                .setTitle('❤ Divorcio Rechazao 💟')
                .setDescription('Aún hay esperanzas en el amor... '+message.author.toString() + " aún sigues casado con "+img.toString()+" <:tierno:931433334960160799>")
                .setImage(ramdona)
                .setTimestamp(new Date())
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif')
              ],
                components: []
              });
            
            }
          });
    
          collector.on("end", (collected, reason) => {
            
            if(collected < 1) return m.edit({components: []});
            
          });
          
          });

        } else {

          message.channel.send({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<:GatoLove:925929538863628318> | No estás casado(a) con **`+img.user.username+'** <:yonofui:931433119859503194>')
            
          ]})
        }

      } else {

        message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:Verify2:931463492677017650> | No puedes divorciarte porque no estás casado con alguien!!!')
        ]})

      }
   

    }
  


    //COMANDOS DE KARAOKE

    const embedk = new Discord.MessageEmbed()
  .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
  .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
  .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
  .setDescription('-------------------------------------------------- ')
  .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
  .addField('En espera :', '...................................................................................', false)
  .addField('N° :', '1', true)
  .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
  .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
  .setColor('RANDOM')
  .setTimestamp(new Date())
  .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

  /*if(command === 'k'){

    if (message.channel.id != '880317466557952000')
    {

      message.channel.send('Ese comando solo se acepta en este canal : '+`${client.channels.cache.get('880317466557952000')}`);

    } else{

      let canalis = client.channels.cache.get('880355911078645770')
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if (!img || !img.bot) {

        if(listask.has(message.author.id)) return message.channel.send(`${message.author} Ya estás agregado en la lista`)
        .then(m => setTimeout(() => m.delete(), 5000));
        
        message.channel.send(`${message.author}`+' Has sido anotado en la lista <:zerotwolove:925932749032939610>')
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('✅')
        listask.set(message.author.id,message.author.username)

        canalis.bulkDelete(1);
        canalis.send({embeds: [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          }

        })  

      } else {
      
        if(img.id==='753435606410985573') return message.channel.send('No puedes agregar a mi dueño <:burbuja:925928080680292352>')
        
        if(listask.has(img.id)) return message.channel.send(`El participante **${img.user.username}** ya está agregado en la lista`)
        .then(m => setTimeout(() => m.delete(), 5000));

        listask.set(img.id,img.user.username)
        message.channel.send(`**${message.author.username}**`+' Has anotado a '+`**${img.user.username}**`+' en la lista <:zerotwolove:925932749032939610>')
        .then(m => setTimeout(() => m.delete(), 5000));
        message.react('✅')

        canalis.bulkDelete(1);
        canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
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
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
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
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

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
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
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
          message.channel.send(`Has eliminado a **${img.user.username}** de la lista`)
          .then(m => setTimeout(() => m.delete(), 5000));
          message.react('✅')

          canalis.bulkDelete(1);
        canalis.send({embeds : [embed]}).then(m => {

        if (listask.size === 0) {

          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last() ? listask.last() : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2) ? listask.last(2) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3) ? listask.last(3) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4) ? listask.last(4) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5) ? listask.last(5) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6) ? listask.last(6) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7) ? listask.last(7) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8) ? listask.last(8) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9) ? listask.last(9) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10) ? listask.last(10) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11) ? listask.last(11) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12) ? listask.last(12) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13) ? listask.last(13) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14) ? listask.last(14) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15) ? listask.last(15) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16) ? listask.last(16) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17) ? listask.last(17) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18) ? listask.last(18) : 'No hay nadie más agregado', true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19) ? listask.last(19) : 'No hay nadie más agregado', true)
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
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> No hay nadie agregado ', false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})
      
        } else if (listask.size === 1) {
  
          const embed = new Discord.MessageEmbed()
          .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
          .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
          .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
          .setDescription('-------------------------------------------------- ')
          .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
          .addField('En espera :', '...................................................................................', false)
          .addField('N° :', '1', true)
          .addField('Participantes: <a:start:930399379800592394>', 'No hay nadie más agregado', true)
          .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
          .setColor(5929128)
          .setTimestamp(new Date())
          .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');

          m.edit({embeds : [embed]})

          } else if (listask.size === 2){

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
            .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
            .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
            .setDescription('-------------------------------------------------- ')
            .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
            .addField('En espera :', '...................................................................................', false)
            .addField('N° :', '1', true)
            .addField('┃', '┃', true)
            .addField('Participantes: <a:start:930399379800592394>',listask.last(), true)
            .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
            .setColor(5929128)
            .setTimestamp(new Date())
            .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
            m.edit({embeds : [embed]})
          
          } else if (listask.size === 3) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2', true)
                .addField('┃', '┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(2), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]})
      
          } else if (listask.size === 4) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3', true)
                .addField('┃', '┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(3), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              //.setImage(ramdonsape)
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              m.edit({embeds : [embed]});
  
          } else if (listask.size === 5) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4', true)
                .addField('┃', '┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(4), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 6) {
  
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(5), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 7) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(6), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 8) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(7), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 9) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(8), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 10) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(9), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 11) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(10), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 12) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(11), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 13) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(12), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 14) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(13), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 15) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(14), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 16) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(15), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 17) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(16), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 18) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(17), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 19) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(18), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
          } else if (listask.size === 20) {
      
            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://prodimages.everythingneon.com/giant/l100-0250-karaoke-logo-led-sign.gif')
              .setAuthor(`Midgard's Karaoke`,message.guild.iconURL({ dynamic: true }))
              .setTitle('Lista de participantes <a:corazonBlack_FD:880526799736557679>')
              .setDescription('-------------------------------------------------- ')
              .addField('Turno de : <a:Microfono:880524826459140126>', '<a:flechad:880330587678838784> '+listask.first(), false)
              .addField('En espera :', '...................................................................................', false)
                .addField('N° :', '1\n2\n3\n4\n5\n6\n7\n8\9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19', true)
                .addField('┃', '┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃\n┃', true)
                .addField('Participantes: <a:start:930399379800592394>',listask.last(19), true)
                .setImage('https://c.tenor.com/GMAIgevURGQAAAAd/peter-griffin-karaoke.gif')
              .setColor(5929128)
              .setTimestamp(new Date())
              .setFooter(`🔥 La Élite 🔥`,'https://media.discordapp.net/attachments/840161683732693033/880292518690963466/GTA-5-city-at-night-purple-style-skyscrapers_3840x2160.jpg?width=862&height=485');
              m.edit({embeds : [embed]});
      
            }

        })  
      }
    }

    }*/

    if(command === 'k' || command === 'karaoke') return message.channel.send('Comando en Mantenimiento!')


    //ACCESO VIP

    var idm = ['753435606410985573']

    if(command === 'addvip')
    {

        if(!idm.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.users.first();

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
    
        let user = message.mentions.users.first();

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
            .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
            .setTitle('@kareninfinity')
            .setDescription(`${message.author.username} mira como lo mueve Karen <:tierno:931433334960160799>`)
            .setImage(ramdontt)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
      }
    }*/

    
    
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

    /*if(command === 'trivia'){

      let ramdonf = pregf[Math.floor(Math.random()*pregf.length)]

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
        .setTitle('Trivia de Fútbol')
        .setDescription(`${message.author.username} la pregunta es la siguiente: ${ramdonf}\n Tienes 30 segundos para responder!`)
        //.setImage(ramdonc)
        .setColor('RANDOM')
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

    }*/


    //ejemplo
    //if(!vip.tiene(message.author.id) return message.channel.send('¡No tienes VIP, no puedes utilizar esta función!')
    //message.channel.send('¡Funciona!')

    //LISTA NEGRA

    var idma = ['753435606410985573','723407471556952064','748192032098353193']

    if(command === 'addbl')
    {

        if(!idma.some(id => message.author.id == id)) return message.channel.send('No tienes acceso a este comando.')
    
        let user = message.mentions.users.first();

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
    
        let user = message.mentions.users.first();

        if(message.mentions.users.size < 1 || !user) return message.channel.send ('¡Debes mencionar a un usuario!')

        if(!bl.tiene(`${user.id}`)) return message.reply('Ese usuario no esta en la lista.')

        bl.eliminar(`${user.id}`)

        const embed = new Discord.MessageEmbed()
          .setDescription('El usuario **'+user.user.tag+' ** ha sido elimado de la lista Negra!.')
          .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
    }


    //COMANDOS DE AYUDA

    if(command === 'karaoke'){

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
    .setDescription('Bienvenid@ a la Lista de Comandos y funciones de **MidgardBot**, te invitamos a unirte a nuestro [servidor](https://discord.gg/CM9yAmXPfC) de soporte.\n\nPara ver los comandos, debes clickear al botón respectivo:\n\n> 📌 • Comandos de Información\n> 💡 • Comandos de Utilidad\n> 🔒 • Comandos de Moderación\n> 💰 • Comandos de Economía\n> 🤣 • Comandos de Diversión\n> 😎 • Comandos de Reacción\n> ☕ • Comandos de Cafetería\n> 🥂 • Comandos de Bar\n> 💃 • Comandos de Disco\n> 🔞 • Comandos NSFW\n\n<a:flech:931432469935312937> **Muchas gracias por utilizar nuestro bot** <a:darkcrown2:886466286773739530>')
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
    .setDescription('> **ping**\n> Comprueba la latencia del bot y de tus mensajes.\n\n> **stats**\n> Muestra la info y estado del bot.\n\n> **help | h**\n> Menú de ayuda con los comandos del bot\n\n> **server**\n> Muestra información de un servidor determinado.\n\n> **report**\n> Reportar un bug del bot.\n\n> **suggestion**\n> Enviar una sugerencia para mejorar el bot.\n\n')

  const helputil = new Discord.MessageEmbed()
    .setTitle('💡 • Comandos de Utilidad')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://jonmgomes.com/wp-content/uploads/2020/03/Liquid-Lightbulb-Animation-V2-800x600-1.gif')
    .setColor('RANDOM')
    .setDescription('> **user**\n> Muestra información sobre un usuario mencionado.\n\n> **avatar**\n> Muestra el avatar de un usuario.\n\n> **welcome | wlc**\n> Muestra un embed de bienvenida.\n> Uso:\n> `' +prefix +'welcome <@user>`\n> `' +prefix +'wlc <@user>`\n\n> **remindme | rm**\n> Establece un recordatorio.\n> Uso:\n> `' +prefix +'remindme <tiempo en s,m,h> <recordatorio>`\n\n> **snipe**\n> Recupera el último mensaje eliminado.\n\n> **jumbo**\n> Ver en grande un emoji.\n\n> **poll**\n> Crea una encuenta.\n> Uso:\n> `' +prefix +'poll pregunta / opción1 / opción2 / opción3 [opcional]...`\n\n')
  
  const helpmod = new Discord.MessageEmbed()
    .setTitle('🔒 • Comandos de Moderación')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://elblogdelauz.files.wordpress.com/2018/10/gif-seguridad.gif')
    .setColor('RANDOM')
    .setDescription('> **role**\n> Muestra información de un rol mencionado.\n> Uso:\n> `' +prefix +'role <nombre/@rol>`\n\n> **roleid**\n> Muestra información de un rol por id.\n> Uso:\n> `' +prefix +'roleid <id>`\n\n> **addrol**\n> Agrega un rol a un usuario del servidor.\n> Uso:\n> `' +prefix +'addrol <@user> <rol>`\n\n> **removerol**\n> Remueve un rol a un usuario del servidor.\n> Uso:\n> `' +prefix +'removerol <@user> <rol>`\n\n> **lock**\n> Bloquea un canal del servidor.\n> Uso:\n> `' +prefix +'lock <#canal>`\n\n> **unlock**\n> Desbloquea un canal del servidor.\n> Uso:\n> `' +prefix +'unlock <#canal>`\n\n> **clear**\n> Elimina mensajes de un canal.\n> Uso:\n> `' +prefix +'clear <cantidad>`\n\n> **kick**\n> Expulsa a un miembro mencionado.\n> Uso:\n> `' +prefix +'kick <@user>`\n\n> **ban**\n> Banea a un miembro mencionado.\n> Uso:\n> `' +prefix +'ban <@user>`')
    
  const helpeco = new Discord.MessageEmbed()
    .setTitle('💰 • Comandos de Economía')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/finazas-economia-quieres-ser-un-john-law-1.gif')
    .setColor('RANDOM')
    .setDescription('> **perfil**\n> Muestra tu perfil o el de un usuario.\n\n> **top**\n> Muestra el top de Economía y Stats.\n> Uso:\n> `' +prefix +'top`\n> `' +prefix +'top <cash | xp | rep | pat | hug | sape>`\n\n> **shop**\n> Muestra la tienda del Bot en el servidor.`\n\n> **buy**\n> Compra un item de la tienda.\n> Uso:\n> `' +prefix +'buy <item>`\n\n> **bal | balance**\n> Mira tu balance o el de un usuario en el servidor.\n\n> **work | w**\n> Trabajar para obtener coins.\n\n> **crime**\n> Ejecuta un crimen.\n\n> **rob**\n> Roba a un miembro mencionado.\n> Uso:\n> `' +prefix +'rob <@user>`\n\n> **dep**\n> Deposita tu dinero en el banco.\n> Uso:\n> `' +prefix +'dep <cantidad | all>`\n\n> **with**\n> Retira tu dinero del banco.\n> Uso:\n> `' +prefix +'with <cantidad | all>`\n\n> **daily**\n> Reclama tu recompensa diaria.\n\n> **cock-fight | cf**\n> Apuesta en las peleas de pollos.\n> Uso:\n> `' +prefix +'cf <cantidad | all>`')
  
  const helpdiv = new Discord.MessageEmbed()
    .setTitle('🤣 • Comandos de Diversión')
    .setAuthor('MidgardBot',client.user.avatarURL())
    .setFooter(message.author.username+'#'+message.author.discriminator,message.author.avatarURL())
    .setTimestamp(new Date())
    .setThumbnail('https://i.gifer.com/HqGV.gif')
    .setColor('RANDOM')
    .setDescription('> **say**\n> Hace que el bot diga un mensaje.\n\n> **8ball**\n> El bot responderá a tus preguntas.\n\n> **roll**\n> Lanza un dado al azar.\n\n> **impostor**\n> Averigua quién es el impostor de este mundo.\n\n> **buscaminas**\n> Envía un tablero del clásico juego.\n\n> **ship**\n> Mide tu nivel de amor con un usuario mencionado.\n> Uso:\n> `' +prefix +'ship <@user>`\n\n> **meme**\n> Envía memes al azar.\n\n> **ttt**\n> Clásico Tic Tac Toe.\n> Uso:\n> `' +prefix +'ttt <@user>`\n\n> **infiel**\n> Descubre tu % de infidelidad.\n\n> **berenjena**\n> Descubre cuánto te mide 😈\n\n> **carta**\n> Envía una carta a un usuario con el mensaje que quieras.\n> Para más información ejecuta:\n> `' +prefix +'carta`\n\n> **rae**\n> Busca el significado de cualquier palabra.\n\n')
  
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
    .setDescription('> **hi**\n> Saluda a alguien o a todos.\n\n> **hug**\n> Abraza a alguien o a ti mismo.\n\n> **kiss**\n> Besa a un usuario.\n\n> **happy**\n> Mood Feliz.\n\n> **sleep**\n> Ya tienes sueño?\n\n> **dance**\n> Baila solo o acompañado.\n\n> **blush**\n> Sonrojad@ de nuevo?.\n\n> **confused**\n> Confundido Potter?\n\n> **lick**\n> Dale una lamida a alguien.\n\n> **feed**\n> Dale de comer a alguien.\n\n> **pat**\n> Acaricia a alguien.\n\n> **rep**\n> Da un punto de carisma.\n\n> **sad**\n> Modo Sad.\n\n> **cry**\n> Modo Sad 2.0.\n\n> **suicide**\n> Hacer la automorision.\n\n> **sape**\n> Dale un sape a alguien.\n\n> **punch**\n> Tira un golpe a alguien.\n\n> **kickbut**\n> Dale una patada a alguien.\n\n> **slap**\n> Abofetea a alguien.\n\n> **kill**\n> Mata a un usario.\n\n> **marry**\n> Cásate con un usario.\n\n> **divorce**\n> Divórciate de un usario.')

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
            .setCustomId("eco")
            .setLabel("💰 Economía")
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

  if(command === 'help' || command === 'h'){

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

        } else if (int.customId === "eco") {
          
          m.edit({
            embeds: [helpeco],
            components: [btns_options1]
          });

        } else if (int.customId === "m2") {
          
          m.edit({
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

      collector.on("end", (collected, reason) => {
        
        if(collected.size < 1) return m.edit({
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
  
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
  
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
        .addField('<a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816>', `<a:fijadito:931432134797848607> ${desc}`, false)
        .setImage(imagen)
        .setColor("RANDOM")
        .setFooter(`${message.guild.name}⁞ Monto base: 500k 💰` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
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
        .setDescription(`<a:fijadito:931432134797848607> ${desc}`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .addField(`<a:diamante:887714567084449892> ${f3}`, `${d3}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
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
        .setDescription(`<a:fijadito:931432134797848607> ${desc}`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
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
        .setDescription(`<a:fijadito:931432134797848607>`)
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
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
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
        .setDescription(`<a:fijadito:931432134797848607>`)
        .addField(`<a:diamante:887714567084449892> ${f1}`, `${d1}` , false)
        .addField(`<a:diamante:887714567084449892> ${f2}`, `${d2}` , false)
        .addField(`<a:diamante:887714567084449892> ${f3}`, `${d3}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (command === 'ems1'){

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
        .setThumbnail(`https://i.gifer.com/8AMQ.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:diamante:887714567084449892> ${desc}`)
        .addField(`<a:fijadito:931432134797848607> ${f1}`, `${d1}` , false)
        .addField(`<a:fijadito:931432134797848607> ${f2}`, `${d2}` , false)
        .addField(`<a:fijadito:931432134797848607> ${f3}`, `${d3}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (command === 'ems2'){

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
      let d4 = split[8]
      let d5 = split[9]
      let imagen = split[10]
  
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://i.gifer.com/8AMQ.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:diamante:887714567084449892>`)
        .addField(`<a:fijadito:931432134797848607> ${f1}`, `${d1}` , false)
        .addField(`<a:fijadito:931432134797848607> ${f2}`, `${d2}` , false)
        .addField('\u200B',`<a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816>`, false)
        .addField(`<a:fijadito:931432134797848607> ${f3}`, `${d3}` , false)
        .addField(`<a:diamante:887714567084449892>`, `${d4}` , false)
        .addField(`<a:diamante:887714567084449892>`, `${d5}` , false)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
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
        .setThumbnail(`https://i.gifer.com/8AMQ.gif`)
        .setAuthor(`${autor}`,client.user.displayAvatarURL())
        .setTitle(`${titulo}`)
        .setDescription(`<a:fijadito:931432134797848607> ${desc}`)
        .setColor("RANDOM")
        .setImage(imagen)
        .setFooter(`${message.guild.name}` ,"https://media.discordapp.net/attachments/880312288593195028/902270934499610704/Midgard_GIF_AVATAR.gif");
        message.channel.send({ embeds: [embed] });
        message.delete({timeout: 100})
      
    }

    if (message.content.startsWith(prefix +"reglas")){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.gifer.com/8AMQ.gif')
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTitle(`𝚁𝙴𝙶𝙻𝙰𝚂 𝙳𝙴𝙻 𝚂𝙴𝚁𝚅𝙸𝙳𝙾𝚁`)
        .setDescription(` \n\n
        <a:sparkless:880922179280207934> Somos un server **NO** Tóxico, por tanto, están prohibidas las faltas de respeto a cualquier miembro.\n\n
        <a:sparkless:880922179280207934> El Spam **NO** está permitido, sea dentro del servidor o al DM de los Terrícolas. (Se entiende por Spam: links de otros servidores, maliciosos o publicitarios).\n\n
        <a:sparkless:880922179280207934> Usar adecuadamente cada canal del servidor, evitando el flood de comandos fuera de <#895828102578589716> y contenido NSFW fuera de <#848755526347128872>.\n\n
        <a:sparkless:880922179280207934> Cuidamos la privacidad de cada Terrícola, por tanto **NO** se puede compartir redes sociales o información privada (fotos, nombres, números telefónicos, direcciones IP, ubicación) en los canales del servidor, sin el consentimiento respectivo.\n\n
        <a:sparkless:880922179280207934> Para ver el avatar de cualquier Terrícola, deberás pedir el permiso correspondiente, caso contrario, serás muteado de todos los canales de texto por un tiempo definido por el Staff.\n\n
        <a:sparkless:880922179280207934> Los nombres de usuario, apodos o avatares con contenido sexual explícito o violento **NO** están permitidos. La omisión de esta regla, te puede llevar hasta el baneo indefinido del servidor.\n\n
        <a:sparkless:880922179280207934> Tampoco está permitido el acoso, bullying, amenazas, lenguaje violento u ofensivo, xenofobia, homofobia ni cualquier tipo de discriminación.\n\n
        <a:sparkless:880922179280207934> Por un ambiente tranquilo, **NO** toleramos ningún tipo de sonido molesto, ni entrar y salir constantemente de los canales de voz.\n\n
        <a:sparkless:880922179280207934> Si un miembro de Staff pide cambiar el tema de conversación por considerarlo inapropiado, se deberá hacer, caso contrario, recibirás una sanción correspondiente. Pero si crees que ha habido un abuso de poder, puedes y debes reportarlo en cualquier momento.`)
        .setImage(`https://media.discordapp.net/attachments/840161683732693033/880298925574193162/reglas-del-juego-game-rules.gif?width=448&height=252`)
        .setColor("GREEN")
        .setFooter('¡Pásala bien y Diviértete!')
       message.channel.send({embeds: [embed]});
       setTimeout(() => message.delete(), 100)
    } 
  
    if (message.content.startsWith(prefix +"relite")){
  
      let permiso = message.member.hasPermission("ADMINISTRATOR");
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
        const embed = new Discord.MessageEmbed()
        .setThumbnail("https://cdn.discordapp.com/emojis/897240681075060736.gif")
        .setAuthor('𝙻𝙰 É𝙻𝙸𝚃𝙴', "https://images-ext-1.discordapp.net/external/IzNo1dr-frPAQcFnWvpctrA5HLshMSSpn4xkzUC_gKk/%3Fsize%3D2048/https/cdn.discordapp.com/banners/777620055344545842/4999aa780156b9aa214241948f7ec65a.png?width=832&height=498")
        .setTitle(`<a:FuegoRojo:882761255381790750> 𝐑𝐄𝐆𝐋𝐀𝐒  𝐆𝐄𝐍𝐄𝐑𝐀𝐋𝐄𝐒 <a:FuegoRojo:882761255381790750>`)
        .setDescription("Bienvenido al Equipo!!! Te invitamos a seguir las siguientes reglas, por el bien de la comunidad. <:tierno:881618338759966800>")
        .addField('\u200B','\u200B')
        .addField(`<a:fijadito:931432134797848607> RESPETO`, `<a:sparkless:880922179280207934> Ser respetuosos con sus propios compañeros de equipo y del servidor en general. No importa los rangos ni los roles, **TODOS** somos iguales y merecemos respeto.`, false)
        .addField('\u200B','\u200B')
        .addField(`<a:fijadito:931432134797848607> CONFIDENCIALIDAD`, `<a:sparkless:880922179280207934> Ser cautelosos con lo que se habla en nuestro equipo. Lo que se diga en el canal de texto o voz, debe quedar aquí.`, false)
        .addField('\u200B','\u200B')
        .addField(`<a:fijadito:931432134797848607> COMPROMISO`, `<a:sparkless:880922179280207934> Estar completamente comprometidos con el equipo y sobre todo con el servidor.`, false)
        .addField('\u200B','\u200B')
        .addField(`<a:fijadito:931432134797848607> RESPONSABILIDAD`, `<a:sparkless:880922179280207934> Ser responsable en cada evento o actividad que tengas a cargo, ya sea como Presentador o Soporte.`, false)
        .addField('\u200B','\u200B')
        .addField(`<a:fijadito:931432134797848607> PUNTUALIDAD`, `<a:sparkless:880922179280207934> Iniciar cada evento o actividad a la hora programada, salvo motivo de fuerza mayor que debe avisarse con anterioridad.`, false)
        .addField('\u200B','\u200B')
        .addField('<a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816>',`<a:emoji_115:882776364581785640> La falta contra alguna de las reglas, dependiendo la gravedad, puede llevar a la suspensión temporal hasta permanente del equipo. <a:Sara:880304101215334401>`,false)
        .setImage(`https://images-ext-1.discordapp.net/external/Bk8i6i3GZXEtRbl1nKor8E7mHxwbWf9EnttRysAM_oU/https/c.tenor.com/wVorRymbWc8AAAAC/sigue-las-reglas-vapor.gif`)
        .setColor("RANDOM")
        .setFooter(message.guild.name +" • ¡Que comience el juego!","https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif");
        //.setFooter(`${message.guild.name}`,"https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif");
        message.channel.send(embed);
        message.delete({timeout: 100})
        //console.log("autor: "+autor+" titulo: "+titulo+" emoji1: "+emoji1+" rol1: "+rol1+" emoji2: "+emoji2+" rol2: "+rol2+" imagen: "+imag)
  
    }

    if (command === 'rolesg'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗚𝗲́𝗻𝗲𝗿𝗼`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu género:`)
        .setDescription(`\n\n 💡 ¿Cómo te identificas? 💡\n
        👦 <a:flechad:880330587678838784> <@&816140766345953300>\n\n
        👧 <a:flechad:880330587678838784> <@&816141138922307594>\n\n
        🏳️‍🌈 <a:flechad:880330587678838784> <@&816141333180842007>\n\n`)
        .setColor("RANDOM")
        .setImage('https://images-ext-2.discordapp.net/external/jWGnzp-_kMuK_h_7svc5EVVuafKyCE48-bvJK5fggKw/%3Fwidth%3D562%26height%3D562/https/images-ext-1.discordapp.net/external/tnCC5EhfePEKIobserftTKZfjP9giUm9b5RFw53vPYM/https/static.wixstatic.com/media/b595a3_14d84be3a50f4c2c9fe72be39edef819~mv2.gif?width=450&height=450')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'rolese'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗘𝗱𝗮𝗱`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu edad:`)
        .setDescription(`\n\n 🥱 ¿Legal o Ilegal? 🥵\n
        🔞 <a:flechad:880330587678838784> <@&816168012335022100>\n\n
        😈 <a:flechad:880330587678838784> <@&816167169477312542>`)
        .setColor("RANDOM")
        .setImage('https://images-ext-2.discordapp.net/external/d2pb0CbJdkBTXK8diIE11-HbEjCGCJVuDRM94EbT2xQ/%3Fwidth%3D432%26height%3D227/https/images-ext-2.discordapp.net/external/nRu05pX3UQJa5pvw1X7RAkv6ZNPJ-hqQKEt2dNYTPd4/https/i.gifer.com/fxt5.gif?width=346&height=182')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'rolesp'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗣𝗮𝗶́𝘀`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu país:`)
        .setDescription(`\n\n 🌎 Puedes elegir más de 1... 🌎\n
        🇦🇷 <a:flechad:880330587678838784> <@&816176071661191208>\n\n
        🇧🇷 <a:flechad:880330587678838784> <@&880372263445200906>\n\n
        🇨🇱 <a:flechad:880330587678838784> <@&816174936070160384>\n\n
        🇨🇴 <a:flechad:880330587678838784> <@&816174999219208202>\n\n
        🇨🇷 <a:flechad:880330587678838784> <@&816174581861449758>\n\n
        🇪🇨 <a:flechad:880330587678838784> <@&816177046697934880>\n\n
        🇸🇻 <a:flechad:880330587678838784> <@&880373978517106689>\n\n
        🇪🇸 <a:flechad:880330587678838784> <@&880281489240100896>\n\n
        🇺🇸 <a:flechad:880330587678838784> <@&880372376611733514>\n\n
        🇬🇹 <a:flechad:880330587678838784> <@&816174669811286041>\n\n
        🇭🇳 <a:flechad:880330587678838784> <@&816174284393152522>\n\n
        🇲🇽 <a:flechad:880330587678838784> <@&880311276503449631>\n\n
        🇵🇦 <a:flechad:880330587678838784> <@&880436609286287420>\n\n
        🇵🇾 <a:flechad:880330587678838784> <@&880372257476722728>\n\n
        🇵🇪 <a:flechad:880330587678838784> <@&816174082432303125>\n\n
        🇵🇷 <a:flechad:880330587678838784> <@&880375260120223807>\n\n
        🇩🇴 <a:flechad:880330587678838784> <@&880375722869411840>\n\n
        🇺🇾 <a:flechad:880330587678838784> <@&816176187504197662>\n\n
        🇻🇪 <a:flechad:880330587678838784> <@&816174760131952680>\n\n`)
        .setColor("RANDOM")
        .setImage('https://images-ext-2.discordapp.net/external/iYRJjc56RMtN2RT8BObhMa4odkXJ5igZIoNAPYXJzDE/%3Fwidth%3D518%26height%3D294/https/images-ext-2.discordapp.net/external/bhY7Uhw-axRgouddTIpNW9UlECUhr0jpy-sB_w_sTKQ/%253Fwidth%253D576%2526height%253D327/https/media.discordapp.net/attachments/840161683732693033/880296992289484861/Ataques-mundiales.gif?width=414&height=235')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'roless'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗦𝗶𝗴𝗻𝗼𝘀 𝗭𝗼𝗱𝗶𝗮𝗰𝗮𝗹𝗲𝘀`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu signo:`)
        .setDescription(`\n\n 🔮 ¿Quieres saber tu horóscopo diario? 🔮\n
        ♈ <a:flechad:880330587678838784> <@&880432087973380107>\n\n
        ♉ <a:flechad:880330587678838784> <@&880431618848862278>\n\n
        ♊ <a:flechad:880330587678838784> <@&880431545867988992>\n\n
        ♋ <a:flechad:880330587678838784> <@&880432534746431539>\n\n
        ♌ <a:flechad:880330587678838784> <@&880432484230262795>\n\n
        ♍ <a:flechad:880330587678838784> <@&880431681780219995>\n\n
        ♎ <a:flechad:880330587678838784> <@&880432422183911424>\n\n
        ♏ <a:flechad:880330587678838784> <@&880431441006190613>\n\n
        ♐ <a:flechad:880330587678838784> <@&880431928099102742>\n\n
        ♑ <a:flechad:880330587678838784> <@&880431999851049010>\n\n
        ♒ <a:flechad:880330587678838784> <@&880431859404800000>\n\n
        ♓ <a:flechad:880330587678838784> <@&880431766941347860>\n\n`)
        .setColor("RANDOM")
        .setImage('https://images-ext-2.discordapp.net/external/ED6S9Wyp3YqQDwI8tIskd2XinBL7tNuoZTCWedHiqbo/%3Fwidth%3D389%26height%3D194/https/images-ext-2.discordapp.net/external/JWJjNRSRHIDnkxiVq0PvvnMU08Yw6mYjMohtpNbDZ88/%253Fwidth%253D432%2526height%253D216/https/media.discordapp.net/attachments/840161683732693033/880292308413739018/giphy.gif?width=311&height=155')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'rolesa'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗔𝗰𝘁𝗶𝘃𝗶𝗱𝗮𝗱𝗲𝘀`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu gusto:`)
        .setDescription(`\n\n 🔥 Tenemos actividades todos los días 🔥\n
        🎉 <a:flechad:880330587678838784> <@&880949612175843358>\n\n
        💕 <a:flechad:880330587678838784> <@&880949777569841182>\n\n
        💥 <a:flechad:880330587678838784> <@&880949785362829362>\n\n
        🎧 <a:flechad:880330587678838784> <@&883438018009124959>\n\n
        🎤 <a:flechad:880330587678838784> <@&883435087952248952>\n\n
        😎 <a:flechad:880330587678838784> <@&883435331746160721>\n\n
        🎥 <a:flechad:880330587678838784> <@&816465728336691275>\n\n
        🥂 <a:flechad:880330587678838784> <@&880950057669623909>\n\n`)
        .setColor("RANDOM")
        .setImage('https://images-ext-1.discordapp.net/external/SHUVHAaDdmIAvjWSC5NY0wiC5JcHk-zvv0Ey7a4EPmk/%3Fwidth%3D538%26height%3D403/https/media.discordapp.net/attachments/879633476532453386/883455087295483964/mp4.gif?width=430&height=322')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'rolesec'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝗘𝗰𝗼𝗻𝗼𝗺𝗶́𝗮`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según tu preferencia:`)
        .setDescription(`\n\n 💎 Dos grandes bots: <@429457053791158281> y <@292953664492929025> 💎\n
        🌸 <a:flechad:880330587678838784> <@&897701707847434240>\n\n
        ⛩️ <a:flechad:880330587678838784> <@&897701882158530590>\n\n
        🎁 <a:flechad:880330587678838784> <@&897701860176166912>\n\n
        🎰 <a:flechad:880330587678838784> <@&897933020361818133>\n\n
        💰 <a:flechad:880330587678838784> <@&897933095720878080>\n\n`)
        .setColor("RANDOM")
        .setImage('https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/finazas-economia-quieres-ser-un-john-law-1.gif')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    if (command === 'rolesg'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

      const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.discordapp.net/attachments/880312288593195028/928212628432621608/MIDGARD_Presentacion_169.gif?width=766&height=431')
        .setAuthor(`𝐆𝐚𝐦𝐢𝐧𝐠`,message.guild.iconURL({ dynamic: true }).replace('webp','png'))
        .setTitle(`Reacciona según lo que juegues:`)
        .setDescription(`\n\n 🎮 Y tú... ¿qué prefieres? 🎮\n
        🔪 <a:flechad:880330587678838784> <@&897701707847434240>\n\n
        💣 <a:flechad:880330587678838784> <@&897701882158530590>\n\n
        🔫 <a:flechad:880330587678838784> <@&897701860176166912>\n\n
        🪓 <a:flechad:880330587678838784> <@&897933020361818133>\n\n
        💰 <a:flechad:880330587678838784> <@&897933095720878080>\n\n`)
        .setColor("RANDOM")
        .setImage('https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/finazas-economia-quieres-ser-un-john-law-1.gif')
        .setFooter(message.guild.name,client.user.displayAvatarURL({ dynamic: true }).replace('webp','png'));
      message.channel.send({ embeds: [embed] });
      message.delete({timeout: 100})
      
    }

    /*if(command === 'pornoauto'){

      let permisos = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    
      if(!permisos) return message.reply('No tiene permisos para usar este comando <:maje:925927838492811295>').then(m => setTimeout(() => m.delete(), 5000));
    
      const channel = message.guild.channels.cache.find(ch => ch.id === '880312288593195028');

      let c = 0
      
      function reminder() {

        const image = await nsfw3.pgif();
    
        const embed = new Discord.MessageEmbed()
        .setAuthor(`🔞 | Midgard's Hot 🔥`,client.user.avatarURL())
        //.setTitle('Imagen completa')
        .setDescription(`Disfruten este pequeño aporte gratis! <a:run:880304386826465300>`)
        .setImage(image)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
  
        channel.send({ embeds: [embed] });

      }

      while(c<100)
      {
        
        setTimeout(reminder, 30000)
        c = c + 1

      }

    }*/


    if(command === 'enviarmd'){

        let permisos = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    
        if(!permisos) return message.reply('No tiene permisos para usar este comando <:maje:925927838492811295>').then(m => setTimeout(() => m.delete(), 5000));
    
        const mencionado = message.mentions.users.first();
    
        if(!mencionado) return message.reply('No ha mencionando a ningún miembro <:maje:925927838492811295>').then(m => setTimeout(() => m.delete(), 5000));
    
        let id2 = mencionado.id;
    
        let texto = args.slice(1).join(' ');
    
        if(!texto) return message.channel.send(`Escriba el contenido a enviar. <:maje:925927838492811295>`).then(m => setTimeout(() => m.delete(), 5000));
    
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
          message.channel.send(`Ahh!!! Te la creíste wey <:gaaa:925926944254611487>`);
           
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