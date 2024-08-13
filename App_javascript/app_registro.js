// import registro from "./Modulo/registro.js";
// import correo from "./Modulo/correo.js";
// import contraseña from "./Modulo/contraseña.js";
// import validacion_botton from "../App_javascript/Modulo/guardar.js";
import {is_valido} from "../App_javascript/Modulo/is_Valid.js";
// import vacio from "./Modulo/vacio.js";
let bandera = true
const input=document.querySelector(".main__formu--button1")
input.addEventListener("submit", event => {
    is_valido(event, bandera)
    if (bandera) {
        event.defaultPrevented()
        console.log("Hola")
    }
    else if (!bandera) {
        console.log("adios")
    }
} );
