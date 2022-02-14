module.exports = (client, Discord, interaction) => {

    //? BUTTONS
    
    if(interaction.isButton()){

        const member = interaction.member

        if(interaction.customId === 'acprueba'){
            
            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba aceptada por el usuario: '+member)
            
        }
        if(interaction.customId === 'denyprueba'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }

    }

    //? BUTTONS

}