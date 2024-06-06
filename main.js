const PIEDRA = 0;
const PAPEL = 1;
const TIJERA = 2;

const EMPATE = 0;
const GANAR = 1;
const PERDER = 2;

const piedraBtn = document.getElementById("rock");
const papelBtn = document.getElementById("paper");
const tijeraBtn = document.getElementById("scissors");
const resultadoJuegoText = document.getElementById('gameResult');
const userChoiceText = document.getElementById('resultadoUsuario');
const cpuChoiceText = document.getElementById('resultadoCpu');
const userPointsText = document.getElementById('puntosUsuario');
const cpuPointsText = document.getElementById('puntosCpu');
const reiniciarBtn = document.getElementById("reloadButton");

const opciones = ["Piedra", "Papel", "Tijera"];

let contadorRondas = 0;
let puntosUsuario = 0;
let puntosComputadora = 0;

piedraBtn.addEventListener("click", () => {
    jugar(PIEDRA);
});
papelBtn.addEventListener("click", () => {
    jugar(PAPEL);
});
tijeraBtn.addEventListener("click", () => {
    jugar(TIJERA);
});

function jugar(opcionUsuario) {
    if (contadorRondas < 3) {
        const opcionComputadora = Math.floor(Math.random() * 3);
        const resultado = calcularResultado(opcionUsuario, opcionComputadora);

        switch (resultado) {
            case EMPATE:
                mostrarResultado("Empate", opcionUsuario, opcionComputadora);
                break;
            case GANAR:
                puntosUsuario++;
                mostrarResultado("¡Gana el usuario!", opcionUsuario, opcionComputadora);
                break;
            case PERDER:
                puntosComputadora++;
                mostrarResultado("¡Gana la computadora!", opcionUsuario, opcionComputadora);
                break;
        }

        contadorRondas++;
        actualizarMarcador();

        if (contadorRondas === 3) {
            determinarGanadorFinal();
        }
    }
}

function calcularResultado(opcionUsuario, opcionComputadora) {
    if (opcionUsuario === opcionComputadora) {
        return EMPATE;
    } else if (
        (opcionUsuario === PIEDRA && opcionComputadora === TIJERA) ||
        (opcionUsuario === PAPEL && opcionComputadora === PIEDRA) ||
        (opcionUsuario === TIJERA && opcionComputadora === PAPEL)
    ) {
        return GANAR;
    } else {
        return PERDER;
    }
}

function mostrarResultado(resultado, opcionUsuario, opcionComputadora) {
    resultadoJuegoText.textContent = resultado;
    userChoiceText.textContent = `Usuario eligió: ${opciones[opcionUsuario]}`;
    cpuChoiceText.textContent = `Cpu eligió: ${opciones[opcionComputadora]}`;
}

function actualizarMarcador() {
    userPointsText.textContent = puntosUsuario;
    cpuPointsText.textContent = puntosComputadora;
}

function determinarGanadorFinal() {
    let mensajeFinal;
    if (puntosUsuario > puntosComputadora) {
        mensajeFinal = "¡El usuario gana el juego!";
    } else if (puntosUsuario < puntosComputadora) {
        mensajeFinal = "¡La Cpu gana el juego!";
    } else {
        mensajeFinal = "El juego termina en empate.";
    }
    
    Swal.fire({
        title: 'Resultado Final',
        text: mensajeFinal,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}

function reiniciarJuego() {
    contadorRondas = 0;
    puntosUsuario = 0;
    puntosComputadora = 0;
    resultadoJuegoText.textContent = "";
    userChoiceText.textContent = "";
    cpuChoiceText.textContent = "";
    actualizarMarcador();
    console.log("El juego ha sido reiniciado");
}

// evento al botón de reinicio
reiniciarBtn.addEventListener("click", reiniciarJuego);
