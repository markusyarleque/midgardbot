module.exports =  {
    
    name: 'conteo',
    aliases: [],
    description: '⏳ Realizar una cuenta regresiva.',
  
    async execute(client, message, args, Discord) {

        if(!args[0]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Pon una cantidad para hacer una cuenta regresiva.`)
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        if(isNaN(parseInt(args[0]))) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | **Pon una cantidad, solo puedo contar numeros.**`)
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        let time = parseInt(args[0])
    
        if(time > 7200) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | **No puedo contar más de 2 horas**`)
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
       
        let msg = await message.channel.send(String(time)).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        if(time < 60) {
    
            let count1 = setInterval(async () => {
    
                await msg.edit(time <= 0 ? `Se acabó el tiempo ⌛` : String(time)).catch((e) => console.log('Error al enviar mensaje: '+e))
                // message.channel.send(`${message.author} La cuenta regresiva ha terminado!`)
                time <= 0 ? message.reply(`${message.author}... El conteo regresivo, ha llegado a su fin.`).catch((e) => console.log('Error al enviar mensaje: '+e)) : message.channel.sendTyping().catch((e) => console.log('Error al enviar mensaje: '+e))
                time <= 0 ? clearInterval(count1) : time -= 2;
                
            }, 2000)

        } else {
    
            let count2 = setInterval(async () => {
    
                await msg.edit(time <= 0  ? `... Se acabó el tiempo ⌛` : String(time)).catch((e) => console.log('Error al enviar mensaje: '+e))
                time <= 0 ? message.reply(`${message.author}... El conteo regresivo, ha llegado a su fin.`).catch((e) => console.log('Error al enviar mensaje: '+e)) : message.channel.sendTyping().catch((e) => console.log('Error al enviar mensaje: '+e))
                time <= 0 ? clearInterval(count2) : time -= 3
    
            }, 3000)
            
        }

    }

}