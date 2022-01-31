const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'addvip',
    aliases: ['add-vip'],
    description: '💎 Añade a los usuarios VIP del bot.',
  
    async execute(client, message, args, Discord) { 

        var idm = ['753435606410985573','683501310527668228']

        if(!idm.some(id => message.author.id == id)) return message.reply({embeds: [
       
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¡Solo los Administradores del Bot pueden utilizar este comando.!`)
      
        ]})
    
        let user = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));

        if(!user) return message.reply({embeds: [
       
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | ¡Debes mencionar a un usuario!`)
      
        ]})

        if(user.user.bot) return message.reply({embeds: [
        
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | No puedes añadir a un bot como usuario VIP`)
      
        ]})

        try {

            let buscarUsuario = await userSchema.findOne({ idusuario: user.id })

            if(!buscarUsuario){

                let user = await userSchema.create({
    
                    idusuario: message.author.id,
                    username: message.author.username
    
                })
    
                user.save();
                console.log('Usuario Registrado ===> Id: '+ user.id + ' Username: ' + user.username)

            }

            if(buscarUsuario.vip === true){

                return message.reply({embeds: [
        
                    new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Este usuario ya es VIP.`)
              
                ]})

            } else if(buscarUsuario.vip === false){

                let update = await userSchema.findOneAndUpdate({idusuario: user.id},
                    {
    
                        vip: true
    
                    })
    
                update.save()

                console.log('Se añadió al usuario VIP: '+user.id)
            
                const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('El usuario <@'+user.id+'> ha sido añadido a la lista VIP.')
                .setThumbnail('https://c.tenor.com/b66sjGFhHsIAAAAC/tuxedo.gif')
                .setColor('RANDOM')

                message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed]})

            }
       
        } catch (error) {
            
            console.log('Error al añadir usuario VIP: User '+user.id+' - Error '+error)
            
            return message.reply({embeds: [
        
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Hubo un error al añadir al Usuario VIP. Por favor, inténtelo de nuevo!`)
          
            ]})
   
        }

    }

}