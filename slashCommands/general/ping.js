module.exports = {

    name: 'ping',
    description: '🏓 Comprueba la latencia del bot y de tus mensajes.',
    options: [],

    run: async (client, interaction) => {

        try {

            let ping = Math.floor(interaction.client.ws.ping);
            
            interaction.reply({ content: ':ping_pong: Pong!', ephemeral: true})
            .then(i => {
        
                i.edit({ content: `:incoming_envelope: Ping Mensajes: \`${Math.floor(i.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``, ephemeral: true});
              
            });

        } catch (error) {
            
            console.log('Error en el SC ping: '+error)

        }

    }

}