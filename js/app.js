//VARIABLES
const btnEnviar = document.querySelector('#enviar')

eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp)
}

//FUNCIONES

function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}