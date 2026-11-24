import { gameSettings } from '../data/game-settings';
import type { GameState } from '../types/game-types';
import type { Player } from '../types/player-types';

/**
 * Creates the game state with the selected starting player.
 * @returns A new game state with both scores set to zero.
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
 * @param gameState Game state whose active player's score is incremented.
 */
export function addPoint(gameState: GameState): void {
    gameState.scores[gameState.currentPlayer]++;
}

/**
 * Switches to the other player.
 * @param gameState Game state whose active player is changed.
 */
export function switchPlayer(gameState: GameState): void {
    gameState.currentPlayer =
        gameState.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/**
 * Determines the winner based on the scores.
 * @param gameState Completed game state whose scores are compared.
 * @returns The player with the higher score, or null when scores are tied.
 */
export function getWinner(gameState: GameState): Player | null {
    if (gameState.scores.blue > gameState.scores.orange) return 'blue';
    if (gameState.scores.orange > gameState.scores.blue) return 'orange';
    return null;
}
