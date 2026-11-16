import { themePreviews } from '../../data/themes';
import paletteIcon from '../../assets/logos/palette.png';
import playerIcon from '../../assets/logos/chess_pawn.png';
import sizeIcon from '../../assets/logos/style.png';
import headerLine from '../../assets/logos/Line 3.png';
import space from '../../assets/logos/space.png';
import startButton from '../../assets/logos/smart_display.png';


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
                <div class="settings-screen__group">

                    <h2><img src="${paletteIcon}" alt="Themes">Game themes</h2>
                    <div class="settings-screen__choices">
                        <label class="settings-screen__choice">
                            <input type="radio" name="theme" value="code-vibes" checked>
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
                </div>

                <div class="settings-screen__group">
                    <h2><img src="${playerIcon}" alt="Player">Choose player</h2>
                    <div class="settings-screen__choices">
                        <label class="settings-screen__choice">
                            <input type="radio" name="player" value="blue" checked>
                            <span>Blue</span>
                        </label>

                        <label class="settings-screen__choice">
                            <input type="radio" name="player" value="orange">
                            <span>Orange</span>
                        </label>
                    </div>
                </div>

                <div class="settings-screen__group">
                    <h2><img src="${sizeIcon}" alt="Size">Board size</h2>

                    <div class="settings-screen__choices">
                        <label class="settings-screen__choice">
                            <input type="radio" name="board-size" value="16" checked>
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
                </div>
            </section>

            <div class="settings-screen__preview-area">
                <aside class="settings-screen__preview">
                    <img class="settings-screen__preview-image" src="${themePreviews['code-vibes']}" alt="Code Vibes Theme Preview">
                </aside>

                <footer class="settings-screen__footer">
                    <div class="settings-screen__summary">
                        <p class="settings-screen__summary-theme">Code Vibes</p>
                        <img src="${space}" alt="Space">
                        <p class="settings-screen__summary-player">Blue</p>
                        <img src="${space}" alt="Space">
                        <p class="settings-screen__summary-board">16 Cards</p>
                    </div>

                    <button class="button button--startGame" type="button">
                        <img src="${startButton}" alt="Space">Start
                    </button>
                </footer>

            </div>
        </div>
    </div>
</main>
    `;
}