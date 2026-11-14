import { gameSettings } from '../../data/game-settings';
import { themePreviews } from '../../data/themes';

import type { Theme } from '../../types/theme-types';
import type { Player } from '../../types/player-types';
import type { BoardSize } from '../../types/game-types';

export function initSettingsEvents(app: HTMLDivElement): void {
    const options = app.querySelector('.settings-screen__options');

    options?.addEventListener('change', (event) => {
        handleSettingsChange(event, app);
    });
}

function handleSettingsChange(event: Event, app: HTMLDivElement): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const input = event.target;
    if (input.name === 'theme') {
        updateSelectedTheme(input.value as Theme, app);
    } else if (input.name === 'player') {
        updateSelectedPlayer(input.value as Player);
    } else if (input.name === 'board-size') {
        updateSelectedBoardSize(Number(input.value) as BoardSize);
    }
}

function updateSelectedTheme(theme: Theme, app: HTMLDivElement): void {
    gameSettings.theme = theme;
    updateThemePreview(theme, app);
    console.log(gameSettings.theme)
}

function updateThemePreview(theme: Theme, app: HTMLDivElement): void {
    const preview = app.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    if (preview) preview.src = themePreviews[theme];
}

function updateSelectedPlayer(player: Player): void {
    gameSettings.player = player;
    console.log(gameSettings.player)
}

function updateSelectedBoardSize(size: BoardSize): void {
    gameSettings.boardSize = size;
    console.log(gameSettings.boardSize)
}