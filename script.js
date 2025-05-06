
/**window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");

    let ancho;
    let alto;
    let numFotos;
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
        var tema = document.getElementById("tema").value;
        
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
            numFotos = calcularFotos(alto, ancho);
            var rutaImagenes = ("./imagenes/" + tema + "/");
            guardarImg(rutaImagenes, numFotos)
            crearTabla(alto,ancho,tema);
            

            console.log();
            console.log("Alto:", alto);

            inicio.style.display = "none";
            tablero.style.display = "block";
    
        }
    });


    function guardarImg(rutaImagenes, numFotos,tema) {
        for(let i = 0; i < numFotos; i++){
            fotos[i] = (rutaImagenes + i + ".jpg");
        }
    }
        
    function calcularFotos(alto, ancho) {
        return Math.floor(alto*ancho)/2;
    }

    function crearTabla(alto,ancho) {
        let tablaHTML = "<table border='1'>";
        let cont = 0;
        for (let i = 0; i < alto; i++) {
          tablaHTML += "<tr>";
          for (let j = 0; j < ancho; j++) {
            
            tablaHTML += `<td><img src="${fotos[j]}"></td>`;
          }
          tablaHTML += "</tr>";
        }
      
        tablaHTML += "</table>";
        document.getElementById("juego").innerHTML = tablaHTML;
      

    }
});*/
window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");

    let ancho;
    let alto;
    let numFotos;
    let fotos = [];

    const dimensiones = document.getElementById("dimensiones");

    dimensiones.addEventListener('click', () => {
        if (dimensiones.value == "7") {
            menuPedirMedidas.style.display = "block";
        } else if (dimensiones.value != "Personalizado") {
            menuPedirMedidas.style.display = "none";
        }
    });

    btnInsertar.addEventListener('click', () => {
        const nombre = document.getElementById("nombre").value;
        document.getElementById("nombrejugador").innerText = nombre;
        const dimensionesValor = document.getElementById("dimensiones").value;
        const tema = document.getElementById("tema").value;

        if (nombre === "" || dimensionesValor === "" || tema === "") {
            alert("Por favor, rellene los campos");
            return;
        } else {
            if (dimensionesValor === "4") {
                alto = 4;
                ancho = 4;
            } else if (dimensionesValor === "5") {
                alto = 4;
                ancho = 5;
            } else if (dimensionesValor === "6") {
                alto = 6;
                ancho = 6;
            } else if (dimensionesValor === "7") {
                ancho = parseInt(document.getElementById("ancho").value);
                alto = parseInt(document.getElementById("alto").value);
            }

            numFotos = calcularFotos(alto, ancho);
            const rutaImagenes = "./imagenes/" + tema + "/";
            guardarImg(rutaImagenes, numFotos);
            crearTabla(alto, ancho);

            inicio.style.display = "none";
            tablero.style.display = "block";
        }
    });

    function calcularFotos(alto, ancho) {
        return Math.floor((alto * ancho) / 2);
    }

    function guardarImg(rutaImagenes, numFotos) {
        fotos = [];
        for (let i = 0; i < numFotos; i++) {
            const imagen = rutaImagenes + i + ".jpg";
            fotos.push(imagen);
            fotos.push(imagen); // duplicamos para que haya dos de cada una
        }

        // Mezclar aleatoriamente
        fotos.sort(() => 0.5 - Math.random());
    }

    function crearTabla(alto, ancho) {
        let tablaHTML = "<table border='1'>";
        let cont = 0;
        for (let i = 0; i < alto; i++) {
            tablaHTML += "<tr>";
            for (let j = 0; j < ancho; j++) {
                if (cont < fotos.length) {
                    tablaHTML += `<td><img src="${fotos[cont]}" /></td>`;
                    cont++;
                } else {
                    tablaHTML += `<td>Celda impar vacia</td>`;
                }
            }
            tablaHTML += "</tr>";
        }
        tablaHTML += "</table>";
        document.getElementById("juego").innerHTML = tablaHTML;
    }
});

