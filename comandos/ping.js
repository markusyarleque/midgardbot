module.exports = (client, message, args) => { 

    let ping = Math.floor(message.client.ws.ping);

    message.channel.send(':ping_pong: Pong! Si lees esto, funcionó!')
        .then(m => {
    
            m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          
        });
        
  
}