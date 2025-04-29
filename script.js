const btnInsertar = document.getElementById("iniciar");

btnInsertar.addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const dificultad = document.getElementById("dimensiones").value;
    const tema = document.getElementById("tema").value;

    if(nombre==="" || dificultad===""||tema ===""){
        alert("Por favor, rellene los campos");
        return;
    }
    const tablero = document.createElement('div');
    tablero.classList.add("tablero");
    tarjeta.style.backgroundColor = fondo;
    tarjeta.style.color = colText;
    tarjeta.style.fontFamily = fuente;
    tarjeta.style.padding='10px';
    tarjeta.style.margin='10px 5';
    tarjeta.style.marginLeft = '500px';
    tarjeta.style.marginRight = '500px';
    tarjeta.style.borderRadius = '8px';

    tarjeta.innerHTML  = `
        <h2>${nombre}</h2>
        <h4>Puesto: ${puesto}</h4>
    `;
    const btnEliminar = document.createElement("button")

    btnEliminar.addEventListener("click", () => {
        tarjeta.remove()
    })

    btnEliminar.textContent = "🗑";
    tarjeta.appendChild(btnEliminar);
    tarjetas.appendChild(tarjeta);
    //console.log(`Fuente seleccionada ${nombre}`);
});