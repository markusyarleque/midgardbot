//& Modelos
const userModel = require('../../models/userSchema')
//& Modelos

module.exports = async (client, Discord, member) => {

    if(member.bot) return;

    //* Abandono de Usuarios

    const guild = member.guild;

    const btnJoinServer = new Discord.MessageButton()
    .setLabel('UNIRSE') 
    .setStyle('LINK') 
    .setURL('https://discord.gg/CM9yAmXPfC')

    const fila = new Discord.MessageActionRow().addComponents(btnJoinServer)
  
    console.log(`Usuario:  ${member.user.username} ha salido del servidor ${guild.name}.`);
  
    const embed = new Discord.MessageEmbed()
    .setThumbnail(`${member.displayAvatarURL({ dynamic: true }).replace('webp','png')}`)
    .setTitle(`Muchas gracias! **${member.user.username}** por estar en nuestro servidor <:abby:931432327354155038>`)
    .setDescription(`<:shylove:931432905421520927> Estamos apenados de que te vayas tan pronto, pero te dejaré un link de invitación, por si quieras volver, con gusto te recibiremos! <a:dc_party1:881033439367815239>\n\n> [Click aquí para unirte](https://discord.gg/CM9yAmXPfC)`)
    .setThumbnail(guild.bannerURL({ dynamic: true, size: 4096 }).replace('webp','png'))
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(guild.name, guild.iconURL({ dynamic: true }));
  
    try {

        member.send({embeds:[embed], components: [fila]})

    } catch (error) {
        
        console.log('No se envío link de invitación: '+error)
    }

    //* Abandono de Usuarios

}