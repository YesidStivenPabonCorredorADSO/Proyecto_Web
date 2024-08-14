import { redireccionarLogin } from '../App_javascript/Modulo/enviar_login.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', redireccionarLogin);
    }
});
