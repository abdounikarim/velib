/**
 * Navigation component
 * @class Navigation
 * @extends HTMLElement
 */
export default class Navigation extends HTMLElement {
    /**
     * Constructor
     * @return void
     */
    constructor() {
        super();

        this.innerHTML = this.template();
    }

    template() {
        return `
            <nav class="light-blue lighten-1" role="navigation">
                <div class="nav-wrapper container"><a id="logo-container" href="index.html" class="brand-logo"><i class="material-icons logoBike">directions_bike</i> Velib</a>
                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="#index-banner"><i class="material-icons">slideshow</i> Diaporama</a></li>
                        <li><a href="#map"><i class="material-icons">map</i> Carte</a></li>
                    </ul>

                    <ul class="side-nav" id="nav-mobile">
                        <li><a href="#index-banner"><i class="material-icons">slideshow</i> Diaporama</a></li>
                        <li><a href="#map"><i class="material-icons">map</i> Carte</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}
