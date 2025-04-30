/*const btnInsertar = document.getElementById("iniciar");
const inicio = document.getElementById("inicio");
const tablero = document.getElementById("tablero");
const menuPedirMedidas = document.getElementById("menuPedirMedidas");*/
let ancho;
let alto;



window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");


    dimensiones.addEventListener('click', () =>{
        if(dimensiones.value == "7"){
            menuPedirMedidas.style.display = "block";
    
        }else if(dimensiones.value != "Personalizado"){
            menuPedirMedidas.style.display = "none";
        }
    
    });
    
    
    btnInsertar.addEventListener('click', () => {
        const nombre = document.getElementById("nombre").value;
        document.getElementById("nombrejugador").innerText = nombre;
        const dimensiones = document.getElementById("dimensiones").value;
        let tema = document.getElementById("tema").value;
    
        if(nombre==="" || dimensiones===""||tema ===""){
            alert("Por favor, rellene los campos");
            return;
    
        }else {
            const nombre = document.getElementById("nombre").value;
            document.getElementById("nombrejugador").innerText = nombre;
            const dimensiones = document.getElementById("dimensiones").value;
            let tema = document.getElementById("tema").value;
    
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
                ancho = document.getElementById("ancho");
                alto = document.getElementById("alto");
            }
            
            inicio.style.display = "none";
            tablero.style.display = "block";
    
        }
    });


});