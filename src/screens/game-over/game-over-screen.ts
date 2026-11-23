import { gameSettings } from '../../data/game-settings';
import { getWinner } from '../../game-logic/game-manager';
import type { GameState } from '../../types/game-types';
import type { Theme } from '../../types/theme-types';
import type { Player } from '../../types/player-types';

import confetti from '../../assets/game-over/Confetti.svg';
import playerBlue from '../../assets/game-over/player-blue.svg';
import playerOrange from '../../assets/game-over/player-orange.svg';
import trophy from '../../assets/game-over/pokal.svg';
import scale from '../../assets/game-over/scale-icon.svg';

/**
 * Returns the result illustration for the selected theme and winner.
 */
function getResultImage(theme: Theme, winner: Player | null): string {
    if (!winner) return scale;
    if (theme === 'games') return trophy;
    return winner === 'blue' ? playerBlue : playerOrange;
}

/**
 * Renders the final score screen.
 */
export function renderScoreScreen(game: GameState): string {
    return `
        <main class="game-over-screen game-over-screen--score"
            data-theme="${gameSettings.theme}">

            <section class="game-over-screen__content">
                <h1 class="game-over-screen__title">GAME OVER</h1>
                <p class="game-over-screen__final-score-label">Final score</p>

                <div class="game-over-screen__scoreboard">
                    <div class="game-over-screen__score game-over-screen__score--blue">
                        <img src="${playerBlue}" alt="">
                        <span>${game.scores.blue}</span>
                    </div>

                    <div class="game-over-screen__score game-over-screen__score--orange">
                        <img src="${playerOrange}" alt="">
                        <span>${game.scores.orange}</span>
                    </div>
                </div>
            </section>
        </main>
    `;
}

/**
 * Renders the winner or draw screen.
 */
export function renderWinnerScreen(game: GameState): string {
    const winner = getWinner(game);
    const winnerName = winner
        ? `${winner === 'blue' ? 'Blue' : 'Orange'} Player`
        : 'DRAW';

    const resultText = winner ? 'The winner is' : "It's a";
    const resultImage = getResultImage(gameSettings.theme, winner);

    const confettiHTML = gameSettings.theme === 'code-vibes'
        ? `<img class="game-over-screen__confetti" src="${confetti}" alt="">`
        : '';

    return `
        <main class="game-over-screen game-over-screen--winner"
            data-theme="${gameSettings.theme}"
            data-winner="${winner ?? 'draw'}">

            ${confettiHTML}

            <section class="game-over-screen__content">
                <p class="game-over-screen__subtitle">${resultText}</p>
                <h1 class="game-over-screen__result">${winnerName}</h1>

                <img
                    class="game-over-screen__illustration"
                    src="${resultImage}"
                    alt="${winnerName}"
                >

                <button class="button button--exit button--game-over">
                    Back to start
                </button>
            </section>
        </main>
    `;
}
