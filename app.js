/* ==========================================
   DrDer 2048 - Premium Game
   ========================================== */

// ============ DOM Elements ============
const elements = {
    splashScreen: document.getElementById('splash-screen'),
    mainMenu: document.getElementById('main-menu'),
    gameScreen: document.getElementById('game-screen'),
    levelsScreen: document.getElementById('levels-screen'),
    settingsScreen: document.getElementById('settings-screen'),
    btnNewGame: document.getElementById('btn-new-game'),
    btnResume: document.getElementById('btn-resume'),
    btnLevels: document.getElementById('btn-levels'),
    btnSettingsMenu: document.getElementById('btn-settings-menu'),
    btnBackFromLevels: document.getElementById('btn-back-from-levels'),
    btnMenuBack: document.getElementById('btn-menu-back'),
    btnBackFromSettings: document.getElementById('btn-back-from-settings'),
    btnInstall: document.getElementById('btn-install'),
    currentScore: document.getElementById('current-score'),
    bestScore: document.getElementById('best-score'),
    movesCount: document.getElementById('moves-count'),
    timeDisplay: document.getElementById('time-display'),
    tileContainer: document.getElementById('tile-container'),
    gameBoard: document.getElementById('game-board'),
    targetBadge: document.getElementById('target-badge'),
    animationsToggle: document.getElementById('animations-toggle'),
    btnResetGame: document.getElementById('btn-reset-game'),
    winModal: document.getElementById('win-modal'),
    loseModal: document.getElementById('lose-modal'),
    exitConfirmModal: document.getElementById('exit-confirm-modal'),
    winMessage: document.getElementById('win-message')
};

// ============ Game State ============
const gameState = {
    grid: [],
    score: 0,
    bestScore: 0,
    moves: 0,
    seconds: 0,
    gameOver: false,
    won: false,
    keepPlaying: false,
    timerInterval: null,
    animationsEnabled: true,
    level: 'advanced',
    target: 2048
};

// Level configurations
const levelConfig = {
    'beginner': { target: 128, label: '128' },
    'normal': { target: 512, label: '512' },
    'advanced': { target: 2048, label: '2048' },
    'expert': { target: 4096, label: '4096' },
    'free': { target: Infinity, label: '∞' }
};

// ============ Storage ============
const STORAGE_KEY = 'drder-2048-save';

function saveGame() {
    const data = {
        grid: gameState.grid.map(row => [...row]),
        score: gameState.score,
        bestScore: gameState.bestScore,
        moves: gameState.moves,
        seconds: gameState.seconds,
        won: gameState.won,
        keepPlaying: gameState.keepPlaying,
        level: gameState.level,
        target: gameState.target
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
}

function loadGame() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}

function deleteSave() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
}

function hasSavedGame() {
    return loadGame() !== null;
}

// ============ Game Logic (Original 2048) ============
function createEmptyGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function getEmptyCells(grid) {
    const empty = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === 0) {
                empty.push({ r, c });
            }
        }
    }
    return empty;
}

function addRandomTile(grid) {
    const empty = getEmptyCells(grid);
    if (empty.length === 0) return false;
    
    const { r, c } = empty[Math.floor(Math.random() * empty.length)];
    // 90% chance for 2, 10% chance for 4
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return true;
}

function canMove(grid) {
    // Check for empty cells
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === 0) return true;
        }
    }
    
    // Check for possible merges horizontally
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[r][c] === grid[r][c + 1]) return true;
        }
    }
    
    // Check for possible merges vertically
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === grid[r + 1][c]) return true;
        }
    }
    
    return false;
}

function getMaxTile(grid) {
    let max = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] > max) max = grid[r][c];
        }
    }
    return max;
}

// Process a single line (row or column) for 2048 movement
function processLine(line) {
    // Remove zeros
    let tiles = line.filter(val => val !== 0);
    let scoreGained = 0;
    
    // Merge adjacent equal tiles (each tile merges once per move)
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] === tiles[i + 1]) {
            tiles[i] *= 2;
            scoreGained += tiles[i];
            tiles.splice(i + 1, 1);
        }
    }
    
    // Pad with zeros to length 4
    while (tiles.length < 4) {
        tiles.push(0);
    }
    
    return {
        result: tiles,
        score: scoreGained,
        changed: !arraysEqual(line, tiles)
    };
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function moveGrid(grid, direction) {
    let newGrid = grid.map(row => [...row]);
    let totalScore = 0;
    let moved = false;
    
    if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
            const line = newGrid[r];
            const result = processLine(line);
            newGrid[r] = result.result;
            totalScore += result.score;
            if (result.changed) moved = true;
        }
    } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
            const reversed = [...newGrid[r]].reverse();
            const result = processLine(reversed);
            newGrid[r] = result.result.reverse();
            totalScore += result.score;
            if (result.changed) moved = true;
        }
    } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
            const column = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
            const result = processLine(column);
            for (let r = 0; r < 4; r++) {
                newGrid[r][c] = result.result[r];
            }
            totalScore += result.score;
            if (result.changed) moved = true;
        }
    } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
            const column = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
            const result = processLine(column);
            const reversedResult = result.result.reverse();
            for (let r = 0; r < 4; r++) {
                newGrid[r][c] = reversedResult[r];
            }
            totalScore += result.score;
            if (result.changed) moved = true;
        }
    }
    
    return { grid: newGrid, scoreGained: totalScore, moved };
}

// ============ UI Rendering ============
function renderBoard(grid) {
    const container = elements.tileContainer;
    if (!container) return;
    
    container.innerHTML = '';
    
    const boardRect = elements.gameBoard.getBoundingClientRect();
    const padding = 8;
    const gap = 8;
    const availableSize = boardRect.width - padding * 2;
    const cellSize = (availableSize - gap * 3) / 4;
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] !== 0) {
                const tile = document.createElement('div');
                tile.className = getTileClass(grid[r][c]);
                tile.textContent = grid[r][c];
                
                const xPos = padding + c * (cellSize + gap);
                const yPos = padding + r * (cellSize + gap);
                
                tile.style.width = cellSize + 'px';
                tile.style.height = cellSize + 'px';
                tile.style.left = xPos + 'px';
                tile.style.top = yPos + 'px';
                tile.style.lineHeight = cellSize + 'px';
                
                // Font size proportional to cell size and number of digits
                const numDigits = grid[r][c].toString().length;
                const baseFontSize = cellSize * 0.42;
                const adjustedFontSize = numDigits > 3 ? baseFontSize * (4 / numDigits) : baseFontSize;
                tile.style.fontSize = adjustedFontSize + 'px';
                
                container.appendChild(tile);
            }
        }
    }
}

function getTileClass(value) {
    if (value <= 2048) {
        return `tile tile-${value}`;
    }
    if (value <= 8192) {
        return `tile tile-${value}`;
    }
    return 'tile tile-super';
}

function updateStats() {
    elements.currentScore.textContent = gameState.score;
    elements.bestScore.textContent = gameState.bestScore;
    elements.movesCount.textContent = gameState.moves;
    
    const mins = Math.floor(gameState.seconds / 60);
    const secs = gameState.seconds % 60;
    elements.timeDisplay.textContent = 
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

// ============ Timer ============
function startTimer() {
    stopTimer();
    gameState.timerInterval = setInterval(() => {
        gameState.seconds++;
        updateStats();
    }, 1000);
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// ============ Screen Management ============
function showScreen(screenElement) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (screenElement) {
        screenElement.classList.add('active');
    }
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

function showModal(modalElement) {
    if (modalElement) modalElement.classList.add('active');
}

function hideModal(modalElement) {
    if (modalElement) modalElement.classList.remove('active');
}

// ============ Game Flow ============
function initNewGame(level) {
    stopTimer();
    gameState.level = level || 'advanced';
    gameState.target = levelConfig[gameState.level].target;
    gameState.grid = createEmptyGrid();
    gameState.score = 0;
    gameState.moves = 0;
    gameState.seconds = 0;
    gameState.gameOver = false;
    gameState.won = false;
    gameState.keepPlaying = false;
    gameState.bestScore = getBestScore();
    
    // Add two random tiles
    addRandomTile(gameState.grid);
    addRandomTile(gameState.grid);
    
    // Update target badge
    elements.targetBadge.textContent = levelConfig[gameState.level].label;
    
    updateStats();
    renderBoard(gameState.grid);
    startTimer();
    showScreen(elements.gameScreen);
}

function resumeGame() {
    const saved = loadGame();
    if (!saved) {
        initNewGame('advanced');
        return;
    }
    
    stopTimer();
    gameState.grid = saved.grid.map(row => [...row]);
    gameState.score = saved.score;
    gameState.bestScore = saved.bestScore;
    gameState.moves = saved.moves;
    gameState.seconds = saved.seconds;
    gameState.won = saved.won || false;
    gameState.keepPlaying = saved.keepPlaying || false;
    gameState.level = saved.level || 'advanced';
    gameState.target = saved.target || 2048;
    gameState.gameOver = false;
    
    elements.targetBadge.textContent = levelConfig[gameState.level].label;
    
    updateStats();
    renderBoard(gameState.grid);
    startTimer();
    showScreen(elements.gameScreen);
}

function getBestScore() {
    try {
        const saved = localStorage.getItem('drder-best-score');
        return saved ? parseInt(saved) : 0;
    } catch (e) {
        return 0;
    }
}

function setBestScore(score) {
    try {
        localStorage.setItem('drder-best-score', score.toString());
    } catch (e) {}
}

function handleMove(direction) {
    if (gameState.gameOver) return;
    if (gameState.won && !gameState.keepPlaying) return;
    
    const { grid, scoreGained, moved } = moveGrid(gameState.grid, direction);
    
    if (!moved) return;
    
    gameState.grid = grid;
    gameState.score += scoreGained;
    gameState.moves++;
    
    if (gameState.score > gameState.bestScore) {
        gameState.bestScore = gameState.score;
        setBestScore(gameState.bestScore);
    }
    
    // Add new tile
    addRandomTile(gameState.grid);
    
    updateStats();
    renderBoard(gameState.grid);
    
    // Check win condition
    if (!gameState.won && !gameState.keepPlaying && gameState.target !== Infinity) {
        const maxTile = getMaxTile(gameState.grid);
        if (maxTile >= gameState.target) {
            gameState.won = true;
            stopTimer();
            showWinModal();
            return;
        }
    }
    
    // Check game over
    if (!canMove(gameState.grid)) {
        gameState.gameOver = true;
        stopTimer();
        deleteSave();
        showLoseModal();
        return;
    }
    
    // Save after each valid move
    saveGame();
}

function showWinModal() {
    document.getElementById('win-score').textContent = gameState.score;
    document.getElementById('win-time').textContent = elements.timeDisplay.textContent;
    document.getElementById('win-moves').textContent = gameState.moves;
    document.getElementById('win-best').textContent = gameState.bestScore;
    elements.winMessage.textContent = 'لقد وصلت إلى ' + gameState.target + '!';
    showModal(elements.winModal);
    deleteSave();
}

function showLoseModal() {
    document.getElementById('lose-score').textContent = gameState.score;
    document.getElementById('lose-best').textContent = gameState.bestScore;
    document.getElementById('lose-time').textContent = elements.timeDisplay.textContent;
    document.getElementById('lose-moves').textContent = gameState.moves;
    showModal(elements.loseModal);
}

function continuePlaying() {
    gameState.keepPlaying = true;
    hideModal(elements.winModal);
    startTimer();
    saveGame();
}

function exitToMenu() {
    stopTimer();
    saveGame();
    hideAllModals();
    showScreen(elements.mainMenu);
    updateResumeButton();
}

function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

function updateResumeButton() {
    elements.btnResume.style.display = hasSavedGame() ? 'flex' : 'none';
}

// ============ Input Handling ============
let touchStartX = 0;
let touchStartY = 0;
const SWIPE_THRESHOLD = 30;

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    if (gameState.gameOver) return;
    if (gameState.won && !gameState.keepPlaying) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;
    
    if (absDx > absDy) {
        handleMove(dx > 0 ? 'right' : 'left');
    } else {
        handleMove(dy > 0 ? 'down' : 'up');
    }
}

function handleKeyDown(e) {
    if (!elements.gameScreen.classList.contains('active')) return;
    if (gameState.gameOver) return;
    if (gameState.won && !gameState.keepPlaying) return;
    
    const keyMap = {
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'a': 'left',
        'd': 'right',
        'w': 'up',
        's': 'down'
    };
    
    const direction = keyMap[e.key];
    if (direction) {
        e.preventDefault();
        handleMove(direction);
    }
}

// ============ PWA Install ============
let deferredPrompt = null;
let isStandalone = false;

function checkStandalone() {
    isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                   window.navigator.standalone || false;
}

function updateInstallButton() {
    if (isStandalone) {
        elements.btnInstall.style.display = 'none';
    } else if (deferredPrompt) {
        elements.btnInstall.style.display = 'flex';
    } else {
        elements.btnInstall.style.display = 'none';
    }
}

function initPWA() {
    checkStandalone();
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        updateInstallButton();
    });
    
    window.addEventListener('appinstalled', () => {
        isStandalone = true;
        deferredPrompt = null;
        elements.btnInstall.style.display = 'none';
    });
    
    elements.btnInstall.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
            isStandalone = true;
        }
        deferredPrompt = null;
        updateInstallButton();
    });
}

// ============ Splash Screen ============
function initSplashScreen() {
    checkStandalone();
    
    if (isStandalone) {
        elements.splashScreen.style.display = 'flex';
        
        setTimeout(() => {
            elements.splashScreen.classList.add('hidden');
            
            setTimeout(() => {
                elements.splashScreen.style.display = 'none';
            }, 500);
        }, 1500);
    } else {
        elements.splashScreen.style.display = 'none';
    }
}

// ============ Orientation Lock ============
function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait-primary').catch(() => {});
    }
}

// ============ Event Listeners ============
function initEventListeners() {
    // Main menu
    elements.btnNewGame.addEventListener('click', () => {
        initNewGame(gameState.level);
    });
    
    elements.btnResume.addEventListener('click', () => {
        resumeGame();
    });
    
    elements.btnLevels.addEventListener('click', () => {
        showScreen(elements.levelsScreen);
    });
    
    elements.btnSettingsMenu.addEventListener('click', () => {
        showScreen(elements.settingsScreen);
    });
    
    // Levels screen
    elements.btnBackFromLevels.addEventListener('click', () => {
        showScreen(elements.mainMenu);
        updateResumeButton();
    });
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.target.getAttribute('data-level');
            initNewGame(level);
        });
    });
    
    // Game screen
    elements.btnMenuBack.addEventListener('click', () => {
        showModal(elements.exitConfirmModal);
    });
    
    // Exit confirmation
    document.getElementById('btn-exit-cancel').addEventListener('click', () => {
        hideModal(elements.exitConfirmModal);
    });
    
    document.getElementById('btn-exit-confirm').addEventListener('click', () => {
        hideModal(elements.exitConfirmModal);
        exitToMenu();
    });
    
    // Settings
    elements.btnBackFromSettings.addEventListener('click', () => {
        showScreen(elements.mainMenu);
        updateResumeButton();
    });
    
    elements.animationsToggle.addEventListener('change', (e) => {
        gameState.animationsEnabled = e.target.checked;
        try {
            localStorage.setItem('drder-animations', e.target.checked.toString());
        } catch (ex) {}
    });
    
    elements.btnResetGame.addEventListener('click', () => {
        deleteSave();
        updateResumeButton();
        alert('تم حذف تقدم اللعبة المحفوظة');
    });
    
    // Win modal
    document.getElementById('btn-continue-playing').addEventListener('click', () => {
        continuePlaying();
    });
    
    document.getElementById('btn-win-new-game').addEventListener('click', () => {
        hideModal(elements.winModal);
        initNewGame(gameState.level);
    });
    
    // Lose modal
    document.getElementById('btn-try-again').addEventListener('click', () => {
        hideModal(elements.loseModal);
        initNewGame(gameState.level);
    });
    
    document.getElementById('btn-back-to-menu').addEventListener('click', () => {
        hideModal(elements.loseModal);
        showScreen(elements.mainMenu);
        updateResumeButton();
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    
    // Touch events for game board
    elements.gameBoard.addEventListener('touchstart', handleTouchStart, { passive: true });
    elements.gameBoard.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Also listen on the game screen for swipes
    elements.gameScreen.addEventListener('touchstart', (e) => {
        if (e.target === elements.gameScreen || e.target.closest('.swipe-hint')) {
            handleTouchStart(e);
        }
    }, { passive: true });
    
    elements.gameScreen.addEventListener('touchend', (e) => {
        if (e.target === elements.gameScreen || e.target.closest('.swipe-hint')) {
            handleTouchEnd(e);
        }
    }, { passive: true });
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (elements.gameScreen.classList.contains('active')) {
            renderBoard(gameState.grid);
        }
    });
    
    // Prevent scrolling on game screen
    elements.gameScreen.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    // Orientation change
    window.addEventListener('orientationchange', () => {
        lockOrientation();
    });
}

// ============ Initialization ============
function init() {
    // Load animations preference
    try {
        const savedAnim = localStorage.getItem('drder-animations');
        if (savedAnim !== null) {
            gameState.animationsEnabled = savedAnim === 'true';
            elements.animationsToggle.checked = gameState.animationsEnabled;
        }
    } catch (e) {
        gameState.animationsEnabled = true;
        elements.animationsToggle.checked = true;
    }
    
    initPWA();
    initEventListeners();
    initSplashScreen();
    lockOrientation();
    
    showScreen(elements.mainMenu);
    updateResumeButton();
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(reg => {
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                newWorker.postMessage({ action: 'skipWaiting' });
                                window.location.reload();
                            }
                        });
                    }
                });
            })
            .catch(err => {});
    });
    
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

document.addEventListener('DOMContentLoaded', init);
