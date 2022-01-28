//& Modelos
const userModel = require('../../models/userSchema')
//& Modelos

module.exports = async (client, Discord, member) => {

  if(member.bot) return;

  //* Registro de Usuarios

  console.log('========================= REGISTRO DE USUARIO =========================');
    
  try {

    let user = await userModel.create({

      idusuario: member.id,
      username: member.user.username,

    })

    user.save();
    console.log('Usuario Registrado ===> Id: '+ member.id + ' Username: ' + member.user.username)
    
  } catch (error) {

    console.log('Error al Registrar Usuario: '+error)
    
  }
  
  console.log('========================= REGISTRO DE USUARIO =========================');
   
  //* Registro de Usuarios

  const guild = member.guild;
  
  console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${guild.name}.`);
  
  const channel = guild.channels.cache.find(ch => ch.id === '926412412570198076');
  
  //! Cómo exportar una imagen local

  // const img = await loadImage(join(__dirname, "../img", 'imagen.png'));

  //! Cierre

  var welcome = [
    'https://media.discordapp.net/attachments/853500788848853002/873245600936788048/1.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245604090892348/2.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245605294645308/3.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245608775917688/4.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245613217689650/5.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245612554993704/6.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245617277796394/7.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245617672056902/8.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245622017359962/9.gif',
    'https://media.discordapp.net/attachments/853500788848853002/873245621820215326/10.gif'
  ] 
  
  let ramdonwelcome = welcome[Math.floor(Math.random()*welcome.length)]
     
  const embed = new Discord.MessageEmbed()
    .setThumbnail(`${member.displayAvatarURL({ dynamic: true }).replace('webp','png')}`)
    .setTitle(`Bienvenid@ Terrícola! **${member.user.username}** <:abby:931432327354155038> , a este nuestro **Universo**. <a:pepedance:880928616416968745>`)
    .setDescription(`<:shylove:931432905421520927> Gracias por unirte <a:exclama2:880930071731392512> <a:sc_ositobailin:880930467774365707> Espero que lo pases genial en este server libre de toxicidad <a:abdul_dance:880930576683630662>, con muchos eventos programados, premios y más sorpresas!!! <a:Sara:880304101215334401> Recuerda pasar por <#777623227321155614> y <#926556796838109226> Y si tienes alguna queja, duda o sugerencia, pasa por <#880402803825188874>. Cualquier incoveniente aquí estará todo el equipo de Staff a su disposición. <a:dc_party1:881033439367815239>`)
    .setImage(ramdonwelcome)
    .setColor('RANDOM')
    .setTimestamp(new Date())
    .setFooter(guild.name, guild.iconURL({ dynamic: true }));
  
  if (!channel) return;
  
  channel.send({embeds:[embed]})
  channel.send('https://images-ext-2.discordapp.net/external/9iPHKFXXnKKSQpcFazlW79dr1zbbtdo7QT7-xxtfDY4/%3Fwidth%3D600%26height%3D86/https/media.discordapp.net/attachments/897951731462316073/915663567213199390/bar-1.gif?width=480&height=69')
      
}