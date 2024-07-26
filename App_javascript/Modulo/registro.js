const registro=(event,elemento)=>{
    let expresion=/^[a-zA-Z]*$/;
    if (elemento.value === "") {
        elemento.classList.add("input_mal")
        elemento.classList.remove("input_bien")
    } else {
        if (!expresion.test(elemento.value)) {
            event.preventDefault()
            elemento.classList.add("input_bien")
            elemento.classList.remove("input_mal")
        }
        else {
            elemento.classList.remove("input_bien")
            elemento.classList.add("input_mal")
        }
    }
}
export default registro;