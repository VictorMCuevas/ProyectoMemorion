
window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");

    let ancho;
    let alto;
    let numFotos;
    let rutaImagenes;
    let fotos = [];
        
    
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
        const tema = document.getElementById("tema").value;
        
        if(nombre==="" || dimensiones===""||tema ===""){
            alert("Por favor, rellene los campos");
            return;
    
        }else {

            if(dimensiones === "4"){ 
                alto = "4";
                ancho = "4";
                
            }else if( dimensiones === "5"){
                alto = "4";
                ancho = "5";


            }else if( dimensiones === "6"){
                alto = "6";
                ancho = "6";

            }else if(dimensiones === "7") {
                ancho = document.getElementById("ancho").value
                alto = document.getElementById("alto").value
                

            }
            numFotos = calcularFotos;
            rutaImagenes = "imagenes/" + tema + "/";
            crearTabla(alto,ancho,tema);
            

            console.log("Ancho:", ancho);
            console.log("Alto:", alto);

            inicio.style.display = "none";
            tablero.style.display = "block";
    
        }
    });

    function guardarImg(rutaImagenes, numFotos) {
        for(let i = 0; i < numFotos; i++){
            rutaImagenes += (i + ".jpg");
            fotos[i] = (rutaImagenes);
        }
    }
    function calcularFotos(alto, ancho) {
        return (alto*ancho)/2;
    }
    function crearTabla(alto,ancho,tema) {
        let tablaHTML = "<table border='1'>";

        for (let i = 0; i < alto; i++) {
          tablaHTML += "<tr>";
          for (let j = 0; j < ancho; j++) {
            tablaHTML += `<td>Alto ${i + 1}, Ancho ${fotos[j]}</td>`;
          }
          tablaHTML += "</tr>";
        }
      
        tablaHTML += "</table>";
        document.getElementById("juego").innerHTML = tablaHTML;
      }


});
