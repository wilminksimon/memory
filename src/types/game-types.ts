import type { Theme } from './theme-types';
import type { Player } from './player-types';

/** Number of cards displayed on the game board. */
export type BoardSize = 16 | 24 | 36;

/** User-selected options used to start a game. */
export interface GameSettings {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
}

/** One card in the shuffled memory game deck. */
export interface MemoryCard {
    /** Unique identifier for this card instance. */
    id: number;
    /** Shared identifier linking this card to its matching pair. */
    pairId: number;
    /** URL of the card face image. */
    image: string;
}

/** Runtime score and turn information for a game. */
export interface GameState {
    /** Player whose turn is currently active. */
    currentPlayer: Player;
    /** Number of matched pairs collected by each player. */
    scores: Record<Player, number>;
}
