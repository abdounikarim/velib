import urlImg1 from '../assets/slider/image1.png';
import urlImg2 from '../assets/slider/image2.png';
import urlImg3 from '../assets/slider/image3.png';
import urlImg4 from '../assets/slider/image4.png';
import urlImg5 from '../assets/slider/image5.png';
import urlImg6 from '../assets/slider/image6.png';

/**
 * Info component
 * @class Info
 * @extends HTMLElement
 */
export default class Info extends HTMLElement {
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
            <h1>Réservation de vélibs</h1>
            <div id="slider_infos" class="center-align">
                <h2>Avant de réserver !</h2>
                <p>Voici les informations concernant notre application de réservation de vélibs :</p>
            </div>
            <div class="row">
                <div class="block_infos_slider">
                    <div class="infos_slider col s12 m4 offset-m2">
                        <h3>Quelques informations utiles</h3>
                        <ul>
                            <li>Étape 1 : Cliquez sur un regroupement de marqueur</li>
                            <li>Étape 2 : Choisissez votre station</li>
                            <li>Étape 3 : Appuyez sur réserver</li>
                            <li>Étape 4 : Signez et validez</li>
                        </ul>
                        <p class="center-align">Vous pouvez récupérez votre vélib</p>
                        <p class="center-align"><img class="bike" src="./src/assets/bike.svg"></p>
                    </div>
                    <div id="index-banner" class="carousel carousel-slider center col s12 m4" data-indicators="true">
                        <div class="carousel-item blue darken-1 white-text" href="#one!">
                            <img src="${urlImg1}">
                        </div>
                        <div class="carousel-item blue darken-1 white-text" href="#two!">
                            <img src="${urlImg2}">
                        </div>
                        <div class="carousel-item blue darken-1 white-text" href="#three!">
                            <img src="${urlImg3}">
                        </div>
                        <div class="carousel-item blue darken-1 white-text" href="#four!">
                            <img src="${urlImg4}">
                        </div>
                        <div class="carousel-item blue darken-1 white-text" href="#four!">
                            <img src="${urlImg5}">
                        </div>
                        <div class="carousel-item blue darken-1 white-text" href="#four!">
                            <img src="${urlImg6}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
