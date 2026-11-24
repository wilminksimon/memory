import { createGameCards } from '../../game-logic/game';
import { gameSettings } from '../../data/game-settings';
import { cardBacks } from '../../data/cards';

/**
 * Renders the memory game screen with the selected settings.
 */
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
        <section class="game-screen" data-theme="${gameSettings.theme}">
            <div class="game-screen__container">

                <header class="game-screen__header">

                    <div class="game-screen__scoreboard">
                        <div class="game-screen__score game-screen__score--blue">
                            <span>Blue: </span>
                            <span class="game-screen__score-blue">0</span>
                        </div>

                        <div class="game-screen__score game-screen__score--orange">
                            <span>Orange: </span>
                            <span class="game-screen__score-orange">0</span>
                        </div>
                    </div>

                    <div class="game-screen__current-player">
                        <span>Current player:</span>
                        <span class="game-screen__player-indicator"></span>
                    </div>

                    <button class="button button--exit" type="button">
                        <span class="button__exit-icon"></span>
                        Exit game
                    </button>

                </header>

                <section id="field" class="game-screen__board" data-board-size="${gameSettings.boardSize}" style="grid-template-columns: repeat(${columns}, 1fr)">
                    ${cardsHTML}
                </section>

            </div>

            <dialog class="game-screen__popup">
                <div class="game-screen__popup-content">
                    <h2>Are you sure you want to quit the game?</h2>

                    <div class="game-screen__popup-buttons">
                        <button class="button button--popup-back" type="button">
                            Back to game
                        </button>

                        <button class="button button--popup-exit" type="button">
                            Exit game
                        </button>
                    </div>
                </div>
            </dialog>
        </section>
    `;
}