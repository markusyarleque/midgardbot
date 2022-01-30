module.exports = async (client) => {
  
    client.user.setPresence( 
      {
        status: 'online', 
        activities: [{ 
          name: '.gg/svmidgard en ' + client.guilds.cache.size + ' server' + (client.guilds.cache.size === 1 ? '' : 's'), 
          type: 'WATCHING',
        }],
      }
    );
      
    console.log('Listo!');
   
}