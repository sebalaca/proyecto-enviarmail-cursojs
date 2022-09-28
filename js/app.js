//VARIABLES
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')

//VARIABLES PARA CAMPOS
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

// Expresion regular para validar email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners()
function eventListeners() {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //Campos del formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //Reinicia formulario
    btnReset.addEventListener('click', resetearFormulario)

    //Enviar email
    formulario.addEventListener('submit', enviarEmail)
}

//FUNCIONES

function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Valida formulario
function validarFormulario(e) {
    if(e.target.value.length > 0) {

        //Elimina los errores - limpio formulario
        const error = document.querySelector('p.error')
        if (error) {
            error.remove()
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    }else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if (e.target.type === 'email') {

        //Con este if comprobamos si el email es valido
        if (er.test(e.target.value)) {

        //Elimina los errores - limpio formulario
            const error = document.querySelector('p.error')
            if (error) {
                error.remove()
            }

            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }else{
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('Email no valido')
        }
    }

    //Comprueba que todos los campos esten completo y activa boton enviar
    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
    }
}

function enviarEmail(e) {
    e.preventDefault()
    
    //Mostrar Spinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

    //Despues de 3 seg. ocultar spinner y muestra mensaje
    setTimeout(() => {
        spinner.style.display = 'none'

        //Mensaje que dice exito envio mail
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envió correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //Inserta parrafo antes de Spinner
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() => {
            parrafo.remove()
            resetearFormulario()
        }, 3000);
    }, 3000);
}

//Funcion que resetea formulario
function resetearFormulario(e) {
    e.preventDefault()
    formulario.reset()
    iniciarApp()
}