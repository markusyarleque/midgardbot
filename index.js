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

const clientN = require('nekos.life');
const neko = new clientN();

const star = require('star-labs')

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

mongoose.connect('mongodb+srv://maltabot69:m.y%40r%213qu3%262o22%23drako@cluster0.ggzaa.mongodb.net/MidgardBotDB?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('--------------- MONGO DB ---------------');
  console.log('Conectado exitosamente a MongoDB');
  console.log('--------------- LOGS BOT ---------------');
}).catch((e) => {
  console.log('Error al conectar: '+e);
});

// ----- ******* -----

const tresenraya = require('tresenraya');

const CARTA_TIEMPO_MIN = 2;
const CARTA_TIEMPO_MAX = 5;
const MENSAJE_AYUDA_CARTA = new Discord.MessageEmbed()
.setDescription('<a:fijadito:931432134797848607> Carta - Envia una carta a otro usuario <:abby:931432327354155038>')
.addField('<a:flech:931432469935312937> Uso: ','`carta <tag> <mensaje>`')
.addField('<a:flech:931432469935312937> Argumentos: ','- tag: El tag del usuario / @user / id\n- mensaje: El mensaje que deseas enviar.\n\n-Si deseas que aparezca tu nombre, solo coloca `-n` al final del mensaje.')
.setColor('RANDOM')
.setFooter('Utiliza con moderación el comando, caso contrario, serás reportado en la lista negra del Bot!', `https://c.tenor.com/Gh9SFp64h8wAAAAC/banned-and-you-are-banned.gif`);


const { RAE } = require('rae-api')


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

    /*let id = message.author.id
    //let i = message.author.displayAvatarURL({ dynamic: true }).replace('webp','png')
    let i = 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif'
    let f = 'No hay frase agregada'
    let color = '#607D8B'
    let marry = 'Soltero(a)'
    let sentencia2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ${id}`)

    if (!sentencia2){

      try {
        
        await client.db.run(`INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, color, frase, foto, dinero, banco, total) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, id,'0','1',marry,'0',color,f,i,'0','0','0')
        console.log('Datos insertados en la tabla usuarios para : '+id)
        
      } catch (error) {

        console.log('Error al insertar datos para : '+id+' Error: '+error)

      }
      
    }*/

    if(!message.content.startsWith(process.env.PREFIX)) return;
    
    //const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //if(bl.tiene(message.author.id)) return message.channel.send('Estás prohibido de usar estos comandos, contacta con el equipo de desarrolladores para más información.!');

    // AQUÍ X2 let sentencia = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ${id}`)

    /*db.get(sentencia, (err, filas) => {
      if (err) return console.error('Error 0: '+err.message)*/

    /*if (!sentencia){

      await client.db.run(`INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, color, frase, foto, dinero, banco, total) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, id,'0','1',marry,'0',color,f,i,'0','0','0')
      
      //let insert = `INSERT INTO usuarios(idusuario, nivel, exp, rep, frase, foto) VALUES(${id}, 0, 1, 0, "${f}", "${i}")`



      db.run(insert, function(err) {
       if (err) return console.error('Error 1: '+insert+" ---- "+err.message)
      });

    } else {

      //<-- UPDATE EXPERIENCIA/NIVELES -->

      let curLevel = Math.floor(0.1 * Math.sqrt(sentencia.exp + 1));

      if(curLevel > sentencia.nivel) {

        await client.db.run(`UPDATE usuarios SET exp = ${sentencia.exp + 1}, nivel = ${curLevel}, banco = ${sentencia.banco+500}, total = ${sentencia.dinero+sentencia.banco+500} WHERE idusuario = ${id}`)

        //let update = `UPDATE usuarios SET exp = ${filas.exp + 1}, nivel = ${curLevel} WHERE idusuario = ${id}`;



         db.run(update, function(err) {      
          if (err) return console.error('Error 2: '+err.message)
        message.channel.send('Felicidades!!! Subiste de nivel, '+ message.author.tag)

         });

      }

      await client.db.run(`UPDATE usuarios SET exp = ${sentencia.exp + 1}, dinero = ${sentencia.dinero + 15}, total = ${sentencia.dinero+sentencia.banco+15} WHERE idusuario = ${id}`)

      //let update = `UPDATE usuarios SET exp = ${filas.exp + 1} WHERE idusuario = ${id}`;
      


      db.run(update, function(err) {      
      if (err) return console.error('Error 3: '+err.message)
      })

    }*/

    //BASE DE DATOS

    //<-- SELECT USUARIO -->

    if(command === "perfil"){

      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if(!img){

        let select = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ id + "'")

        //let select = `SELECT * FROM usuarios WHERE idusuario = ${id}`;

        let obtener = args[0]

        if(!obtener){
        
          /*db.get(select, (err, filas) => {

            if (err) return console.error(err.message)*/
          
          if (!select) return message.channel.send('No hay perfil registrado para ese usuario.')
     
          let nivel = select.nivel
          let xp = select.exp

          if(nivel === 0){
            xp = '('+xp+'/'+100+' XP)'
          } else if(nivel === 1){
            xp = '('+(xp-100)+'/'+300+' XP)'
          } else if(nivel === 2){
            xp = '('+(xp-400)+'/'+500+' XP)'
          } else if(nivel === 3){
            xp = '('+(xp-900)+'/'+700+' XP)'
          } else if(nivel === 4){
            xp = '('+(xp-1600)+'/'+900+' XP)'
          } else if(nivel === 5){
            xp = '('+(xp-2500)+'/'+1100+' XP)'
          } else if(nivel === 6){
            xp = '('+(xp-3600)+'/'+1300+' XP)'
          } else if(nivel === 7){
            xp = '('+(xp-4900)+'/'+1500+' XP)'
          } else if(nivel === 8){
            xp = '('+(xp-6400)+'/'+1700+' XP)'
          } else if(nivel === 9){
            xp = '('+(xp-8100)+'/'+1900+' XP)'
          } else if(nivel === 10){
            xp = '('+(xp-10000)+'/'+2100+' XP)'
          } else if(nivel === 11){
            xp = '('+(xp-12100)+'/'+2300+' XP)'
          } else if(nivel === 12){
            xp = '('+(xp-14400)+'/'+2500+' XP)'
          } else if(nivel === 13){
            xp = '('+(xp-16900)+'/'+2700+' XP)'
          } else if(nivel === 14){
            xp = '('+(xp-19600)+'/'+2900+' XP)'
          } else if(nivel === 15){
            xp = '('+(xp-22500)+'/'+3100+' XP)'
          } else if(nivel === 16){
            xp = '('+(xp-25600)+'/'+3300+' XP)'
          } else if(nivel === 17){
            xp = '('+(xp-28900)+'/'+3500+' XP)'
          } else if(nivel === 18){
            xp = '('+(xp-32400)+'/'+3700+' XP)'
          } else if(nivel === 19){
            xp = '('+(xp-36100)+'/'+3900+' XP)'
          } else if(nivel === 20){
            xp = '('+(xp-40000)+'/'+4100+' XP)'
          } else if(nivel === 21){
            xp = '('+(xp-44100)+'/'+4300+' XP)'
          } else if(nivel === 22){
            xp = '('+(xp-48400)+'/'+4500+' XP)'
          } else if(nivel === 23){
            xp = '('+(xp-52900)+'/'+4700+' XP)'
          } else if(nivel === 24){
            xp = '('+(xp-57600)+'/'+4900+' XP)'
          } else if(nivel === 25){
            xp = '('+(xp-62500)+'/'+5100+' XP)'
          } else if(nivel === 26){
            xp = '('+(xp-67600)+'/'+5300+' XP)'
          } else if(nivel === 27){
            xp = '('+(xp-72900)+'/'+5500+' XP)'
          } else if(nivel === 28){
            xp = '('+(xp-78400)+'/'+5700+' XP)'
          } else if(nivel === 29){
            xp = '('+(xp-84100)+'/'+5900+' XP)'
          } else if(nivel === 30){
            xp = '('+(xp-90000)+'/'+6100+' XP)'
          } else if(nivel === 31){
            xp = '('+(xp-96100)+'/'+6300+' XP)'
          } else if(nivel === 32){
            xp = '('+(xp-102400)+'/'+6500+' XP)'
          } else if(nivel === 33){
            xp = '('+(xp-108900)+'/'+6700+' XP)'
          } else if(nivel === 34){
            xp = '('+(xp-115600)+'/'+6900+' XP)'
          } else if(nivel === 35){
            xp = '('+(xp-122500)+'/'+7100+' XP)'
          } else if(nivel === 36){
            xp = '('+(xp-129600)+'/'+7300+' XP)'
          } else if(nivel === 37){
            xp = '('+(xp-136900)+'/'+7500+' XP)'
          } else if(nivel === 38){
            xp = '('+(xp-144400)+'/'+7700+' XP)'
          } else if(nivel === 39){
            xp = '('+(xp-152100)+'/'+7900+' XP)'
          } else if(nivel === 40){
            xp = '('+(xp-160000)+'/'+8100+' XP)'
          } else if(nivel === 41){
            xp = '('+(xp-168100)+'/'+8300+' XP)'
          } else if(nivel === 42){
            xp = '('+(xp-176400)+'/'+8500+' XP)'
          } else if(nivel === 43){
            xp = '('+(xp-184900)+'/'+8700+' XP)'
          } else if(nivel === 44){
            xp = '('+(xp-193600)+'/'+8900+' XP)'
          } else if(nivel === 45){
            xp = '('+(xp-202500)+'/'+9100+' XP)'
          } else if(nivel === 46){
            xp = '('+(xp-211600)+'/'+9300+' XP)'
          } else if(nivel === 47){
            xp = '('+(xp-220900)+'/'+9500+' XP)'
          } else if(nivel === 48){
            xp = '('+(xp-230400)+'/'+9700+' XP)'
          } else if(nivel === 49){
            xp = '('+(xp-240100)+'/'+9900+' XP)'
          } else if(nivel === 50){
            xp = '('+(xp-250000)+'/'+11100+' XP)'
          }

          let tmarry

          if(select.marry === 'Soltero(a)')
          {
            tmarry = 'Soltero(a)'
          }else {
            let id = await client.users.fetch(select.marry)
            tmarry = '💞 '+id.username+'#'+id.discriminator
          }

            let embed = new Discord.MessageEmbed()
              .setAuthor('Perfil de ' + message.author.username, message.author.displayAvatarURL())
              .setThumbnail(select.foto ? select.foto : 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif')
              .addField('Nivel', '<a:start:930399379800592394>  '+nivel+' '+xp, true)
              //.addField('<a:fijadito:931432134797848607> XP', '<a:flech:931432469935312937> '+select.exp, true)
              .addField('Carisma', '<a:corazon:930399275643453500> '+select.rep, false)
              .addField('Pats', '<a:gatoasomar:930399873113677834> '+select.pat, false)
              .addField('Abrazos', '<:burbujita:925927258789666826> '+select.hug, false)
              .addField('Sapes', '<:maje:925927838492811295> '+select.sape, false)
              .addField('Frase', '<a:megaphone:932192877449191424> '+select.frase, false)
              .addField('Matrimonio <:GatoLove:925929538863628318>', tmarry ? tmarry : 'Soltero(a)', true)
              .addField('<a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816>','<a:dinero:930404747326914590> **Economía**',false)
              .addField(`**Total:**`, '<a:money:930397094924124180>  '+select.total, true)
              .setColor(select.color)
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

              message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de actualizar tu foto de perfil!');
     
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

              message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de actualizar tu frase de perfil!');

              break
            }

            default: {

              message.channel.send('<a:Verify2:931463492677017650> | Para actualizar Frase, agrega **-f** antes del texto. Para actualizar Foto, agrega **-i** antes del link');
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
        
        let nivel = select.nivel
        let xp = select.exp

        if(nivel === 0){
          xp = '('+xp+'/'+100+' XP)'
        } else if(nivel === 1){
          xp = '('+(xp-100)+'/'+300+' XP)'
        } else if(nivel === 2){
          xp = '('+(xp-400)+'/'+500+' XP)'
        } else if(nivel === 3){
          xp = '('+(xp-900)+'/'+700+' XP)'
        } else if(nivel === 4){
          xp = '('+(xp-1600)+'/'+900+' XP)'
        } else if(nivel === 5){
          xp = '('+(xp-2500)+'/'+1100+' XP)'
        } else if(nivel === 6){
          xp = '('+(xp-3600)+'/'+1300+' XP)'
        } else if(nivel === 7){
          xp = '('+(xp-4900)+'/'+1500+' XP)'
        } else if(nivel === 8){
          xp = '('+(xp-6400)+'/'+1700+' XP)'
        } else if(nivel === 9){
          xp = '('+(xp-8100)+'/'+1900+' XP)'
        } else if(nivel === 10){
          xp = '('+(xp-10000)+'/'+2100+' XP)'
        } else if(nivel === 11){
          xp = '('+(xp-12100)+'/'+2300+' XP)'
        } else if(nivel === 12){
          xp = '('+(xp-14400)+'/'+2500+' XP)'
        } else if(nivel === 13){
          xp = '('+(xp-16900)+'/'+2700+' XP)'
        } else if(nivel === 14){
          xp = '('+(xp-19600)+'/'+2900+' XP)'
        } else if(nivel === 15){
          xp = '('+(xp-22500)+'/'+3100+' XP)'
        } else if(nivel === 16){
          xp = '('+(xp-25600)+'/'+3300+' XP)'
        } else if(nivel === 17){
          xp = '('+(xp-28900)+'/'+3500+' XP)'
        } else if(nivel === 18){
          xp = '('+(xp-32400)+'/'+3700+' XP)'
        } else if(nivel === 19){
          xp = '('+(xp-36100)+'/'+3900+' XP)'
        } else if(nivel === 20){
          xp = '('+(xp-40000)+'/'+4100+' XP)'
        } else if(nivel === 21){
          xp = '('+(xp-44100)+'/'+4300+' XP)'
        } else if(nivel === 22){
          xp = '('+(xp-48400)+'/'+4500+' XP)'
        } else if(nivel === 23){
          xp = '('+(xp-52900)+'/'+4700+' XP)'
        } else if(nivel === 24){
          xp = '('+(xp-57600)+'/'+4900+' XP)'
        } else if(nivel === 25){
          xp = '('+(xp-62500)+'/'+5100+' XP)'
        } else if(nivel === 26){
          xp = '('+(xp-67600)+'/'+5300+' XP)'
        } else if(nivel === 27){
          xp = '('+(xp-72900)+'/'+5500+' XP)'
        } else if(nivel === 28){
          xp = '('+(xp-78400)+'/'+5700+' XP)'
        } else if(nivel === 29){
          xp = '('+(xp-84100)+'/'+5900+' XP)'
        } else if(nivel === 30){
          xp = '('+(xp-90000)+'/'+6100+' XP)'
        } else if(nivel === 31){
          xp = '('+(xp-96100)+'/'+6300+' XP)'
        } else if(nivel === 32){
          xp = '('+(xp-102400)+'/'+6500+' XP)'
        } else if(nivel === 33){
          xp = '('+(xp-108900)+'/'+6700+' XP)'
        } else if(nivel === 34){
          xp = '('+(xp-115600)+'/'+6900+' XP)'
        } else if(nivel === 35){
          xp = '('+(xp-122500)+'/'+7100+' XP)'
        } else if(nivel === 36){
          xp = '('+(xp-129600)+'/'+7300+' XP)'
        } else if(nivel === 37){
          xp = '('+(xp-136900)+'/'+7500+' XP)'
        } else if(nivel === 38){
          xp = '('+(xp-144400)+'/'+7700+' XP)'
        } else if(nivel === 39){
          xp = '('+(xp-152100)+'/'+7900+' XP)'
        } else if(nivel === 40){
          xp = '('+(xp-160000)+'/'+8100+' XP)'
        } else if(nivel === 41){
          xp = '('+(xp-168100)+'/'+8300+' XP)'
        } else if(nivel === 42){
          xp = '('+(xp-176400)+'/'+8500+' XP)'
        } else if(nivel === 43){
          xp = '('+(xp-184900)+'/'+8700+' XP)'
        } else if(nivel === 44){
          xp = '('+(xp-193600)+'/'+8900+' XP)'
        } else if(nivel === 45){
          xp = '('+(xp-202500)+'/'+9100+' XP)'
        } else if(nivel === 46){
          xp = '('+(xp-211600)+'/'+9300+' XP)'
        } else if(nivel === 47){
          xp = '('+(xp-220900)+'/'+9500+' XP)'
        } else if(nivel === 48){
          xp = '('+(xp-230400)+'/'+9700+' XP)'
        } else if(nivel === 49){
          xp = '('+(xp-240100)+'/'+9900+' XP)'
        } else if(nivel === 50){
          xp = '('+(xp-250000)+'/'+11100+' XP)'
        }

        let tmarry
        let id

        if(select.marry === 'Soltero(a)')
        {
          tmarry = 'Soltero(a)'
        }else if (select.marry !== 'Soltero(a)') {
          
          try {
            id = message.guild.members.resolve(client.users.cache.get(select.marry))
            tmarry = '💞 '+id.user.username+'#'+id.user.discriminator
          } catch (error) {
            tmarry = 'Soltero(a)'
          }
          
        }

        let embed = new Discord.MessageEmbed()
          .setAuthor('Perfil de ' + img.user.username, img.displayAvatarURL())
          .setThumbnail(select.foto ? select.foto : 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif')
          .addField('Nivel', '<a:start:930399379800592394>  '+nivel+' '+xp, true)
          //.addField('<a:fijadito:931432134797848607> XP', '<a:flech:931432469935312937> '+select.exp, true)
          .addField('Carisma', '<a:corazon:930399275643453500> '+select.rep, false)
          .addField('Pats', '<a:gatoasomar:930399873113677834> '+select.pat, false)
          .addField('Abrazos', '<:burbujita:925927258789666826> '+select.hug, false)
          .addField('Sapes', '<:maje:925927838492811295> '+select.sape, false)
          .addField('Frase', '<a:megaphone:932192877449191424> '+select.frase ? select.frase : 'No hay frase agregada', false)
          .addField('<:GatoLove:925929538863628318> Matrimonio', tmarry ? tmarry : 'Soltero(a)', true)
          .addField('<a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816><a:barracolor:930401303249698816>','<a:dinero:930404747326914590> **Economía**',false)
          .addField(`**Total:**`, '<a:money:930397094924124180>  '+select.total, true)
          .setColor(select.color)
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
        message.channel.send({ embeds: [embed] });
  
      }

    }

    //<-- DELETE USUARIO -->

    if(command === "eliminar"){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      let miembro = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if(!miembro) return message.channel.send('Debe mencionar a un usuario a eliminar.')

      let remover = await client.db.get(`DELETE FROM usuarios WHERE idusuario = ${miembro.id}`)

      /*db.run(remover, function(err) {
        if (err) return console.error(err.message)*/

      message.channel.send(miembro.username +', fue eliminado correctamente.');
 
    }

    //<-- SELECT LISTA TOP USUARIOS -->

    if(command === "top"){

      var server = message.guild;

      if(!args[0]){

        let lista = await client.db.all(`SELECT idusuario, total FROM usuarios ORDER BY total DESC LIMIT 10`)

        console.log('Lista de top cash: '+ lista)

        if(!lista) return message.channel.send({embeds:[
          new Discord.MessageEmbed()
          .setAuthor(server.name+' | Top Global 🏦', server.iconURL({ dynamic: true }))
          .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
          .setColor("RANDOM")
          .setFooter(`MidgardBot`,client.user.avatarURL())
        ]})

        let embed = new Discord.MessageEmbed()

        let datos = [];

        let c = 1

        for(let ls of lista){

          let usuario = client.users.resolve(ls.idusuario)
          datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:930397094924124180> **'+ls.total+'**')
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

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          //let lista = `SELECT idusuario, nivel, exp FROM usuarios ORDER BY exp DESC LIMIT 10`

          let embed = new Discord.MessageEmbed()
 
          /*db.all(lista, (err, filas) => {
          if (err) return console.error(err.message+'')*/

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flech:931432469935312937> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
            c = c + 1
          }

          /*lista.map(ls => {
          if(client.users.cache.get(ls.idusuario)){
            datos.push('__' + client.users.cache.get(ls.idusuario).tag + '__ <a:flech:931432469935312937> **'+ls.exp+'** XP (Nivel: **'+ls.nivel+'**)')
          }
          });*/
 
          embed.setAuthor(server.name+' | Top XP ⭐', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`Midgard's VIP`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        } else if(args[0].toLowerCase() === 'cash'){
        
          let lista = await client.db.all(`SELECT idusuario, dinero FROM usuarios ORDER BY dinero DESC LIMIT 10`)

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:money:930397094924124180> **'+ls.dinero+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Cash 💵', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        } else if(args[0].toLowerCase() === 'rep'){
        
          let lista = await client.db.all(`SELECT idusuario, rep FROM usuarios ORDER BY rep DESC LIMIT 10`)

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.rep+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Carisma 💟', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        }  else if(args[0].toLowerCase() === 'pat'){
        
          let lista = await client.db.all(`SELECT idusuario, pat FROM usuarios ORDER BY pat DESC LIMIT 10`)

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.pat+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Pats ❣', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        }  else if(args[0].toLowerCase() === 'hug'){
        
          let lista = await client.db.all(`SELECT idusuario, hug FROM usuarios ORDER BY hug DESC LIMIT 10`)

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.hug+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Abrazos 🤗', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        }  else if(args[0].toLowerCase() === 'sape'){
        
          let lista = await client.db.all(`SELECT idusuario, sape FROM usuarios ORDER BY sape DESC LIMIT 10`)

          if(!lista) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
            .setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true }))
            .setDescription('Aún no hay usuarios en el Top <:tierno:931433334960160799>')   	
            .setColor("RANDOM")
            .setFooter(`MidgardBot`,client.user.avatarURL())
          ]})

          let embed = new Discord.MessageEmbed()

          let datos = [];

          let c = 1

          for(let ls of lista){

            let usuario = client.users.resolve(ls.idusuario)
            datos.push('**'+c+'.** <@' + usuario.id + '> <a:flechad:880330587678838784> **'+ls.sape+'**')
            c = c + 1
          }
 
          embed.setAuthor(server.name+' | Top Sapes 🤡', server.iconURL({ dynamic: true }))
          embed.setDescription(datos.join('\n\n'))   	
          embed.setColor("RANDOM")
          embed.setFooter(`MidgardBot`,client.user.avatarURL())
          message.channel.send({ embeds: [embed] });

        }  

      }

    }

    if(command === "rep"){

      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, message.author.id)

      if(!usuario2){

        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, crep, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, message.author.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', Date.now(), '0'
          )
        usuario2 = {idusuario: message.author.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, crep: Date.now(), ck: 0}

      }

      let cooldown = ((usuario2.crep - Date.now())/1000)
      let h = ((cooldown / 3600)-1).toFixed()
      let m = ((((cooldown % 3600)-1)/60)-1).toFixed()
      let mensaje
        
      if(h>1)
      {
        if(m>1)
        {
          mensaje = h + ' horas y ' + m + ' minutos'
        } else if(m===1)
        {
          mensaje = h + ' horas y ' + m + ' minuto'
        } else if(m<1)
        {
          mensaje = h + ' horas'
        }
      } else if(h===1){
        if(m>1)
        {
          mensaje = h + ' hora y ' + m + ' minutos'
        } else if(m===1)
        {
          mensaje = h + ' hora y ' + m + ' minuto'
        } else if(m<1)
        {
          mensaje = h + ' hora'
        }
      } else if(h<1){
        if(m>1)
        {
          mensaje = m + ' minutos'
        } else if(m===1)
        {
          mensaje = m + ' minuto'
        }
      }

      if(usuario2.crep > Date.now()) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:tiempogif:931434689481285662> | Puedes volver a dar rep en : **'+ mensaje+'**')
          
      ]})

      let usuario = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if(!usuario) {

        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Debes mencionar correctamente a alguien o colocar una id válida!`)
        
         return message.channel.send({embeds: [e]})
      }

      if(usuario){
     
        if(usuario.id === message.author.id)return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No te puedes dar **rep** a ti mismo!`)
        ]})
  
        if(usuario.user.bot)return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes dar **rep** a un bot!`)
        ]})

        let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, usuario.id)
        let text

        if(!usuario1){

          await client.db.run(
            `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, usuario.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
            )
          usuario1 = {idusuario: usuario.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
  
        }

        await client.db.run(`UPDATE usuarios SET rep=rep+? WHERE idusuario=?`, 1, usuario.id)
        await client.db.run(`UPDATE usuarios SET crep=? WHERE idusuario=?`, (Date.now() + (6 * (60 * (1000 * 60)))), message.author.id)

        function reminder() {
    
          message.author.send('<a:exclama2:880930071731392512> | ¡Ya puedes volver a dar rep!')
  
        }

        if((usuario1.rep+1) === 1){
          text = '`'+(usuario1.rep+1)+'` punto'
        } else{
          text = '`'+(usuario1.rep+1)+'` puntos'
        }
  
        const server = message.guild
  
        const e = new Discord.MessageEmbed()
        .setAuthor(server.name, server.iconURL({ dynamic: true }))
        .setTitle('Carisma Diario 💟')
        .setColor('RANDOM')
        .setDescription(`Felicidades! | <@${usuario.id}> | Has recibido **1** punto de carisma.\n`+'Ahora tienes '+text+' en total!')
        .setTimestamp()
        .setFooter(`MidgardBot`,client.user.avatarURL())

        const bRm = new MessageButton()
  
        .setCustomId('primary')
        .setLabel('Recuérdame')
        .setStyle('PRIMARY')
        .setEmoji('⏰')

        message.channel.send({embeds: [e], components: [
  
          new MessageActionRow()
          .addComponents(bRm)
        ]}).then(async m => {
        
          let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
         
          const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
          
          collector.on("collect", async int => {
            
            int.deferUpdate();
         
            if (int.customId === "primary") {
              
              var msDelay = 6*3600000
              await message.reply({ content: '<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en 6 horas para volver a dar rep. No olvides de activar los mensajes directos!', ephemeral: true});
              setTimeout(reminder, msDelay);

              m.edit({ components: []})

            }
    
          });
    
          collector.on("end", colected => {
            
            if(colected < 1) return m.edit({components: [
              new MessageActionRow()
              .addComponents(bRm.setDisabled(true))
            ]})
            
          });
          
        })

      }
      
    }
    
    // COMANDOS DE ECONOMÍA

    // STORE

    const shop1 = new Discord.MessageEmbed()
      .setAuthor(message.guild.name+' | Store 🏪', message.guild.iconURL({ dynamic: true }))
      .setDescription('Para adquirir un item, debes usar el comando `_buy <name>`') 
      .addField(`<a:money:930397094924124180> 10 - Chicken`, 'Item para apuestas', false)  
      .addField(`<a:money:930397094924124180> 10,000 - Rojo`, 'Color para tu perfil', false)  	
      .addField(`<a:money:930397094924124180> 10,000 - Fucsia`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Naranja`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Morado`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Dorado`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Amarillo`, 'Color para tu perfil', false)			
      .setColor("RANDOM")
      .setFooter(`Página 1/2`,client.user.avatarURL())

    const shop2 = new Discord.MessageEmbed()
      .setAuthor(message.guild.name+' | Store 🏪', message.guild.iconURL({ dynamic: true }))
      .setDescription('Para adquirir un item, debes usar el comando `_buy <name>`')   
      .addField(`<a:money:930397094924124180> 10,000 - Rosa`, 'Color para tu perfil', false)  
      .addField(`<a:money:930397094924124180> 10,000 - Aqua`, 'Color para tu perfil', false)  	
      .addField(`<a:money:930397094924124180> 10,000 - Verde`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Azul`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Gris`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Blanco`, 'Color para tu perfil', false)  		
      .addField(`<a:money:930397094924124180> 10,000 - Negro`, 'Color para tu perfil', false) 			
      .setColor("RANDOM")
      .setFooter(`Página 2/2`,client.user.avatarURL())

      const bS1 = new MessageButton()
        .setCustomId("p1")
        .setLabel("🛒 | 1")
        .setStyle("PRIMARY")
      
      const bS2 = new MessageButton()
        .setCustomId("p2")
        .setLabel("🛒 | 2")
        .setStyle("PRIMARY")

    if(command === 'shop'){

      message.channel.send({
        embeds: [shop1],
        components: [
          new MessageActionRow().addComponents([bS1.setDisabled(true),bS2])
        ]
      }).then(async m => {
        
        let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
       
        const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
        
        collector.on("collect", async int => {
          
          int.deferUpdate();
       
          if (int.customId === "p1") {
            
            m.edit({
              embeds: [shop1],
              components: [new MessageActionRow().addComponents([bS1.setDisabled(true),bS2.setDisabled(false)])]
            });
  
          }else if (int.customId === "p2") {
            
            m.edit({
              embeds: [shop2],
              components: [new MessageActionRow().addComponents([bS1.setDisabled(false),bS2.setDisabled(true)])]
            });
  
          }
  
        });
  
        collector.on("end", colected => {
          
          m.edit({
            components: [
              new MessageActionRow().addComponents([bS1.setDisabled(true),bS2.setDisabled(true)])
            ]
          })

        });
        
      });

    }

    if(command === 'buy'){

      let it = args[0]

      if(!it) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | Necesitas mencionar un ítem a comprar. Para más detalles ejectua: `_shop`')
        
      ]})

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ message.author.id + "'")

      if(!buscarUsuario) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item!')
        
      ]})

      if(it.toLowerCase()==='ck' || it.toLowerCase()==='chicken'){

        if(buscarUsuario.dinero < 10) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item!')
          
        ]})

        if(buscarUsuario.ck >= 1) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:Verify2:931463492677017650> | Ya cuentas con tu propio pollito!')
          
        ]})

        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, ck=? WHERE idusuario=?`,10,10,1,message.author.id)

        return message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de adquirir un pollito!');
  
      }

      if(buscarUsuario.dinero < 10000) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | No tienes suficientes coins para adquirir este item!')
        
      ]})

      let col

      if(it.toLowerCase()==='rojo'){
        col = 'RED'
      }else if(it.toLowerCase()==='rosa'){
        col = 'PINK'
      }else if(it.toLowerCase()==='aqua'){
        col = 'AQUA'
      }else if(it.toLowerCase()==='verde'){
        col = 'GREEN'
      }else if(it.toLowerCase()==='azul'){
        col = 'BLUE'
      }else if(it.toLowerCase()==='morado'){
        col = 'PURPLE'
      }else if(it.toLowerCase()==='dorado'){
        col = 'GOLD'
      }else if(it.toLowerCase()==='naranja'){
        col = 'ORANGE'
      }else if(it.toLowerCase()==='gris'){
        col = 'GREY'
      }else if(it.toLowerCase()==='amarillo'){
        col = 'YELLOW'
      }else if(it.toLowerCase()==='blanco'){
        col = 'WHITE'
      }else if(it.toLowerCase()==='negro'){
        col = 'BLACK'
      }else if(it.toLowerCase()==='fucsia'){
        col = 'FUSCHIA'
      }else return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:Verify2:931463492677017650> | Ingresa el nombre correcto del item!')
          
        ]})
      
      
      await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, color=? WHERE idusuario=?`,10000,10000, col,message.author.id)

      message.channel.send('<a:Dancing_Duck:930402083625111613> | Acabas de actualizar el color de tu perfil!');

    }

    //<-- COMANDO BALANCE -->

    if(command === 'bal' || command === 'balance'){

      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
      
      if(!img){

        let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ message.author.id + "'")

        if(!buscarUsuario){
        
          await client.db.run(
            `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, message.author.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
            )
          buscarUsuario = {idusuario: message.author.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
  
          console.log('Balance de : '+message.author.id+' - '+buscarUsuario)
  
        }
  
        const e = new Discord.MessageEmbed()
          .setColor(buscarUsuario.color)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`Balance`)
          .addField(`**Dinero:**`, '<a:money:930397094924124180>  '+buscarUsuario.dinero, true)
          .addField(`**Banco:**`, '<a:money:930397094924124180>  '+buscarUsuario.banco, true)
          .addField(`**Total:**`, '<a:money:930397094924124180>  '+buscarUsuario.total, true)
          .setTimestamp(new Date())
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
  
        return message.channel.send({embeds: [e]})
        console.log('Balance de : '+message.author.id+' - '+'dinero: '+buscarUsuario.dinero+', banco: '+buscarUsuario.banco+', total: '+buscarUsuario.total)

      } else {

        console.log('id: '+img.id+' username: '+img.user.username+'#'+img.user.discriminator)
        let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ img.id + "'")

        if(!buscarUsuario){
        
          await client.db.run(
            `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
            )
          buscarUsuario = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
  
          console.log('Balance de : '+img.id+' - '+buscarUsuario)
  
        }
  
        const e = new Discord.MessageEmbed()
          .setColor(buscarUsuario.color)
          .setAuthor(img.user.username+'#'+img.user.discriminator, img.displayAvatarURL({dynamic: true}))
          .setTitle(`Balance`)
          .addField(`**Dinero:**`, '<a:money:930397094924124180>  '+buscarUsuario.dinero, true)
          .addField(`**Banco:**`, '<a:money:930397094924124180>  '+buscarUsuario.banco, true)
          .addField(`**Total:**`, '<a:money:930397094924124180>  '+buscarUsuario.total, true)
          .setTimestamp(new Date())
          .setFooter(`Midgard's VIP`,client.user.avatarURL())
  
        message.channel.send({embeds: [e]})
        console.log('Balance de : '+img.id+' - '+'dinero: '+buscarUsuario.dinero+', banco: '+buscarUsuario.banco+', total: '+buscarUsuario.total)
  
      }
    
    }

    //<-- COMANDO WORK -->

    var w = [
      'Gracias por ayudarme a programar, aquí tienes tu recompensa: <a:money:930397094924124180> ',
      'Felicidades por tu trabajo, te mereces esto: <a:money:930397094924124180> ',
      'Excelente trabajo crack, aquí tienes: <a:money:930397094924124180> ',
      'Por cuidar del server todo el día, te has ganado: <a:money:930397094924124180> ',
      'Gracias por usar mis comandos, aquí tienes buen terrícola: <a:money:930397094924124180> ',
      'Sin hacer nada, ya ganaste: <a:money:930397094924124180> '
    ]
    
    if(command === 'work' || command === 'w'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)
      
      let r = Math.floor(Math.random() * (500 - 10) + 10)
      
      let ramdonw = w[Math.floor(Math.random()*w.length)]

      if(buscarUsuario){

        if(buscarUsuario.work > Date.now()) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:931434689481285662> | Puedes volver a trabajar en : '+((buscarUsuario.work - Date.now())/1000).toFixed()+' segundos')
          
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

    //<-- COMANDO CRIME -->

    var crime = [
      'Junto con tus amigos, han asaltado el banco de Midgard y lograron robar: <a:money:930397094924124180> ',
      'La mafia agradece tus trabajos y te da estas monedas de recompensa: <a:money:930397094924124180> ',
      'El hackeo al banco de Midgard resultó muy bien, lograste obtener: <a:money:930397094924124180> ',
      'Pero que buen asalto! En total conseguiste: <a:money:930397094924124180> ',
      'Tus crímenes son bien recompensados por la mafia: <a:money:930397094924124180> ',
      'Que pro eres hackeando, aquí tienes: <a:money:930397094924124180> '
    ]
    
    if(command === 'crime'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario=?`, message.author.id)
      
      if(buscarUsuario){

        if(buscarUsuario.crime > Date.now()) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:931434689481285662> | Puedes volver a cometer un crimen en : '+((buscarUsuario.crime - Date.now())/1000).toFixed()+' segundos')
          
          ]}
        )

        let chance = Math.floor(Math.random()*10)
        let r = Math.floor(Math.random() * (300 - 10) + 10)
        let ramdonc = crime[Math.floor(Math.random()*crime.length)]

        if(chance < 4){

          await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, crime=? WHERE idusuario=?`, r, r, (Date.now()+(1000*60)), message.author.id)
          
          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(ramdonc + r)
          .setTimestamp()

          message.channel.send({embeds: [e]})

        } else {
          
          await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, crime=? WHERE idusuario=?`, r, r, (Date.now()+(1000*60)), message.author.id)
          
          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Qué malo eres cometiendo crímenes, acabas de ser capturado y perdiste <a:money:930397094924124180> `+ r)
          .setTimestamp()

          message.channel.send({embeds: [e]})

        }

      } else {

        await client.db.run('INSERT INTO usuarios (idusuario, dinero, banco, total, crime) VALUES (?, ?, ?, ?, ?)', message.author.id, 50, 0, 50, (Date.now()+(1000*60)))
        
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Eres muy novato para estos trabajos, mejor te obsequio estas monedas : <a:money:930397094924124180> `+ 50)
          .setTimestamp()

        message.channel.send({embeds: [e]})

      }

    }

    if(command === 'rob'){

      let usuario = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if(!usuario) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Necesitas mencionar correctamente a alguien!`)
      ]})

      if(usuario.id === message.author.id)return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No te puedes robar a ti mismo!`)
      ]})

      if(usuario.user.bot)return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No tienes el poder suficiente para robarle a los bots!`)
      ]})

      let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, message.author.id)
      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, usuario.id)

      if(!usuario1){

        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, message.author.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario1 = {idusuario: message.author.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      } else if(!usuario2){

        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, usuario.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario2 = {idusuario: usuario.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }

      if(usuario1.rob > Date.now()) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:tiempogif:931434689481285662> | Puedes volver a robar en : '+((usuario1.rob - Date.now())/1000).toFixed()+' segundos')
        
        ]}
      )

      if(usuario2.dinero === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¿Cómo te atreves a robarle a los pobres?`)
      
      ]})

      let ganarob = usuario2.dinero === 0 ? 0 : Math.floor((10 * usuario2.dinero)/100)
      let pierderob = usuario1.dinero === 0 ? Math.floor((10 * 200) / 100) : Math.floor((10 * usuario1.dinero) / 100)
      let chance = Math.floor(Math.random()*10)

      if(chance < 3){
        
        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-? WHERE idusuario=?`, ganarob, ganarob, usuario.id)
        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, rob=? WHERE idusuario=?`, ganarob, ganarob, (Date.now()+(1000*30)), message.author.id)

        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(`<a:Verify1:931463354357276742> | Le has robado <a:money:930397094924124180> `+ ganarob + ' a ' + usuario.toString())
        .setTimestamp()
        message.channel.send({embeds: [e]})
    
      } else {

        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, rob=? WHERE idusuario=?`, pierderob, pierderob, (Date.now()+(1000*30)), message.author.id)

        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Qué malo eres robando, acabas de ser capturado y perdiste <a:money:930397094924124180> `+ pierderob)
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
        .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto a depositar!`)

      ]})

      else if(buscarUsuario.dinero === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para depositar!`)

      ]})

      else if(buscarUsuario.dinero < parseInt(args[0])) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para depositar. Actualmente tienes <a:money:930397094924124180> `+ buscarUsuario.dinero)

      ]})

      if(args[0].toLowerCase() === 'all'){

        await client.db.run(`UPDATE usuarios SET dinero=0, banco=banco + ? WHERE idusuario=?`, buscarUsuario.dinero, message.author.id)
        
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ buscarUsuario.dinero+ ' al banco')
          .setTimestamp()
        
        message.channel.send({embeds: [e]})

      } else {

        if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido a depositar!`)

          ]})

        let numero = parseInt(args[0])
  
        await client.db.run(`UPDATE usuarios SET dinero=dinero-?, banco=banco+? WHERE idusuario=?`, numero, numero, message.author.id)
  
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has depositado <a:money:930397094924124180> `+ numero + ' al banco')
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
        .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto para retirar!`)

      ]})

      else if(buscarUsuario.banco === 0) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para retirar!`)

      ]})

      else if(buscarUsuario.banco < parseInt(args[0])) return message.channel.send({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para retirar. Actualmente tienes en tu banco <a:money:930397094924124180> `+ buscarUsuario.banco)

      ]})

      if(args[0].toLowerCase() === 'all'){

        await client.db.run(`UPDATE usuarios SET dinero=dinero + ?, banco=0 WHERE idusuario=?`, buscarUsuario.banco, message.author.id)
        
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ buscarUsuario.banco+ ' del banco')
          .setTimestamp()
        
        message.channel.send({embeds: [e]})

      } else {

        if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido para retirar!`)

          ]})

        let numero = parseInt(args[0])
  
        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, banco=banco-? WHERE idusuario=?`, numero, numero, message.author.id)
  
        const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has retirado <a:money:930397094924124180> `+ numero + ' del banco')
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

        await client.db.run(`INSERT INTO usuarios (idusuario, daily, dinero, total) VALUES (?, ?, ?, ?)`, message.author.id, (Date.now() + (12 * (60 * (1000 * 60)))), numero, numero)
        
        buscarUsuario = {dinero: numero, banco: 0, total: numero, daily: (Date.now() + (12 * (60 * (1000 * 60))))}

      } else {

        let cooldown = ((buscarUsuario.daily - Date.now())/1000)
        let h = ((cooldown / 3600)-1).toFixed()
        let m = ((((cooldown % 3600)-1)/60)-1).toFixed()
        let mensaje

        // condition ? val1 : val2 
        
        if(h>1)
        {
          if(m>1)
          {
            mensaje = h + ' horas y ' + m + ' minutos'
          } else if(m===1)
          {
            mensaje = h + ' horas y ' + m + ' minuto'
          } else if(m<1)
          {
            mensaje = h + ' horas'
          }
        } else if(h===1){
          if(m>1)
          {
            mensaje = h + ' hora y ' + m + ' minutos'
          } else if(m===1)
          {
            mensaje = h + ' hora y ' + m + ' minuto'
          } else if(m<1)
          {
            mensaje = h + ' hora'
          }
        } else if(h<1){
          if(m>1)
          {
            mensaje = m + ' minutos'
          } else if(m===1)
          {
            mensaje = m + ' minuto'
          }
        }

        if(buscarUsuario.daily > Date.now()) return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription('<a:tiempogif:931434689481285662> | Ya has reclamado tu recompensa hoy! Puedes volver en: **'+ mensaje+'** \nRecuerda que si apoyas al servidor votando en **Top.gg** podrás ganar el doble de coins.\n\n[Click aquí para votar](https://top.gg/servers/777620055344545842/vote)')
          
        ], components: [
            
          new MessageActionRow()
          .addComponents(

            new MessageButton()
        
            .setLabel('VOTAR') 
            .setStyle('LINK') 
            .setURL('https://top.gg/servers/777620055344545842/vote') 

          )

        ]})

        await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+?, daily=? WHERE idusuario=?`, numero, numero, (Date.now() + (12 * (60 * (1000 * 60)))),message.author.id)

      }

      function reminder() {
    
        message.author.send('<a:exclama2:880930071731392512> | Tu último voto por el server **Midgard** fue hace 12 horas. ¡Ya puedes volver a votar para recibir recompensas! No te olvides de usar el comando `_daily` para canjear tus coins extras. https://top.gg/servers/777620055344545842/vote')

      }

      const server = message.guild

      const e = new Discord.MessageEmbed()
      .setAuthor(server.name, server.iconURL({ dynamic: true }))
      .setTitle('Recompensa Diaria 💵')
      .setColor(buscarUsuario.color)
      .setDescription(`Felicidades **${message.author.username}**! Has recibido <a:money:930397094924124180> **` + numero + `** como recompensa diaria.\n¡Muchas gracias por usar mis comandos!`)
      .setTimestamp()
      .setFooter(`MidgardBot`,client.user.avatarURL())

      const bRm = new MessageButton()
  
        .setCustomId('primary')
        .setLabel('Recuérdame')
        .setStyle('PRIMARY')
        .setEmoji('⏰')
      
      message.channel.send({embeds: [e], components: [

        new MessageActionRow()
        .addComponents(bRm)

      ]}).then(async m => {
      
        let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
       
        const collector = m.createMessageComponentCollector({ filter, time: 60000 /* Tiempo para que el miembro interatue con los botones */ });
        
        collector.on("collect", async int => {
          
          int.deferUpdate();
       
          if (int.customId === "primary") {
            
            var msDelay = 12*3600000
            await message.reply({ content: '<a:reloj:931434883916652564> | Acabas de establecer un recordatorio en 12 horas para votar nuevamente. No olvides de activar los mensajes directos!', ephemeral: true});
            setTimeout(reminder, msDelay);

            m.edit({components: []})
  
          }
  
        });
  
        collector.on("end", colected => {
          
          if(colected < 1) return m.edit({components: [

            new MessageActionRow()
            .addComponents(bRm.setDisabled(true))

          ]})
        });
        
      })

    }

    if(command === 'cf' || command === 'cock-fight'){

      let buscarUsuario = await client.db.get(`SELECT * FROM usuarios WHERE idusuario='`+ message.author.id + "'")

      if(!buscarUsuario || buscarUsuario.ck < 1) return message.channel.send({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('<a:Verify2:931463492677017650> | No cuentas con tu propio pollito! Adquiere uno usando el comando `_buy ck`')
        
      ]})

      if(buscarUsuario.ck >= 1)
      {
        if(!args[0]) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Ingresa un monto para apostar!`)
  
        ]})

        else if(buscarUsuario.dinero === 0) return message.channel.send({embeds: [

          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No tienes dinero para apostar!`)
  
        ]})
  
        else if(buscarUsuario.dinero < parseInt(args[0])) return message.channel.send({embeds: [
  
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No tienes ese monto para apostar. Actualmente tienes <a:money:930397094924124180> `+ buscarUsuario.dinero)
  
        ]})

        let chance = Math.floor(Math.random()*10)

        if(args[0].toLowerCase() === 'all'){

          if(chance < 6){

            await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+? WHERE idusuario=?`, buscarUsuario.dinero, buscarUsuario.dinero, message.author.id)
          
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> |Tu pollito ganó la pelea y obtuviste <a:money:930397094924124180> `+ (buscarUsuario.dinero*2))
            .setTimestamp()
          
            message.channel.send({embeds: [e]})

          } else {

            await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, ck=? WHERE idusuario=?`, buscarUsuario.dinero, buscarUsuario.dinero, 0, message.author.id)
          
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> |Tu pollito murió 💀 y perdiste toda la apuesta!`)
            .setTimestamp()
          
            message.channel.send({embeds: [e]})
          }
          
        } else {
  
          if(isNaN(parseInt(args[0]))) return message.channel.send({embeds: [
  
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ingresa un número válido para apostar!`)
  
            ]})
  
          let numero = parseInt(args[0])

          if(chance < 6){

            await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+? WHERE idusuario=?`, numero, numero, message.author.id)
          
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`<a:Verify1:931463354357276742> |Tu pollito ganó la pelea y obtuviste <a:money:930397094924124180> `+ (numero*2))
            .setTimestamp()
          
            message.channel.send({embeds: [e]})

          } else {

            await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-?, ck=? WHERE idusuario=?`, numero, numero, 0, message.author.id)
          
            const e = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> |Tu pollito murió 💀 y perdiste toda la apuesta!`)
            .setTimestamp()
          
            message.channel.send({embeds: [e]})
          }
  
        }
        
      }

    }

    if(command === 'addmoney'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      let miembro = message.mentions.users.first() || message.guild.members.resolve(args[1]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[1]) || await client.users.fetch(args[1])

      if(!miembro) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('Debes mencionar o colocar id!')
      ]})

      if(miembro){

        if(miembro.bot) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes darle dinero a un bot!`)
        ]})

        let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, miembro.id)
        
        if(!usuario1){
 
          await client.db.run(
            `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, miembro.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
            )
          usuario1 = {idusuario: miembro.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
  
        }

        let opcion = args[0]
        if(isNaN(args[2])) return  message.channel.send(`**Pon una cantidad, solo puedo agregar números.**`).then(m => setTimeout(() => m.delete(), 5000));
    
        let monto = parseInt(args[2])
    
        if(opcion === 'cash')
        {
          await client.db.run(`UPDATE usuarios SET dinero=dinero+?, total=total+? WHERE idusuario=?`, monto, monto, miembro.id)

          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has agreado <a:money:930397094924124180> `+ monto + ' al balance de <@'+miembro.id+'>')
          .setTimestamp()
        
          message.channel.send({embeds: [e]})

        }else if(opcion === 'bank')
        {
          await client.db.run(`UPDATE usuarios SET banco=banco+?, total=total+? WHERE idusuario=?`, monto, monto, miembro.id)

          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has agreado <a:money:930397094924124180> `+ monto + ' al banco de <@'+miembro.id+'>')
          .setTimestamp()
        
          message.channel.send({embeds: [e]})

        }

      }
    }

    if(command === 'removemoney'){

      let permiso = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  
      if(!permiso) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
      let miembro = message.mentions.users.first() || message.guild.members.resolve(args[1]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[1]) || await client.users.fetch(args[1])
      
      if(!miembro) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription('Debes mencionar o colocar id!')
      ]})

      if(miembro){

        if(miembro.bot) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes quitarle dinero a un bot!`)
        ]})

        let usuario1 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, miembro.id)
        
        if(!usuario1) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No puedes quitarle dinero a un pobre!`)
        ]})

        let opcion = args[0]
        if(isNaN(args[2])) return  message.channel.send(`**Pon una cantidad, solo puedo quitar números.**`).then(m => setTimeout(() => m.delete(), 5000));
    
        let monto = parseInt(args[2])
    
        if(opcion === 'cash')
        {
          await client.db.run(`UPDATE usuarios SET dinero=dinero-?, total=total-? WHERE idusuario=?`, monto, monto, miembro.id)

          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has quitado <a:money:930397094924124180> `+ monto + ' del balance de <@'+miembro.id+'>')
          .setTimestamp()
        
          message.channel.send({embeds: [e]})

        }else if(opcion === 'bank')
        {
          await client.db.run(`UPDATE usuarios SET banco=banco-?, total=total-? WHERE idusuario=?`, monto, monto, miembro.id)

          const e = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> | Has quitado <a:money:930397094924124180> `+ monto + ' del banco de <@'+miembro.id+'>')
          .setTimestamp()
        
          message.channel.send({embeds: [e]})

        }

      }
    }

    // COMANDOS DE PROGRAMADOR

    /*if(command === 'malta'){

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
  
    }*/

    /*if(command === 'mbservers'){

      let id = ['753435606410985573']
  
      if(!id.some(id => message.author.id == id)) {
      
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el developer del bot puede usar este comando.')
        .setColor('RED')
        message.channel.send({ embeds: [embed] })
        .then(m => setTimeout(() => m.delete(), 5000));

      } else {

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
        .setAuthor('MidgardBot', client.user.avatarURL())
        .setTitle('Developers')
        .setDescription('**Desarrollador:**\nMaltazard#0610\n\nActualmente estoy en **'+client.guilds.cache.size+'** servers.\n\n**'+client.users.cache.size+'** usuarios usan mis comandos.\n\n**Servidores:**\n\n> '+client.guilds.cache.map(r => r.name).join(". \n> "))
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({ embeds: [embed] });

      }
      
    }*/

/*    if(command === 'exitserver'){

      let id = ['753435606410985573']
  
      if(!id.some(id => message.author.id == id)) {
      
        const embed = new Discord.MessageEmbed()
        .setDescription('Solo el developer del bot puede usar este comando.')
        .setColor('RED')
        message.channel.send({ embeds: [embed] })
        .then(m => setTimeout(() => m.delete(), 5000));

      } else {

        let argumentos = args.join(' ');

        if (!argumentos){
          
          const embed = new Discord.MessageEmbed()
          .setDescription('Dime el nombre o ID del servidor para salirme')
          .setColor('RED')
          return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000));

        }

        let serverReal = client.guilds.cache.find(s => s.name.toLowerCase() === argumentos.toLowerCase() || s.id === argumentos);
        
        if (!serverReal){
          
          const embed = new Discord.MessageEmbed()
          .setDescription('No encontré el servidor!')
          .setColor('RED')
          return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000));

        }

        const bSi = new MessageButton()
        .setCustomId("accept")
        .setLabel("SI")
        .setStyle("SUCCESS")

        const bNo = new MessageButton()
        .setCustomId("deny")
        .setLabel("NO")
        .setStyle("DANGER")

        const embed = new Discord.MessageEmbed()
        .setDescription('¿Deseas que salga del servidor **'+serverReal+'**?')
        .setColor('YELLOW')
        .setTimestamp(new Date())
        .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`);
            
        message.channel.send({
          embeds: [embed],
          components: [
            new MessageActionRow().addComponents([bSi,bNo])
          ]
        }).then(async m => {
        
          let filter = int => int.isButton() && int.user.id == message.author.id //Agregamos el filtro para que solo permita que el miembro mencionado interactue con los botones.
         
          const collector = m.createMessageComponentCollector({ filter, max: 1, maxUsers: 1, maxComponents: 1, time: 60000  });
          
          
          collector.on("collect", async int => {
            
            int.deferUpdate();
            
            if (int.customId === "accept") {
              
              await serverReal.leave();
              m.edit({
                embeds: [
                  new Discord.MessageEmbed()
                  .setDescription('¡Me he salido del servidor correctamente!')
                  .setColor('GREEN')
                  .setTimestamp(new Date())
                  .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`)
                ],
                components: []
              });
    
              
            } else if (int.customId === "deny") {
              
              m.edit({
                embeds: [
                  new Discord.MessageEmbed()
                  .setDescription('¡Menú cancelado! Aún sigo en el servidor')
                  .setColor('RED')
                  .setTimestamp(new Date())
                  .setFooter(`Malta's Bot`, `${message.author.displayAvatarURL()}`)
                ],
                components: []
              });
            
            }
          });
    
          collector.on("end", colected => {
            
            if(colected.size < 1) return m.edit({
              content: "**¡No confirmaste a tiempo!** <:enojado:931434000751394867>",
              components: []
            });
            
          });
          
        });

      }
      
    }*/

    if(command === 'jumbo'){

      if(!args[0]) return message.reply({embeds: [

        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Uso incorrecto del comando\nDebe ser: _jumbo <emoji> \n*Si quieres añadirlo al servidor añade --s al final*`)

      ]}) // Si no us args[0]
        
      const emoticon = require('discord.js').Util.parseEmoji(args[0]) // Usaremos el metodo que nos da discord.js para obtener info del emoji
          
      if(emoticon.id === null) return message.reply({embeds: [
          
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Emoji inválido!!!`)

      ]}) // Si no es un emoji personalizado o no lo encuentra la id seria null para evitar problemas devolvera
        
      let palta = `https://cdn.discordapp.com/emojis/` + `${emoticon.id}.` + (emoticon.animated ? 'gif' : 'png') // Conseguimos el url 
          
      if(message.content.endsWith('--s')) { // Si termina con --s
        
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply({embeds: [
            
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No tienes permisos para agregar emojis!!!`)

        ]}) // Si no tiene permisos el usuario
        
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.reply({embeds: [
            
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No tengo los permisos para agregar emojis!!!`)

        ]}) // Si el bot no tiene permisos

        const emojis = message.guild.emojis.cache.size;

        if(emojis === 500) return message.reply({embeds: [
            
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | No hay espacio suficiente para agregar el emoji!!!`)

        ]})

        try {

          message.guild.emojis.create(palta, emoticon.name) // Creamos un emoji con la imagen del emoji 
            
        } catch (error) {
            
          return message.reply({embeds: [
            
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Ocurrió un error al agregar emoji!\n\n**Error:**\n> `+error)
  
          ]})

        }
          
        return message.channel.send({embeds: [
          
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('GREEN')
          .setDescription(`<a:Verify1:931463354357276742> |Emoji agregado correctamente : **`+ emoticon.name+'**')
          .setTimestamp()
        ]}) // Mensaje de confirmacioon 
          
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
    
        collector.on("end", colected => {
          
          if(colected.size < 1) return m.edit({
              
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

    if(command === 'pokemon')
    {

        over.randomPokemon().then(pokemon => {

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('¿𝚀𝚞𝚒é𝚗 𝚎𝚜 𝚎𝚜𝚎 𝙿𝚘𝚔é𝚖𝚘𝚗?')
        .setDescription('Tienes 30 Segundos para responder ⌛')
        .setImage(pokemon.imageURL)
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      
        message.channel.send({ embeds: [embed] }).then(msj => {

            message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(col => {

              if(col){

                const embed2 = new Discord.MessageEmbed() //el Embed si el autor adivino el Pokemon
                .setColor('GREEN')
                .setTitle('𝐀𝐂𝐄𝐑𝐓𝐀𝐒𝐓𝐄!')
                .setDescription('El Pokemon es **'+pokemon.name+'**')
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          
                msj.edit(embed2)

              }

            }).catch(col => {

              if(!col){

                const embed3 = new Discord.MessageEmbed() //Embed de Fallo
                .setColor('RED')
                .setTitle('𝐄𝐑𝐑𝐎𝐑!')
                .setDescription('El Pokemon era **'+pokemon.name+'**')
                .setImage(pokemon.imageURL)
                .setTimestamp(new Date())
                .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
         
                col.edit(embed3)
              }

            })

        })
        }).catch((e) => message.channel.send('Hubo un error: ' + e))
    }

    if(command === 'infiel'){

      let users = message.mentions.users.first()

      if(!users){

        try {
          
          users = await client.users.fetch(args[0])

        } catch (error) {

          users = message.author
          
        }

      }

      if(users.bot) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | **¿En serio crees que es infiel como tú?**...Los bots son los más leales!`)
      ]})
    
      const random = Math.floor(Math.random() * 100 + 1);

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
    
      }else if(random === 100){
          
        heard='🚩';
        image='https://c.tenor.com/xV8ISXEKTOUAAAAC/exponiendo-infieles-badabun.gif';
    
      }

      if(!users || users.id === message.author.id){

        if(message.author.id==='753435606410985573')
        {
          const r = Math.floor(Math.random() * 10 + 1);
          
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${message.author.username} es ${r}% infiel! 😎`)
          .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${message.author.username} es ${random}% infiel! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        }

      } else {

        if(users.id==='753435606410985573')
        {
          const r = Math.floor(Math.random() * 10 + 1);

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${users.username} es ${r}% infiel! 😎`)
          .setImage(`https://i.pinimg.com/originals/fc/8a/07/fc8a0764969fcf2d587434f1bf3c014a.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`Nivel de Infidelidad`)
          .setDescription(`${users.username} es ${random}% infiel! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
          
        }
      }
    }

    if(command === 'berenjena'){

      let users = message.mentions.users.first()

      if(!users){

        try {
          
          users = await client.users.fetch(args[0])

        } catch (error) {

          users = message.author
          
        }

      }

      if(users.bot) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | **¿En serio quieres ver cuánto me mide?**...Los bots somos poderosos por algo! <a:ositovino:932917500218339379>`)
      ]})
    
      const random = Math.floor(Math.random() * 20 + 1);

      let heard = '';
      let image = '';

      if(random === 20){
          
        heard='😎';
        image='https://c.tenor.com/_C2LQYYZSLYAAAAC/shocked-surprised.gif';
    
      } else if(random < 20 && random > 15){
          
        heard='😲';
        image='https://c.tenor.com/2JAEiE6XJJwAAAAC/eugenio-dervez-eugenio.gif';
    
      } else if(random < 15 && random > 10){
          
        heard='🤨';
        image='https://c.tenor.com/T4_6YgD60VgAAAAd/que-hombre-golosa.gif';
    
      }else if(random < 10 && random > 5){
          
        heard='😬';
        image='https://c.tenor.com/vkliz2XrL0oAAAAC/boca-abierta-mono.gif';
    
      }else if(random < 5 && random > 0){
          
        heard='🤡';
        image='https://c.tenor.com/0qqmmIO-R6AAAAAd/excuse-me-excuse-you.gif';
    
      }else if(random === 0){
          
        heard='🚩';
        image='https://thumbs.gfycat.com/FlusteredUnevenAfricanwildcat-size_restricted.gif';
    
      }

      if(!users || users.id === message.author.id){

        if(message.author.id==='753435606410985573')
        {

          var rm = ['15','16','17','18','19','20']
          const r = rm[Math.floor(Math.random()*rm.length)]
          
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`¿Cuánto te mide? 🍆`)
          .setDescription(`😎 ¡La berenjena de **${message.author.username}** mide **${r}** centímetros! 😎`)
          .setImage(`https://c.tenor.com/2JAEiE6XJJwAAAAC/eugenio-dervez-eugenio.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })

        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`¿Cuánto te mide? 🍆`)
          .setDescription(`${heard} ¡La berenjena de **${message.author.username}** mide **${random}** centímetros! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        }

      } else {

        if(users.id==='753435606410985573')
        {
          var rm = ['15','16','17','18','19','20']
          const r = rm[Math.floor(Math.random()*rm.length)]
          
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`¿Cuánto te mide? 🍆`)
          .setDescription(`😎 ¡La berenjena de **${users.username}** mide **${r}** centímetros! 😎`)
          .setImage(`https://c.tenor.com/2JAEiE6XJJwAAAAC/eugenio-dervez-eugenio.gif`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
        } else {

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setTitle(`¿Cuánto te mide? 🍆`)
          .setDescription(`${heard} ¡La berenjena de **${users.username}** mide **${random}** centímetros! ${heard}`)
          .setImage(`${image}`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] })
          
        }
      }
    }

    if(command === 'carta'){ 

      if (args.length < 2) { // Si no se han dado todos los argumentos, envíar un mensaje de ayuda
        
        message.channel.send({embeds: [MENSAJE_AYUDA_CARTA]});

      } else {

        var target = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0])); // tag
        
		    var mensaje = args.slice(1).join(" ")

        if (!target) return message.channel.send("Error: No se ha encontrado al destinatario!")

        if (target.id === message.author.id) return message.channel.send("Error: No puedes autoenviarte una carta!");
        
        if (target.user.bot) return message.channel.send("Error: No puedes enviarle a un bot!");

        var tiempo = Math.random() * (CARTA_TIEMPO_MAX - CARTA_TIEMPO_MIN) + CARTA_TIEMPO_MIN;

        const embcarta = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }).replace('webp','png'))
          .setTitle(`📩 | Cartas & Dedicatorias 💕`)
          .setDescription(target.user.username + ' Te ha llegado una **dedicatoria** <:tierno:931433334960160799>\n\n<a:flech:931432469935312937> *Enviado por:*\n<a:corazones_fn:906775240795901982> **'+ message.author.username+'**\n\n<a:fijadito:931432134797848607>\n```'+mensaje.substring(0, mensaje.length - 2)+'```\n')
          //.setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        const embcartano = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          .setThumbnail(target.displayAvatarURL({ dynamic: true }).replace('webp','png'))
          .setTitle(`📩 | Cartas & Dedicatorias 💕`)
          .setDescription(target.user.username + ' Te ha llegado una **dedicatoria** <:tierno:931433334960160799>\n\n<a:flech:931432469935312937> *Enviado por:*\n<a:corazones_fn:906775240795901982> **Anónimo**\n\n<a:fijadito:931432134797848607>\n```'+mensaje+'```\n')
          //.setImage(`https://media.discordapp.net/attachments/920564115355889674/920594418711543838/FinalVideo_1638643044.278044.gif?width=512&height=288`)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');

        if(message.content.endsWith('-n'))
        {
          setTimeout(() => {

            target.user.send({embeds: [embcarta]}).catch(err => message.reply("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))

          }, tiempo * 60 * 1000)

        } else {

          setTimeout(() => {

            target.user.send({embeds: [embcartano]}).catch(err => message.reply("El receptor no acepta mensajes directos, por favor, contáctalo, para que pueda escribirle <a:facherita:881034171571646464>"))

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

    if(command === 'rae'){

      const palabra = args.slice(0).join(' ')

      if(!palabra) return message.channel.send({embeds:[

        new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Introduce una palabra o texto para buscar!`)
        
      ]})

      try {
        
        const rae = new RAE()
        const search = await rae.searchWord(palabra)
        const wordId = search.getRes()[0].getId()

        const result = await rae.fetchWord(wordId)
        const definition = result.getDefinitions()
        const first = definition[0].getDefinition()

        const embed =  new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription('<a:flech:931432469935312937> | Resultado obtenido:\n\n  `'+first+'`')

        message.channel.send({embeds:[embed]})
      

      } catch (err) {

        return message.channel.send({embeds:[

          new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No encontré significado para esa palabra!`)
          
        ]})

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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncafe = cafe[Math.floor(Math.random()*cafe.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** tomó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot) {

          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Mucho café nos pone nerviosos! <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonagua = agua[Math.floor(Math.random()*agua.length)]
    
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está tomando awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman agüita! <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un poquito de awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonte = te[Math.floor(Math.random()*te.length)]
      
        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está relajándose con un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Nada mal un buen tesito! <:nogarsias:932172183453712415>`)
          ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Cafe`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, ponte cómodo y relájate, que ${message.author.username} te ha invitado un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhi = hi[Math.floor(Math.random()*hi.length)]
     
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** está saludando a todos.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else if (img.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Holi, soy tu bot de confianza! <:burbujita:930399322183458867>`)
          ]})
          
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${img.user.username}**, está saludando a ${message.author.username}.`)
          .setImage(ramdonhi)
          .setColor(6666609)
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhug = hug[Math.floor(Math.random()*hug.length)]
        let ramdonhug2 = hug2[Math.floor(Math.random()*hug2.length)]

        if (!img || img.id===message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está abrazando a sí mismo.`)
            .setImage(ramdonhug2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Gracias por ese abrazo, lo necesitaba! <:burbujita:930399322183458867>`)
          ]})
          
        } else {

          let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, img.id)
          let text

          if(!usuario2){
 
            await client.db.run(
              `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
              )
            usuario2 = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}
    
          }
    
          await client.db.run(`UPDATE usuarios SET hug=hug+? WHERE idusuario=?`, 1, img.id)

          if((usuario2.hug+1) === 1){
            text = '**'+(usuario2.hug+1)+'** abrazo'
          } else{
            text = '**'+(usuario2.hug+1)+'** abrazos'
          }
        
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está abrazando a **${img.user.username}**. <:burbujita:925927258789666826>\n<a:flechad:880330587678838784> *${img.user.username}* ha recibido ${text} en total.`)
            .setImage(ramdonhug)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkiss = kiss[Math.floor(Math.random()*kiss.length)]

        if (!img || img.id===message.author.id) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿Te besarías a ti mismo? <:burbujita:930399322183458867>`)
        ]})

        if (img.user.bot) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Gracias por ese beso! <:mmm:932177122968076338>`)
        ]})

        let consulta1 = await client.db.get(`SELECT * FROM kiss WHERE u1 = ? AND u2 = ?`, message.author.id, img.id)
        let conteo

        if(!consulta1){

          let consulta2 = await client.db.get(`SELECT * FROM kiss WHERE u1 = ? AND u2 = ?`, img.id, message.author.id)

          if(!consulta2){

            await client.db.run(`INSERT INTO kiss (u1, u2, c) VALUES (?,?,?)`, message.author.id, img.id, 0)
            consulta1 = {u1: message.author.id, u2: img.id, c: 0}
            
            await client.db.run(`UPDATE kiss SET c=c+? WHERE u1=? AND u2=?`, 1, message.author.id, img.id)
            
            conteo=(consulta1.c+1)

          } else {

            await client.db.run(`UPDATE kiss SET c=c+? WHERE u1=? AND u2=?`, 1, img.id, message.author.id)
            
            conteo=(consulta2.c+1)
          }
        } else {

          await client.db.run(`UPDATE kiss SET c=c+? WHERE u1=? AND u2=?`, 1, message.author.id, img.id)

          console.log('conteo: '+consulta1.c+' ... c: '+(consulta1.c+1))
          conteo=(consulta1.c+1)
        }

        if(conteo === 1){
          conteo='**'+conteo+'** vez.'
        }else {
          conteo='**'+conteo+'** veces.'
        }

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** le dió un beso a **${img.user.username}**. <:GatoLove:925929538863628318>\n<a:flechad:880330587678838784> *${message.author.username}* y *${img.user.username}* se han besado ${conteo}`)
          .setImage(ramdonkiss)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
    }

    var propuest = [
      'https://c.tenor.com/9BZuZR_ydhwAAAAC/compromiso-anillo.gif',
      'https://i.pinimg.com/originals/19/e7/c4/19e7c4a746a82dd9b1aeb1eabe4f34c9.gif',
      'https://luciasecasa.com/contents/uploads/2017/11/giphy-15.gif',
      'https://cdn2.actitudfem.com/media/files/tumblr_inline_ncfqd7sxks1seszfd.gif',
      'https://www.filo.news/export/sites/claro/img/2017/07/31/-906866726-animation_x16x.gif',
      'https://www.laguiadelvaron.com/wp-content/uploads/2019/01/enlaplaya.gif',
      'https://i0.wp.com/25.media.tumblr.com/8b50b8dfe089e86052ffcc3ca97fde68/tumblr_mvrrfkF4qR1qbbjduo1_250.gif',
      'http://37.media.tumblr.com/61b788ee4c5b2146848728ab3ed3fe55/tumblr_n3d5owAg6c1r5nd69o4_250.gif',
      'http://i.imgur.com/K2uCLlt.gif'
    ]

    var acepta = [
      'https://c.tenor.com/IC8h3gIj074AAAAM/casada-boda.gif',
      'https://c.tenor.com/1J5kkT96dcAAAAAC/up-si-quiero.gif',
      'https://img.buzzfeed.com/buzzfeed-static/static/2018-02/21/12/asset/buzzfeed-prod-fastlane-02/anigif_sub-buzz-15864-1519234329-2.gif',
      'https://i.pinimg.com/originals/47/f2/62/47f262da64e177792047d045e815c695.gif',
      'https://media.giphy.com/media/l2SpYryWKODJq0isM/giphy.gif',
      'https://media0.giphy.com/media/UJG50B8TJD5Mk/giphy.gif',
      'https://media.giphy.com/media/3U0NmWYS4O1kQ/giphy.gif',
      'https://img.wattpad.com/5c1f2d47198a28aa862ed794c57a45beb4320f01/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f357a34634f544b4f6578517157673d3d2d3536313838373434352e313532356232626563346134316131393730373132373031383732332e676966',
      'http://i.giphy.com/xT4uQiN5Knf0Gwhzfq.gif',
      'https://luciasecasa.com/contents/uploads/2019/10/13_razones_2.gif'
    ]

    var rechaza = [
      'https://st1.uvnimg.com/d1/29/fd7caa7e4767b665fa4b868b3faf/proposal17.gif',
      'https://gifs.cackhanded.net/bring-it-on/buh-bye.gif',
      'https://cdn.yoamoloszapatos.com/wp-content/uploads/2019/04/07220750/scared.gif',
      'https://i.gifer.com/TT5e.gif',
      'http://www.laguiadelvaron.com/wp-content/uploads/2015/09/cosas-que-hacen-a-los-hombres-m%C3%A1s-atractivos-2.gif',
      'https://i.pinimg.com/originals/cc/d7/db/ccd7db71b3bd772e359900f2ba0f7fcc.gif',
      'https://media.giphy.com/media/QEATjlWMiiixG/giphy.gif'
    ]

    var plantado = [
      'https://c.tenor.com/QOFzKfLBPMwAAAAC/plantado-esperando.gif',
      'https://luciasecasa.com/contents/uploads/2017/06/giphy-1-8.gif',
      'https://media1.giphy.com/media/I6px8ejjBGXny/giphy.gif',
      'https://i2.wp.com/www.elfarandi.com/wp-content/uploads/2016/10/bodagif.gif?resize=600%2C337&is-pending-load=1#038;ssl=1',
      'https://c.tenor.com/Ly9LeB2PKVgAAAAC/visto-lost.gif'
    ]

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
  
        collector.on("end", colected => {
          
          if(colected < 1) return m.edit({embeds: [
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
    
          collector.on("end", colected => {
            
            if(colected < 1) return m.edit({components: []});
            
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

    if(command === 'happy' || command === 'feliz'){
  
      let happy = star.happy()

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se puso modo feliz <a:6975wolfparty:901266259256168508>`)
        .setImage(happy)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      message.channel.send({ embeds: [embed] });
  
    }

    if(command === 'sleep' || command === 'durmiendo'){
  
      let sleep = star.sleep()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
      
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se fue a dormir <a:Mimido:920963402355064852>`)
        .setImage(sleep)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Yo no duermo, gracias! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${img.user.username}**, ${message.author.username} te ha invitado a dormir juntos <a:Mimido:920963402355064852>`)
        .setImage(sleep)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'dance' || command === 'bailando'){
  
      let dance = star.dance()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está tirando los pasos prohibidos. <a:pasito:877116925291946094>`)
        .setImage(dance)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Yo no bailo, gracias! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${img.user.username}** y **${message.author.username}** están bailando juntos <:abby:931432327354155038> `)
        .setImage(dance)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'blush' || command === 'sonrojado'){
  
      let blush = star.blush()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}**se sonrojó <:GatoSonrojado:925929874445729872>`)
        .setImage(blush)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Yo jamás me sonrojo! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se sonrojó al ver a **${img.user.username}** <:abby:931432327354155038> `)
        .setImage(blush)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'confused' || command === 'confundido'){
  
      let confus = star.confused()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
   
      if (!img || img.id===message.author.id) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está confundido <a:ConfusedDog:920965537020907541>`)
        .setImage(confus)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | No quieras confundirme! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está confundiendo a **${img.user.username}** <a:ConfusedDog:920965537020907541> `)
        .setImage(confus)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'lick' || command === 'lamer'){
  
      let lick = star.lick()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if (!img || img.id===message.author.id) {

        return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿Te lamerías a ti mismo? <:pepemaje:932177727589589013>`)
        ]})

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** está lamiendo a **${img.user.username}** <:mmm:880308330894090241>`)
        .setImage(lick)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'feed' || command === 'comer'){
  
      let feed = star.feed()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if (!img || img.id===message.author.id) {

        return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | Cómete <:esta:925931250303250512>`)
        ]})

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Ya comí! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** le dió de comer a **${img.user.username}** <a:Zuii:890684724673150996>`)
        .setImage(feed)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });

      }
  
    }

    if(command === 'pat'){
  
      let pat = star.pat()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

      if (!img || img.id === message.author.id) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | Acaríciame <:esta:925931250303250512>`)
      ]})

      if (img.user.bot) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¡Qué lindo eres acariciando a un bot! <:nogarsias:932172183453712415>`)
      ]})

      let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, img.id)
      let text 

      if(!usuario2){
 
        await client.db.run(
          `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
          )
        usuario2 = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

      }
    
      await client.db.run(`UPDATE usuarios SET pat=pat+? WHERE idusuario=?`, 1, img.id)

      if((usuario2.pat+1) === 1){
        text = '**'+(usuario2.pat+1)+'** caricia'
      } else{
        text = '**'+(usuario2.pat+1)+'** caricias'
      }
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
      //.setTitle('Imagen completa')
      .setDescription(`**${message.author.username}** está acariciando a **${img.user.username}**. <a:gatoasomar:930399873113677834>\n<a:flechad:880330587678838784> *${img.user.username}* ha recibido ${text} en total.`)
      .setImage(pat)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
      message.channel.send({ embeds: [embed] });
  
    }

    if(command === 'kickbutt' || command === 'patear'){
  
      let kick = star.kick()
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
   
      if (!img || img.id === message.author.id) {

        return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿A quién quieres patear? <:pepemaje:880303225109110814>`)
        ]})

      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¡No puedes conmigo! <:nogarsias:932172183453712415>`)
        ]})
        
      } else {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Emotions`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${img.user.username}**, ${message.author.username} te dió una patada <a:ThisGonnaBGud_retrasados:887057491081449512>`)
        .setImage(kick)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
    if(command === 'sad' || command === 'triste'){
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonsad = sad[Math.floor(Math.random()*sad.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** se puso modo depre.`)
          .setImage(ramdonsad)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡Yo no ando sad! <:nogarsias:932172183453712415>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.user.username}** andan modo sad.`)
            .setImage(ramdonsad)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
  
      let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
      let ramdonclorox = clorox[Math.floor(Math.random()*clorox.length)]

      if (!img || img.id===message.author.id) {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** se ahoga con un buen clorox!`)
          .setImage(ramdonclorox)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
  
      } else if (img.user.bot){
        
        return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RED')
        .setDescription(`<a:Verify2:931463492677017650> | ¿Clorox? <:nogarsias:932172183453712415>`)
        ]})
        
      } else {
  
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen complseta')
          .setDescription(`**${img.user.username}**, vamos a ahogarnos en la soledad con un clorox invitado por ${message.author.username}.`)
          .setImage(ramdonclorox)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
    if(command === 'cry' || command === 'llorar'){
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncry = cry[Math.floor(Math.random()*cry.length)]
    
        if (!img || img.id===message.author.id) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
          .setImage(ramdoncry)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡Si pudiera llorar, te ayudaría! <:procesando:932177969017925632>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** y **${img.user.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }

    if(command === 'suicide' || command === 'suicidar'){

      let suic = star.suicide()
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Sad`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** se ha suicidado... <a:suicide:881550681239064626>`)
        .setImage(suic)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonsape = sape[Math.floor(Math.random()*sape.length)]

        if (!img || img.id===message.author.id) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¿Te darías un autosape? <:procesando:932177969017925632>`)
        ]})

        if (img.user.bot) return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡Qué lindo eres sapeando a un bot! <:procesando:932177969017925632>`)
        ]})
  
        let usuario2 = await client.db.get(`SELECT * FROM usuarios WHERE idusuario = ?`, img.id)
        let text

        if(!usuario2){
 
          await client.db.run(
            `INSERT INTO usuarios (idusuario, nivel, exp, marry, rep, pat, hug, sape, color, frase, foto, dinero, banco, total, ck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, img.id, '0', '0', marry, '0', '0', '0', '0', color, f, i, '0', '0', '0', '0'
            )
          usuario2 = {idusuario: img.id, nivel: 0, exp: 0, marry: marry, rep: 0, pat: 0, hug: 0, sape: 0, color: color, frase: f, foto: i, dinero: 0, banco: 0, total: 0, ck: 0}

        }
    
        await client.db.run(`UPDATE usuarios SET sape=sape+? WHERE idusuario=?`, 1, img.id)
        
        if((usuario2.sape+1) === 1){
          text = '**'+(usuario2.sape+1)+'** sape'
        } else{
          text = '**'+(usuario2.sape+1)+'** sapes'
        }
          
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
        //.setTitle('Imagen completa')
        .setDescription(`**${message.author.username}** le dió un sape a **${img.user.username}**. <:nojao:891551822387486721>\n<a:flechad:880330587678838784> *${img.user.username}* ha recibido ${text} en total.`)
        .setImage(ramdonsape)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        message.channel.send({ embeds: [embed] });
    
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
    
    if(command === 'punch' || command === 'golpear'){
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonpunch = punch[Math.floor(Math.random()*punch.length)]
    
        if (!img || img.id===message.author.id) {
    
          return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Te golpearías a ti mismo? <:maje:925927838492811295>`)
          ]})
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡Qué lindo eres pegándole a un bot! <:procesando:932177969017925632>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le dió un puñetazo a **${img.user.username}**.`)
            .setImage(ramdonpunch)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
    }
    
    if(command === 'slap'){
          
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        //let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
          return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Te quieres autolesionar? <:procesando:932177969017925632>`)
          ]})

        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡Qué lindo eres pegándole a un bot! <:procesando:932177969017925632>`)
          ]})
          
        } else {
    
          neko.sfw.slap().then(neko => {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** abofeteó a **${img.user.username}**.`)
            .setImage(neko.url)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id===message.author.id) {
    
          return message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¡Que alguién lo detenga, por favor! <a:stitchsad:925931908918046790>`)
          ]})
    
        } else if (img.user.bot){
          
          return message.channel.send({embeds: [
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor('RED')
          .setDescription(`<a:Verify2:931463492677017650> | ¡No puedes matar a un bot! <:pepemaje:932177727589589013>`)
          ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Love`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** acaba de masacrar a **${img.user.username}**.`)
            .setImage(ramdonkill)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
      
        };
    
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
        'https://media.discordapp.net/attachments/853500788848853002/873742218379292712/40.gif',
        'https://www.gifs-porno.com/wp-content/uploads/2019/07/Follando-con-Gabbie-Carter.gif'
      ]
    
    if(command === 'tetas'){
    
      if(!message.channel.nsfw)
      {
        return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
      } 
      else {
    
        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdontetas = tetas[Math.floor(Math.random()*tetas.length)]
  
        if (!img || img.id===message.author.id || img.user.bot) {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`**${message.author.username}** mira estos melones <a:pandanoveo:880306441926352916> `)
          .setImage(ramdontetas)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
          message.channel.send({ embeds: [embed] });
    
        } else {
    
          const embed = new Discord.MessageEmbed()
          .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
          //.setTitle('Imagen completa')
          .setDescription(`Hey **${img.user.username}**, mira estos melones que **${message.author.username}** te trajo <a:pandanoveo:880306441926352916> `)
          .setImage(ramdontetas)
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonpussy = pussy[Math.floor(Math.random()*pussy.length)]
    
          if (!img || img.id===message.author.id || img.user.bot) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen')
            .setDescription(`**${message.author.username}** mira esa papaya <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Hey **${img.user.username}**, mira esa papaya que **${message.author.username}** te está mostrando <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonculo = culo[Math.floor(Math.random()*culo.length)]
    
          if (!img || img.id===message.author.id || img.user.bot) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** mira ese perro culazo <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else{
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Omg!!! **${img.user.username}** mira ese perro culazo que tiene **${message.author.username}** <a:pandanoveo:880306441926352916> `)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdondick = dick[Math.floor(Math.random()*dick.length)]
    
          if (!img || img.id===message.author.id || img.user.bot) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó una rica polla <a:pandanoveo:880306441926352916> `)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          }else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** anda viendo la verga de **${img.user.username}** <a:pandanoveo:880306441926352916> `)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdoncum = cum[Math.floor(Math.random()*cum.length)]
          let ramdoncum2 = cum2[Math.floor(Math.random()*cum2.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** acaba de vaciarse <:aisaMexicana:925926704097161216>`)
            .setImage(ramdoncum)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se vino dentro de **${img.user.username}**.`)
            .setImage(ramdoncum2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
        'https://www.elergonomista.com/wp-content/uploads/2019/05/G73.gif',
        'https://media.discordapp.net/attachments/853500788848853002/876989949373718578/45.gif?width=540&height=457',
        'https://media.discordapp.net/attachments/853500788848853002/876989952309751838/46.gif?width=504&height=283',
        'https://media.discordapp.net/attachments/853500788848853002/876989966062850058/47.gif?width=540&height=430',
        'https://media.discordapp.net/attachments/853500788848853002/876989972912152616/48.gif?width=270&height=412',
        'https://media.discordapp.net/attachments/853500788848853002/876989984031256597/49.gif?width=374&height=562',
        'https://media.discordapp.net/attachments/853500788848853002/876989990293364736/50.gif?width=450&height=253',
        'https://www.elergonomista.com/wp-content/uploads/2019/05/G72.gif',
        'https://cdn.sex.com/images/pinporn/2021/04/19/25003360.gif?width=620',
        'https://cdn.pictocum.com/25579630.gif',
        'https://dl.phncdn.com/gif/2451781.gif',
        'https://dl.phncdn.com/gif/2451761.gif',
        'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/7/6/D/W/76DWs/Lena%20Paul%2005.gif',
        'https://vayagifporno.com/wp-content/uploads/2019/11/Los-mejores-GIFs-porno-xxx.gif',
        'https://static-ca-cdn.eporner.com/gallery/XG/Oz/PuQJJ6QOzXG/900719-900719.gif',
        'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/6/X/s/q/6Xsqu/XXX%20119%20001.gif',
        'https://entangada.com/wp-content/uploads/2021/09/Gifs-porno-exclusivos-%E2%80%93-016-1.gif',
        'https://vayagifporno.com/wp-content/uploads/2019/09/gif-penetraci%C3%B3n-pollas-grandes-co%C3%B1os-gif-porno.gif',
        'https://www.gifs-porno.com/wp-content/uploads/2017/10/Gozando-de-placer.gif',
        'https://68.media.tumblr.com/b02ef92c6af86fa1405687995bf100b9/tumblr_ng23qjEkRd1s8maa0o1_500.gif',
        'https://el.phncdn.com/gif/367242.gif',
        'https://49.media.tumblr.com/a95d30acc631582b85c344734aa61050/tumblr_mwrkxuqCEY1t3nsdpo1_400.gif',
        'https://ist5-1.filesor.com/pimpandhost.com/1/4/6/0/146081/6/y/o/r/6yorL/Abella%20Anderson%20-%2003.gif',
        'https://entangada.com/wp-content/uploads/2021/06/lana-rhoades-13.gif',
        'https://entangada.com/wp-content/uploads/2021/06/lana-rhoades-gif-31.gif',
        'https://img-4.poringa.net/poringa/img/7/C/F/1/0/F/Elpotro508/1B8.gif',
        'https://vayagifporno.com/wp-content/uploads/2018/09/19881967.gif',
        'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/7/J/a/g/7Jagh/XXX%20Gifs%20-%20005.gif',
        'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/k/x/Q/9kxQJ/XXX-porn-%28gifs%29-17.gif',
        'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/9/3/0/M/930Mv/XXX-%28gifs%29---024.gif',
        'https://pornoybizarro.com/wp-content/uploads/2015/10/133.gif',
        'https://cdn5-images.motherlessmedia.com/images/8A78EF5.gif',
        'http://img2.thatpervert.com/pics/post/porn--porn-gif-vaginal-porn-6494774.jpeg',
        'https://entangada.com/wp-content/uploads/2021/06/lana-rhoades-gif-3.gif',
        'https://entangada.com/wp-content/uploads/2021/06/lana-rhoades-gif-7.gif',
        'https://vayagifporno.com/wp-content/uploads/2015/10/65.gif',
        'https://vayagifporno.com/wp-content/uploads/2015/11/117.gif',
        'http://68.media.tumblr.com/c435cb3e0c2ee7c28f04ef491c44fd43/tumblr_oihm6z9F7V1semc6ko7_540.gif',
        'http://nahefoto.cz/gif/849.gif',
        'https://www.elergonomista.com/wp-content/uploads/2019/05/G54.gif',
        'https://www.webporno.xxx/wp-content/uploads/2016/04/morenaza-tetona-follada-de-lado-en-la-cama.gif',
        'http://nahefoto.cz/gif/49.gif',
        'https://78.media.tumblr.com/f88eeba4d4b8e3f7c7fd042bc0cd21f4/tumblr_ojn7ajJ9tK1u2dlogo1_500.gif',
        'https://blog.clasificadox.com/wp-content/uploads/2014/03/gifs-porno-animados-eroticos-sexys-9.gif',
        'https://www.frikiporno.com/wp-content/uploads/2015/05/chica-perfecta-follando-con-su-novio.gif',
        'https://culosonline.com/wp-content/uploads/2021/08/sex-gif-548.gif',
        'https://www.gifs-porno.com/wp-content/uploads/2017/10/En-la-cocina.gif',
        'http://www.bayofpleasure.com/str/image/487770.gif',
        'https://i1.wp.com/pornopoke.com/wp-content/uploads/2017/05/gif-porno-mamadas-y-folladas-5.gif?resize=400%2C242&ssl=1',
        'https://cdn.sex.com/images/pinporn/2019/06/27/21385822.gif?width=620',
        'https://vayagifporno.com/wp-content/uploads/2021/01/gifs-cogiendo-y-muy-calientes.gif',
        'https://i2.wp.com/pornopoke.com/wp-content/uploads/2017/06/gif-porno-de-latinas-guarras-1.gif?fit=480%2C242&ssl=1',
        'https://gif-porno.com/gifs/gif285.gif',
        'https://vayagifporno.com/wp-content/uploads/2018/09/2dcb9966-1.gif',
        'https://vayagifporno.com/wp-content/uploads/2018/09/16997121-1.gif',
        'https://ist6-2.filesor.com/pimpandhost.com/1/4/6/0/146081/8/T/O/6/8TO6g/Fuck-and-Squirt-%28gifs%29-019.gif',
        'https://www.webporno.xxx/wp-content/uploads/2018/04/abierta-de-piernas-follada-en-el-sofa.gif',
        'https://ist5-2.filesor.com/pimpandhost.com/1/4/6/0/146081/7/o/K/w/7oKwK/Pussy%20Fucking%2002.gif',
        'https://ist5-1.filesor.com/pimpandhost.com/1/4/6/0/146081/6/B/I/K/6BIKT/Tight%20Pussy%20-%20005.gif',
        'https://entangada.com/wp-content/uploads/2021/10/Megan-Rain-anal-1.gif',
        'https://gif-porno.com/gifs/gif282.gif',
        'https://www.gifs-porno.com/wp-content/uploads/2019/06/Pidiendo-aumento-de-sueldo-cogiendo.gif',
        'https://vayagifporno.com/wp-content/uploads/2018/03/2-24.gif',
        'https://cdn1.cherrygif.com/30422/25744786.gif',
        'https://ist5-2.filesor.com/pimpandhost.com/1/9/9/1/199145/7/E/l/r/7Elr0/gif-sex-41.gif',
        'https://vayagifporno.com/wp-content/uploads/2018/06/01eb7e73-9.gif',
        'https://vayagifporno.com/wp-content/uploads/2014/03/1247.gif'
      ]
    
      if(command === 'fuck'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonfuck = fuck[Math.floor(Math.random()*fuck.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:880304386826465300>`)
            .setImage(ramdonfuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está follando a **${img.user.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonfuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonlick = lick[Math.floor(Math.random()*lick.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó lamer coños <a:sabroso:880695816497541180>`)
            .setImage(ramdonlick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** le está haciendo un buen oral a **${img.user.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonlick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonsuck = suck[Math.floor(Math.random()*suck.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le provocó chupar pollas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está comiendo la verga de **${img.user.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonsuckb = suckb[Math.floor(Math.random()*suckb.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`A **${message.author.username}** le gusta chupar bolas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** se está comiendo las pelotas de **${img.user.username}** <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
          let ramdonsboobs = sboobs[Math.floor(Math.random()*sboobs.length)]
    
          if(!img || img.id===message.author.id || img.user.bot)
          {
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${message.author.username}** está chupando tetas <a:sabroso:880695816497541180>`)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            message.channel.send({ embeds: [embed] });
    
          } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
            //.setTitle('Imagen completa')
            .setDescription(`**${img.user.username}**, **${message.author.username}** te está chupando los melones que tienes <a:sabroso:880695816497541180>.`)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
             message.channel.send({ embeds: [embed] });
            
          }
          
        }   
    
      }
    
      if(command === 'anal'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
    
          if(!img || img.id === message.author.id || img.user.bot)
          {
            
              const image = await nsfw3.anal();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le están dando por detroit <:aisaMexicana:925926704097161216>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
    
          } else {
    
              const image = await nsfw3.anal();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** le está dando a **${img.user.username}** por la retaguardia`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            }
            
        }   
    
      }
    //prueba 
      if(command === 'porno'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
    
          if(!img || img.id === message.author.id || img.user.bot)
          {
            
              const image = await nsfw3.pgif();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
          } else {
    
            
              const image = await nsfw3.pgif();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** está viendo nopor con **${img.user.username}** <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
        }
    
        }   
    
      }
    
      if(command === '4k'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
    
          if(!img || img.id === message.author.id || img.user.bot)
          {
           
              const image = await nsfw3.fourk();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`A **${message.author.username}** le gusta en 4k <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
    
          } else {
    
              const image = await nsfw3.fourk();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}** y **${img.user.username}** están viendo 4k <a:run:880304386826465300>`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
           
        }
    
        }   
    
      }
    
      if(command === 'gonewild'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
    
          if(!img || img.id === message.author.id || img.user.bot)
          {
            
              const image = await nsfw3.gonewild();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              .setDescription(`**${message.author.username}**, disfrútalo!`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
           
    
          } else {
    
              const image = await nsfw3.gonewild();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen plet')
              .setDescription(`**${message.author.username}** y **${img.user.username}** disfrútenlo!`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
            
        }
    
        }   
    
      }
    
      if(command === 'nekosolo'){
    
        if(!message.channel.nsfw)
        {
          return message.channel.send('Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>')
        } 
        else {
    
          let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
    
          if(!img || img.id === message.author.id || img.user.bot)
          {
              const image = await nsfw3.solo();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              //.setDescription(`**${message.author.username}** se está masturbando.`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
    
          } else {
    
            const image = await nsfw3.solo();
    
              const embed = new Discord.MessageEmbed()
              .setAuthor(`Midgard's Hot`,message.guild.iconURL({ dynamic: true }))
              //.setTitle('Imagen completa')
              //.setDescription(`**${message.author.username}** le da una mano a **${img.user.username}**.`)
              .setImage(image)
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
              message.channel.send({ embeds: [embed] });
          
        }
    
        }   
    }

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
        .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
        .setTitle('Lionel Messi')
        //.setDescription(`${message.author.username} mira co mue <:tierno:931433334960160799>`)
        .setImage(ramdonm)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
        .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
        .setTitle('Cristiano Ronaldo')
        //.setDescription(`${message.author.username} mira co mue <:tierno:931433334960160799>`)
        .setImage(ramdonc)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
        .setAuthor(`Midgard's VIP`,message.guild.iconURL({ dynamic: true }))
        .setTitle('Karim Benzema')
        //.setDescription(`${message.author.username} mira  <:tierno:931433334960160799>`)
        .setImage(ramdonb)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
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
        .setAuthor(`Midgard's Hot`,client.user.avatarURL())
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