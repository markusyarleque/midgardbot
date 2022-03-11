const { Permissions } = require('discord.js');

module.exports = async (client) => {
  
  client.user.setPresence( 
    {
      status: 'online', 
      activities: [{ 
        
        name: client.guilds.cache.size + ' server' + (client.guilds.cache.size === 1 ? '' : 's')+' | '+ client.users.cache.size + ' usuarios', 
        type: 'WATCHING',
        
      }],
    }
  );

  let rolVIP = '951591485072089098'

  var colores = [
        
    '#E74C3C',
    '#FFFF00',
    '#2ECC71',
    '#9B59B6',
    '#EB459E',
    '#1ABC9C',
    '#3498DB',
    '#F1C40F',
    '#95A5A6',
    '#E67E22'

  ]

  let ramdoncolor = colores[Math.floor(Math.random()*colores.length)]

  var serverM = client.guilds.cache.find(s => s.id === '777620055344545842')

  //if(!serverM.member(client.user).permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
    
  var rol = serverM.roles.cache.find(x => x.id === rolVIP)

  let c = 0

  if(rol){
    
    let rolrainbow = setInterval(async () => {

      await rol.edit({
    
        color: ramdoncolor
        
      })
      .then(r => console.log('Rol MBVIP editado: '+ r))
      .catch(e => console.log('Error al actualizar color de rol: '+e))
      
      c === 10 ? clearInterval(rolrainbow).catch((e) => console.log('Error al enviar mensaje: '+e)) : c = c + 1

    }, 30000)

      
  }
    
  console.log('Listo!');
   
}