import './scss/main.scss';
import { themePreviews } from './data/themes';
import { renderHomeScreen, initHomeScreen } from './screens/home-screen';
import { renderSettingsScreen } from './screens/setting-screen';

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

    const themeInputs = app?.querySelectorAll<HTMLInputElement>('input[name="theme"]');

    const previewImage = app?.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    themeInputs?.forEach((themeInput) => {
        themeInput.addEventListener('change', () => {
            if (!previewImage) return;
            const selectedTheme = themeInput.value as keyof typeof themePreviews;
            previewImage.src = themePreviews[selectedTheme];

        });

    });
}