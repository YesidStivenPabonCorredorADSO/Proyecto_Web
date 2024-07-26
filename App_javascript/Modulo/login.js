const login=(event,elemento)=>{
    let expresion=/^[a-zA-Z]*$/;
    if (elemento.value === "") {
        elemento.classList.add("input_rojo")
        elemento.classList.remove("input")
    } else {
        if (!expresion.test(elemento.value)) {
            event.preventDefault()
            elemento.classList.add("input")
            elemento.classList.remove("input_rojo")
        }
        else {
            elemento.classList.remove("input")
            elemento.classList.add("input_rojo")
        }
    }
}
export default (login);