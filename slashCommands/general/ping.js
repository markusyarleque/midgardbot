module.exports = {

    name: 'ping',
    description: '🏓 Comprueba la latencia del bot y de tus mensajes.',
    options: [],

    run: async (client, interaction) => {

        const wait = require('util').promisify(setTimeout)

        try {

            let ping = Math.floor(interaction.client.ws.ping);
            
            await interaction.reply({ content: ':ping_pong: Pong!', ephemeral: true})
            await wat(500)
            await interaction.editReply({ content: `:incoming_envelope: Ping Mensajes: \`${Math.floor(interaction.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``, ephemeral: true});
              

        } catch (error) {
            
            console.log('Error en el SC ping: '+error)
            await interaction.reply({ content: '<a:Verify2:931463492677017650> | ¡Ocurrió un error inesperado.Por favor, Inténtelo de nuevo!', ephemeral: true})
            
        }

    }

}