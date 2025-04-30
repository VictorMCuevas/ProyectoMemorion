const btnInsertar = document.getElementById("iniciar");
const inicio = document.getElementById("inicio");
const tablero = document.getElementById("tablero");
const menuPedirMedidas = document.getElementById("menuPedirMedidas");
const ancho = 0;
const alto = 0;


dimensiones.addEventListener('click', () =>{
    if(dimensiones.value == "7"){
        menuPedirMedidas.style.display = "block";

    }else if(dimensiones.value != "Personalizado"){
        menuPedirMedidas.style.display = "none";
    }

});


btnInsertar.addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const dimensiones = document.getElementById("dimensiones").value;
    const tema = document.getElementById("tema").value;

    if(nombre==="" || dimensiones===""||tema ===""){
        alert("Por favor, rellene los campos");
        return;

    }else {
        inicio.style.display = "none";
        tablero.style.display = "block";

        if(dimensiones.value === "4"){
            alto = 4;
            ancho = 4;
        }else if( dimensiones.value === "5"){
            alto = 4;
            ancho = 5; 
        }else if( dimensiones.value === "6"){
            alto = 6;
            ancho = 6;
        }else if(dimensiones.value === "7") {
            ancho.document.getElementById("ancho");
            alto.document.getElementById("alto");
        }

    }
});

window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    

    let btnFormulario = document.getElementById("iniciar");
    let btnCarta = document.getElementById("carta");
    let btnHorizontal = document.getElementById("horizontal");
    let contenidoFacil = document.getElementById("Fácil (4x4)").textContent
    let contenidoMedio = document.getElementById("Medio (5x4)").textContent
    let contenidoDificil = document.getElementById("Difícil (6x6)").textContent


    btnFormulario.addEventListener('click', () => {
    if(dimensiones == contenidoFacil){
        for(let i = 1; i <= 4; i++){
            let btnCarta = document.createElement('carta');
            let btnHorizontal = document.createElement('horizontal');
        }
    }
})

});