
import {
    createGameState,
    addPoint,
    switchPlayer
} from '../../game-logic/game-manager';

import { gameSettings } from '../../data/game-settings';
import type { GameState } from '../../types/game-types';

interface GameEventState {
    openedCards: HTMLButtonElement[];
    isChecking: boolean;
    matchedPairs: number;
    game: GameState;
    onGameOver: (game: GameState) => void;
}

export function initGameEvents(
    app: HTMLDivElement,
    onGameOver: (game: GameState) => void
): void {
    const fieldRef = app.querySelector('#field');
    if (!fieldRef) return;

    const gameState = createEventState(onGameOver);
    updateScoreboard(app, gameState.game);
    updateCurrentPlayer(app, gameState.game);

    fieldRef.addEventListener('click', event => handleCardClick(event, gameState, app));
}

function createEventState(onGameOver: (game: GameState) => void): GameEventState {
    return {
        openedCards: [],
        isChecking: false,
        matchedPairs: 0,
        game: createGameState(),
        onGameOver
    };
}

function handleCardClick(event: Event, gameState: GameEventState, app: HTMLDivElement): void {
    if (gameState.isChecking) return;

    const card = getClickedCard(event);
    if (!card || card.classList.contains('is-flipped')) return;

    openCard(card, gameState, app);
}

function getClickedCard(event: Event): HTMLButtonElement | null {
    if (!(event.target instanceof HTMLElement)) return null;

    return event.target.closest<HTMLButtonElement>('.card');
}

function openCard(card: HTMLButtonElement, gameState: GameEventState, app: HTMLDivElement): void {
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
        handleMatch(gameState, app);
    } else {
        handleMismatch(gameState, app);
    }
}

function handleMatch(gameState: GameEventState, app: HTMLDivElement): void {
    addPoint(gameState.game);
    gameState.matchedPairs++;
    updateScoreboard(app, gameState.game);
    gameState.openedCards = [];

    if (gameState.matchedPairs === gameSettings.boardSize / 2) {
        gameState.onGameOver(gameState.game);
    }
}

function handleMismatch(gameState: GameEventState, app: HTMLDivElement): void {
    gameState.isChecking = true;
    setTimeout(() => resetSelectedCards(gameState, app), 1000);
}

function resetSelectedCards(gameState: GameEventState, app: HTMLDivElement): void {
    closeOpenedCards(gameState);
    gameState.openedCards = [];
    switchPlayer(gameState.game);
    updateCurrentPlayer(app, gameState.game);
    gameState.isChecking = false;
}

function closeOpenedCards(gameState: GameEventState): void {
    gameState.openedCards.forEach(card => card.classList.remove('is-flipped'));
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
