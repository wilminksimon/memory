interface GameEventState {
    openedCards: HTMLButtonElement[];
    isChecking: boolean;
}

export function initGameEvents(app: HTMLDivElement): void {
    const fieldRef = app.querySelector('#field');
    const gameState: GameEventState = {
        openedCards: [],
        isChecking: false
    };

    if (fieldRef) {
        fieldRef.addEventListener('click', e => handleCardClick(e, gameState));
    }
}

function handleCardClick(event: Event, gameState: GameEventState): void {
    if (gameState.isChecking) return;
    if (!(event.target instanceof HTMLElement)) return;

    const card = event.target.closest<HTMLButtonElement>('.card');

    if (!card || card.classList.contains('is-flipped')) return;

    card.classList.add('is-flipped');
    gameState.openedCards.push(card);

    if (gameState.openedCards.length === 2) checkSelectedCards(gameState);
}

function checkSelectedCards(gameState: GameEventState): void {
    const [firstCard, secondCard] = gameState.openedCards;
    const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

    if (isMatch) {
        gameState.openedCards = [];
        return;
    }

    gameState.isChecking = true;
    setTimeout(() => resetSelectedCards(gameState), 1000);
}

function resetSelectedCards(gameState: GameEventState): void {
    gameState.openedCards.forEach(card => {
        card.classList.remove('is-flipped');
    });

    gameState.openedCards = [];
    gameState.isChecking = false;
}