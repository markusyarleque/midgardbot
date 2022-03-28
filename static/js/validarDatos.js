  function iniciar(){
                nombre=document.getElementById("email");
                nombre.addEventListener("input",validacion,false);
                validacion();
            }
            function validacion(){
                if(nombre.value==''){
                    nombre.setCustomValidity('El email es obligatorio');
                    nombre.style.background='#FFDDDD';
                }
                else{
                    nombre.setCustomValidity('');
                    nombre.style.background='#AAAAAA';
                }
            }
            window.addEventListener("load",iniciar,false);

