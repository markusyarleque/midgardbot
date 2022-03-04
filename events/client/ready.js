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
    
    var rol = serverM.roles.cache.find(x => x.id === rolVIP)
        
    if(rol){

      setInterval( () => {

        rol.edit({

          color: ramdoncolor
    
        })

      }, 10000)

    }
      
    console.log('Listo!');
   
}