const prefixSchema = require('../../models/serverSchema');

module.exports =  {
    
    name: 'math',
    aliases: ['cal','calcular', 'calculadora'],
    description: '📱 Ejecuta una operación matemática básica.',

    async execute(client, message, args, Discord) {

        let buscarprefix, prefix, signo
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
            .setDescription(`<a:Verify2:931463492677017650> | ¿Y... qué quieres que calcule? <a:incomodo:943361621416353842>\n\nUso: `+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 10000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(!args[1]){

            if(signos.some(s => s.toLowerCase(args[0]))){

                let sp = args[0].split('')

                for(let i = 0; i < sp.length; i++){

                    if(signos.some(z => z.toLowerCase(sp[i]))){

                        args = args[0].replace[sp[i],' '+sp[i]+' ']
                        console.log('Argumento0: ' + args)

                        const resultado = eval(args)

                        console.log('Result: ' + resultado)

                    }

                }

            }


        }

        if(isNaN(args[0])) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa solo números, exceptuando los signos, que son estos: `+` `*` `-` `/` `x` `~` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(!signos.some(x => x.toLowerCase(message.content))) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Debes colocar algún signo! `+` `*` `-` `/` `x` `~` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(!args[2]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Y... el segundo número? <a:incomodo:943361621416353842>\n\nUso: `+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        if(isNaN(args[2])) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa solo números, exceptuando los signos, que son estos \`(+, *, -, /, x, ~)\` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        signo = args[1]

        if(signo.toLowerCase() === 'x'){

            signo = '*'

        }
        
        if(signo === '~'){

            signo = '/'
        
        }

        try {
            
            const resultado = eval(args[0]+signo+args[2])

            const calcula = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setTitle('¡Calculadora Midgard!')
            .setColor('RANDOM')
            .addField("Pregunta: ", '```js\n'+args[0]+' '+signo+' '+args[2]+'```')
            .addField('Respuesta: ', '```js\n'+await resultado+'```')
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