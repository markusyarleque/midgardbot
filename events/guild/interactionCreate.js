module.exports = (client, Discord, interaction) => {

    //? BUTTONS
    
    if(interaction.isButton()){

        const member = interaction.member

        if(interaction.customId === 'acp'){

            if(member.id !== interaction.user.id) return
            
            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba aceptada por el usuario: '+member)
            
        }
        if(interaction.customId === 'deny'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }
        if(interaction.customId === 'asalto'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }
        if(interaction.customId === 'hack'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }
        if(interaction.customId === 'mafia'){

            interaction.deferReply({ ephemeral: true})
            interaction.followUp({ content: 'Hola'})

            return console.log('Prueba denegada')
        }

    }

    //? BUTTONS

}