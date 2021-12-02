

const formulario = document.querySelector('.formulario');
const inputs = document.querySelectorAll('.formulario input');
const mensaje = document.querySelector('.mensaje textarea');

// console.log(mensaje)

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, con acentos
    persona: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, con acentos
    mensaje: /^[a-zA-Z0-9\_\-\.\s]{1,400}$/, // Letras y numeros, guion y guion bajo
    celular: /^\d{7,14}$/, /** de 7 a 14 números */
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ 
}

const campos = {
    nombre: false,
    persona:  false,
    celular : false,
    email :  false,
    mensaje :  false
}

function validarFormulario(e) {
    const vacio = document.querySelector('.vacioError');
    
   switch(e.target.name) {
       case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            vacio.classList.remove ('mostrar-vacio');
       break;
       case 'persona':
            validarCampo(expresiones.persona, e.target, 'persona');  
            vacio.classList.remove ('mostrar-vacio');   
       break;
       case 'celular':
            validarCampo(expresiones.celular, e.target, 'celular');
            vacio.classList.remove ('mostrar-vacio');
       break;
       case 'email':
            validarCampo(expresiones.email, e.target, 'email');
            vacio.classList.remove ('mostrar-vacio');
       break;
       case 'mensaje':
            validarCampo(expresiones.mensaje, e.target, 'mensaje');   
            vacio.classList.remove ('mostrar-vacio');
       break;
   }
}

function validarCampo(expresion, input, campo) {
    if (!expresion.test(input.value) ) {
        document.querySelector(`.${campo} .error.red`).classList.add('mostrar-error');
        campos[campo] = false;
    } else {
        document.querySelector(`.${campo} .error.red`).classList.remove('mostrar-error');
        campos[campo] = true;

    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    
    // input.addEventListener('blur', validarFormulario());
});

if (mensaje != null) {
    mensaje.addEventListener('keyup', validarFormulario);
}

if (formulario != null) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const check = document.querySelector('.checkInput');
    
        if (campos.nombre && campos.persona && campos.celular && campos.email && campos.mensaje && check.checked  ) {
             
            
            let datos = new FormData(formulario);

            // console.log(datos.get('check'));
            fetch('php/contact.php',{
                method: 'POST',
                body: datos
            })
                .then( res => res.json())
                .then( data => {
                    if (data == 0) {
                        const vacio = document.querySelector('.vacioError');
                        vacio.classList.add('mostrar-vacio');
                    }
                }).catch(error => console.log('error:' ,error))


            formulario.reset();

            const enviado = document.querySelector('.enviado');
            enviado.classList.add('mostrar-envio')
    
            setTimeout(() => {
                enviado.classList.remove('mostrar-envio')
            },4000 );
    
        } else {
            const vacio = document.querySelector('.vacioError');
            vacio.classList.add('mostrar-vacio');
        }
    });
}
