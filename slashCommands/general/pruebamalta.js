module.exports = {

    name: 'pruebamalta',
    description: 'Probando slash command',
    options: [
        { 

            name: 'usuario', 
            description: 'Menciona a un usuario', 
            type: 'USER',
            require: 'false',

        },
    ],

    run: async (client, interaction) => {

        try {
            
            interaction.reply({ content: 'Usuario mencionado: ', ephemeral: false})

        } catch (error) {
            
            console.log('Error en el SC pruebamalta: '+error)

        }

    }

}