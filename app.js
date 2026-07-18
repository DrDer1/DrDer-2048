/* ==========================================
   DrDer 2048 - Premium Game Application
   ========================================== */

// ============ Language System ============
const translations = {
    ar: {
        'start-game': 'ابدأ اللعب',
        'levels': 'المستويات',
        'statistics': 'الإحصائيات',
        'settings': 'الإعدادات',
        'beginner': 'مبتدئ',
        'normal': 'عادي',
        'advanced': 'متقدم',
        'expert': 'خبير',
        'free-play': 'حر',
        'play': 'العب',
        'score': 'النتيجة',
        'best': 'الأفضل',
        'moves': 'الحركات',
        'time': 'الوقت',
        'games-played': 'الألعاب',
        'wins': 'الفوز',
        'losses': 'الخسارة',
        'best-score': 'أفضل نتيجة',
        'highest-tile': 'أعلى رقم',
        'total-time': 'إجمالي الوقت',
        'total-moves': 'إجمالي الحركات',
        'achievements': 'الإنجازات',
        'language': 'اللغة',
        'theme': 'الثيم',
        'animations': 'الأنيميشن',
        'reset-stats': 'إعادة تعيين الإحصائيات',
        'reset-achievements': 'إعادة تعيين الإنجازات',
        'congratulations': 'تهانينا!',
        'you-reached': 'لقد وصلت إلى الهدف!',
        'continue': 'استمرار',
        'new-game': 'لعبة جديدة',
        'game-over': 'انتهت اللعبة',
        'try-again': 'حاول مجدداً',
        'main-menu': 'القائمة الرئيسية',
        'confirm': 'تأكيد',
        'yes': 'نعم',
        'no': 'لا',
        'install-app': 'تثبيت التطبيق',
        'swipe-hint': 'اسحب للتحريك',
        'confirm-reset-stats': 'هل أنت متأكد من إعادة تعيين جميع الإحصائيات؟',
        'confirm-reset-achievements': 'هل أنت متأكد من إعادة تعيين جميع الإنجازات؟',
        'achievement-128': 'الوصول إلى 128',
        'achievement-512': 'الوصول إلى 512',
        'achievement-1024': 'الوصول إلى 1024',
        'achievement-2048': 'الوصول إلى 2048',
        'achievement-4096': 'الوصول إلى 4096',
        'achievement-new-best': 'أفضل نتيجة جديدة',
        'desc-128': 'قم بإنشاء مربع 128',
        'desc-512': 'قم بإنشاء مربع 512',
        'desc-1024': 'قم بإنشاء مربع 1024',
        'desc-2048': 'قم بإنشاء مربع 2048',
        'desc-4096': 'قم بإنشاء مربع 4096',
        'desc-new-best': 'حقق أفضل نتيجة شخصية جديدة'
    },
    en: {
        'start-game': 'Start Game',
        'levels': 'Levels',
        'statistics': 'Statistics',
        'settings': 'Settings',
        'beginner': 'Beginner',
        'normal': 'Normal',
        'advanced': 'Advanced',
        'expert': 'Expert',
        'free-play': 'Free Play',
        'play': 'Play',
        'score': 'Score',
        'best': 'Best',
        'moves': 'Moves',
        'time': 'Time',
        'games-played': 'Games',
        'wins': 'Wins',
        'losses': 'Losses',
        'best-score': 'Best Score',
        'highest-tile': 'Highest Tile',
        'total-time': 'Total Time',
        'total-moves': 'Total Moves',
        'achievements': 'Achievements',
        'language': 'Language',
        'theme': 'Theme',
        'animations': 'Animations',
        'reset-stats': 'Reset Statistics',
        'reset-achievements': 'Reset Achievements',
        'congratulations': 'Congratulations!',
        'you-reached': 'You reached the target!',
        'continue': 'Continue',
        'new-game': 'New Game',
        'game-over': 'Game Over',
        'try-again': 'Try Again',
        'main-menu': 'Main Menu',
        'confirm': 'Confirm',
        'yes': 'Yes',
        'no': 'No',
        'install-app': 'Install App',
        'swipe-hint': 'Swipe to move',
        'confirm-reset-stats': 'Are you sure you want to reset all statistics?',
        'confirm-reset-achievements': 'Are you sure you want to reset all achievements?',
        'achievement-128': 'Reach 128',
        'achievement-512': 'Reach 512',
        'achievement-1024': 'Reach 1024',
        'achievement-2048': 'Reach 2048',
        'achievement-4096': 'Reach 4096',
        'achievement-new-best': 'New Best Score',
        'desc-128': 'Create a 128 tile',
        'desc-512': 'Create a 512 tile',
        'desc-1024': 'Create a 1024 tile',
        'desc-2048': 'Create a 2048 tile',
        'desc-4096': 'Create a 4096 tile',
        'desc-new-best': 'Achieve a new personal best score'
    }
};

let currentLanguage = 'ar';

function t(key) {
    return translations[currentLanguage][key] || key;
}

function updateLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    
    localStorage.setItem('drder-language', lang);
}

// ============ Theme System ============
const themes = ['midnight', 'deep-space', 'dark-purple', 'ocean-night', 'emerald-night'];
let currentTheme = 'midnight';
let unlockedThemes = ['midnight'];

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
    localStorage.setItem('drder-theme', theme);
}

function unlockTheme(theme) {
    if (!unlockedThemes.includes(theme)) {
        unlockedThemes.push(theme);
        localStorage.setItem('drder-unlocked-themes', JSON.stringify(unlockedThemes));
        updateThemeSelect();
    }
}

function updateThemeSelect() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    
    select.innerHTML = '';
    const themeNames = {
        'midnight': 'Midnight Black',
        'deep-space': 'Deep Space',
        'dark-purple': 'Dark Purple',
        'ocean-night': 'Ocean Night',
        'emerald-night': 'Emerald Night'
    };
    
    unlockedThemes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = themeNames[theme] || theme;
        if (theme === currentTheme) option.selected = true;
        select.appendChild(option);
    });
    
    select.value = currentTheme;
}

// ============ Storage System ============
const Storage = {
    save(key, value) {
        try {
            localStorage.setItem(`drder-${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage save failed:', e);
        }
    },
    
    load(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(`drder-${key}`);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.warn('Storage load failed:', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(`drder-${key}`);
        } catch (e) {
            console.warn('Storage remove failed:', e);
        }
    }
};

// ============ Game State ============
const GameState = {
    grid: [],
    score: 0,
    bestScore: 0,
    moves: 0,
    time: 0,
    level: 'free',
    target: Infinity,
    gameOver: false,
    won: false,
    continueAfterWin: false,
    timerInterval: null,
    
    init(level) {
        this.grid = Array(4).fill(null).map(() => Array(4).fill(0));
        this.score = 0;
        this.moves = 0;
        this.time = 0;
        this.gameOver = false;
        this.won = false;
        this.continueAfterWin = false;
        this.level = level;
        
        const targets = {
            'beginner': 128,
            'normal': 512,
            'advanced': 2048,
            'expert': 4096,
            'free': Infinity
        };
        this.target = targets[level] || Infinity;
        this.bestScore = Storage.load('best-score', 0);
        
        this.stopTimer();
        this.startTimer();
    },
    
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.time++;
            this.updateTimeDisplay();
        }, 1000);
    },
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },
    
    updateTimeDisplay() {
        const timeEl = document.getElementById('time');
        if (timeEl) {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            timeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },
    
    addScore(points) {
        this.score += points;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            Storage.save('best-score', this.bestScore);
            checkAchievement('new-best');
        }
        this.updateScoreDisplay();
    },
    
    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('best-score').textContent = this.bestScore;
        document.getElementById('moves').textContent = this.moves;
    },
    
    incrementMoves() {
        this.moves++;
        document.getElementById('moves').textContent = this.moves;
    },
    
    getState() {
        return {
            grid: this.grid.map(row => [...row]),
            score: this.score,
            bestScore: this.bestScore,
            moves: this.moves,
            time: this.time,
            level: this.level,
            target: this.target,
            gameOver: this.gameOver,
            won: this.won,
            continueAfterWin: this.continueAfterWin
        };
    },
    
    restoreState(state) {
        if (!state) return false;
        this.grid = state.grid.map(row => [...row]);
        this.score = state.score;
        this.bestScore = state.bestScore;
        this.moves = state.moves;
        this.time = state.time;
        this.level = state.level;
        this.target = state.target;
        this.gameOver = state.gameOver;
        this.won = state.won;
        this.continueAfterWin = state.continueAfterWin;
        this.updateScoreDisplay();
        this.updateTimeDisplay();
        return true;
    },
    
    saveState() {
        const state = this.getState();
        Storage.save('game-state', state);
    },
    
    clearState() {
        Storage.remove('game-state');
    }
};

// ============ Statistics ============
const Statistics = {
    data: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        bestScore: 0,
        highestTile: 0,
        totalTime: 0,
        totalMoves: 0
    },
    
    init() {
        this.data = Storage.load('statistics', this.data);
        this.updateDisplay();
    },
    
    save() {
        Storage.save('statistics', this.data);
    },
    
    recordGameStart() {
        this.data.gamesPlayed++;
        this.save();
        this.updateDisplay();
    },
    
    recordWin() {
        this.data.wins++;
        this.save();
        this.updateDisplay();
    },
    
    recordLoss() {
        this.data.losses++;
        this.save();
        this.updateDisplay();
    },
    
    updateBestScore(score) {
        if (score > this.data.bestScore) {
            this.data.bestScore = score;
            this.save();
        }
    },
    
    updateHighestTile(value) {
        if (value > this.data.highestTile) {
            this.data.highestTile = value;
            this.save();
        }
    },
    
    addTime(seconds) {
        this.data.totalTime += seconds;
        this.save();
    },
    
    addMoves(count) {
        this.data.totalMoves += count;
        this.save();
    },
    
    updateDisplay() {
        document.getElementById('stat-games').textContent = this.data.gamesPlayed;
        document.getElementById('stat-wins').textContent = this.data.wins;
        document.getElementById('stat-losses').textContent = this.data.losses;
        document.getElementById('stat-best-score').textContent = this.data.bestScore;
        document.getElementById('stat-highest-tile').textContent = this.data.highestTile;
        
        const totalMinutes = Math.floor(this.data.totalTime / 60);
        const totalSeconds = this.data.totalTime % 60;
        document.getElementById('stat-total-time').textContent = 
            `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
        
        document.getElementById('stat-total-moves').textContent = this.data.totalMoves;
    },
    
    reset() {
        this.data = {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            bestScore: 0,
            highestTile: 0,
            totalTime: 0,
            totalMoves: 0
        };
        this.save();
        this.updateDisplay();
    }
};

// ============ Achievements ============
const achievementsList = [
    { id: 'tile-128', nameKey: 'achievement-128', descKey: 'desc-128', icon: '🟢', condition: (value) => value >= 128 },
    { id: 'tile-512', nameKey: 'achievement-512', descKey: 'desc-512', icon: '🔵', condition: (value) => value >= 512 },
    { id: 'tile-1024', nameKey: 'achievement-1024', descKey: 'desc-1024', icon: '🟣', condition: (value) => value >= 1024 },
    { id: 'tile-2048', nameKey: 'achievement-2048', descKey: 'desc-2048', icon: '💎', condition: (value) => value >= 2048 },
    { id: 'tile-4096', nameKey: 'achievement-4096', descKey: 'desc-4096', icon: '👑', condition: (value) => value >= 4096 },
    { id: 'new-best', nameKey: 'achievement-new-best', descKey: 'desc-new-best', icon: '⭐', condition: () => true }
];

let unlockedAchievements = [];

function initAchievements() {
    unlockedAchievements = Storage.load('achievements', []);
    renderAchievements();
}

function checkAchievement(achievementId) {
    if (unlockedAchievements.includes(achievementId)) return;
    
    unlockedAchievements.push(achievementId);
    Storage.save('achievements', unlockedAchievements);
    
    // Unlock themes based on achievements
    if (achievementId === 'tile-128') unlockTheme('deep-space');
    if (achievementId === 'tile-512') unlockTheme('dark-purple');
    if (achievementId === 'tile-1024') unlockTheme('ocean-night');
    if (achievementId === 'tile-2048') unlockTheme('emerald-night');
    
    renderAchievements();
}

function checkTileAchievements(tileValue) {
    achievementsList.forEach(achievement => {
        if (achievement.id.startsWith('tile-') && achievement.condition(tileValue)) {
            checkAchievement(achievement.id);
        }
    });
}

function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    achievementsList.forEach(achievement => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-info">
                <div class="achievement-name">${t(achievement.nameKey)}</div>
                <div class="achievement-desc">${t(achievement.descKey)}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function resetAchievements() {
    unlockedAchievements = [];
    Storage.save('achievements', unlockedAchievements);
    unlockedThemes = ['midnight'];
    Storage.save('drder-unlocked-themes', JSON.stringify(unlockedThemes));
    applyTheme('midnight');
    updateThemeSelect();
    renderAchievements();
}

// ============ Game Logic ============
const GameLogic = {
    addRandomTile(grid) {
        const emptyCells = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] === 0) emptyCells.push({ r, c });
            }
        }
        
        if (emptyCells.length === 0) return false;
        
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[r][c] = Math.random() < 0.9 ? 2 : 4;
        return true;
    },
    
    canMove(grid) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] === 0) return true;
                if (c < 3 && grid[r][c] === grid[r][c + 1]) return true;
                if (r < 3 && grid[r][c] === grid[r + 1][c]) return true;
            }
        }
        return false;
    },
    
    getMaxTile(grid) {
        let max = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] > max) max = grid[r][c];
            }
        }
        return max;
    },
    
    move(direction, grid) {
        let newGrid = grid.map(row => [...row]);
        let scoreGained = 0;
        let moved = false;
        const merges = [];
        
        if (direction === 'left') {
            for (let r = 0; r < 4; r++) {
                const result = this.processLine(newGrid[r]);
                if (result.changed) {
                    newGrid[r] = result.line;
                    scoreGained += result.score;
                    moved = true;
                    result.merges.forEach(c => merges.push({ r, c }));
                }
            }
        } else if (direction === 'right') {
            for (let r = 0; r < 4; r++) {
                const reversed = [...newGrid[r]].reverse();
                const result = this.processLine(reversed);
                if (result.changed) {
                    newGrid[r] = result.line.reverse();
                    scoreGained += result.score;
                    moved = true;
                    result.merges.forEach(c => merges.push({ r, c: 3 - c }));
                }
            }
        } else if (direction === 'up') {
            for (let c = 0; c < 4; c++) {
                const column = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
                const result = this.processLine(column);
                if (result.changed) {
                    for (let r = 0; r < 4; r++) newGrid[r][c] = result.line[r];
                    scoreGained += result.score;
                    moved = true;
                    result.merges.forEach(r => merges.push({ r, c }));
                }
            }
        } else if (direction === 'down') {
            for (let c = 0; c < 4; c++) {
                const column = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
                const result = this.processLine(column);
                if (result.changed) {
                    const reversed = result.line.reverse();
                    for (let r = 0; r < 4; r++) newGrid[r][c] = reversed[r];
                    scoreGained += result.score;
                    moved = true;
                    result.merges.forEach(r => merges.push({ r: 3 - r, c }));
                }
            }
        }
        
        return { newGrid, scoreGained, moved, merges };
    },
    
    processLine(line) {
        let filtered = line.filter(val => val !== 0);
        let score = 0;
        let changed = false;
        const merges = [];
        
        for (let i = 0; i < filtered.length - 1; i++) {
            if (filtered[i] === filtered[i + 1]) {
                filtered[i] *= 2;
                score += filtered[i];
                filtered.splice(i + 1, 1);
                merges.push(i);
                changed = true;
            }
        }
        
        while (filtered.length < 4) {
            filtered.push(0);
        }
        
        for (let i = 0; i < 4; i++) {
            if (filtered[i] !== line[i]) {
                changed = true;
                break;
            }
        }
        
        return { line: filtered, score, changed, merges };
    }
};

// ============ UI Renderer ============
const UIRenderer = {
    tileContainer: null,
    boardElement: null,
    
    init() {
        this.tileContainer = document.getElementById('tile-container');
        this.boardElement = document.getElementById('game-board');
    },
    
    renderBoard(grid, merges = []) {
        if (!this.tileContainer || !this.boardElement) return;
        
        this.tileContainer.innerHTML = '';
        
        const boardRect = this.boardElement.getBoundingClientRect();
        const padding = 8;
        const gap = 8;
        const availableSize = boardRect.width - padding * 2;
        const cellSize = (availableSize - gap * 3) / 4;
        
        const mergeSet = new Set(merges.map(m => `${m.r},${m.c}`));
        
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] !== 0) {
                    const tile = document.createElement('div');
                    tile.className = this.getTileClass(grid[r][c]);
                    tile.textContent = grid[r][c];
                    tile.style.width = `${cellSize}px`;
                    tile.style.height = `${cellSize}px`;
                    tile.style.left = `${padding + c * (cellSize + gap)}px`;
                    tile.style.top = `${padding + r * (cellSize + gap)}px`;
                    tile.style.lineHeight = `${cellSize}px`;
                    tile.style.fontSize = `${cellSize * 0.4}px`;
                    
                    const key = `${r},${c}`;
                    if (mergeSet.has(key)) {
                        tile.classList.add('merged');
                    }
                    
                    this.tileContainer.appendChild(tile);
                }
            }
        }
        
        // Add new tiles animation
        const tiles = this.tileContainer.querySelectorAll('.tile');
        tiles.forEach(tile => {
            if (!tile.classList.contains('merged')) {
                tile.classList.add('new-tile');
            }
        });
    },
    
    getTileClass(value) {
        if (value <= 4) return `tile tile-${value}`;
        if (value <= 8192) return `tile tile-${value}`;
        return 'tile tile-super';
    },
    
    animateMerge(merges) {
        if (!merges || merges.length === 0) return;
        
        const animationsEnabled = Storage.load('animations-enabled', true);
        if (!animationsEnabled) return;
        
        setTimeout(() => {
            const tiles = this.tileContainer.querySelectorAll('.tile.merged');
            tiles.forEach(tile => {
                tile.classList.remove('merged');
            });
        }, 300);
    }
};

// ============ Screen Manager ============
const ScreenManager = {
    currentScreen: 'main-menu',
    
    show(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
        }
        
        // Hide modals when switching screens
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Update install button visibility
        if (screenId === 'main-menu') {
            updateInstallButton();
        }
    },
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },
    
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }
};

// ============ Game Controller ============
const GameController = {
    currentLevel: 'free',
    
    startGame(level) {
        this.currentLevel = level;
        GameState.init(level);
        Statistics.recordGameStart();
        
        // Add two initial tiles
        GameLogic.addRandomTile(GameState.grid);
        GameLogic.addRandomTile(GameState.grid);
        
        GameState.updateScoreDisplay();
        GameState.updateTimeDisplay();
        
        UIRenderer.renderBoard(GameState.grid);
        
        // Update level indicator
        const levelNames = {
            'beginner': t('beginner'),
            'normal': t('normal'),
            'advanced': t('advanced'),
            'expert': t('expert'),
            'free': t('free-play')
        };
        document.getElementById('level-indicator').textContent = levelNames[level] || '';
        
        ScreenManager.show('game-screen');
        
        // Save state
        GameState.saveState();
    },
    
    resumeGame() {
        const state = Storage.load('game-state', null);
        if (state && !state.gameOver) {
            GameState.restoreState(state);
            this.currentLevel = state.level;
            GameState.startTimer();
            
            const levelNames = {
                'beginner': t('beginner'),
                'normal': t('normal'),
                'advanced': t('advanced'),
                'expert': t('expert'),
                'free': t('free-play')
            };
            document.getElementById('level-indicator').textContent = levelNames[state.level] || '';
            
            UIRenderer.renderBoard(GameState.grid);
            ScreenManager.show('game-screen');
        } else {
            this.startGame('free');
        }
    },
    
    handleMove(direction) {
        if (GameState.gameOver) return;
        if (GameState.won && !GameState.continueAfterWin) return;
        
        const result = GameLogic.move(direction, GameState.grid);
        
        if (result.moved) {
            GameState.grid = result.newGrid;
            GameState.addScore(result.scoreGained);
            GameState.incrementMoves();
            
            UIRenderer.renderBoard(GameState.grid, result.merges);
            UIRenderer.animateMerge(result.merges);
            
            // Add new tile
            setTimeout(() => {
                GameLogic.addRandomTile(GameState.grid);
                UIRenderer.renderBoard(GameState.grid);
                
                // Check win condition
                const maxTile = GameLogic.getMaxTile(GameState.grid);
                Statistics.updateHighestTile(maxTile);
                checkTileAchievements(maxTile);
                
                if (!GameState.won && maxTile >= GameState.target && GameState.target !== Infinity) {
                    GameState.won = true;
                    GameState.stopTimer();
                    this.showWinModal();
                }
                
                // Check lose condition
                if (!GameLogic.canMove(GameState.grid)) {
                    GameState.gameOver = true;
                    GameState.stopTimer();
                    Statistics.recordLoss();
                    Statistics.addTime(GameState.time);
                    Statistics.addMoves(GameState.moves);
                    Statistics.updateBestScore(GameState.score);
                    GameState.clearState();
                    this.showLoseModal();
                }
                
                // Save state
                if (!GameState.gameOver) {
                    GameState.saveState();
                }
            }, 100);
        }
    },
    
    showWinModal() {
        Statistics.recordWin();
        Statistics.addTime(GameState.time);
        Statistics.addMoves(GameState.moves);
        Statistics.updateBestScore(GameState.score);
        GameState.clearState();
        
        document.getElementById('win-score').textContent = GameState.score;
        document.getElementById('win-time').textContent = document.getElementById('time').textContent;
        document.getElementById('win-moves').textContent = GameState.moves;
        document.getElementById('win-best').textContent = GameState.bestScore;
        
        ScreenManager.showModal('win-modal');
    },
    
    showLoseModal() {
        document.getElementById('lose-score').textContent = GameState.score;
        document.getElementById('lose-best').textContent = GameState.bestScore;
        document.getElementById('lose-time').textContent = document.getElementById('time').textContent;
        document.getElementById('lose-moves').textContent = GameState.moves;
        
        ScreenManager.showModal('lose-modal');
    },
    
    continueGame() {
        GameState.won = true;
        GameState.continueAfterWin = true;
        GameState.target = Infinity;
        GameState.startTimer();
        GameState.saveState();
        ScreenManager.hideModal('win-modal');
        
        document.getElementById('level-indicator').textContent = t('free-play');
    },
    
    newGame() {
        GameState.stopTimer();
        GameState.clearState();
        ScreenManager.hideModal('win-modal');
        ScreenManager.hideModal('lose-modal');
        this.startGame(this.currentLevel);
    },
    
    tryAgain() {
        GameState.stopTimer();
        GameState.clearState();
        ScreenManager.hideModal('lose-modal');
        this.startGame(this.currentLevel);
    },
    
    goToMenu() {
        GameState.stopTimer();
        if (!GameState.gameOver) {
            GameState.saveState();
        }
        ScreenManager.hideModal('lose-modal');
        ScreenManager.show('main-menu');
    }
};

// ============ Input Handler ============
const InputHandler = {
    touchStartX: 0,
    touchStartY: 0,
    minSwipeDistance: 30,
    
    init() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (ScreenManager.currentScreen !== 'game-screen') return;
            if (GameState.gameOver) return;
            
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
                GameController.handleMove(direction);
            }
        });
        
        // Touch controls
        const swipeArea = document.getElementById('swipe-area');
        const gameBoard = document.getElementById('game-board');
        
        [swipeArea, gameBoard].forEach(element => {
            if (!element) return;
            
            element.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            element.addEventListener('touchend', (e) => {
                if (ScreenManager.currentScreen !== 'game-screen') return;
                if (GameState.gameOver) return;
                
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                const dx = touchEndX - this.touchStartX;
                const dy = touchEndY - this.touchStartY;
                
                if (Math.abs(dx) < this.minSwipeDistance && Math.abs(dy) < this.minSwipeDistance) {
                    return;
                }
                
                if (Math.abs(dx) > Math.abs(dy)) {
                    GameController.handleMove(dx > 0 ? 'right' : 'left');
                } else {
                    GameController.handleMove(dy > 0 ? 'down' : 'up');
                }
            });
        });
    }
};

// ============ PWA Install ============
let deferredPrompt = null;
let isAppInstalled = false;

function checkInstallStatus() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        isAppInstalled = true;
    }
    
    if (window.navigator.standalone) {
        isAppInstalled = true;
    }
    
    return isAppInstalled;
}

function updateInstallButton() {
    const installBtn = document.getElementById('btn-install');
    if (!installBtn) return;
    
    if (isAppInstalled || checkInstallStatus()) {
        installBtn.style.display = 'none';
    } else if (deferredPrompt) {
        installBtn.style.display = 'flex';
    } else {
        installBtn.style.display = 'none';
    }
}

function initPWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        updateInstallButton();
    });
    
    window.addEventListener('appinstalled', () => {
        isAppInstalled = true;
        deferredPrompt = null;
        updateInstallButton();
        console.log('DrDer 2048 installed successfully');
    });
    
    document.getElementById('btn-install').addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            isAppInstalled = true;
            deferredPrompt = null;
            updateInstallButton();
        }
        
        deferredPrompt = null;
    });
}

// ============ Splash Screen ============
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (!splashScreen) return;
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    if (isStandalone) {
        splashScreen.style.display = 'flex';
        
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500);
        }, 1500);
    } else {
        splashScreen.style.display = 'none';
    }
}

// ============ Event Handlers ============
function initEventHandlers() {
    // Main menu buttons
    document.getElementById('btn-start').addEventListener('click', () => {
        const savedState = Storage.load('game-state', null);
        if (savedState && !savedState.gameOver) {
            GameController.resumeGame();
        } else {
            GameController.startGame('free');
        }
    });
    
    document.getElementById('btn-levels').addEventListener('click', () => {
        ScreenManager.show('levels-screen');
    });
    
    document.getElementById('btn-stats').addEventListener('click', () => {
        Statistics.updateDisplay();
        renderAchievements();
        ScreenManager.show('stats-screen');
    });
    
    document.getElementById('btn-settings').addEventListener('click', () => {
        updateThemeSelect();
        ScreenManager.show('settings-screen');
    });
    
    // Back buttons
    document.getElementById('btn-back-levels').addEventListener('click', () => {
        ScreenManager.show('main-menu');
    });
    
    document.getElementById('btn-back-stats').addEventListener('click', () => {
        ScreenManager.show('main-menu');
    });
    
    document.getElementById('btn-back-settings').addEventListener('click', () => {
        ScreenManager.show('main-menu');
    });
    
    document.getElementById('btn-menu').addEventListener('click', () => {
        GameController.goToMenu();
    });
    
    // Level selection
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.target.getAttribute('data-level');
            GameController.startGame(level);
        });
    });
    
    // Win modal
    document.getElementById('btn-continue').addEventListener('click', () => {
        GameController.continueGame();
    });
    
    document.getElementById('btn-win-new-game').addEventListener('click', () => {
        GameController.newGame();
    });
    
    // Lose modal
    document.getElementById('btn-try-again').addEventListener('click', () => {
        GameController.tryAgain();
    });
    
    document.getElementById('btn-lose-menu').addEventListener('click', () => {
        GameController.goToMenu();
    });
    
    // Settings
    document.getElementById('lang-select').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
    
    document.getElementById('theme-select').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    document.getElementById('animations-toggle').addEventListener('change', (e) => {
        Storage.save('animations-enabled', e.target.checked);
    });
    
    document.getElementById('btn-reset-stats').addEventListener('click', () => {
        document.getElementById('confirm-message').textContent = t('confirm-reset-stats');
        ScreenManager.showModal('confirm-modal');
        
        document.getElementById('btn-confirm-yes').onclick = () => {
            Statistics.reset();
            ScreenManager.hideModal('confirm-modal');
        };
    });
    
    document.getElementById('btn-reset-achievements').addEventListener('click', () => {
        document.getElementById('confirm-message').textContent = t('confirm-reset-achievements');
        ScreenManager.showModal('confirm-modal');
        
        document.getElementById('btn-confirm-yes').onclick = () => {
            resetAchievements();
            ScreenManager.hideModal('confirm-modal');
        };
    });
    
    document.getElementById('btn-confirm-no').addEventListener('click', () => {
        ScreenManager.hideModal('confirm-modal');
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

// ============ Initialization ============
function init() {
    // Load saved preferences
    const savedLang = Storage.load('language', 'ar');
    currentLanguage = savedLang;
    updateLanguage(savedLang);
    document.getElementById('lang-select').value = savedLang;
    
    const savedTheme = Storage.load('theme', 'midnight');
    unlockedThemes = Storage.load('drder-unlocked-themes', ['midnight']);
    applyTheme(savedTheme);
    
    const animationsEnabled = Storage.load('animations-enabled', true);
    document.getElementById('animations-toggle').checked = animationsEnabled;
    
    // Initialize systems
    UIRenderer.init();
    Statistics.init();
    initAchievements();
    InputHandler.init();
    initPWAInstall();
    initEventHandlers();
    
    // Show splash screen if in standalone mode
    initSplashScreen();
    
    // Check install status
    checkInstallStatus();
    updateInstallButton();
    
    // Show main menu
    ScreenManager.show('main-menu');
    
    console.log('DrDer 2048 initialized successfully');
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
                
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New content available, please refresh.');
                            if (confirm(t('new-version-available') || 'New version available! Refresh to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Handle window resize for board rendering
window.addEventListener('resize', () => {
    if (ScreenManager.currentScreen === 'game-screen' && !GameState.gameOver) {
        UIRenderer.renderBoard(GameState.grid);
    }
});

// Prevent double-tap zoom on mobile
document.addEventListener('dblclick', (e) => {
    if (e.target.closest('#game-board') || e.target.closest('#swipe-area')) {
        e.preventDefault();
    }
}, { passive: false });
