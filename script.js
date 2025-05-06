let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;
var contador = 0;
var aciertos = 0;
let fotos = [];
var numFotos;
let ancho;
let alto;

window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");


    var centesimas = 0;
    var segundos = 0;
    var minutos = 0;


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
        document.getElementById("nombrejugador").innerText = "¡Buena Suerte " + nombre + "!";
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

            iniciarCronometro();
            setInterval(iniciarCronometro, 10);
            // clearInterval(iniciarCronometro); // Para detener el cronómetro
        }
    });

    function iniciarCronometro() {
        if (centesimas < 99) {
            centesimas++;
            if (centesimas < 10) { centesimas = "0"+centesimas }
            Centesimas.innerHTML = ":"+centesimas;
        }
        if (centesimas == 99) {
            centesimas = -1;
        }
        if (centesimas == 0) {
            segundos ++;
            if (segundos < 10) { segundos = "0"+segundos }
            Segundos.innerHTML = ":"+segundos;
        }
        if (segundos == 59) {
            segundos = -1;
        }
        if ( (centesimas == 0)&&(segundos == 0) ) {
            minutos++;
            if (minutos < 10) { minutos = "0"+minutos }
            Minutos.innerHTML = ":"+minutos;
        }
        if (minutos == 59) {
            minutos = -1;
        }
        
    }

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
        const reverso = "./imagenes/dorso.jpg"; // Usa la imagen oculta
        let tablaHTML = "<table>";
        let cont = 0;

        for (let i = 0; i < alto; i++) {
            tablaHTML += "<tr>";
            for (let j = 0; j < ancho; j++) {
                if (cont < fotos.length) {
                    const imgSrc = fotos[cont];
                    tablaHTML += `
                    <td>
                        <div class="card" data-id="${imgSrc}" onclick="voltearCarta(this)">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src="${reverso}" alt="Reverso">
                                </div>
                                <div class="card-back">
                                    <img src="${imgSrc}" alt="Foto">
                                </div>
                            </div>
                        </div>
                    </td>`;
                    cont++;
                    
                } else {
                    tablaHTML += "<td></td>";
                }
            }
            tablaHTML += "</tr>"; 
           
        }

        tablaHTML += "</table>";
        document.getElementById("juego").innerHTML = tablaHTML;
    }
    // Seleccionar el checkbox y el contenedor
    const checkboxTemporizador = document.querySelector('input[name="opciones"][value="opcion1"]');
    const contenedor = document.getElementById("contenedor");

    // Inicialmente ocultar el contenedor
    contenedor.style.visibility = "hidden";

    // Evento para mostrar/ocultar el contenedor
    checkboxTemporizador.addEventListener("change", function () {
        contenedor.style.visibility = this.checked ? "visible" : "hidden";
    });

              
});

function voltearCarta(carta) {

    if (bloquear || carta.classList.contains("flipped")) return;

    // volteamos la carta
    carta.classList.add("flipped");

    // si es la primera carta que hemos volteado
    if (!primeraCarta) {
        primeraCarta = carta;
        if((aciertos * 2) === numFotos){
            alert("Enhorabuena has ganado ${numFotos}")
        }
    } else {
        // es la segunda carta
        segundaCarta = carta;
        bloquear = true;

        // obtenemos el ID de las dos cartas
        const id1 = primeraCarta.getAttribute("data-id");
        const id2 = segundaCarta.getAttribute("data-id");

        // verificamos si coinciden
        if (id1 === id2) {
            // coinciden se quedan boca arriba
            primeraCarta = null;
            segundaCarta = null;
            bloquear = false;
            aciertos++

        } else {
            // si no coinciden se voltean de nuevo
            setTimeout(() => {
                primeraCarta.classList.remove("flipped");
                segundaCarta.classList.remove("flipped");
                primeraCarta = null;
                segundaCarta = null;
                bloquear = false;

                contador++;
                const displayCont = document.getElementById("contador");
                if (displayCont) {
                    displayCont.innerText = "contador: " + contador;
                }

            }, 1000); // se voltean después de 1 segundo
        }

    }

}