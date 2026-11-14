import './scss/main.scss';
import { renderHomeScreen, initHomeScreen } from './screens/home/home-screen';
import { renderSettingsScreen } from './screens/settings/setting-screen';
import { initSettingsEvents } from './screens/settings/setting-events';

type Screen = 'home' | 'settings';

let currentScreen: Screen = 'home';

const app = document.querySelector<HTMLDivElement>('#app');


function renderApp(): void {
    if (!app) return;

    if (currentScreen === 'home') {
        app.innerHTML = renderHomeScreen();
        initHomeScreen(() => changeScreen('settings'));
    } else {
        app.innerHTML = renderSettingsScreen();
        initSettingsEvents(app);
    }
}

function changeScreen(screen: Screen): void {
    currentScreen = screen;
    renderApp();
}

renderApp();