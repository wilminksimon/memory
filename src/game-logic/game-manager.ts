import { gameSettings } from '../data/game-settings';
import type { GameState } from '../types/game-types';
import type { Player } from '../types/player-types';

/**
 * Creates the game state with the selected starting player.
 */
export function createGameState(): GameState {
    return {
        currentPlayer: gameSettings.player,
        scores: {
            blue: 0,
            orange: 0
        }
    };
}

/**
 * Adds one point to the current player.
 */
export function addPoint(gameState: GameState): void {
    gameState.scores[gameState.currentPlayer]++;
}

/**
 * Switches to the other player.
 */
export function switchPlayer(gameState: GameState): void {
    gameState.currentPlayer =
        gameState.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/**
 * Determines the winner based on the scores.
 * Returns null if both players have the same score.
 */
export function getWinner(gameState: GameState): Player | null {
    if (gameState.scores.blue > gameState.scores.orange) return 'blue';
    if (gameState.scores.orange > gameState.scores.blue) return 'orange';
    return null;
}