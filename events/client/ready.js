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

  let rolVIP = '951688457258942494'

  var colores = [
        
    '#000000',
    '#1ABC9C',
    '#11806A',
    '#2ECC71',
    '#1F8B4C',
    '#3498DB',
    '#206694',
    '#9B59B6',
    '#71368A',
    '#E91E63',
    '#AD1457',
    '#F1C40F',
    '#C27C0E',
    '#E67E22',
    '#A84300',
    '#E74C3C',
    '#992D22',
    '#95A5A6',
    '#979C9F',
    '#7F8C8D',
    '#BCC0C0',
    '#34495E',
    '#2C3E50',
    '#FFFF00',
    '#FFFFFF',
    '#5865F2',
    '#99AAB5',
    '#2C2F33',
    '#23272A',
    '#57F287',
    '#FEE75C',
    '#EB459E',
    '#ED4245',
    '#23272A'

  ]

  var serverM = client.guilds.cache.find(s => s.id === '777620055344545842')

  //if(!serverM.member(client.user).permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
    
  var rol = serverM.roles.cache.find(x => x.id === rolVIP)

  let c = 1

  if(rol){
    
    let rolrainbow = setInterval(async () => {

      await rol.edit({
    
        color: colores[Math.floor(Math.random()*colores.length)]
        
      })
      .then(r => console.log('Rol MBVIP editado: '+ r))
      .catch(e => console.log('Error al actualizar color de rol: '+e))
      
      //c === 200 ? clearInterval(rolrainbow) : c = c + 1

    }, 30000)
      
  }
    
  console.log('Listo!');
   
}