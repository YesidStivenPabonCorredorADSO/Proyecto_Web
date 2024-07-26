const dom=document;
const is_valido=(event,form)=>{
    const elements=document.querySelectorAll(form);
    let bandera=true;
    elements.forEach(elements=>{
        if(elements===""){
            elements.Classlist.add();
            bandera=false;
        }
    });
    return bandera;

}
export default is_valido;