import {
    createGameState,
    addPoint,
    switchPlayer
} from '../../game-logic/game-manager';

import type { GameState } from '../../types/game-types';

interface GameEventState {
    openedCards: HTMLButtonElement[];
    isChecking: boolean;
    matchedPairs: number;
    game: GameState;
}

export function initGameEvents(app: HTMLDivElement): void {
    const fieldRef = app.querySelector('#field');

    const gameState: GameEventState = {
        openedCards: [],
        isChecking: false,
        matchedPairs: 0,
        game: createGameState()
    };
    updateScoreboard(app, gameState.game);
    updateCurrentPlayer(app, gameState.game);
    if (fieldRef) {
        fieldRef.addEventListener('click', e => handleCardClick(e, gameState, app));
    }
}

function handleCardClick(event: Event, gameState: GameEventState, app: HTMLDivElement): void {
    if (gameState.isChecking) return;
    if (!(event.target instanceof HTMLElement)) return;

    const card = event.target.closest<HTMLButtonElement>('.card');

    if (!card || card.classList.contains('is-flipped')) return;

    card.classList.add('is-flipped');
    gameState.openedCards.push(card);

    if (gameState.openedCards.length === 2) {
        checkSelectedCards(gameState, app);
    }
}

function checkSelectedCards(gameState: GameEventState, app: HTMLDivElement): void {
    const [firstCard, secondCard] = gameState.openedCards;
    const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

    if (isMatch) {
        addPoint(gameState.game);
        gameState.matchedPairs++;
        updateScoreboard(app, gameState.game);
        gameState.openedCards = [];
        return;
    }

    gameState.isChecking = true;
    setTimeout(() => resetSelectedCards(gameState, app), 1000);
}

function resetSelectedCards(gameState: GameEventState, app: HTMLDivElement): void {
    gameState.openedCards.forEach(card => {
        card.classList.remove('is-flipped');
    });

    gameState.openedCards = [];
    switchPlayer(gameState.game);
    updateCurrentPlayer(app, gameState.game);
    gameState.isChecking = false;
}

function updateScoreboard(app: HTMLDivElement, game: GameState): void {
    const blueScore = app.querySelector('.game-screen__score-blue');
    const orangeScore = app.querySelector('.game-screen__score-orange');

    if (blueScore) blueScore.textContent = String(game.scores.blue);
    if (orangeScore) orangeScore.textContent = String(game.scores.orange);
}

function updateCurrentPlayer(app: HTMLDivElement, game: GameState): void {
    const indicator = app.querySelector<HTMLElement>('.game-screen__player-indicator');

    if (indicator) indicator.dataset.player = game.currentPlayer;
}