import { themePreviews } from '../../data/themes';
import paletteIcon from '../../assets/logos/palette.png';
import playerIcon from '../../assets/logos/chess_pawn.png';
import sizeIcon from '../../assets/logos/style.png';
import headerLine from '../../assets/logos/Line 3.png';
import space from '../../assets/logos/space.png';
import startButton from '../../assets/logos/smart_display.png';

/**
 * Renders the settings screen with all available options.
 * @returns HTML markup for the settings screen.
 */
export function renderSettingsScreen(): string {
    return `
        <main class="settings-screen">

            <div class="settings-screen__container">

                <header class="settings-screen__header">
                    <h1 class="header-settings text-54">Settings</h1>
                    <img src="${headerLine}" alt="Line">
                </header>

                <div class="settings-screen__content">

                    <section class="settings-screen__options">
                        <section class="settings-screen__group">
                            <header class="settings-screen__group-header">
                                <h2>
                                    <img src="${paletteIcon}" alt="Themes">Game themes
                                </h2>
                            </header>
                            <div class="settings-screen__choices">
                                <label class="settings-screen__choice">
                                    <input type="radio" name="theme" value="code-vibes">
                                    <span>Code vibes theme</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="theme" value="games">
                                    <span>Gaming theme</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="theme" value="da-projects">
                                    <span>DA Projects theme</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="theme" value="food">
                                    <span>Foods theme</span>
                                </label>
                            </div>
                        </section>

                        <section class="settings-screen__group">
                            <header class="settings-screen__group-header">
                                <h2><img src="${playerIcon}" alt="Player">Choose player</h2>
                            </header>
                            <div class="settings-screen__choices">
                                <label class="settings-screen__choice">
                                    <input type="radio" name="player" value="blue">
                                    <span>Blue</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="player" value="orange">
                                    <span>Orange</span>
                                </label>
                            </div>
                        </section>

                        <section class="settings-screen__group">
                            <header class="settings-screen__group-header">
                                <h2><img src="${sizeIcon}" alt="Size">Board size</h2>
                            </header>
                            <div class="settings-screen__choices">
                                <label class="settings-screen__choice">
                                    <input type="radio" name="board-size" value="16">
                                    <span>16 Cards</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="board-size" value="24">
                                    <span>24 Cards</span>
                                </label>

                                <label class="settings-screen__choice">
                                    <input type="radio" name="board-size" value="36">
                                    <span>36 Cards</span>
                                </label>
                            </div>
                        </section>
                    </section>

                    <div class="settings-screen__preview-area">
                        <aside class="settings-screen__preview">
                            <img class="settings-screen__preview-image" src="${themePreviews['code-vibes']}"
                                alt="Code Vibes Theme Preview">
                        </aside>

                        <footer class="settings-screen__footer">
                            <div class="settings-screen__summary">
                                <p class="settings-screen__summary-theme">Game Theme</p>
                                <img src="${space}" alt="Space">
                                <p class="settings-screen__summary-player">Player</p>
                                <img src="${space}" alt="Space">
                                <p class="settings-screen__summary-board">Board Size</p>
                            </div>

                            <button class="button button--startGame" type="button">
                                <img src="${startButton}" class="button__play" alt="Space">Start
                            </button>
                        </footer>

                    </div>
                </div>
            </div>
        </main>
    `;
}
