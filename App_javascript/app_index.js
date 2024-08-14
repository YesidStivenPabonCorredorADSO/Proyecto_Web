import { redireccionarLogin } from './Modulo/urls.js';
import { ir_preguntas } from "./Modulo/urls.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', redireccionarLogin);
    }
});
document.addEventListener('DOMContentLoaded',()=>{
    const loginButton=document.getElementById('button_login_preguntas');
    if (loginButton) {
        loginButton.addEventListener('click', ir_preguntas);
    }
})
