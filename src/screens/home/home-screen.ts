export function renderHomeScreen(): string {
    return `
        <main class="home-screen">
        <div>
            <aside class="text-48">It’s play time.</aside>
            <h1 class="text-140">Ready to play?</h1>
        </div>
            <button class="button button--play">
                <img class="button__controller" src="src/assets/logos/controller.png" alt="Controller">
                Play
                <div class="button__arrow">
                    <img class="button__arrow-default" src="src/assets/logos/arrow.svg" alt="arrow">
                    <img class="button__arrow-hover d-none" src="src/assets/logos/arrow-hover.svg" alt="arrow">
                </div>
            </button>

            <img class="home-screen__background" src="src/assets/logos/stadia_controller.svg" alt="Controller">
        </main>
`;
}

export function initHomeScreen(onPlay: () => void): void {
    const playButton = document.querySelector<HTMLButtonElement>('.button--play');

    playButton?.addEventListener('click', onPlay);
}
