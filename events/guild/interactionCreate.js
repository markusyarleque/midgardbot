module.exports = (client, Discord, interaction) => {

    //? BUTTONS
    
    if(interaction.isButton()){

        const member = interaction.member

        if(interaction.customId === 'acp'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba aceptada por el usuario: '+member)
            
        }
        if(interaction.customId === 'deny'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }

    }

    //? BUTTONS

}