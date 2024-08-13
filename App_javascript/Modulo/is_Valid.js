export  const is_valido=(event, bandera)=>{
    event.preventDefault();
    const $input_required=document.querySelectorAll("form[required]");
    $input_required.forEach(elements=>{
        if(elements.ariaValueMax.trim()===""){
            elements.Classlist.add("input_rojo");
            bandera=false;
        }
    });
    return bandera;

}
