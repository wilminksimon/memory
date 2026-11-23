import './scss/main.scss';
import { renderHomeScreen, initHomeScreen } from './screens/home/home-screen';
import { renderSettingsScreen } from './screens/settings/setting-screen';
import { initSettingsEvents } from './screens/settings/setting-events';
import { renderGameScreen } from './screens/game/game-screen';
import { initGameEvents } from './screens/game/game-events';
import { renderGameOverScreen } from './screens/game-over/game-over-screen';
import type { GameState } from './types/game-types';

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
    }, () => changeScreen('settings'));
}

function changeScreen(screen: Screen): void {
    currentScreen = screen;
    renderApp();
}

function renderGameOver(app: HTMLDivElement): void {
    if (!finalGameState) return;

    app.innerHTML = renderGameOverScreen(finalGameState);
}

renderApp();