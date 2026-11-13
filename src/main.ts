import './scss/main.scss';
import { themePreviews } from './data/themes';
import { renderHomeScreen, initHomeScreen } from './screens/home/home-screen';
import { renderSettingsScreen } from './screens/settings/setting-screen';
import { gameSettings } from './data/game-settings';
import type { Theme } from './types/theme-types';
import type { Player } from './types/player-types';

type Screen = 'home' | 'settings';

let currentScreen: Screen = 'home';

const app = document.querySelector<HTMLDivElement>('#app');


function renderApp(): void {

    if (!app) return;

    if (currentScreen === 'home') {
        app.innerHTML = renderHomeScreen();

        initHomeScreen(() => {
            currentScreen = 'settings';
            renderApp();
        });
    }

    if (currentScreen === 'settings') {
        app.innerHTML = renderSettingsScreen();
        initSettingsScreen();
    }
}

renderApp();


function initSettingsScreen(): void {
    const settingsOptions = app?.querySelector('.settings-screen__options');
    settingsOptions?.addEventListener('change', handleSettingsChange);
}

function handleSettingsChange(event: Event): void {
    const selectedInput = event.target as HTMLInputElement;

    if (selectedInput.name === 'theme') {
        updateSelectedTheme(selectedInput.value as Theme);
    }
}

function updateSelectedTheme(theme: Theme): void {
    gameSettings.theme = theme;
    updateThemePreview(theme);
}

function updateThemePreview(theme: Theme): void {
    const previewImage = app?.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    if (previewImage) {
        previewImage.src = themePreviews[theme];
    }
}