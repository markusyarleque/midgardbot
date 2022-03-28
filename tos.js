const http = require('http');
const url = require('url');
const fs = require('fs');

const servidor = http.createServer( (pedido,respuesta) => {
  
    const objetourl = url.parse(pedido.url);
    let camino = 'static' + objetourl.pathname;

    console.log('Camino : '+camino)
  
    if (camino == 'static/'){

        camino = 'static/index.html';

    }
    console.log('Camino2 : '+camino)
    fs.stat(camino, error => {
    
        if (!error) {
      
            fs.readFile(camino, (error,contenido) => {
        
                if (error) {
          
                    respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                    respuesta.write('Error interno');
                    respuesta.end();					
        
                } else {
          
                    respuesta.writeHead(200, {'Content-Type': 'text/html'});
                    respuesta.write(contenido);
                    respuesta.end();
        
                }
      
            });
    
        } else {
      
            respuesta.writeHead(404, {'Content-Type': 'text/html'});
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');	
            respuesta.end();
    
        }
  
    });

});

servidor.listen(process.env.PORT || 3000);

console.log('Servidor web iniciado');