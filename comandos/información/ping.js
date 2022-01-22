module.exports =  {
    
    name: 'ping',
    aliases: ['latencia','lat'],
    description: '🏓 Comprueba la latencia del bot y de tus mensajes.',

    async execute(client, message, args, Discord) {

        let ping = Math.floor(message.client.ws.ping);

        message.channel.send(':ping_pong: Pong!')
            .then(m => {
        
                m.edit(` Si lees esto, funcionó! :incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
              
            });

    }
         
}