import './scss/main.scss';
import { renderHomeScreen, initHomeScreen } from './screens/home/home-screen';
import { renderSettingsScreen } from './screens/settings/setting-screen';
import { initSettingsEvents } from './screens/settings/setting-events';
import { renderGameScreen } from './screens/game/game-screen';
import { initGameEvents } from './screens/game/game-events';
import { renderScoreScreen, renderWinnerScreen } from './screens/game-over/game-over-screen';
import { initGameOverEvents } from './screens/game-over/game-over-events';
import type { GameState } from './types/game-types';
import { gameSettings } from './data/game-settings';
import type { Theme } from './types/theme-types';

type Screen = 'home' | 'settings' | 'game' | 'gameOver';

let currentScreen: Screen = 'home';
let finalGameState: GameState | null = null;

const app = document.querySelector<HTMLDivElement>('#app');


function renderApp(): void {
    if (!app) return;

    if (currentScreen === 'home') renderHome(app);
    else if (currentScreen === 'settings') renderSettings(app);
    else if (currentScreen === 'game') renderGame(app);
    else renderGameOver(app);
}

function renderHome(app: HTMLDivElement): void {
    app.innerHTML = renderHomeScreen();
    initHomeScreen(() => changeScreen('settings'));
}

function renderSettings(app: HTMLDivElement): void {
    app.innerHTML = renderSettingsScreen();
    initSettingsEvents(app, () => changeScreen('game'));
}

function renderGame(app: HTMLDivElement): void {
    app.innerHTML = renderGameScreen();

    initGameEvents(app, game => {
        finalGameState = game;
        changeScreen('gameOver');
    }, () => {
        gameSettings.theme = 'code-vibes';
        gameSettings.player = 'blue';
        gameSettings.boardSize = 16;

        changeScreen('settings');
    });
}

function changeScreen(screen: Screen): void {
    currentScreen = screen;
    renderApp();
}

function renderGameOver(app: HTMLDivElement): void {
    if (!finalGameState) return;

    const game = finalGameState;
    app.innerHTML = renderScoreScreen(game);

    setTimeout(() => {
        if (currentScreen !== 'gameOver') return;

        app.innerHTML = renderWinnerScreen(game);
        initGameOverEvents(app, () => changeScreen('home'));
    }, 9000);
}

function previewScoreScreen(theme: Theme): void {
    if (!app) return;
    gameSettings.theme = theme;
    const game: GameState = {
        currentPlayer: 'blue',
        scores: { blue: 6, orange: 3 }
    };
    app.innerHTML = renderScoreScreen(game);
}

function previewWinnerScreen(theme: Theme, winner: 'blue' | 'orange' | 'draw'): void {
    if (!app) return;
    gameSettings.theme = theme;
    const scores = winner === 'draw'
        ? { blue: 4, orange: 4 }
        : winner === 'blue' ? { blue: 6, orange: 2 } : { blue: 2, orange: 6 };
    const game: GameState = { currentPlayer: 'blue', scores };
    app.innerHTML = renderWinnerScreen(game);
    initGameOverEvents(app, () => changeScreen('home'));
}

if (import.meta.env.DEV) {
    Object.assign(window, {
        previewScoreScreen,
        previewWinnerScreen,
        previewSettings: () => changeScreen('settings')
    });
}

renderApp();