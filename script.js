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

    tablero.innerHTML  = `
        <h2>¡Suerte ${nombre} !</h2>
    `;
    const btnEliminar = document.createElement("button")

    btnEliminar.textContent = "🗑";
    tarjeta.appendChild(btnEliminar);
    tarjetas.appendChild(tarjeta);
    //console.log(`Fuente seleccionada ${nombre}`);
});