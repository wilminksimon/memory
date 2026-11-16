export function renderGameScreen(): string {
    return `
        <main class="game-screen">
            <div class="game-screen__container">

                <header class="game-screen__header">

                    <div class="game-screen__scoreboard">
                        <div class="game-screen__score game-screen__score--blue">
                            <span>Blue</span>
                            <span class="game-screen__score-blue">0</span>
                        </div>

                        <div class="game-screen__score game-screen__score--orange">
                            <span>Orange</span>
                            <span class="game-screen__score-orange">0</span>
                        </div>
                    </div>

                    <div class="game-screen__current-player">
                        <span>Current player:</span>
                        <span class="game-screen__player-indicator"></span>
                    </div>

                    <button class="button button--exit" type="button">
                        Exit game
                    </button>

                </header>

                <section id="field" class="game-screen__board">
                    <!-- Memory Cards -->
                </section>

            </div>
        </main>
    `;
}