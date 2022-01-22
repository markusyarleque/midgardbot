const fs = require('fs'); 

module.exports = (client, Discord) => {

    console.log('========================= CONTROLADOR DE COMANDOS =========================')

    fs.readdirSync("./commands/").forEach((dir) => {

        const commands = fs
        .readdirSync(`./commands/${dir}/`)
        .filter((file) => file.endsWith('.js'));

        for(const file of commands) { 
    
            const cmd = require(`../commands/${dir}/${file}`); 

            if(cmd.name){

                console.log('Comando cargado: '+cmd.name)
                client.commands.set(cmd.name, cmd);

            } else{

                console.log('Error al cargar comando: '+cmd.name)
        
            }

        }

    })

    console.log('========================= CONTROLADOR DE COMANDOS =========================')

}