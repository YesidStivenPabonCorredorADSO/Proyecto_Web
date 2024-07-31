const dom=document;
const is_valido=(event,form)=>{
    event.preventDefault();
    const elements=document.querySelectorAll(form);
    let bandera=true;
    elements.forEach(elements=>{
        if(elements===""){
            elements.Classlist.add("input_rojo");
            bandera=false;
        }
    });
    return bandera;

}
export default is_valido;