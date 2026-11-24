import {
    createGameState,
    addPoint,
    switchPlayer
} from '../../game-logic/game-manager';

import { gameSettings } from '../../data/game-settings';
import type { GameState } from '../../types/game-types';

const CARDS_PER_PAIR = 2;
const MISMATCH_DELAY = 1000;
const GAME_OVER_DELAY = 1000;

/**
 * Stores the current state of the game events.
 */
interface GameEventState {
    /** Cards currently face up while a pair is being evaluated. */
    openedCards: HTMLButtonElement[];
    /** Whether input is locked while a mismatched pair is shown. */
    isChecking: boolean;
    /** Number of pairs successfully matched so far. */
    matchedPairs: number;
    /** Scores and active player for this game. */
    game: GameState;
    /** Callback invoked after all pairs have been matched. */
    onGameOver: (game: GameState) => void;
}

/**
 * Initializes the game events and event listeners.
 * @param app Root element containing the game screen.
 * @param onGameOver Callback invoked when every pair has been matched.
 * @param onExitGame Callback invoked when the player confirms exiting.
 */
export function initGameEvents(
    app: HTMLDivElement,
    onGameOver: (game: GameState) => void,
    onExitGame: () => void
): void {
    const fieldRef = app.querySelector('#field');
    if (!fieldRef) return;

    const gameState = createEventState(onGameOver);
    updateScoreboard(app, gameState.game);
    updateCurrentPlayer(app, gameState.game);

    fieldRef.addEventListener('click', event => handleCardClick(event, gameState, app));
    initExitPopup(app, onExitGame);
}

/**
 * Creates the initial state for the game events.
 * @param onGameOver Callback invoked when every pair has been matched.
 * @returns The initial event state for a new game.
 */
function createEventState(onGameOver: (game: GameState) => void): GameEventState {
    return {
        openedCards: [],
        isChecking: false,
        matchedPairs: 0,
        game: createGameState(),
        onGameOver
    };
}

/**
 * Handles clicks on memory cards.
 * @param event Click event received from the board.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function handleCardClick(event: Event, gameState: GameEventState, app: HTMLDivElement): void {
    if (gameState.isChecking) return;

    const card = getClickedCard(event);
    if (!card || card.classList.contains('is-flipped')) return;

    openCard(card, gameState, app);
}

/**
 * Returns the clicked memory card.
 * @param event Click event to inspect.
 * @returns The closest card button, or null when the click was outside a card.
 */
function getClickedCard(event: Event): HTMLButtonElement | null {
    if (!(event.target instanceof HTMLElement)) return null;

    return event.target.closest<HTMLButtonElement>('.card');
}

/**
 * Flips a card and adds it to the opened cards.
 * @param card Card button to reveal.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function openCard(card: HTMLButtonElement, gameState: GameEventState, app: HTMLDivElement): void {
    card.classList.add('is-flipped');
    gameState.openedCards.push(card);

    if (gameState.openedCards.length === CARDS_PER_PAIR) {
        checkSelectedCards(gameState, app);
    }
}

/**
 * Checks whether the two selected cards match.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function checkSelectedCards(gameState: GameEventState, app: HTMLDivElement): void {
    const [firstCard, secondCard] = gameState.openedCards;
    const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

    if (isMatch) {
        handleMatch(gameState, app);
    } else {
        handleMismatch(gameState, app);
    }
}

/**
 * Updates the score when two cards match.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function handleMatch(gameState: GameEventState, app: HTMLDivElement): void {
    addPoint(gameState.game);
    gameState.matchedPairs++;
    updateScoreboard(app, gameState.game);
    gameState.openedCards = [];

    if (gameState.matchedPairs === gameSettings.boardSize / CARDS_PER_PAIR) {
        setTimeout(() => gameState.onGameOver(gameState.game), GAME_OVER_DELAY);
    }
}

/**
 * Locks the game temporarily when two cards do not match.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function handleMismatch(gameState: GameEventState, app: HTMLDivElement): void {
    gameState.isChecking = true;
    setTimeout(() => resetSelectedCards(gameState, app), MISMATCH_DELAY);
}

/**
 * Closes the selected cards and switches the current player.
 * @param gameState Current card interaction and score state.
 * @param app Root element containing the game screen.
 */
function resetSelectedCards(gameState: GameEventState, app: HTMLDivElement): void {
    closeOpenedCards(gameState);
    gameState.openedCards = [];
    switchPlayer(gameState.game);
    updateCurrentPlayer(app, gameState.game);
    gameState.isChecking = false;
}

/**
 * Turns all currently opened cards face down.
 * @param gameState Current card interaction and score state.
 */
function closeOpenedCards(gameState: GameEventState): void {
    gameState.openedCards.forEach(card => card.classList.remove('is-flipped'));
}

/**
 * Updates the displayed scores of both players.
 * @param app Root element containing the game screen.
 * @param game Current score state to display.
 */
function updateScoreboard(app: HTMLDivElement, game: GameState): void {
    const blueScore = app.querySelector('.game-screen__score-blue');
    const orangeScore = app.querySelector('.game-screen__score-orange');

    if (blueScore) blueScore.textContent = String(game.scores.blue);
    if (orangeScore) orangeScore.textContent = String(game.scores.orange);
}

/**
 * Updates the indicator of the current player.
 * @param app Root element containing the game screen.
 * @param game Game state containing the active player.
 */
function updateCurrentPlayer(app: HTMLDivElement, game: GameState): void {
    const indicator = app.querySelector<HTMLElement>('.game-screen__player-indicator');

    if (indicator) indicator.dataset.player = game.currentPlayer;
}

/**
 * Initializes the exit game confirmation dialog.
 * @param app Root element containing the game screen.
 * @param onExitGame Callback invoked when exit is confirmed.
 */
function initExitPopup(app: HTMLDivElement, onExitGame: () => void): void {
    const popup = app.querySelector<HTMLDialogElement>('.game-screen__popup');
    const exitButton = app.querySelector<HTMLButtonElement>('.button--exit');
    const backButton = app.querySelector<HTMLButtonElement>('.button--popup-back');
    const confirmButton = app.querySelector<HTMLButtonElement>('.button--popup-exit');

    if (!popup || !exitButton || !backButton || !confirmButton) return;

    exitButton.onclick = () => popup.showModal();
    backButton.onclick = () => popup.close();
    confirmButton.onclick = onExitGame;
}
