import { gameSettings } from '../../data/game-settings';
import { themePreviews } from '../../data/themes';
import choiceLine from '../../assets/logos/choice-line.png';

import type { Theme } from '../../types/theme-types';
import type { Player } from '../../types/player-types';
import type { BoardSize } from '../../types/game-types';

const THEME_LABELS: Record<Theme, string> = {
    'code-vibes': 'Code Vibes',
    games: 'Games',
    'da-projects': 'DA Projects',
    food: 'Food'
};

/**
 * Initializes the settings event listeners.
 */
export function initSettingsEvents(
    app: HTMLDivElement,
    onStartGame: () => void
): void {
    const options = app.querySelector('.settings-screen__options');
    const lines = createChoiceLines();

    options?.addEventListener('change', event => {
        handleSettingsChange(event, app, lines);
    });

    initChoiceLines(app, lines);
    initThemePreviewHover(app, lines);
    updateSettingsSummary(app);

    const startButton = app.querySelector<HTMLButtonElement>('.button--startGame');
    startButton?.addEventListener('click', onStartGame);
}

/**
 * Handles changes to the selected game settings.
 */
function handleSettingsChange(event: Event, app: HTMLDivElement, lines: ChoiceLines): void {
    if (!(event.target instanceof HTMLInputElement)) return;

    const input = event.target;
    updateChoiceLine(input, lines);

    if (input.name === 'theme') updateSelectedTheme(input.value as Theme, app);
    else if (input.name === 'player') updateSelectedPlayer(input.value as Player);
    else if (input.name === 'board-size') updateSelectedBoardSize(Number(input.value) as BoardSize);

    updateSettingsSummary(app);
}

/**
 * Initializes the decorative lines for the selected options.
 */
function initChoiceLines(app: HTMLDivElement, lines: ChoiceLines): void {
    const inputs = app.querySelectorAll<HTMLInputElement>(
        '.settings-screen__options input:checked'
    );

    inputs.forEach(input => updateChoiceLine(input, lines));
}

/**
 * Initializes hover previews for theme options.
 */
function initThemePreviewHover(app: HTMLDivElement, lines: ChoiceLines): void {
    const choices = app.querySelectorAll<HTMLLabelElement>('.settings-screen__choice');

    choices.forEach(choice => {
        const input = choice.querySelector<HTMLInputElement>('input[name="theme"]');
        if (!input) return;

        choice.addEventListener('mouseenter', () => previewTheme(input, app, lines));
        choice.addEventListener('mouseleave', () => restoreSelectedTheme(app, lines));
        input.addEventListener('click', () => selectTheme(input, app, lines));
    });
}

/**
 * Temporarily selects and previews the hovered theme.
 */
function previewTheme(input: HTMLInputElement, app: HTMLDivElement, lines: ChoiceLines): void {
    input.checked = true;
    updateChoiceLine(input, lines);
    updateThemePreview(input.value as Theme, app);
}

/**
 * Restores the actually selected theme after hovering.
 */
function restoreSelectedTheme(app: HTMLDivElement, lines: ChoiceLines): void {
    const input = app.querySelector<HTMLInputElement>(
        `input[name="theme"][value="${gameSettings.theme}"]`
    );
    if (!input) return;

    input.checked = true;
    updateChoiceLine(input, lines);
    updateThemePreview(gameSettings.theme, app);
}

/**
 * Saves the clicked theme and updates the settings summary.
 */
function selectTheme(input: HTMLInputElement, app: HTMLDivElement, lines: ChoiceLines): void {
    updateSelectedTheme(input.value as Theme, app);
    updateChoiceLine(input, lines);
    updateSettingsSummary(app);
}

/**
 * Updates the selected theme.
 */
function updateSelectedTheme(theme: Theme, app: HTMLDivElement): void {
    gameSettings.theme = theme;
    updateThemePreview(theme, app);
}

/**
 * Updates the preview image of the selected theme.
 */
function updateThemePreview(theme: Theme, app: HTMLDivElement): void {
    const preview = app.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    if (!preview) return;

    preview.src = themePreviews[theme];
    preview.alt = `${THEME_LABELS[theme]} Theme Preview`;
}

/**
 * Updates the selected player.
 */
function updateSelectedPlayer(player: Player): void {
    gameSettings.player = player;
}

/**
 * Updates the selected board size.
 */
function updateSelectedBoardSize(size: BoardSize): void {
    gameSettings.boardSize = size;
}

/**
 * Creates the decorative lines for all setting categories.
 */
function createChoiceLines(): ChoiceLines {
    return {
        theme: createChoiceLine(),
        player: createChoiceLine(),
        'board-size': createChoiceLine()
    };
}

/**
 * Creates one decorative choice line.
 */
function createChoiceLine(): HTMLImageElement {
    const line = document.createElement('img');
    line.src = choiceLine;
    line.alt = '';
    line.className = 'settings-screen__choice-line';
    return line;
}

/**
 * Updates the position of a choice line.
 */
function updateChoiceLine(input: HTMLInputElement, lines: ChoiceLines): void {
    const line = lines[input.name as ChoiceName];

    if (line) moveChoiceLine(input, line);
}

/**
 * Moves a choice line to the selected option.
 */
function moveChoiceLine(input: HTMLInputElement, line: HTMLImageElement): void {
    const choice = input.closest('.settings-screen__choice');
    choice?.appendChild(line);
}

/**
 * Updates the summary of the selected game settings.
 */
function updateSettingsSummary(app: HTMLDivElement): void {
    const theme = app.querySelector('.settings-screen__summary-theme');
    const player = app.querySelector('.settings-screen__summary-player');
    const board = app.querySelector('.settings-screen__summary-board');

    if (theme) theme.textContent = THEME_LABELS[gameSettings.theme];
    if (player) player.textContent = gameSettings.player;
    if (board) board.textContent = `${gameSettings.boardSize} Cards`;
}

type ChoiceName = 'theme' | 'player' | 'board-size';

type ChoiceLines = Record<ChoiceName, HTMLImageElement>;