module.exports = (client, Discord, interaction, message) => {

    //? BUTTONS
    
    if(interaction.isButton()){

        const member = interaction.member

        if(interaction.customId === 'acp'){

            if(member.id !== message.author.id) return
            
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

            if(member.id !== interaction.author.id) return
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