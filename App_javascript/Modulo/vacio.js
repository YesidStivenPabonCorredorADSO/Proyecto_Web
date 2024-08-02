const vacio=(event)=>{
    array.forEach(element => {
        if (elemento.value === "") {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
        } else if (!expresion.test(elemento.value)) {
            elemento.classList.add("input_bien");
            elemento.classList.remove("input_mal");
        } else {
            elemento.classList.remove("input_mal");
            elemento.classList.add("input_bien");
        }
    });
   
}
export default vacio