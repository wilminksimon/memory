/**
 * Initializes the winner screen button.
 */
export function initGameOverEvents(
    app: HTMLDivElement,
    onBackToHome: () => void
): void {
    const button = app.querySelector<HTMLButtonElement>('.button--game-over');
    if (!button) return;

    button.addEventListener('click', onBackToHome);
}