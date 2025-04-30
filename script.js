const btnInsertar = document.getElementById("iniciar");
const inicio = document.getElementById("inicio");
const tablero = document.getElementById("tablero");

btnInsertar.addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const dimensiones = document.getElementById("dimensiones").value;
    const tema = document.getElementById("tema").value;

    if(nombre==="" || dimensiones===""||tema ===""){
        alert("Por favor, rellene los campos");
        return;
    }else {
        inicio.style.display = "none";
        tablero.style.display = "block";
    }
});
window.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    tablero.classList.add("animar-tablero");

    

    let btnFormulario = document.getElementById("iniciar");
    let btnCarta = document.getElementById("carta");
    let btnHorizontal = document.getElementById("horizontal");
    let contenidoFacil = document.getElementById("Fácil (4x4)").textContent
    let contenidoMedio = document.getElementById("Medio (5x4)").textContent
    let contenidoDificil = document.getElementById("Difícil (6x6)").textContent


    btnFormulario.addEventListener('click', () => {
    if(dimensiones == contenidoFacil){
        for(let i = 1; i <= 4; i++){
            let btnCarta = document.createElement('carta');
            let btnHorizontal = document.createElement('horizontal');
        }
    }
})

});