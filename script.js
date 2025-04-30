const btnInsertar = document.getElementById("iniciar");

btnInsertar.addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const dimensiones = document.getElementById("dimensiones").value;
    const tema = document.getElementById("tema").value;

    if(nombre==="" || dimensiones===""||tema ===""){
        alert("Por favor, rellene los campos");
        return;
    }else {
        innerHTML = `<a href="pantalla.html">`
    }
    const tablero = document.createElement('div');
    tablero.classList.add("tablero");

    tablero.innerHTML  = `
        <h2>¡Suerte ${nombre} !</h2>
    `;
    document.body.appendChild(tablero);
    const url = `pantalla.html?nombre=${encodeURIComponent(nombre)}&dimensiones=${encodeURIComponent(dimensiones)}&tema=${encodeURIComponent(tema)}`;
    window.open(url, "_blank");
});