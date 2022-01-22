module.exports = (client) => {
  
    client.user.setPresence( 
      {
        status: 'online', 
        activities: [{ 
          name: '.gg/svmidgard', 
          type: 'WATCHING',
        }],
      }
    );
      
    console.log('Listo!');
   
}