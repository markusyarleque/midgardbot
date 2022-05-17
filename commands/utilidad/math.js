const prefixSchema = require('../../models/serverSchema');

module.exports =  {
    
    name: 'math',
    aliases: ['cal','calcular', 'calculadora'],
    description: '📱 Ejecuta una operación matemática básica.',

    async execute(client, message, args, Discord) {

        let buscarprefix, prefix, oper, result
        try {

            buscarprefix = await prefixSchema.findOne({idserver: message.guild.id})

            if(buscarprefix){

                prefix = buscarprefix.prefix

            } else {

                prefix = process.env.PREFIX

            }

        } catch (error) {

            console.log('Error al buscar Prefix en Servidor: '+ message.guild.id + ' - ' + error)
            prefix = process.env.PREFIX

        }
        
        let signos = ['*','/','+','-','x','~']

        if(!args[0]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Y... qué quieres que calcule? <a:incomodo:943361621416353842>\n\nUso: `+'```js\n'+prefix+'math (Num1)(signo)(Num2)...```')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        oper = message.content.split(' ').slice(1).join(' ')

        // if(isNaN(args[0])) return message.reply({ embeds: [

        //     new Discord.MessageEmbed()
        //     .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
        //     .setColor('RED')
        //     .setDescription('<a:Verify2:931463492677017650> | Ingresa solo números, exceptuando los signos, que son estos: `+` `*` `-` `/` `x` `~` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        // ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(!signos.some(x => x.toLowerCase(oper.split('')))) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Debes colocar algún signo! `+` `*` `-` `/` `x` `~` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1)(signo)(Num2)...```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        try {
            
            result = eval(oper)

            const calcula = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setTitle('¡Calculadora Midgard!')
            .setColor('RANDOM')
            .addField("Pregunta: ", '```js\n' + oper + '```')
            .addField('Respuesta: ', '```js\n' + await result + '```')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/MNWYvup.gif' })

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [calcula]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } catch (e) {

            const err = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | ¡Oh no! a ocurrido un error\n\n`'+e.message+'`')
    
            return message.reply({embeds: [err]}).catch((e) => console.log('Error al enviar mensaje: '+e))
            
        }

    }

}