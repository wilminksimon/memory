import './scss/main.scss';
import { renderHomeScreen } from './screens/home-screen';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.innerHTML = renderHomeScreen();
}