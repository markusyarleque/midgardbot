const Discord = require('discord.js');

const { Permissions } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ allowedMentions: { parse: ['users'], repliedUser: true }, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES] });

const newUsers = new Discord.Collection();
const listask = new Discord.Collection();

const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();

const red = require('reddit-fetch');

const over = require('poke-over');


const prefix = process.env.PREFIX;
const { MessageActionRow, MessageButton } = require('discord.js');

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

client.on('messageCreate', async message => {

      //AQUÍ

    if(!message.content.startsWith(process.env.PREFIX)) return;
    
    //const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    //COMANDOS DE MODERACIÓN

  
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