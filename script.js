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
var segundos = 0;
var partidasnNormal = [];
var partidasFlash= [];
var filtro;


window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    const btnInsertar = document.getElementById("iniciar");
    const inicio = document.getElementById("inicio");
    const menuPedirMedidas = document.getElementById("menuPedirMedidas");
    const dimensiones = document.getElementById("dimensiones");

    const menuJuego = document.getElementById("modoJuego");
    
    menuJuego.addEventListener('change', () => {
        const img = "./imagenes/easterEgg.jpg";
        if (menuJuego.value == "flash") {
            window.open("./pantalla.html");
        }
        });

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
                    // Añadir la clase "flipped" solo si el modo de juego es "flash"
                    const flippedClass = menuJuego.value === "flash" ? "flipped" : "";
                    tablaHTML += `
                    <td>
                        <div class="card ${flippedClass}" data-id="${imgSrc}" onclick="voltearCarta(this)">
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

        // Si el modo de juego es "flash", desvelar las cartas durante 5 segundos
        if (menuJuego.value === "flash") {
            setTimeout(() => {
                const cartas = document.querySelectorAll(".card");
                cartas.forEach(carta => carta.classList.remove("flipped"));
            }, 5000);
        }
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

    document.getElementById("botonHistorial").addEventListener("click", () => {
        const contenidoHistorial = document.getElementById("contenidoHistorial");
        const btnFiltroTiempo = document.getElementById("filtroTiempo");
        const btnFiltroIntentos = document.getElementById("filtroIntentos");

        if (contenidoHistorial.style.display === "none") {
            contenidoHistorial.style.display = "block"; // Mostrar botones

            document.getElementById("porTiempo").addEventListener("click", () => {
                const listaResultados = document.getElementById("listaResultados");
                if (listaResultados.style.display === "none") {
                    listaResultados.style.display = "block"; // Mostrar botones
                } else {
                    listaResultados.style.display = "none"; // Ocultar botones
                }
            });


            document.getElementById("porIntentos").addEventListener("click", () => {
                const listaResultados = document.getElementById("listaResultados");
                if (listaResultados.style.display === "none") {
                    listaResultados.style.display = "block"; // Mostrar botones
                } else {
                    listaResultados.style.display = "none"; // Ocultar botones
                }
            });

            document.getElementById("porIntentos").addEventListener("click", () => {
                mostrarResultados("intentos"); // Mostrar los resultados ordenados por intentos
            });

            document.getElementById("porTiempo").addEventListener("click", () => {
                mostrarResultados("tiempo"); // Mostrar los resultados ordenados por tiempo
            });

        } else {
            contenidoHistorial.style.display = "none"; // Ocultar botones
        }
        btnFiltroIntentos.addEventListener('click', () => {
            filtro = "intentos";
        });
        
        btnFiltroTiempo.addEventListener('click', () => {
            filtro = "tiempo";
        });
    });
});
              

function voltearCarta(carta) {
    if (bloquear || carta.classList.contains("flipped")) return;

    // Si el modo es "flash", no voltear la carta inmediatamente
    if (modoJuego.value === "flash") {
        if (!primeraCarta) {
            primeraCarta = carta;
            return; // No voltear la primera carta aún
        } else {
            segundaCarta = carta;

            // Verificar si las cartas coinciden
            const id1 = primeraCarta.getAttribute("data-id");
            const id2 = segundaCarta.getAttribute("data-id");

            if (id1 === id2) {
                // Si coinciden, desvelarlas
                primeraCarta.classList.add("flipped");
                segundaCarta.classList.add("flipped");
                primeraCarta = null;
                segundaCarta = null;
                aciertos++;
                bloquear = false;

                // Verificar si se completaron todas las parejas
                if (aciertos === parejasCreadas) {
                    setTimeout(() => {
                        const nombre = document.getElementById("nombre").value;
                        const tiempo = parseInt(segundos);
                        const intentos = contador;

                        // Guardar el resultado en localStorage
                        let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
                        resultados.push({ nombre, tiempo, intentos, alto, ancho });
                        localStorage.setItem("resultados", JSON.stringify(resultados));

                        // Mostrar ventana emergente
                        mostrarVentanaEmergente(nombre, tiempo, intentos);
                    }, 500);
                }
            } else {
                // Si no coinciden, mostrar una "X" temporal
                mostrarError(primeraCarta, segundaCarta);

                setTimeout(() => {
                    primeraCarta = null;
                    segundaCarta = null;
                    bloquear = false;

                    contador++;
                    const displayCont = document.getElementById("contador");
                    if (displayCont) {
                        displayCont.innerText = "Intentos: " + contador;
                    }
                }, 1000);
            }
        }
        return;
    }

    // Modo "normal": Voltear la carta inmediatamente
    carta.classList.add("flipped");

    if (!primeraCarta) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;
        bloquear = true;

        // Verificar si las cartas coinciden
        const id1 = primeraCarta.getAttribute("data-id");
        const id2 = segundaCarta.getAttribute("data-id");

        if (id1 === id2) {
            // Si coinciden, mantenerlas desveladas
            primeraCarta = null;
            segundaCarta = null;
            bloquear = false;
            aciertos++;

            // Verificar si se completaron todas las parejas
            setTimeout(() => {
                if (aciertos === parejasCreadas) {
                    const nombre = document.getElementById("nombre").value;
                    const tiempo = parseInt(segundos);
                    const intentos = contador;

                    // Guardar el resultado en localStorage
                    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
                    resultados.push({ nombre, tiempo, intentos, alto, ancho });
                    localStorage.setItem("resultados", JSON.stringify(resultados));

                    // Mostrar ventana emergente
                    mostrarVentanaEmergente(nombre, tiempo, intentos);
                }
            }, 500);
        } else {
            // Si no coinciden, voltearlas de nuevo
            setTimeout(() => {
                primeraCarta.classList.remove("flipped");
                segundaCarta.classList.remove("flipped");
                primeraCarta = null;
                segundaCarta = null;
                bloquear = false;

                contador++;
                const displayCont = document.getElementById("contador");
                if (displayCont) {
                    displayCont.innerText = "Intentos: " + contador;
                }
            }, 1000);
        }
    }
}

// Función para mostrar la ventana emergente
function mostrarVentanaEmergente(nombre, tiempo, intentos) {
    console.log("Mostrando ventana emergente"); 

    const puntuacionTexto = `¡He completado el juego en ${tiempo} segundos con ${intentos} intentos en una dificultad de ${alto}x${ancho}! ¿Puedes superarme?`;
    const urlCompartir = `https://www.facebook.com/sharer/sharer.php?u=https://tusitio.com&quote=${encodeURIComponent(puntuacionTexto)}`;

    const resultadoHTML = `
        <div id="ventanaResultado" class="resultado">
            <div class="resultado-content">
                <h2>¡Enhorabuena, ${nombre}!</h2>
                <p>Tiempo: ${tiempo}</p>
                <p>Intentos: ${intentos}</p>
                <p>Dificultad: ${alto}x${ancho}</p>
                <button id="compartirFacebook">Compartir en Facebook</button>
                <button id="cerrarResultado">Cerrar</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", resultadoHTML);

    const resultado = document.getElementById("ventanaResultado");
    resultado.style.display = "block";

    // Evento para compartir en Facebook
    document.getElementById("compartirFacebook").addEventListener("click", () => {
        window.open(urlCompartir, '_blank');
    });

    // Cerrar el resultado al hacer clic en el botón
    document.getElementById("cerrarResultado").addEventListener("click", () => {
        console.log("Cerrando resultado"); // Verificar si el evento se ejecuta

        resultado.style.display = "none";
        resultado.remove(); // Eliminar el resultado del DOM
        location.reload();
    });
}

function mostrarResultados(criterio = "tiempo") {
    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    
    // Ordenar los resultados según el criterio
    if (criterio === "intentos") {
        resultados.sort((a, b) => a.intentos - b.intentos); // Ordenar por intentos
    } else {
        resultados.sort((a, b) => a.tiempo - b.tiempo); // Ordenar por tiempo
    }

    const listaResultados = document.getElementById("listaResultados");

    if (listaResultados) {
        listaResultados.innerHTML = ""; // Limpiar la lista

        resultados.forEach((resultado, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
            <div class="resultado-item">
                <span class="resultado-nombre">${index + 1}. ${resultado.nombre}</span>
                <span class="resultado-tiempo">Tiempo: ${resultado.tiempo}s</span>
                <span class="resultado-intentos">Intentos: ${resultado.intentos}</span>
                <span class="resultado-dificultad">Dificultad: ${resultado.alto}x${resultado.ancho}</span>
            </div>
        `;
            listaResultados.appendChild(li);
        });
    }
}

function mostrarError(carta1, carta2) {
    // Crear un elemento "X" para cada carta
    const error1 = document.createElement("div");
    const error2 = document.createElement("div");

    error1.textContent = "X";
    error2.textContent = "X";

    // Estilo para la "X"
    error1.style.position = "absolute";
    error1.style.top = "50%";
    error1.style.left = "50%";
    error1.style.transform = "translate(-50%, -50%)";
    error1.style.color = "red";
    error1.style.fontSize = "2rem";
    error1.style.fontWeight = "bold";
    error1.style.zIndex = "10";

    error2.style.position = "absolute";
    error2.style.top = "50%";
    error2.style.left = "50%";
    error2.style.transform = "translate(-50%, -50%)";
    error2.style.color = "red";
    error2.style.fontSize = "2rem";
    error2.style.fontWeight = "bold";
    error2.style.zIndex = "10";

    // Añadir la "X" a las cartas
    carta1.appendChild(error1);
    carta2.appendChild(error2);

    // Eliminar la "X" después de 1 segundo
    setTimeout(() => {
        error1.remove();
        error2.remove();
    }, 1000);
}