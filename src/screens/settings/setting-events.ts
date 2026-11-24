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

type ChoiceName = 'theme' | 'player' | 'board-size';
type ChoiceLines = Record<ChoiceName, HTMLImageElement>;

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
    initSettingHover(app, lines);
    updateSettingsSummary(app);

    const startButton = app.querySelector<HTMLButtonElement>('.button--startGame');
    startButton?.addEventListener('click', onStartGame);
}

/**
 * Handles changes to the selected game settings.
 */
function handleSettingsChange(event: Event, app: HTMLDivElement, lines: ChoiceLines): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (isSettingSelected(event.target)) return;

    selectSetting(event.target, app, lines);
}

/**
 * Checks whether a setting is already saved.
 */
function isSettingSelected(input: HTMLInputElement): boolean {
    if (input.name === 'theme') return gameSettings.theme === input.value;
    if (input.name === 'player') return gameSettings.player === input.value;
    return gameSettings.boardSize === Number(input.value);
}

/**
 * Initializes the decorative lines for selected options.
 */
function initChoiceLines(app: HTMLDivElement, lines: ChoiceLines): void {
    const inputs = app.querySelectorAll<HTMLInputElement>(
        '.settings-screen__options input:checked'
    );

    inputs.forEach(input => updateChoiceLine(input, lines));
}

/**
 * Initializes hover previews for all setting options.
 */
function initSettingHover(app: HTMLDivElement, lines: ChoiceLines): void {
    const choices = app.querySelectorAll<HTMLLabelElement>('.settings-screen__choice');

    choices.forEach(choice => {
        const input = choice.querySelector<HTMLInputElement>('input[type="radio"]');
        if (!input) return;

        choice.addEventListener('mouseenter', () => previewSetting(input, app, lines));
        choice.addEventListener('mouseleave', () => restoreSelectedSetting(input.name as ChoiceName, app, lines));
        input.addEventListener('click', () => selectSetting(input, app, lines));
    });
}

/**
 * Temporarily previews the hovered setting option.
 */
function previewSetting(input: HTMLInputElement, app: HTMLDivElement, lines: ChoiceLines): void {
    input.checked = true;
    updateChoiceLine(input, lines);

    if (input.name === 'theme') {
        updateThemePreview(input.value as Theme, app);
    }
}

/**
 * Restores the actually selected option after hovering.
 */
function restoreSelectedSetting(
    name: ChoiceName,
    app: HTMLDivElement,
    lines: ChoiceLines
): void {
    const value = getSettingValue(name);
    const input = app.querySelector<HTMLInputElement>(
        `input[name="${name}"][value="${value}"]`
    );

    if (!input) return;

    input.checked = true;
    updateChoiceLine(input, lines);

    if (name === 'theme') updateThemePreview(gameSettings.theme, app);
}

/**
 * Returns the saved value of a setting.
 */
function getSettingValue(name: ChoiceName): string {
    if (name === 'theme') return gameSettings.theme;
    if (name === 'player') return gameSettings.player;
    return String(gameSettings.boardSize);
}

/**
 * Saves the clicked setting and updates the summary.
 */
function selectSetting(input: HTMLInputElement, app: HTMLDivElement, lines: ChoiceLines): void {
    if (input.name === 'theme') updateSelectedTheme(input.value as Theme, app);
    else if (input.name === 'player') updateSelectedPlayer(input.value as Player);
    else updateSelectedBoardSize(Number(input.value) as BoardSize);

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