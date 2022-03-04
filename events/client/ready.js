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

    let rolVIP = '949107691912065054'

    var colores = [
        
      'RED',
      'YELLOW',
      'GREEN',
      'PURPLE',
      'PINK',
      'AQUA',
      'BLUE',
      'GOLD',
      'GREY',
      'ORANGE'

    ]

    let ramdoncolor = colores[Math.floor(Math.random()*colores.length)]

    var serverM = client.guilds.cache.find(s => s.id === '777620055344545842')

    console.log('Nombre server: ' + serverM)
    //if(!serverM.member(client.user).permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
    
    var rol = serverM.roles.cache.find(x => x.id === rolVIP)

    console.log('Rol: ' + rol)

    if(rol){

      setInterval( () => {

        // serverM.roles.edit(rol, {

        //   color: ramdoncolor

        // })
        // .then(r => console.log('Rol MBVIP editado: '+ r.color))
        // .catch(e => console.log('Error al actualizar color de rol: '+ e))
        
        rol.edit({
  
          color: ramdoncolor
      
        })
        .then(r => console.log('Rol MBVIP editado: '+ r))
        .catch(e => console.log('Error al actualizar color de rol: '+e))
        
      }, 60000)
      
    }
    
    console.log('Listo!');
   
}