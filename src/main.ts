import './scss/main.scss';
import { renderHomeScreen, initHomeScreen } from './screens/home/home-screen';
import { renderSettingsScreen } from './screens/settings/setting-screen';
import { initSettingsEvents } from './screens/settings/setting-events';
import { renderGameScreen } from './screens/game/game-screen';

type Screen = 'home' | 'settings' | 'game';

let currentScreen: Screen = 'home';

const app = document.querySelector<HTMLDivElement>('#app');


function renderApp(): void {
    if (!app) return;

    if (currentScreen === 'home') renderHome(app);
    else if (currentScreen === 'settings') renderSettings(app);
    else renderGame(app);
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
}

function changeScreen(screen: Screen): void {
    currentScreen = screen;
    renderApp();
}

renderApp();