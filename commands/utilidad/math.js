const prefix = process.env.PREFIX;
module.exports =  {
    
    name: 'math',
    aliases: ['cal','calcular', 'calculadora'],
    description: '📱 Ejecuta una operación matemática básica.',

    async execute(client, message, args, Discord) {

        let signos = ['*','/','+','-','x','~']

        if(!args[0]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Y... qué quieres que calcule? <a:incomodo:943361621416353842>\n\nUso: `+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        if(isNaN(args[0])) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa solo números, exceptuando los signos, que son estos \`(+, *, -, /, x, ~)\` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        if(!signos.some(x => x.toLowerCase(message.content))) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Debes colocar algún signo! \`(+, *, -, /, x, ~)\` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        if(!args[2]) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¿Y... el segundo número? <a:incomodo:943361621416353842>\n\nUso: `+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        if(isNaN(args[2])) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Ingresa solo números, exceptuando los signos, que son estos \`(+, *, -, /, x, ~)\` <:gatoNojao:930403164266565642>\n\nUso: '+'```js\n'+prefix+'math (Num1) (signo) (Num2)```')
    
        ]}).then(m => setTimeout(() => m.delete(), 5000))

        let signo = args[1]

        if(signo.toLowerCase() === 'x'){

            signo = '*'

        }
        
        if(signo === '~'){

            signo = '/'
        
        }

        try {
            
            const resultado = eval(args[0]+signo+args[2])

            const calcula = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('¡Calculadora Midgard!')
            .setColor('RANDOM')
            .addField("Pregunta: ", '```js\n'+args[0]+' '+signo+' '+args[2]+'```')
            .addField('Respuesta: ', '```js\n'+await resultado+'```')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
         
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [calcula]})

        } catch (e) {

            const err = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | ¡Oh no! a ocurrido un error\n\n`'+e.message+'`')
    
            return message.reply({embeds: [err]})
            
        }

    }

}