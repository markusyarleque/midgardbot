module.exports =  {
    
    name: 'invite',
    aliases: [],
    description: '💻 Reinicio de comandos.',
  
    async execute(client, message, args, Discord) {

        let id3 = ['753435606410985573','683501310527668228']
    
        if(!id3.some(id => message.author.id == id)) return 

        try {

            const invite = await client.fetchInvite(args[0])

            const embed = new Discord.MessageEmbed()
            .setTitle('BABEL ABIERTO')
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RANDOM')
            .setFooter({ text: '!capply Midgard'})

            if(invite.guild){

                embed.setThumbnail(invite.guild.iconURL({dynamic: true}))
                embed.addField('Servidor: ', invite.guild.name + "\nID: `" + invite.guild.id + "`", true)
                embed.addField('Miembros: ', invite.memberCount, true)
                embed.addField("Invitado por: ", (invite.inviter ? invite.inviter.tag + "\n" + invite.inviter.toString() : 'None'), true)

            }else {

                embed.setDescription('No es un Link de servidor')

            }
                
        } catch (error) {
            
            if(error.message === "Unknown Invite"){

                return message.channel.send({ content: 'La API respondió que la invitación es Desconocida o No existe' })

            } else{
                
                return message.channel.send({ content: 'Ocurrió un error al intentar buscar información. \nError: ' + error })
            }
    
        }

    }

}