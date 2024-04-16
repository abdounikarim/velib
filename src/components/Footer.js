/**
 * Footer component
 * @class Footer
 * @extends HTMLElement
 */
export default class Footer extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = this.template();
    }

    template() {
        return `
            <footer class="page-footer light-blue accent-3 center-align">
                <div class="container">
                    <div class="row">
                        <p id="isReservation" class="white-text">Aucune réservation en cours</p>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                        <span><a href="mentions.html">Mentions légales</a></span>
                    </div>
                </div>
            </footer>
        `;
    }
}
