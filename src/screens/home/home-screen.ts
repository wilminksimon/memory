import controller from '../../assets/logos/controller.png';
import arrow from '../../assets/logos/arrow.svg';
import arrowHover from '../../assets/logos/arrow-hover.svg';
import background from '../../assets/logos/stadia_controller.svg';

export function renderHomeScreen(): string {
    return `
        <main class="home-screen">
        <div>
            <aside class="text-48">It’s play time.</aside>
            <h1 class="text-140">Ready to play?</h1>
        </div>
            <button class="button button--play">
                <img class="button__controller" src="${controller}" alt="Controller">
                Play
                <div class="button__arrow">
                    <img class="button__arrow-default" src="${arrow}" alt="arrow">
                    <img class="button__arrow-hover d-none" src="${arrowHover}" alt="arrow">
                </div>
            </button>

            <img class="home-screen__background" src="${background}" alt="Controller">
        </main>
`;
}

export function initHomeScreen(onPlay: () => void): void {
    const playButton = document.querySelector<HTMLButtonElement>('.button--play');

    playButton?.addEventListener('click', onPlay);
}
