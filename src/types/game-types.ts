import { Theme } from './theme-types';
import { Player } from './player-types';

export type BoardSize = 16 | 24 | 36;

export interface GameSettings {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
}