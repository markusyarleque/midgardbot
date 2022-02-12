const fs = require('fs'); 
let slash = [];

module.exports = (client, Discord) => {

    console.log('========================= CONTROLADOR DE SLASH COMMANDS =========================')

    fs.readdirSync('./slashCommands/').forEach((dir) => {

        const commands = fs
        .readdirSync(`./slashCommands/${dir}/`)
        .filter((file) => file.endsWith('.js'))

        for(const file of commands) { 

            try {

                let scmd = require(`../slashCommands/${dir}/${file}`)

                if(scmd.name){

                    client.slash.set(scmd.name, scmd)
                    slash.push(scmd);

                    console.log('Slash Command cargado: '+scmd.name)

                } else {

                    console.log('Error de Slash Command: '+file)
                    
                }
                
            } catch (error) {

                console.log('Error al cargar Slash Command: '+file+' - '+error)
                
            }
          
        }
          
    })

    client.on('ready', async () => {

        await client.application.commands.set(slash);
        
    })
    
    console.log('========================= CONTROLADOR DE SLASH COMMANDS =========================')

}