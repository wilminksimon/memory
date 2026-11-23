export function initGameOverEvents(
    app: HTMLDivElement,
    onBackToSettings: () => void
): void {
    const button = app.querySelector<HTMLButtonElement>('.button--game-over');
    if (!button) return;

    button.addEventListener('click', onBackToSettings);
}