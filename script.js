document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DE LA APLICACIÓN ---
    let jugadores = [];
    let estadoJuego = 'SETUP'; // SETUP | GAME | REVEALED

    const todasLasMisiones = [
        "Conquistar Europa, Australia y un tercer continente a elección.",
        "Conquistar Europa, Sudamérica y un tercer continente a elección.",
        "Conquistar Norteamérica y África.",
        "Conquistar Asia y Sudamérica.",
        "Conquistar Asia y África.",
        "Conquistar Norteamérica y Australia.",
        "Destruir completamente el ejército ROJO. Si no está en juego, conquistar 24 territorios.",
        "Destruir completamente el ejército AZUL. Si no está en juego, conquistar 24 territorios.",
        "Destruir completamente el ejército VERDE. Si no está en juego, conquistar 24 territorios.",
        "Destruir completamente el ejército AMARILLO. Si no está en juego, conquistar 24 territorios.",
        "Destruir completamente el ejército NEGRO. Si no está en juego, conquistar 24 territorios.",
        "Conquistar 24 territorios a elección."
    ];

    // --- ELEMENTOS DEL DOM ---
    const mainTitle = document.getElementById('main-title');
    const setupPhase = document.getElementById('setup-phase');
    const gamePhase = document.getElementById('game-phase');
    
    const playerNameInput = document.getElementById('player-name-input');
    const addPlayerBtn = document.getElementById('add-player-btn');
    const playerList = document.getElementById('player-list');
    const dealBtn = document.getElementById('deal-btn');

    const gamePlayerList = document.getElementById('game-player-list');
    const revealAllBtn = document.getElementById('reveal-all-btn');
    const resetGameBtn = document.getElementById('reset-game-btn');

    const missionModal = document.getElementById('mission-modal');
    const modalPlayerName = document.getElementById('modal-player-name');
    const modalMissionText = document.getElementById('modal-mission-text');
    const closeModalBtn = document.querySelector('.close-btn');

    // --- FUNCIONES DE RENDERIZADO Y LÓGICA ---

    function render() {
        // Limpiar listas
        playerList.innerHTML = '';
        gamePlayerList.innerHTML = '';

        // Renderizar lista de jugadores en SETUP
        jugadores.forEach(jugador => {
            const li = document.createElement('li');
            li.textContent = jugador.name;
            playerList.appendChild(li);
        });

        // Controlar visibilidad del botón de repartir
        dealBtn.classList.toggle('hidden', jugadores.length < 2);
        dealBtn.disabled = jugadores.length < 2;

        // Cambiar entre fases
        if (estadoJuego === 'SETUP') {
            mainTitle.textContent = 'Configuración de la Partida';
            setupPhase.classList.remove('hidden');
            gamePhase.classList.add('hidden');
        } else {
            mainTitle.textContent = 'Misiones Secretas Asignadas';
            setupPhase.classList.add('hidden');
            gamePhase.classList.remove('hidden');
            
            // Renderizar lista de jugadores en GAME
            jugadores.forEach((jugador, index) => {
                const li = document.createElement('li');
                
                const playerNameSpan = document.createElement('span');
                playerNameSpan.textContent = jugador.name;
                li.appendChild(playerNameSpan);

                if (estadoJuego === 'REVEALED') {
                    const missionSpan = document.createElement('span');
                    missionSpan.textContent = `Misión: ${jugador.mission}`;
                    missionSpan.style.fontSize = '0.9em';
                    missionSpan.style.color = '#8B0000';
                    li.appendChild(missionSpan);
                    li.style.flexDirection = 'column';
                    li.style.alignItems = 'flex-start';

                } else {
                    const viewBtn = document.createElement('button');
                    viewBtn.textContent = 'Ver mi Misión';
                    viewBtn.classList.add('view-mission-btn');
                    viewBtn.addEventListener('click', () => showMissionModal(index));
                    li.appendChild(viewBtn);
                }
                gamePlayerList.appendChild(li);
            });
        }
        revealAllBtn.classList.toggle('hidden', estadoJuego === 'REVEALED');
    }

    function addPlayer() {
        const name = playerNameInput.value.trim();
        if (name) {
            jugadores.push({ name, mission: null });
            playerNameInput.value = '';
            render();
        }
        playerNameInput.focus();
    }

    function dealMissions() {
        if (jugadores.length > todasLasMisiones.length) {
            alert('Error: No hay suficientes misiones para todos los jugadores.');
            return;
        }
        const misionesMezcladas = [...todasLasMisiones].sort(() => 0.5 - Math.random());
        jugadores.forEach((jugador, index) => {
            jugador.mission = misionesMezcladas[index];
        });
        estadoJuego = 'GAME';
        render();
    }
    
    function revealAll() {
        estadoJuego = 'REVEALED';
        render();
    }

    function resetGame() {
        jugadores = [];
        estadoJuego = 'SETUP';
        render();
    }

    function showMissionModal(playerIndex) {
        const jugador = jugadores[playerIndex];
        modalPlayerName.textContent = `Misión de ${jugador.name}`;
        modalMissionText.textContent = jugador.mission;
        missionModal.style.display = 'flex';
    }

    function hideMissionModal() {
        missionModal.style.display = 'none';
    }

    // --- EVENT LISTENERS ---
    addPlayerBtn.addEventListener('click', addPlayer);
    playerNameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') addPlayer();
    });

    dealBtn.addEventListener('click', dealMissions);
    revealAllBtn.addEventListener('click', revealAll);
    resetGameBtn.addEventListener('click', resetGame);
    
    closeModalBtn.addEventListener('click', hideMissionModal);
    missionModal.addEventListener('click', (e) => {
        if (e.target === missionModal) { // Cierra el modal si se hace clic fuera del contenido
            hideMissionModal();
        }
    });

    // --- INICIO ---
    render();
});
