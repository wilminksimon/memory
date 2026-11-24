/**
 * Initializes the winner screen button.
 * @param app Root element containing the winner screen.
 * @param onBackToHome Callback invoked when the player returns to the home screen.
 */
export function initGameOverEvents(
    app: HTMLDivElement,
    onBackToHome: () => void
): void {
    const button = app.querySelector<HTMLButtonElement>('.button--game-over');
    if (!button) return;

    button.addEventListener('click', onBackToHome);
}
