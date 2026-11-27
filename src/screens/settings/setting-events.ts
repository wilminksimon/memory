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

type ChoiceName = 'theme' | 'player' | 'board-size';
/** Associates each setting category with its decorative selection line. */
type ChoiceLines = Record<ChoiceName, HTMLImageElement>;

/** Tracks whether the player explicitly selected each settings category. */
interface SelectedOptions {
    theme: boolean;
    player: boolean;
    'board-size': boolean;
}

/**
 * Initializes the settings event listeners.
 * @param app Root element containing the settings screen.
 * @param onStartGame Callback invoked when the player starts a game.
 */
export function initSettingsEvents(
    app: HTMLDivElement,
    onStartGame: () => void
): void {
    const options = app.querySelector('.settings-screen__options');
    const lines = createChoiceLines();
    const selected = createSelectedOptions();

    options?.addEventListener('change', event => {
        handleSettingsChange(event, app, lines, selected);
    });

    initSettingHover(app, lines, selected);
    restoreDefaultThemePreview(app, lines);
    updateSettingsSummary(app, selected);
    updateStartButton(app, selected);

    const startButton = app.querySelector<HTMLButtonElement>('.button--startGame');
    startButton?.addEventListener('click', onStartGame);
}

/**
 * Creates the initial selection state.
 * @returns Selection flags initialized to false.
 */
function createSelectedOptions(): SelectedOptions {
    return {
        theme: false,
        player: false,
        'board-size': false
    };
}

/**
 * Handles changes to the selected settings.
 * @param event Change event emitted by a settings input.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 * @param selected Flags indicating which settings have been chosen.
 */
function handleSettingsChange(
    event: Event,
    app: HTMLDivElement,
    lines: ChoiceLines,
    selected: SelectedOptions
): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    selectSetting(event.target, app, lines, selected);
}

/**
 * Initializes hover previews for all setting options.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 * @param selected Flags indicating which settings have been chosen.
 */
function initSettingHover(
    app: HTMLDivElement,
    lines: ChoiceLines,
    selected: SelectedOptions
): void {
    const choices = app.querySelectorAll<HTMLLabelElement>('.settings-screen__choice');

    choices.forEach(choice => {
        const input = choice.querySelector<HTMLInputElement>('input[type="radio"]');
        if (!input) return;

        choice.addEventListener('mouseenter', () => previewSetting(input, app, lines));
        choice.addEventListener('mouseleave', () => restoreSelectedSetting(input.name as ChoiceName, app, lines, selected));
        input.addEventListener('click', () => selectSetting(input, app, lines, selected));
    });
}

/**
 * Temporarily previews the hovered setting.
 * @param input Radio input whose option is being previewed.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 */
function previewSetting(
    input: HTMLInputElement,
    app: HTMLDivElement,
    lines: ChoiceLines
): void {
    input.checked = true;
    updateChoiceLine(input, lines);

    if (input.name === 'theme') {
        updateThemePreview(input.value as Theme, app);
    }
}

/**
 * Restores the selected option after hovering.
 * @param name Setting category whose preview should be restored.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 * @param selected Flags indicating which settings have been chosen.
 */
function restoreSelectedSetting(
    name: ChoiceName,
    app: HTMLDivElement,
    lines: ChoiceLines,
    selected: SelectedOptions
): void {
    if (!selected[name]) {
        if (name === 'theme') restoreDefaultThemePreview(app, lines);
        else clearSettingPreview(name, app, lines);
        return;
    }

    const input = getSelectedInput(name, app);
    if (!input) return;

    input.checked = true;
    updateChoiceLine(input, lines);

    if (name === 'theme') updateThemePreview(gameSettings.theme, app);
}

/**
 * Restores the default Code Vibes preview.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 */
function restoreDefaultThemePreview(app: HTMLDivElement, lines: ChoiceLines): void {
    const input = app.querySelector<HTMLInputElement>(
        'input[name="theme"][value="code-vibes"]'
    );

    if (input) previewSetting(input, app, lines);
}

/**
 * Clears a setting preview if no option was selected.
 * @param name Setting category to clear.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 */
function clearSettingPreview(name: ChoiceName, app: HTMLDivElement, lines: ChoiceLines): void {
    const inputs = app.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`);
    inputs.forEach(input => input.checked = false);
    lines[name].remove();
}

/**
 * Returns the input of the selected setting.
 * @param name Setting category whose input should be found.
 * @param app Root element containing the settings screen.
 * @returns The selected radio input, or null if none is found.
 */
function getSelectedInput(name: ChoiceName, app: HTMLDivElement): HTMLInputElement | null {
    const value = getSettingValue(name);
    return app.querySelector<HTMLInputElement>(
        `input[name="${name}"][value="${value}"]`
    );
}

/**
 * Returns the saved value of a setting.
 * @param name Setting category to read from the shared settings object.
 * @returns The selected setting value as a string.
 */
function getSettingValue(name: ChoiceName): string {
    if (name === 'theme') return gameSettings.theme;
    if (name === 'player') return gameSettings.player;
    return String(gameSettings.boardSize);
}

/**
 * Saves the clicked setting and updates the summary.
 * @param input Radio input selected by the player.
 * @param app Root element containing the settings screen.
 * @param lines Decorative selection lines keyed by setting category.
 * @param selected Flags indicating which settings have been chosen.
 */
function selectSetting(
    input: HTMLInputElement,
    app: HTMLDivElement,
    lines: ChoiceLines,
    selected: SelectedOptions
): void {
    const name = input.name as ChoiceName;

    if (name === 'theme') updateSelectedTheme(input.value as Theme, app);
    else if (name === 'player') updateSelectedPlayer(input.value as Player);
    else updateSelectedBoardSize(Number(input.value) as BoardSize);

    selected[name] = true;
    updateChoiceLine(input, lines);
    updateSettingsSummary(app, selected);
    updateStartButton(app, selected);
}

/**
 * Updates the selected theme.
 * @param theme Theme chosen by the player.
 * @param app Root element containing the settings screen.
 */
function updateSelectedTheme(theme: Theme, app: HTMLDivElement): void {
    gameSettings.theme = theme;
    updateThemePreview(theme, app);
}

/**
 * Updates the preview image of the selected theme.
 * @param theme Theme whose preview image should be displayed.
 * @param app Root element containing the settings screen.
 */
function updateThemePreview(theme: Theme, app: HTMLDivElement): void {
    const preview = app.querySelector<HTMLImageElement>(
        '.settings-screen__preview-image'
    );

    if (!preview) return;

    preview.src = themePreviews[theme];
    preview.alt = `${themeLabels[theme]} Theme Preview`;
}

/**
 * Updates the selected player.
 * @param player Player chosen to take the first turn.
 */
function updateSelectedPlayer(player: Player): void {
    gameSettings.player = player;
}

/**
 * Updates the selected board size.
 * @param size Number of cards to use on the game board.
 */
function updateSelectedBoardSize(size: BoardSize): void {
    gameSettings.boardSize = size;
}

/**
 * Creates the decorative lines for all setting categories.
 * @returns A line image for each settings category.
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
 * @returns A new decorative image element.
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
 * @param input Radio input whose choice should be marked.
 * @param lines Decorative selection lines keyed by setting category.
 */
function updateChoiceLine(input: HTMLInputElement, lines: ChoiceLines): void {
    const line = lines[input.name as ChoiceName];
    if (line) moveChoiceLine(input, line);
}

/**
 * Moves a choice line to the selected option.
 * @param input Radio input whose choice should be marked.
 * @param line Decorative image element to move.
 */
function moveChoiceLine(input: HTMLInputElement, line: HTMLImageElement): void {
    const choice = input.closest('.settings-screen__choice');
    choice?.appendChild(line);
}

/**
 * Updates the summary of the selected game settings.
 * @param app Root element containing the settings screen.
 * @param selected Flags indicating which settings have been chosen.
 */
function updateSettingsSummary(app: HTMLDivElement, selected: SelectedOptions): void {
    const theme = app.querySelector('.settings-screen__summary-theme');
    const player = app.querySelector('.settings-screen__summary-player');
    const board = app.querySelector('.settings-screen__summary-board');

    if (theme) theme.textContent = selected.theme ? themeLabels[gameSettings.theme] : 'Game Theme';
    if (player) player.textContent = selected.player ? gameSettings.player : 'Player';
    if (board) board.textContent = selected['board-size'] ? `${gameSettings.boardSize} Cards` : 'Board Size';
}

/**
 * Enables the start button when all settings are selected.
 * @param app Root element containing the settings screen.
 * @param selected Flags indicating which settings have been chosen.
 */
function updateStartButton(app: HTMLDivElement, selected: SelectedOptions): void {
    const button = app.querySelector<HTMLButtonElement>('.button--startGame');
    if (!button) return;

    button.disabled = !selected.theme || !selected.player || !selected['board-size'];
}
