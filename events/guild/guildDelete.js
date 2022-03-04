module.exports = async (client, Discord, guild) => {

    let owner = client.users.cache.get('753435606410985573')
    let sv = client.guilds.cache.get('777620055344545842')
    let channel = sv.channels.cache.get('874943743185285150')
 
    const embed = new Discord.MessageEmbed()
    .setAuthor('MaltaBot',client.user.avatarURL())
    .setThumbnail(guild.iconURL() ? guild.iconURL({ dynamic: true }) : 'https://i.pinimg.com/originals/04/41/ea/0441ea5619b979bde781aa040943c208.gif')
    .setTitle(`¡Un Server menos! `)
    .setDescription('<:yonofui:931433119859503194> Me he salido del servidor: \n\n> Nombre: '+guild.name+'\n> \n> Id: '+guild.id+'\n> \n> Fecha: Hoy\n')
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(guild.name, guild.bannerURL() ? guild.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png') : 'https://www.cosas-que-pasan.com/wp-content/uploads/portada-facebook-en-construccion.jpg')

    try {

        channel.send({embeds: [embed]})
        owner.send({embeds:[embed]}).catch(err => console.log('Error al enviar SERVER MENOS: '+guild.name+' - '+guild.id+' al dm del owner: - Error: '+err))

    } catch (error) {
        
        console.log('No se envío dm al owner: '+error)
    }

}