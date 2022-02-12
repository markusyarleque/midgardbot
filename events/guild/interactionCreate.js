module.exports = (client, Discord, interaction) => {

    //? BUTTONS
    
    if(interaction.isButton()){

        interaction.deferReply({ ephemeral: true})
        interaction.followUp({ content: 'Hola'})

        const member = interaction.member

        if(interaction.customId === 'acp'){

            return console.log('Prueba aceptada por el usuario: '+member)
            
        }
        if(interaction.customId === 'deny'){

            return console.log('Prueba denegada')
        }

    }

    //? BUTTONS

}