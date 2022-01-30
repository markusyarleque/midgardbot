module.exports = async (client) => {
  
    client.user.setPresence( 
      {
        status: 'online', 
        activities: [{ 
          name: '.gg/svmidgard en ' + client.guilds.size + ' server' + (client.guilds.size === 1 ? '' : 's'), 
          type: 'WATCHING',
        }],
      }
    );
      
    console.log('Listo!');
   
}