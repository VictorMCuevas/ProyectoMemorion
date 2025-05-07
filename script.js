let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;
var contador = 0;
var aciertos = 0;
let fotos = [];
var numFotos;
var parejasCreadas = 0;
let ancho;
let alto;
var temasDisponibles = ["deportes", "animales", "banderas", "informática"];
//Variables para el cronómetro
var segundos = 0;


window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");
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
        let tema = document.getElementById("tema").value;

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

            if(tema === "aleatorio"){
                const posicionAleatoria = Math.floor(Math.random() * temasDisponibles.length);
                const temaAleatorio = temasDisponibles[posicionAleatoria];
                console.log("Tema aleatorio seleccionado:", temaAleatorio); // Verificar el tema aleatorio
                tema = temaAleatorio;
            }
            const rutaImagenes = "./imagenes/" + tema + "/";
            guardarImg(rutaImagenes, numFotos);
            crearTabla(alto, ancho);

            inicio.style.display = "none";
            tablero.style.display = "block";

            iniciarCronometro();
            setInterval(iniciarCronometro, 1000);
        }
    });

    function iniciarCronometro() {       
        segundos ++;
        if (segundos < 10) { 
            segundos = "0"+segundos 
        }
        Segundos.innerHTML = "Tiempo: "+segundos;
        
    }

    function calcularFotos(alto, ancho) {
        parejasCreadas =  Math.floor((alto * ancho) / 2);
        return parejasCreadas;
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

    mostrarResultados();
              
});

function voltearCarta(carta) {

    if (bloquear || carta.classList.contains("flipped")) return;

    // volteamos la carta
    carta.classList.add("flipped");

    // si es la primera carta que hemos volteado
    if (!primeraCarta) {
        primeraCarta = carta;

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
            setTimeout(() => {
                if (aciertos === parejasCreadas) {
                    const nombre = document.getElementById("nombre").value; // Obtener el nombre del jugador
                    const tiempo = parseInt(segundos); // Formato del tiempo como número
                    const intentos = contador;

                    // Obtener resultados previos de localStorage
                    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];

                    // Agregar el nuevo resultado
                    resultados.push({ nombre, tiempo, intentos });

                    // Guardar los resultados actualizados en localStorage
                    localStorage.setItem("resultados", JSON.stringify(resultados));

                    // Mostrar ventana emergente
                    mostrarVentanaEmergente(nombre, tiempo, intentos);
                }
            }, 500);

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

// Función para mostrar la ventana emergente
function mostrarVentanaEmergente(nombre, tiempo, intentos) {
    console.log("Mostrando ventana emergente"); 

    const resultadoHTML = `
        <div id="ventanaResultado" class="resultado">
            <div class="resultado-content">
                <h2>¡Enhorabuena, ${nombre}!</h2>
                <p>Tiempo: ${tiempo}</p>
                <p>Intentos: ${intentos}</p>
                <button id="cerrarResultado">Cerrar</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", resultadoHTML);

    const resultado = document.getElementById("ventanaResultado");
    resultado.style.display = "block";

    // Cerrar el resultado al hacer clic en el botón
    document.getElementById("cerrarResultado").addEventListener("click", () => {
        console.log("Cerrando resultado"); // Verificar si el evento se ejecuta

        resultado.style.display = "none";
        resultado.remove(); // Eliminar el resultado del DOM
        location.reload();
    });
}

function obtenerResultadosOrdenados() {
    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    // Ordenar por tiempo (de menor a mayor)
    resultados.sort((a, b) => a.tiempo - b.tiempo);
    return resultados;
}

function mostrarResultados() {
    const resultados = obtenerResultadosOrdenados();
    const listaResultados = document.getElementById("listaResultados");

    if (listaResultados) {
        listaResultados.innerHTML = ""; // Limpiar la lista

        resultados.forEach((resultado, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${resultado.nombre} - Tiempo: ${resultado.tiempo}s - Intentos: ${resultado.intentos}`;
            listaResultados.appendChild(li);
        });
    }
}