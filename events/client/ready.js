module.exports = async (client) => {
  
    client.user.setPresence( 
      {
        status: 'online', 
        activities: [{ 
          name: client.guilds.cache.size + ' server' + (client.guilds.cache.size === 1 ? '' : 's')+'\n.gg/svmidgard', 
          type: 'WATCHING',
        }],
      }
    );
      
    console.log('Listo!');
   
}