const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'slot',
    aliases: ['slots','tragaperras','traga-perras'],
    description: '🎰 Apuesta en el tragamonedas y gana.',
  
    async execute(client, message, args, Discord) { 

        let cantidad = args[0] || 100

        if(isNaN(cantidad)) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Sólo debes colocar números.!`)

        ]})

        const bet = parseInt(cantidad)

        let buscarUsuario = await userSchema.findOne({idusuario: message.author.id})

        if(!buscarUsuario){

            let user = await userSchema.create({

                idusuario: message.author.id,
                username: message.author.username,
                dinero: 0,
                total: 0

            })

            user.save();
            console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

        }

        let dinero = await buscarUsuario.dinero

        if(dinero < bet) return message.reply({embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No tienes suficiente dinero para apostar.`)

        ]})

        let slots = ["💎", "💰", "💵"]

        let result1 = Math.floor(Math.random() * slots.length)
        let result2 = Math.floor(Math.random() * slots.length)
        let result3 = Math.floor(Math.random() * slots.length)

        let embed2 = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/939608838737367080/jackpot-slot.gif?width=320&height=180')
        .setTitle("Tragamonedas")
        .addField("Jugando:", slots[result1] + " **|** " + "<a:slot:939590026080190474>" + " **|** " + "<a:slot:939590026080190474>" + " **<**", true)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Apostando: ${bet}$`)
        
        let embed3 = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/939608838737367080/jackpot-slot.gif?width=320&height=180')
        .setTitle("Tragamonedas")
        .addField("Jugando:", slots[result1] + " **|** " + slots[result2] + " **|** " + "<a:slot:939590026080190474>" + " **<**", true)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Apostando: ${bet}$`)

        if (result1 === result2 && result1 === result3) {

            var gana

            if(buscarUsuario.vip === true){

                gana = bet * 10

            } else {

                gana = bet * 3

            }

            let embed4 = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/939608838737367080/jackpot-slot.gif?width=320&height=180')
            .setTitle("¡Ganaste! 🎰")
            .addField("Resultado:", slots[result1] + " **|** " + slots[result2] + " **|** " + slots[result3] + " **<**", true)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(`Ganaste: ${(gana)}$`)

            let embed = new Discord.MessageEmbed()
            .setTitle("Tragamonedas")
            .addField("Jugando:","<a:slot:939590026080190474>" + " **|** " + "<a:slot:939590026080190474>" + " **|** " + "<a:slot:939590026080190474>" + " **<**", true)
            .setColor("RANDOM")
            .setFooter(`Apostando: ${bet}$`)

            message.channel.send({embeds: [embed]}).then((msg) => {

                setTimeout(function () {

                    msg.edit({embeds: [embed2]});
                  
                }, 2000)

                setTimeout(function () {

                    msg.edit({embeds: [embed3]});
                  
                }, 5000)

                setTimeout(function () {

                    msg.edit({embeds: [embed4]});
                  
                }, 7000)

            })

            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
        
                        dinero: buscarUsuario.dinero + gana,
                        total: buscarUsuario.total + gana
        
                    });
    
                update.save();
                    
            } catch (error) {
    
                console.log('Error al actualiza dinero ganado del slot: '+error)
                    
            }
        
        } else {

            let embed5 = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/939608838737367080/jackpot-slot.gif?width=320&height=180')
            .setTitle("¡Perdiste! 🎰")
            .addField("Resultado:", slots[result1] + " **|** " + slots[result2] + " **|** " + slots[result3] + " **<**", true)
            .setColor("RED")
            .setTimestamp()
            .setFooter(`Perdiste: ${(bet)}$`)

            let embed = new Discord.MessageEmbed()
            .setTitle("Tragamonedas")
            .addField("Jugando:","<a:slot:939590026080190474>" + " **|** " + "<a:slot:939590026080190474>" + " **|** " + "<a:slot:939590026080190474>" + " **<**", true)
            .setColor("RANDOM")
            .setFooter(`Apostando: ${bet}$`)

            message.channel.send({embeds: [embed]}).then((msg) => {

                setTimeout(function () {

                    msg.edit({embeds: [embed2]});
                  
                }, 2000)

                setTimeout(function () {

                    msg.edit({embeds: [embed3]});
                  
                }, 5000)

                setTimeout(function () {

                    msg.edit({embeds: [embed5]});
                  
                }, 7000)

            })

            try {

                let update = await userSchema.findOneAndUpdate({ idusuario: message.author.id },
                    {
        
                        dinero: buscarUsuario.dinero - bet,
                        total: buscarUsuario.total - bet
        
                    });
    
                update.save();
                    
            } catch (error) {
    
                console.log('Error al actualiza dinero perdido del slot: '+error)
                    
            }

        }

    }

}