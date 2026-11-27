import { renderHomeScreen, initHomeScreen } from './home/home-screen';
import { renderSettingsScreen } from './settings/setting-screen';
import { initSettingsEvents } from './settings/setting-events';
import { renderGameScreen } from './game/game-screen';
import { initGameEvents } from './game/game-events';
import { renderScoreScreen, renderWinnerScreen } from './game-over/game-over-screen';
import { initGameOverEvents } from './game-over/game-over-events';

import { gameSettings } from '../data/game-settings';
import type { GameState } from '../types/game-types';

const scoreScreenDuration = 3000;

type Screen = 'home' | 'settings' | 'game' | 'gameOver';

let currentScreen: Screen = 'home';
let finalGameState: GameState | null = null;

const app = document.querySelector<HTMLDivElement>('#app');

/**
 * Initializes the screen manager.
 */
export function initScreenManager(): void {
    renderApp();
}

/**
 * Renders the currently active screen.
 */
function renderApp(): void {
    if (!app) return;

    switch (currentScreen) {
        case 'home':
            renderHome(app);
            break;
        case 'settings':
            renderSettings(app);
            break;
        case 'game':
            renderGame(app);
            break;
        case 'gameOver':
            renderGameOver(app);
            break;
    }
}

/**
 * Renders the home screen and initializes its events.
 */
function renderHome(app: HTMLDivElement): void {
    app.innerHTML = renderHomeScreen();
    initHomeScreen(() => changeScreen('settings'));
}

/**
 * Renders the settings screen and initializes its events.
 */
function renderSettings(app: HTMLDivElement): void {
    app.innerHTML = renderSettingsScreen();
    initSettingsEvents(app, () => changeScreen('game'));
}

/**
 * Renders the game screen and initializes its events.
 */
function renderGame(app: HTMLDivElement): void {
    app.innerHTML = renderGameScreen();

    initGameEvents(app, game => {
        finalGameState = game;
        changeScreen('gameOver');
    }, () => {
        resetGameSettings();
        finalGameState = null;
        changeScreen('settings');
    });
}

/**
 * Changes the active screen and renders it.
 */
function changeScreen(screen: Screen): void {
    currentScreen = screen;
    renderApp();
}

/**
 * Resets all game settings to their default values.
 */
function resetGameSettings(): void {
    gameSettings.theme = 'code-vibes';
    gameSettings.player = 'blue';
    gameSettings.boardSize = 16;
}

/**
 * Renders the score screen before the winner screen.
 */
function renderGameOver(app: HTMLDivElement): void {
    if (!finalGameState) return;

    const game = finalGameState;
    app.innerHTML = renderScoreScreen(game);

    setTimeout(() => showWinnerScreen(app, game), scoreScreenDuration);
}

/**
 * Displays the winner screen over the score screen.
 */
function showWinnerScreen(app: HTMLDivElement, game: GameState): void {
    if (currentScreen !== 'gameOver') return;

    const scoreScreen = app.querySelector<HTMLElement>('.game-over-screen--score');
    if (!scoreScreen) return;

    app.insertAdjacentHTML('beforeend', renderWinnerScreen(game));
    const winnerScreen = app.querySelector<HTMLElement>('.game-over-screen--winner');
    if (!winnerScreen) return;

    winnerScreen.addEventListener('animationend', () => scoreScreen.remove(), { once: true });
    initGameOverEvents(app, onBackToHome);
}

/**
 * Returns to the home screen and resets the game settings.
 */
function onBackToHome(): void {
    resetGameSettings();
    finalGameState = null;
    changeScreen('home');
}