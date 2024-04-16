import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Info from './components/Info';
import Map from './components/Map';
import Navigation from './components/Navigation';
import Reservation from './components/Reservation';
import Station from './components/Station';

customElements.define('footer-component', Footer);
customElements.define('info-component', Info);
customElements.define('map-component', Map);
customElements.define('navigation-component', Navigation);
// TODO - can we remove this one ? or document why is it here and not use in the render method of App
customElements.define('canvas-component', Canvas);
customElements.define('reservation-component', Reservation);
customElements.define('station-component', Station);

export default class App {
    render(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = `
            <navigation-component></navigation-component>
            <info-component></info-component>
            <map-component></map-component>
            <footer-component></footer-component>
        `;
    }
}
