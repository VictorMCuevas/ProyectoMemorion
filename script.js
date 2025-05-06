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

    /**function crearTabla(alto, ancho) {
        let tablaHTML = "<table border='1'>";
        let cont = 0;
        for (let i = 0; i < alto; i++) {
            tablaHTML += "<tr>";
            for (let j = 0; j < ancho; j++) {
                if (cont < fotos.length) {
                    tablaHTML += `<td><img src="${fotos[cont]}" /></td>`;
                    cont++;
                } else {
                    tablaHTML += `<td>Celda impar Vacia</td>`;
                }
            }
            tablaHTML += "</tr>";
        }
        tablaHTML += "</table>";
        document.getElementById("juego").innerHTML = tablaHTML;
        
    }*/
        function crearTabla(alto, ancho) {
            let tablaHTML = "<table>";
            let cont = 0;
            for (let i = 0; i < alto; i++) {
                tablaHTML += "<tr>";
                for (let j = 0; j < ancho; j++) {
                    if (cont < fotos.length) {
                        const imgSrc = fotos[cont];
                        tablaHTML += `
                          <td>
                            <div class="card" onclick="this.classList.toggle('flipped')">
                              <div class="card-inner">
                                <div class="card-front"></div>
                                <div class="card-back"><img src="${imgSrc}" /></div>
                              </div>
                            </div>
                          </td>
                        `;
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
        
});