const btnInsertar = document.getElementById("iniciar");

btnInsertar.addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const dimensiones = document.getElementById("dimensiones").value;
    const tema = document.getElementById("tema").value;

    if(nombre==="" || dimensiones===""||tema ===""){
        alert("Por favor, rellene los campos");
        return;
    }
    const tablero = document.createElement('div');
    tablero.classList.add("tablero");

    tablero.innerHTML  = `
        <h2>¡Suerte ${nombre} !</h2>
    `;
    document.body.appendChild(tablero);
    const url = `pantalla.html?nombre=${encodeURIComponent(nombre)}&dimensiones=${encodeURIComponent(dimensiones)}&tema=${encodeURIComponent(tema)}`;
    window.open(url, "_blank");

    let btnFormulario = document.getElementById("iniciar");
    let btnCarta = document.getElementById("carta");
    let btnHorizontal = document.getElementById("horizontal");
    let contenidoFacil = document.getElementById("Fácil (4x4)").textContent
    let contenidoMedio = document.getElementById("Medio (5x4)").textContent
    let contenidoDificil = document.getElementById("Difícil (6x6)").textContent


    btnFormulario.addEventListener('click', () => {
    if(&dimensiones == contenidoFacil){
        for(let i = 1; i <= 4; i++){
            let btnCarta = document.createElement('carta');
            let btnHorizontal = document.createElement('horizontal');
        }
    }
})
});

