import controller from '../../assets/logos/controller.png';
import arrow from '../../assets/logos/arrow.svg';
import arrowHover from '../../assets/logos/arrow-hover.svg';
import background from '../../assets/logos/stadia_controller.svg';

/**
 * Renders the home screen.
 */
export function renderHomeScreen(): string {
    return `
        <main class="home-screen">
            <header class="home-screen__intro">
                <p class="text-48">It’s play time.</p>
                <h1 class="text-140">Ready to play?</h1>
            </header>

            <button class="button button--play" type="button">
                <img class="button__controller" src="${controller}" alt="">
                Play
                <span class="button__arrow">
                    <img class="button__arrow-default" src="${arrow}" alt="">
                    <img class="button__arrow-hover d-none" src="${arrowHover}" alt="">
                </span>
            </button>

            <img
                class="home-screen__background"
                src="${background}"
                alt=""
            >
        </main>
    `;
}

/**
 * Initializes the home screen event listeners.
 * @param onPlay Callback invoked when the play button is clicked.
 */
export function initHomeScreen(onPlay: () => void): void {
    const playButton = document.querySelector<HTMLButtonElement>('.button--play');
    playButton?.addEventListener('click', onPlay);
}
