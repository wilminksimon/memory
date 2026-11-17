import { createGameCards } from '../../game-logic/game';
import { gameSettings } from '../../data/game-settings';
import { cardBacks } from '../../data/cards';

export function renderGameScreen(): string {

        const cards = createGameCards();
    const cardBack = cardBacks[gameSettings.theme];
    const boardSize = gameSettings.boardSize;

    const columns = boardSize === 16 ? 4 : 6;

    const cardsHTML = cards.map(card => `
        <button class="card" type="button"
            data-card-id="${card.id}"
            data-pair-id="${card.pairId}">

            <div class="card__inner">

                <div class="card__face">
                    <img src="${cardBack}" alt="">
                </div>

                <div class="card__face card__face--back">
                    <img src="${card.image}" alt="">
                </div>

            </div>

        </button>
    `).join('');

    return `
        <main class="game-screen" data-theme="${gameSettings.theme}">
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

                <section id="field" class="game-screen__board" style="grid-template-columns: repeat(${columns}, 1fr)">
                    ${cardsHTML}
                </section>

            </div>
        </main>
    `;
}