"use strict";
// import './index.html';
// import './css/custom.css';
// import './css/tailwind.css';

//variables
const btnEnviar = document.querySelector('#enviar');
const btnResetear = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const asunto = document.querySelector('#asunto');
const formulario = document.querySelector('#enviar-mail');
const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/** 
 * Funciones
 */
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('opacity-50', 'cursor-not-allowed');
}

//validar formulario
function validarFormulario(e){

    if(e.target.value.length > 0){
        //elimina los errores
        const error = document.querySelector('.error');
        if(error){
            error.remove();
            e.target.classList.remove('border', 'border-red-500');
        }
        e.target.classList.add('border', 'border-green-500');

    }else{
        e.target.classList.remove('border', 'border-green-500');
        // e.target.style.borderColor = 'red';-->para añadir estilos desde js
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los Campos son Obligatorios');
    }

    if(e.target.type === 'email'){
        if(regEx.test(e.target.value)){
            const error = document.querySelector('.error');
            if(error){
                error.remove();
                e.target.classList.remove('border', 'border-red-500');
            }
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El E-Mail no es Válido');
        }
    }

    if(regEx.test(email.value) && mensaje.value !== '' && asunto.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50', 'cursor-not-allowed');
    }else{
        iniciarApp();
    }

}

function mostrarError(msj){
    const mensajeError = document.createElement('p');

    mensajeError.textContent = msj;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const error = document.querySelector('.error');

    !error ? formulario.appendChild(mensajeError) : false;//formulario.insertBefore(valorInsertar, dondeSEMuestra)->dondeSEMuestra(document.queryselectro('')) 
}

function enviar(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const mensajeExito = document.createElement('p');
        mensajeExito.textContent = 'El Mensaje se envió Satisfactoriamente';
        mensajeExito.classList.add('text-center', 'my-10', 'uppercase','p-2','text-white', 'font-bold','bg-green-500');

        setTimeout(() => {
            mensajeExito.remove();
        }, 3000);
        formulario.insertBefore(mensajeExito, spinner);
        resetearFormulario();

    }, 3000);
}

function resetearFormulario(){
    formulario.reset();//resetear formulario
    iniciarApp();
}


//event listeners
function eventListeners(){
    //iniciar cuando el documento carga
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //eventos del formulario
    email.addEventListener('input', validarFormulario)//->blur el evento cuando sales de un tag input en html
    mensaje.addEventListener('input', validarFormulario);
    asunto.addEventListener('input', validarFormulario);
    btnEnviar.addEventListener('click', enviar);
    btnResetear.addEventListener('click', resetearFormulario);
}

eventListeners();