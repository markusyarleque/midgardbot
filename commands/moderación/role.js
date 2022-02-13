const prefix = process.env.PREFIX;

module.exports =  {
    
    name: 'role',
    aliases: ['rol','info-role'],
    description: '🛑 Muestra la información de un rol del servidor.\n> Uso: `'+prefix+'role <nombrerol>`',
  
    async execute(client, message, args, Discord) {

        const boolean = {

            true: 'Si',
            false: 'No',

        }

        if(!args) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Escriba el nombre de un rol.\n> Uso: `'+prefix+'role <nombrerol>`')
    
        ]})

        let role = message.guild.roles.cache.find(n => n.name == args.join(' '));
    
        if(!role) return message.reply({ embeds: [

            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('<a:Verify2:931463492677017650> | Rol no encontrado en el servidor.')
    
        ]})
    
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
        
        message.reply({ allowedMentions: { repliedUser: false},embeds: [embed] })

    }

}