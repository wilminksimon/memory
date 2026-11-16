import codeVibesPreview from '../assets/theme-previews/code-vibes.svg'
import { themePreviews } from '../../data/themes';

export function renderSettingsScreen(): string {
    return `
<main class="settings-screen">

    <div class="settings-screen__container">

        <header class="settings-screen__header">
            <h1 class="header-settings text-54">Settings</h1>
            <img src="src/assets/logos/Line 3.png" alt="Line">
        </header>

        <div class="settings-screen__content">

            <section class="settings-screen__options">
                <div class="settings-screen__group">

                    <h2><img src="src/assets/logos/palette.png" alt="Themes">Game themes</h2>
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
                    <h2><img src="src/assets/logos/chess_pawn.png" alt="Player">Choose player</h2>
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
                    <h2><img src="src/assets/logos/style.png" alt="Size">Board size</h2>

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
            <div class="setting-screen__preview__footer>
                <aside class="settings-screen__preview">
                    <img class="settings-screen__preview-image" src="${themePreviews['code-vibes']}" alt="Code Vibes Theme Preview">
                </aside>
                <footer class="settings-screen__footer">
                    <!-- summary and start button -->
                </footer>
            </div>
        </div>
    </div>
</main>
    `;
}