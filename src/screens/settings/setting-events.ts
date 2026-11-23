import { gameSettings } from '../../data/game-settings';
import { themePreviews } from '../../data/themes';
import choiceLine from '../../assets/logos/choice-line.png';

import type { Theme } from '../../types/theme-types';
import type { Player } from '../../types/player-types';
import type { BoardSize } from '../../types/game-types';

const themeLabels: Record<Theme, string> = {
    'code-vibes': 'Code Vibes',
    games: 'Games',
    'da-projects': 'DA Projects',
    food: 'Food'
};

export function initSettingsEvents(app: HTMLDivElement, onStartGame: () => void
): void {
    const options = app.querySelector('.settings-screen__options');
    const lines = createChoiceLines();
    options?.addEventListener('change', event => {
        handleSettingsChange(event, app, lines);
    });
    initChoiceLines(app, lines);
    updateSettingsSummary(app);
    const startButton = app.querySelector<HTMLButtonElement>('.button--startGame');
    startButton?.addEventListener('click', onStartGame);
}

function handleSettingsChange(event: Event, app: HTMLDivElement, lines: ChoiceLines): void {
    if (!(event.target instanceof HTMLInputElement)) return;

    const input = event.target;
    updateChoiceLine(input, lines);

    if (input.name === 'theme') updateSelectedTheme(input.value as Theme, app);
    else if (input.name === 'player') updateSelectedPlayer(input.value as Player);
    else if (input.name === 'board-size') updateSelectedBoardSize(Number(input.value) as BoardSize);
    updateSettingsSummary(app);
}

function initChoiceLines(app: HTMLDivElement, lines: ChoiceLines): void {
    const inputs = app.querySelectorAll<HTMLInputElement>(
        '.settings-screen__options input:checked'
    );

    inputs.forEach(input => updateChoiceLine(input, lines));
}

function updateSelectedTheme(theme: Theme, app: HTMLDivElement): void {
    gameSettings.theme = theme;
    updateThemePreview(theme, app);
}

function updateThemePreview(theme: Theme, app: HTMLDivElement): void {
    const preview = app.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    if (preview) preview.src = themePreviews[theme];
}

function updateSelectedPlayer(player: Player): void {
    gameSettings.player = player;
}

function updateSelectedBoardSize(size: BoardSize): void {
    gameSettings.boardSize = size;
}

type ChoiceName = 'theme' | 'player' | 'board-size';

type ChoiceLines = Record<ChoiceName, HTMLImageElement>;

function createChoiceLines(): ChoiceLines {
    return {
        theme: createChoiceLine(),
        player: createChoiceLine(),
        'board-size': createChoiceLine()
    };
}

function createChoiceLine(): HTMLImageElement {
    const line = document.createElement('img');
    line.src = choiceLine;
    line.alt = '';
    line.className = 'settings-screen__choice-line';
    return line;
}

function updateChoiceLine(input: HTMLInputElement, lines: ChoiceLines): void {
    const line = lines[input.name as ChoiceName];

    if (line) moveChoiceLine(input, line);
}

function moveChoiceLine(input: HTMLInputElement, line: HTMLImageElement): void {
    const choice = input.closest('.settings-screen__choice');
    choice?.appendChild(line);
}

function updateSettingsSummary(app: HTMLDivElement): void {
    const theme = app.querySelector('.settings-screen__summary-theme');
    const player = app.querySelector('.settings-screen__summary-player');
    const board = app.querySelector('.settings-screen__summary-board');

    if (theme) theme.textContent = themeLabels[gameSettings.theme];
    if (player) player.textContent = gameSettings.player;
    if (board) board.textContent = `${gameSettings.boardSize} Cards`;
}