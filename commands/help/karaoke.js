const prefixSchema = require('../../models/prefixSchema');

module.exports =  {
    
    name: 'karaoke',
    aliases: ['help karaoke','help-karaoke'],
    description: '❗ Comandos para la categoría de Karaoke',
  
    async execute(client, message, args, Discord) {

        let buscarprefix, prefix
        try {

            buscarprefix = await prefixSchema.findOne({idserver: message.guild.id})

            if(buscarprefix){

                prefix = buscarprefix.prefix

            } else {

                prefix = process.env.PREFIX

            }

        } catch (error) {

            console.log('Error al Prefix en Servidor: '+ message.guild.id + ' - ' + error)
            prefix = process.env.PREFIX

        }

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://img1.picmix.com/output/stamp/normal/5/5/3/4/1754355_5b4b9.gif')
        .setAuthor({ name: `Midgard's Karaoke`, iconURL: 'https://images-ext-1.discordapp.net/external/FrwQc20YeRvAuhpfyvTDLf0qJon61IxQ3wJw6v2RrGs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/856814676692041738/b9c01810fc4ed6c302bceb25418ec974.png' })
        .setTitle('Comandos:')
        .setDescription(`Se utilizan sólo en: ${client.channels.cache.get('880317466557952000')}`)
        .addField('Agregar a la Lista:', '`'+prefix+'k` `'+prefix+'k <@user>`')
        .addField('Quitar de la Lista', '`'+prefix+'d` `'+prefix+'d <@user>`')
        .addField('Ver Lista', '`'+prefix+'lista`')
        .addField('Reiniciar lista', '`'+prefix+'dall`')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `🔥 La Élite 🔥`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}` })
            
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}