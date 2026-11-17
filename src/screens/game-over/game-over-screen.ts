import type { GameState } from '../../types/game-types';
import { getWinner } from '../../game-logic/game-manager';

export function renderGameOverScreen(game: GameState): string {
    const winner = getWinner(game);
    const winnerName = winner ? winner.toUpperCase() : 'DRAW';
    const winnerScore = winner ? game.scores[winner] : 0;

    return `
        <main class="game-over-screen">
            <h1>Game Over!</h1>
            <h2>The winner is: ${winnerName}</h2>
            <p>Score: ${winnerScore}</p>
        </main>
    `;
}