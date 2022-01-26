const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageAttachment } = require('discord.js');

module.exports =  {
    
    name: 'rob',
    aliases: ['robar'],
    description: '🏴 Roba algunas coins de cualquier miembro del servidor.',
  
    async execute(client, message, args, Discord) { 

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

}