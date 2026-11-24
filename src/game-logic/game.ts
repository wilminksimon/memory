import { cards } from '../data/cards';
import { gameSettings } from '../data/game-settings';
import type { MemoryCard } from '../types/game-types';

/**
 * Creates memory cards based on the selected game settings.
 * @returns A shuffled deck containing two cards for every selected image.
 */
export function createGameCards(): MemoryCard[] {
    const availableImages = [...cards[gameSettings.theme]];
    const pairCount = gameSettings.boardSize / 2;
    const gameCards: MemoryCard[] = [];
    shuffleCards(availableImages);

    for (let i = 0; i < pairCount; i++) {
        const image = availableImages[i] as string;
        const pairId = i;
        gameCards.push({ id: gameCards.length, pairId, image });
        gameCards.push({ id: gameCards.length, pairId, image });
    }

    shuffleCards(gameCards);
    return gameCards;
}

/** Randomly shuffles the elements of an array
 * @param items Array whose element order will be randomized.
 */
function shuffleCards<T>(items: T[]): void {
    for (let i = items.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = items[i] as T;
        items[i] = items[randomIndex] as T;
        items[randomIndex] = temp;
    }
}
