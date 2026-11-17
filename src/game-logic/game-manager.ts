import { gameSettings } from '../data/game-settings';
import type { GameState } from '../types/game-types';

export function createGameState(): GameState {
    return {
        currentPlayer: gameSettings.player,
        scores: {
            blue: 0,
            orange: 0
        }
    };
}

export function addPoint(gameState: GameState): void {
    gameState.scores[gameState.currentPlayer]++;
}

export function switchPlayer(gameState: GameState): void {
    gameState.currentPlayer =
        gameState.currentPlayer === 'blue' ? 'orange' : 'blue';
}