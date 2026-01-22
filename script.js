document.addEventListener('DOMContentLoaded', () => {
    const todasLasMisiones = [
        "Conquistar Europa, Australia y un tercer continente a elección.",
        "Conquistar Europa, Sudamérica y un tercer continente a elección.",
        "Conquistar Norteamérica y África.",
        "Conquistar Asia y Sudamérica.",
        "Conquistar Asia y África.",
        "Conquistar Norteamérica y Australia.",
        "Destruir completamente el ejército ROJO.",
        "Destruir completamente el ejército AZUL.",
        "Destruir completamente el ejército VERDE.",
        "Destruir completamente el ejército AMARILLO.",
        "Destruir completamente el ejército NEGRO.",
        "Conquistar 24 territorios a elección."
    ];

    let misionesDisponibles = [];

    const missionDisplay = document.getElementById('mission-display');
    const sortearBtn = document.getElementById('sortearBtn');
    const reiniciarBtn = document.getElementById('reiniciarBtn');

    function reiniciarJuego() {
        misionesDisponibles = [...todasLasMisiones];
        missionDisplay.innerHTML = "<p>Presiona el botón para sortear la primera misión.</p>";
        missionDisplay.style.color = '#333';
        sortearBtn.textContent = 'Sortear Primera Misión';
        sortearBtn.disabled = false;
        reiniciarBtn.classList.add('hidden');
    }

    function sortearMision() {
        // Mostrar el botón de reinicio la primera vez que se sortea
        if (reiniciarBtn.classList.contains('hidden')) {
            reiniciarBtn.classList.remove('hidden');
        }

        if (misionesDisponibles.length === 0) {
            missionDisplay.innerHTML = "<p>Se han repartido todas las misiones.</p>";
            missionDisplay.style.color = '#dc3545';
            sortearBtn.disabled = true;
            sortearBtn.textContent = 'No hay más misiones';
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * misionesDisponibles.length);
        const misionSorteada = misionesDisponibles.splice(indiceAleatorio, 1)[0];

        missionDisplay.innerHTML = `<p>${misionSorteada}</p>`;
        missionDisplay.style.color = '#0056b3';
        sortearBtn.textContent = 'Siguiente Misión';
    }

    sortearBtn.addEventListener('click', sortearMision);
    reiniciarBtn.addEventListener('click', reiniciarJuego);

    // Iniciar el juego al cargar la página
    reiniciarJuego();
});
