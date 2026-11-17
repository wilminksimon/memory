import type { Theme } from './theme-types';
import type { Player } from './player-types';

export type BoardSize = 16 | 24 | 36;

export interface GameSettings {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
}

export interface MemoryCard {
    id: number;
    pairId: number;
    image: string;
}

export interface GameState {
    currentPlayer: Player;
    scores: Record<Player, number>;
}