const fs = require('fs'); 

module.exports = (client, Discord) => {
 
    console.log('========================= CONTROLADOR DE EVENTOS =========================')

    fs.readdirSync('./events/').forEach((dir) => {

        const events = fs
        .readdirSync(`./events/${dir}`)
        .filter((file) => file.endsWith('.js'))

        for(const file of events) { 

            try {

                let evn = require(`../events/${dir}/${file}`)

                if(evn.event && typeof evn.event !== 'string'){

                    console.log('Error de evento: '+file)
                    continue;

                }

                evn.event = evn.event || file.replace('.js','');

                client.on(evn.event, evn.bind(null, client, Discord));

                console.log('Evento cargado: '+file)
                
            } catch (error) {

                console.log('Error al cargar evento: '+file+' - '+error)
                
            }
            
            
          
        }
          
    })
    
    console.log('========================= CONTROLADOR DE EVENTOS =========================')

}