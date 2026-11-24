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

const SCORE_SCREEN_DURATION = 3500;

/** Identifies a screen that can be rendered by the application. */
type Screen = 'home' | 'settings' | 'game' | 'gameOver';

let currentScreen: Screen = 'home';
let finalGameState: GameState | null = null;

const app = document.querySelector<HTMLDivElement>('#app');

/**
 * Renders the currently active screen.
 */
function renderApp(): void {
    if (!app) return;

    if (currentScreen === 'home') renderHome(app);
    else if (currentScreen === 'settings') renderSettings(app);
    else if (currentScreen === 'game') renderGame(app);
    else renderGameOver(app);
}

/**
 * Renders the home screen and initializes its events.
 * @param app Root element that contains the active application screen.
 */
function renderHome(app: HTMLDivElement): void {
    app.innerHTML = renderHomeScreen();
    initHomeScreen(() => changeScreen('settings'));
}

/**
 * Renders the settings screen and initializes its events.
 * @param app Root element that contains the active application screen.
 */
function renderSettings(app: HTMLDivElement): void {
    app.innerHTML = renderSettingsScreen();
    initSettingsEvents(app, () => changeScreen('game'));
}

/**
 * Renders the game screen and initializes its events.
 * @param app Root element that contains the active application screen.
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
 * @param screen Screen identifier to activate.
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
 * Renders the score screen and then the winner screen.
 * @param app Root element that contains the active application screen.
 * @param app Root element that contains the active application screen.
 */
function renderGameOver(app: HTMLDivElement): void {
    if (!finalGameState) return;

    const game = finalGameState;
    app.innerHTML = renderScoreScreen(game);

    setTimeout(() => showWinnerScreen(app, game), SCORE_SCREEN_DURATION);
}

/**
 * Displays the winner screen over the score screen.
 * @param app Root element that contains the active application screen.
 * @param game Completed game state whose result is displayed.
 */
function showWinnerScreen(app: HTMLDivElement, game: GameState): void {
    if (currentScreen !== 'gameOver') return;

    const scoreScreen = app.querySelector('.game-over-screen--score');
    if (!scoreScreen) return;

    scoreScreen.insertAdjacentHTML('beforeend', renderWinnerScreen(game));
    initGameOverEvents(app, onBackToHome);
}

/**
 * Returns to the home screen.
 */
function onBackToHome(): void {
    resetGameSettings();
    finalGameState = null;
    changeScreen('home');
}

renderApp();
